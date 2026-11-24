"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { X } from "@phosphor-icons/react";
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
          backgroundColor: visible ? "rgba(8, 17, 32, 0.6)" : "rgba(8, 17, 32, 0)",
          backdropFilter: visible ? "blur(6px)" : "blur(0px)",
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
          role="dialog"
          aria-modal="true"
          aria-label="Get started with Quotie"
          className="sheet relative rounded-xl overflow-hidden"
        >
          <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 p-2 rounded-lg text-ink-faint hover:text-ink hover:bg-ink/5 transition-colors duration-200"
          >
            <X weight="bold" className="w-4 h-4" />
          </button>

          <div className="px-6 sm:px-8 pt-8 pb-2">
            <div className="mb-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-blue mb-3">
                Get started
              </div>
              <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-ink mb-2 font-jakarta">
                Let&apos;s get you quoting
              </h3>
              <p className="text-sm text-ink-soft max-w-xs">
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
