import React, { useState } from "react";
import axios from "axios";
import { Lock, MessageSquare, HandCoins } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Admin = () => {
  const { t } = useLanguage();
  const a = t.admin;
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [donations, setDonations] = useState([]);
  const [tab, setTab] = useState("messages");
  const [error, setError] = useState("");

  const access = async () => {
    setError("");
    try {
      const headers = { "X-Admin-Token": token };
      const [m, dn] = await Promise.all([
        axios.get(`${API}/contact`, { headers }),
        axios.get(`${API}/donations`, { headers }),
      ]);
      setMessages(m.data);
      setDonations(dn.data);
      setAuthed(true);
    } catch (e) {
      setError(a.wrongToken);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5" data-testid="admin-login">
        <div className="max-w-md w-full bg-[#FAF9F6] rounded-3xl p-10 border border-[#D5D0C5] shadow-[0_12px_40px_rgba(85,107,47,0.12)] text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#EAE4D3] text-[#556B2F] mb-6">
            <Lock className="w-6 h-6" strokeWidth={1.6} />
          </span>
          <h1 className="font-serif text-3xl text-[#2C2C2C] mb-6">{a.title}</h1>
          <input
            type="password" value={token} onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && access()}
            placeholder={a.enterToken} data-testid="admin-token-input"
            className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#556B2F] px-0 py-2 outline-none transition-colors w-full text-center text-[#2C2C2C] mb-6"
          />
          {error && <p className="text-[#C8795A] text-sm mb-4">{error}</p>}
          <button onClick={access} data-testid="admin-access-btn"
            className="w-full bg-[#556B2F] text-white hover:bg-[#425622] rounded-full px-8 py-3.5 font-semibold transition-colors">
            {a.access}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16" data-testid="admin-dashboard">
      <h1 className="font-serif text-4xl text-[#2C2C2C] mb-8">{a.title}</h1>
      <div className="flex gap-3 mb-8">
        <button onClick={() => setTab("messages")} data-testid="tab-messages"
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${tab === "messages" ? "bg-[#556B2F] text-white" : "bg-[#EAE4D3] text-[#5C5C5C]"}`}>
          <MessageSquare className="w-4 h-4" /> {a.messages} ({messages.length})
        </button>
        <button onClick={() => setTab("donations")} data-testid="tab-donations"
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${tab === "donations" ? "bg-[#556B2F] text-white" : "bg-[#EAE4D3] text-[#5C5C5C]"}`}>
          <HandCoins className="w-4 h-4" /> {a.donations} ({donations.length})
        </button>
      </div>

      {tab === "messages" && (
        <div className="space-y-4" data-testid="messages-list">
          {messages.length === 0 && <p className="text-[#5C5C5C]">{a.noMessages}</p>}
          {messages.map((m) => (
            <div key={m.id} className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#D5D0C5]">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <span className="font-serif text-lg text-[#2C2C2C]">{m.name}</span>
                <span className="text-xs text-[#5C5C5C]">{new Date(m.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm text-[#556B2F] mb-1">{m.email} {m.phone && `• ${m.phone}`}</p>
              {m.subject && <p className="text-sm font-semibold text-[#2C2C2C] mb-1">{m.subject}</p>}
              <p className="text-[#5C5C5C]">{m.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "donations" && (
        <div className="space-y-4" data-testid="donations-list">
          {donations.length === 0 && <p className="text-[#5C5C5C]">{a.noDonations}</p>}
          {donations.map((dn) => (
            <div key={dn.id} className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#D5D0C5] flex flex-wrap justify-between gap-3">
              <div>
                <span className="font-serif text-xl text-[#556B2F]">{Number(dn.amount).toFixed(2)} {String(dn.currency).toUpperCase()}</span>
                <span className="text-sm text-[#5C5C5C] ml-3">{dn.frequency === "monthly" ? t.donation.frequencyMonthly : t.donation.frequencyOneTime}</span>
                <p className="text-sm text-[#5C5C5C] mt-1">{dn.donor_name} {dn.donor_email && `• ${dn.donor_email}`}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${dn.payment_status === "paid" ? "bg-[#556B2F] text-white" : "bg-[#EAE4D3] text-[#5C5C5C]"}`}>
                  {dn.payment_status}
                </span>
                <p className="text-xs text-[#5C5C5C] mt-2">{new Date(dn.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
