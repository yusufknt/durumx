"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext<{
  orderOpen: boolean;
  setOrderOpen: (open: boolean) => void;
}>({
  orderOpen: false,
  setOrderOpen: () => {},
});

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderOpen, setOrderOpen] = useState(false);

  // Prevent body scroll when order modal is open
  useEffect(() => {
    if (orderOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [orderOpen]);

  // ESC tuşu ile modal'ı kapat
  useEffect(() => {
    if (!orderOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOrderOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [orderOpen]);

  return (
    <ModalContext.Provider value={{ orderOpen, setOrderOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
