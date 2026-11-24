#!/usr/bin/env bash
# Claude Code hook: keeps every collaborator's checkout in sync with GitHub.
#
#   git-sync.sh start   SessionStart      fetch + pull if clean, report state
#   git-sync.sh prompt  UserPromptSubmit  fetch (throttled) + pull if clean, warn on drift
#   git-sync.sh stop    Stop              block the stop until local work is committed + pushed
#
# Output on stdout is injected into Claude's context. Keep it short and actionable.
# Set QUOTIE_GIT_AUTOSYNC=0 (e.g. in .claude/settings.local.json "env") to turn this off locally.

MODE="${1:-prompt}"
[ "${QUOTIE_GIT_AUTOSYNC:-1}" = "0" ] && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

INPUT="$(cat 2>/dev/null)"

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ -z "$branch" ] || [ "$branch" = "HEAD" ] && exit 0
upstream="origin/$branch"

fetch_origin() {
  # Throttle fetches on prompt submits so we don't hit GitHub on every message.
  if [ "$MODE" = "prompt" ] && [ -f .git/FETCH_HEAD ]; then
    local age=$(( $(date +%s) - $(stat -f %m .git/FETCH_HEAD 2>/dev/null || stat -c %Y .git/FETCH_HEAD 2>/dev/null || echo 0) ))
    [ "$age" -lt 120 ] && return 0
  fi
  git fetch -q origin 2>/dev/null
}

counts() {
  if git rev-parse --verify -q "$upstream" >/dev/null 2>&1; then
    behind=$(git rev-list --count "HEAD..$upstream" 2>/dev/null || echo 0)
    ahead=$(git rev-list --count "$upstream..HEAD" 2>/dev/null || echo 0)
    has_upstream=1
  else
    behind=0; ahead=$(git rev-list --count HEAD 2>/dev/null || echo 0); has_upstream=0
  fi
  dirty=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
}

code_changed() {
  # Anything that affects the Vercel build (not just .md docs), whether uncommitted or committed-but-unpushed.
  {
    git status --porcelain 2>/dev/null | awk '{print $NF}'
    [ "$has_upstream" = 1 ] && git diff --name-only "$upstream...HEAD" 2>/dev/null
  } | grep -Eq '^(src/|public/|package\.json|package-lock\.json|next\.config|tsconfig|postcss|eslint|vercel\.json)'
}

case "$MODE" in
  start|prompt)
    if ! fetch_origin; then
      [ "$MODE" = "start" ] && echo "GIT SYNC: could not reach GitHub (offline?). You are working from the local copy; sync again when back online."
      exit 0
    fi
    counts
    if [ "$has_upstream" = 0 ]; then
      echo "GIT SYNC: branch '$branch' is not on GitHub yet. When you finish, push it with: git push -u origin $branch"
      exit 0
    fi
    if [ "$behind" -gt 0 ]; then
      if [ "$dirty" -eq 0 ]; then
        if git pull -q --rebase origin "$branch" >/dev/null 2>&1; then
          echo "GIT SYNC: pulled $behind new commit(s) from teammates on $upstream. Local copy is now current:"
          git log --format='  %h %an: %s' ORIG_HEAD..HEAD 2>/dev/null | head -8
        else
          git rebase --abort >/dev/null 2>&1
          echo "GIT SYNC: $behind new commit(s) on $upstream but the automatic pull hit a conflict. Run 'git pull --rebase origin $branch', resolve the conflict, then continue."
        fi
      else
        echo "GIT SYNC: teammates pushed $behind new commit(s) to $upstream and you have $dirty uncommitted local change(s). BEFORE editing anything else: commit the local changes (git add -A && git commit -m '...'), then run: git pull --rebase origin $branch"
      fi
    elif [ "$MODE" = "start" ]; then
      echo "GIT SYNC: up to date with $upstream."
    fi
    if [ "$ahead" -gt 0 ]; then
      echo "GIT SYNC: $ahead local commit(s) not yet on GitHub. Push before you finish: git push origin $branch"
    fi
    if [ "$MODE" = "start" ] && [ "$dirty" -gt 0 ]; then
      echo "GIT SYNC: $dirty uncommitted change(s) left over from a previous session (git status to see them). Finish or commit them early so teammates get them."
    fi
    ;;

  stop)
    # Never loop: if we already blocked once this turn, let Claude stop.
    if printf '%s' "$INPUT" | jq -e '.stop_hook_active == true' >/dev/null 2>&1; then exit 0; fi
    counts
    [ "$dirty" -eq 0 ] && [ "$ahead" -eq 0 ] && [ "$has_upstream" = 1 ] && exit 0

    n=0; steps=""
    if code_changed; then
      n=$((n+1)); steps="${steps}${n}) Run 'npx next build' and fix any errors (Vercel deploys main straight to production). "
    fi
    if [ "$dirty" -gt 0 ]; then
      n=$((n+1)); steps="${steps}${n}) Commit everything: git add -A && git commit -m '<short description of what changed>'. "
    fi
    n=$((n+1)); steps="${steps}${n}) git pull --rebase origin $branch (resolve conflicts if any). "
    n=$((n+1))
    if [ "$has_upstream" = 1 ]; then
      steps="${steps}${n}) git push origin $branch. "
    else
      steps="${steps}${n}) git push -u origin $branch. "
    fi
    reason="GIT SYNC: you have ${dirty} uncommitted change(s) and ${ahead} unpushed commit(s). Teammates (Buzz, Benji, Locky) all work on this repo and must always have each other's latest work, so finish by syncing: ${steps}Then tell the user in one line what was pushed. Only skip this if the user explicitly asked you NOT to commit yet — in that case say so and stop."
    jq -cn --arg r "$reason" '{decision:"block", reason:$r}'
    ;;
esac
exit 0
