import React, { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Loader2, XCircle, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAX_ATTEMPTS = 6;
const INTERVAL = 2000;

const DonationResult = () => {
  const { t } = useLanguage();
  const r = t.donationResult;
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState("checking"); // checking | success | pending | failed | timeout
  const [info, setInfo] = useState(null);

  const poll = useCallback(async (attempt) => {
    if (attempt >= MAX_ATTEMPTS) {
      setState("timeout");
      return;
    }
    try {
      const res = await axios.get(`${API}/donations/status/${sessionId}`);
      setInfo(res.data);
      if (res.data.payment_status === "paid") {
        setState("success");
      } else if (res.data.status === "expired") {
        setState("failed");
      } else {
        setState("pending");
        setTimeout(() => poll(attempt + 1), INTERVAL);
      }
    } catch (e) {
      setTimeout(() => poll(attempt + 1), INTERVAL);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      setState("failed");
      return;
    }
    poll(0);
  }, [sessionId, poll]);

  const views = {
    checking: { icon: <Loader2 className="w-16 h-16 text-[#4F8A2D] animate-spin" />, title: r.checking, text: "" },
    pending: { icon: <Loader2 className="w-16 h-16 text-[#4F8A2D] animate-spin" />, title: r.pending, text: "" },
    success: { icon: <CheckCircle2 className="w-16 h-16 text-[#4F8A2D]" />, title: r.successTitle, text: r.successText },
    failed: { icon: <XCircle className="w-16 h-16 text-[#E07A45]" />, title: r.failedTitle, text: r.failedText },
    timeout: { icon: <Heart className="w-16 h-16 text-[#E07A45]" />, title: r.timeout, text: "" },
  };
  const v = views[state];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-20" data-testid="donation-result-page">
      <div className="max-w-lg w-full text-center bg-[#FAF9F6] rounded-3xl p-10 sm:p-14 border border-[#D5D0C5] shadow-[0_12px_40px_rgba(79,138,45,0.12)]">
        <div className="flex justify-center mb-6">{v.icon}</div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-4" data-testid="result-title">{v.title}</h1>
        {v.text && <p className="text-[#5C5C5C] text-lg">{v.text}</p>}
        {state === "success" && info && (
          <p className="mt-4 font-serif text-2xl text-[#4F8A2D]">
            {Number(info.amount).toFixed(2)} {String(info.currency || "CAD").toUpperCase()}
            {info.frequency === "monthly" ? " / mois" : ""}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link to="/" data-testid="result-home-btn" className="bg-[#4F8A2D] text-white hover:bg-[#3D6E22] rounded-full px-8 py-3.5 font-semibold transition-colors">
            {r.backHome}
          </Link>
          {(state === "failed" || state === "timeout") && (
            <Link to="/don" data-testid="result-retry-btn" className="border-2 border-[#E07A45] text-[#E07A45] hover:bg-[#E07A45] hover:text-white rounded-full px-8 py-3.5 font-semibold transition-colors">
              {r.tryAgain}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationResult;
