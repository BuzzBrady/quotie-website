"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { X } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

interface LeadModalContextValue {
  openLeadModal: (source?: string) => void;
  closeLeadModal: () => void;
  isOpen: boolean;
}

const LeadModalContext = createContext<LeadModalContextValue>({
  openLeadModal: () => {},
  closeLeadModal: () => {},
  isOpen: false,
});

export const useLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("modal");

  const openLeadModal = useCallback((src?: string) => {
    setSource(src || "modal");
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLeadModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeLeadModal]);

  return (
    <LeadModalContext.Provider value={{ openLeadModal, closeLeadModal, isOpen }}>
      {children}
      <LeadCaptureModal isOpen={isOpen} onClose={closeLeadModal} source={source} />
    </LeadModalContext.Provider>
  );
}

function LeadCaptureModal({
  isOpen,
  onClose,
  source,
}: {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          backgroundColor: visible ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)",
          backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        }}
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md transition-all duration-300 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(20px)",
        }}
      >
        <div
          className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.3), rgba(139,92,246,0.15), transparent 70%)",
          }}
        />

        <div className="relative rounded-2xl border border-white/[0.12] bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="px-6 sm:px-8 pt-8 pb-2">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.08] mb-4">
                <img src="/logo.svg" alt="Quotie" className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-jakarta)]">
                Let&apos;s get you quoting
              </h3>
              <p className="text-sm text-white/40 max-w-xs mx-auto">
                Tell us about your business and we&apos;ll reach out to get you
                set up.
              </p>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            <LeadCaptureForm source={source} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
