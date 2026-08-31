import { Suspense } from "react";
import ApplyChrome from "@/components/apply/ApplyChrome";
import ApplyForm from "@/components/apply/ApplyForm";

export default function ApplyFormLanding() {
  return (
    <ApplyChrome>
      <Suspense>
        <ApplyForm />
      </Suspense>
    </ApplyChrome>
  );
}
