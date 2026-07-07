import React, { useState } from "react";
import axios from "axios";
import { Heart, ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const PRESETS = ["25", "50", "100", "250"];

const Donation = () => {
  const { t } = useLanguage();
  const d = t.donation;
  const [selected, setSelected] = useState("50");
  const [custom, setCustom] = useState("");
  const [donor, setDonor] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const pickPreset = (p) => { setSelected(p); setCustom(""); };
  const onCustom = (v) => { setCustom(v); setSelected(null); };

  const handleDonate = async () => {
    const body = {
      frequency: "one_time",
      donor_name: donor.name,
      donor_email: donor.email,
      origin_url: window.location.origin,
    };
    if (selected) {
      body.package_id = selected;
    } else {
      const amt = parseFloat(custom);
      if (!amt || amt < 1) {
        toast.error(d.customPlaceholder);
        return;
      }
      body.custom_amount = amt;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/donations/checkout`, body);
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("no url");
      }
    } catch (err) {
      toast.error(t.contact.error);
      setLoading(false);
    }
  };

  return (
    <div data-testid="donation-page">
      <section className="relative overflow-hidden bg-[#E66C37] text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.homeCare})` }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A2E0E]/85 via-[#A8431D]/55 to-[#C85526]/10" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{d.title}</h1>
            <p className="text-lg text-white/95 mt-5 max-w-2xl">{d.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/55" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DBE4D8] shadow-[0_12px_40px_rgba(28,116,59,0.14)]">
              <p className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-4">{d.chooseAmount}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => pickPreset(p)}
                    data-testid={`amount-${p}`}
                    className={`py-5 rounded-2xl border-2 font-serif text-2xl transition-all ${
                      selected === p
                        ? "border-[#1C743B] bg-[#1C743B] text-white"
                        : "border-[#DBE4D8] text-[#1B2A20] hover:border-[#1C743B]"
                    }`}
                  >
                    {p}$
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{d.customAmount}</label>
                <div className="relative">
                  <span className="absolute left-0 top-2 text-xl text-[#4B5A51]">$</span>
                  <input
                    type="number" min="1" value={custom}
                    onChange={(e) => onCustom(e.target.value)}
                    placeholder={d.customPlaceholder}
                    data-testid="custom-amount-input"
                    className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] pl-6 py-2 outline-none transition-colors w-full text-xl text-[#1B2A20]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{d.donorName}</label>
                  <input value={donor.name} onChange={(e) => setDonor({ ...donor, name: e.target.value })} data-testid="donor-name-input"
                    className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20]" />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{d.donorEmail}</label>
                  <input type="email" value={donor.email} onChange={(e) => setDonor({ ...donor, email: e.target.value })} data-testid="donor-email-input"
                    className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20]" />
                </div>
              </div>

              <button
                onClick={handleDonate}
                disabled={loading}
                data-testid="donate-submit-btn"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E66C37] text-white hover:bg-[#C85526] disabled:opacity-60 rounded-full px-8 py-4 font-semibold text-lg transition-colors shadow-md"
              >
                <Heart className="w-5 h-5" /> {loading ? d.processing : d.donateNow}
              </button>

              <p className="flex items-center justify-center gap-2 text-xs text-[#4B5A51] mt-4">
                <ShieldCheck className="w-4 h-4 text-[#1C743B]" /> {d.secure}
              </p>
            </div>
          </Reveal>

          {/* Impact */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="sticky top-28">
              <img src={MEDIA.seniorsTalking} alt="" loading="lazy" width="1200" height="800" className="rounded-[2rem] w-full h-56 object-cover mb-8 shadow-[0_12px_40px_rgba(28,116,59,0.18)]" />
              <h3 className="font-serif text-2xl text-[#1B2A20] mb-5">{d.impactTitle}</h3>
              <ul className="space-y-4">
                {d.impacts.map((im) => (
                  <li key={im} className="flex items-start gap-3 text-[#4B5A51]">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1C743B] text-white shrink-0">
                      <Check className="w-4 h-4" strokeWidth={2.4} />
                    </span>
                    <span>{im}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Donation;
