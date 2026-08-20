import ApplyVideoSlot from "@/components/apply/ApplyVideoSlot";
import ApplyVslPlayer from "@/components/apply/ApplyVslPlayer";
import { APPLY_VSL_URL, isDirectVideoUrl } from "@/components/apply/vsl";

export default function ApplyVsl() {
  if (isDirectVideoUrl(APPLY_VSL_URL)) {
    return <ApplyVslPlayer src={APPLY_VSL_URL} />;
  }

  return (
    <ApplyVideoSlot
      url={APPLY_VSL_URL}
      title="Training video"
      hint="The training will play here."
    />
  );
}
