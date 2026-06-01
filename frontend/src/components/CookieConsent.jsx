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
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] bg-[#FAF9F6] border border-[#D5D0C5] rounded-3xl shadow-[0_16px_50px_rgba(79,138,45,0.22)] p-6 animate-[float-soft_0.4s_ease]"
      data-testid="cookie-banner"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#EAE4D3] text-[#4F8A2D] shrink-0">
          <Cookie className="w-5 h-5" strokeWidth={1.8} />
        </span>
        <p className="text-sm text-[#5C5C5C] leading-relaxed pt-1">{t.cookies.text}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => decide("rejected")}
          data-testid="cookie-reject-btn"
          className="flex-1 border-2 border-[#D5D0C5] text-[#2C2C2C] hover:border-[#4F8A2D] rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {t.cookies.reject}
        </button>
        <button
          onClick={() => decide("accepted")}
          data-testid="cookie-accept-btn"
          className="flex-1 bg-[#4F8A2D] text-white hover:bg-[#3D6E22] rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          {t.cookies.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
