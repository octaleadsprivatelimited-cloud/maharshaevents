import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type BookingPopupContextType = {
  isOpen: boolean;
  openBookingPopup: () => void;
  closeBookingPopup: () => void;
};

const BookingPopupContext = createContext<BookingPopupContextType | null>(null);

export function BookingPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openBookingPopup = useCallback(() => setIsOpen(true), []);
  const closeBookingPopup = useCallback(() => setIsOpen(false), []);
  return (
    <BookingPopupContext.Provider value={{ isOpen, openBookingPopup, closeBookingPopup }}>
      {children}
    </BookingPopupContext.Provider>
  );
}

export function useBookingPopup() {
  const ctx = useContext(BookingPopupContext);
  if (!ctx) throw new Error("useBookingPopup must be used within BookingPopupProvider");
  return ctx;
}
