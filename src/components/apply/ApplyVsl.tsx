import ApplyVideoSlot from "@/components/apply/ApplyVideoSlot";
import { APPLY_VSL_URL } from "@/components/apply/vsl";

export default function ApplyVsl() {
  return (
    <ApplyVideoSlot
      url={APPLY_VSL_URL}
      title="Training video"
      hint="The short training will play here."
    />
  );
}
