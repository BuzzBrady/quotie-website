import ApplyForm from "@/components/apply/ApplyForm";
import ApplyFooter from "@/components/apply/ApplyFooter";
import ApplyWordmark from "@/components/apply/ApplyWordmark";

export default function ApplyFormLanding() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col px-5 pb-10 pt-8 sm:pt-12">
        <div className="mb-10">
          <ApplyWordmark />
        </div>

        <ApplyForm />

        <div className="mt-12">
          <ApplyFooter />
        </div>
      </div>
    </div>
  );
}
