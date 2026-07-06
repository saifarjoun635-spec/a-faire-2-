import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("ghap_cookie_consent");
    if (!choice) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (value) => {
    localStorage.setItem("ghap_cookie_consent", value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] bg-[#FFFFFF] border border-[#DBE4D8] rounded-3xl shadow-[0_16px_50px_rgba(28,116,59,0.22)] p-6 animate-[float-soft_0.4s_ease]"
      data-testid="cookie-banner"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#E7F0E5] text-[#1C743B] shrink-0">
          <Cookie className="w-5 h-5" strokeWidth={1.8} />
        </span>
        <p className="text-sm text-[#4B5A51] leading-relaxed pt-1">{t.cookies.text}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => decide("rejected")}
          data-testid="cookie-reject-btn"
          className="flex-1 border-2 border-[#DBE4D8] text-[#1B2A20] hover:border-[#1C743B] rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {t.cookies.reject}
        </button>
        <button
          onClick={() => decide("accepted")}
          data-testid="cookie-accept-btn"
          className="flex-1 bg-[#1C743B] text-white hover:bg-[#135229] rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {t.cookies.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
