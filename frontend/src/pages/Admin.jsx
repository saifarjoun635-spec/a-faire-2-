import React, { useState } from "react";
import axios from "axios";
import { Lock, MessageSquare, HandCoins, Briefcase, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Admin = () => {
  const { t } = useLanguage();
  const a = t.admin;
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [tab, setTab] = useState("messages");
  const [error, setError] = useState("");

  const access = async () => {
    setError("");
    try {
      const headers = { "X-Admin-Token": token };
      const [m, dn, ap] = await Promise.all([
        axios.get(`${API}/contact`, { headers }),
        axios.get(`${API}/donations`, { headers }),
        axios.get(`${API}/careers`, { headers }),
      ]);
      setMessages(m.data);
      setDonations(dn.data);
      setApplications(ap.data);
      setAuthed(true);
    } catch (e) {
      setError(a.wrongToken);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5" data-testid="admin-login">
        <div className="max-w-md w-full bg-[#FFFFFF] rounded-3xl p-10 border border-[#DBE4D8] shadow-[0_12px_40px_rgba(28,116,59,0.12)] text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#E7F0E5] text-[#1C743B] mb-6">
            <Lock className="w-6 h-6" strokeWidth={1.6} />
          </span>
          <h1 className="font-serif text-3xl text-[#1B2A20] mb-6">{a.title}</h1>
          <input
            type="password" value={token} onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && access()}
            placeholder={a.enterToken} data-testid="admin-token-input"
            className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-center text-[#1B2A20] mb-6"
          />
          {error && <p className="text-[#E66C37] text-sm mb-4">{error}</p>}
          <button onClick={access} data-testid="admin-access-btn"
            className="w-full bg-[#1C743B] text-white hover:bg-[#135229] rounded-full px-8 py-3.5 font-semibold transition-colors">
            {a.access}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16" data-testid="admin-dashboard">
      <h1 className="font-serif text-4xl text-[#1B2A20] mb-8">{a.title}</h1>
      <div className="flex gap-3 mb-8">
        <button onClick={() => setTab("messages")} data-testid="tab-messages"
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${tab === "messages" ? "bg-[#1C743B] text-white" : "bg-[#E7F0E5] text-[#4B5A51]"}`}>
          <MessageSquare className="w-4 h-4" /> {a.messages} ({messages.length})
        </button>
        <button onClick={() => setTab("donations")} data-testid="tab-donations"
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${tab === "donations" ? "bg-[#1C743B] text-white" : "bg-[#E7F0E5] text-[#4B5A51]"}`}>
          <HandCoins className="w-4 h-4" /> {a.donations} ({donations.length})
        </button>
        <button onClick={() => setTab("applications")} data-testid="tab-applications"
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${tab === "applications" ? "bg-[#1C743B] text-white" : "bg-[#E7F0E5] text-[#4B5A51]"}`}>
          <Briefcase className="w-4 h-4" /> {t.nav.careers} ({applications.length})
        </button>
      </div>

      {tab === "messages" && (
        <div className="space-y-4" data-testid="messages-list">
          {messages.length === 0 && <p className="text-[#4B5A51]">{a.noMessages}</p>}
          {messages.map((m) => (
            <div key={m.id} className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#DBE4D8]">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <span className="font-serif text-lg text-[#1B2A20]">{m.name}</span>
                <span className="text-xs text-[#4B5A51]">{new Date(m.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm text-[#1C743B] mb-1">{m.email} {m.phone && `• ${m.phone}`}</p>
              {m.subject && <p className="text-sm font-semibold text-[#1B2A20] mb-1">{m.subject}</p>}
              <p className="text-[#4B5A51]">{m.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "donations" && (
        <div className="space-y-4" data-testid="donations-list">
          {donations.length === 0 && <p className="text-[#4B5A51]">{a.noDonations}</p>}
          {donations.map((dn) => (
            <div key={dn.id} className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#DBE4D8] flex flex-wrap justify-between gap-3">
              <div>
                <span className="font-serif text-xl text-[#1C743B]">{Number(dn.amount).toFixed(2)} {String(dn.currency).toUpperCase()}</span>
                <span className="text-sm text-[#4B5A51] ml-3">{dn.frequency === "monthly" ? t.donation.frequencyMonthly : t.donation.frequencyOneTime}</span>
                <p className="text-sm text-[#4B5A51] mt-1">{dn.donor_name} {dn.donor_email && `• ${dn.donor_email}`}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${dn.payment_status === "paid" ? "bg-[#1C743B] text-white" : "bg-[#E7F0E5] text-[#4B5A51]"}`}>
                  {dn.payment_status}
                </span>
                <p className="text-xs text-[#4B5A51] mt-2">{new Date(dn.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "applications" && (
        <div className="space-y-4" data-testid="applications-list">
          {applications.length === 0 && <p className="text-[#4B5A51]">{a.noApplications}</p>}
          {applications.map((ap) => (
            <div key={ap.id} className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#DBE4D8] flex flex-wrap justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-serif text-lg text-[#1B2A20]">{ap.name}</span>
                  {ap.position && <span className="text-xs font-semibold bg-[#E7F0E5] text-[#1C743B] px-3 py-1 rounded-full">{ap.position}</span>}
                </div>
                <p className="text-sm text-[#1C743B] mb-1">{ap.email} {ap.phone && `• ${ap.phone}`}</p>
                {ap.message && <p className="text-[#4B5A51] text-sm">{ap.message}</p>}
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <a
                  href={`${API}/careers/${ap.id}/cv?token=${encodeURIComponent(token)}`}
                  target="_blank" rel="noopener noreferrer"
                  data-testid={`download-cv-${ap.id}`}
                  className="inline-flex items-center gap-2 bg-[#1C743B] text-white hover:bg-[#135229] rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4" /> CV
                </a>
                <p className="text-xs text-[#4B5A51]">{new Date(ap.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
