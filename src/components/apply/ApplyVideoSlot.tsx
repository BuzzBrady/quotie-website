import { Play } from "@phosphor-icons/react/ssr";
import { toVslEmbedUrl } from "@/components/apply/vsl";

export default function ApplyVideoSlot({
  url,
  title,
  hint,
}: {
  url?: string;
  title: string;
  hint?: string;
}) {
  const embedUrl = toVslEmbedUrl(url ?? "");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl shadow-slate-200/80 aspect-video">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#123a68] via-[#1f61aa] to-[#39b9e5] px-6 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/40">
            <Play weight="fill" className="ml-1 h-6 w-6 text-white" />
          </div>
          <p className="font-[family-name:var(--font-jakarta)] text-xs font-bold uppercase tracking-[0.16em] text-white">
            {title}
          </p>
          {hint && (
            <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-white/80">
              {hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
