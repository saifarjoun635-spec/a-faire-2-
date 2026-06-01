import React, { useState, useRef } from "react";
import axios from "axios";
import { Briefcase, Upload, Send, Heart, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAX_SIZE = 5 * 1024 * 1024;
const whyIcons = [Heart, Sparkles, Users];

const Careers = () => {
  const { t } = useLanguage();
  const c = t.careers;
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [cv, setCv] = useState(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > MAX_SIZE) {
      toast.error(c.cvTooBig);
      e.target.value = "";
      return;
    }
    setCv(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv) {
      toast.error(c.cvRequired);
      return;
    }
    setSending(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("position", form.position);
      fd.append("message", form.message);
      fd.append("cv", cv);
      await axios.post(`${API}/careers`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(c.success);
      setForm({ name: "", email: "", phone: "", position: "", message: "" });
      setCv(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error(c.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="careers-page">
      <section className="relative overflow-hidden bg-[#3D6E22]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.caregiverHands})` }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D6E22]/95 via-[#3D6E22]/75 to-[#3D6E22]/35" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28 text-white">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-white/15 rounded-full px-4 py-2 mb-6">
              <Briefcase className="w-4 h-4" strokeWidth={1.8} /> {t.nav.careers}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{c.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{c.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-5 gap-14">
        {/* Why join */}
        <Reveal className="lg:col-span-2">
          <h2 className="font-serif text-3xl text-[#2C2C2C] mb-6">{c.whyTitle}</h2>
          <p className="text-[#5C5C5C] leading-relaxed mb-8">{c.intro}</p>
          <ul className="space-y-5">
            {c.why.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <li key={w} className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#EAE4D3] text-[#4F8A2D] shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-[#2C2C2C] pt-2">{w}</span>
                </li>
              );
            })}
          </ul>
          <img src={MEDIA.smilingSeniors} alt="" className="rounded-[2rem] w-full h-56 object-cover mt-10 shadow-[0_12px_40px_rgba(79,138,45,0.15)]" />
        </Reveal>

        {/* Form */}
        <Reveal delay={0.12} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            data-testid="careers-form"
            className="bg-[#FAF9F6] rounded-3xl p-8 sm:p-10 border border-[#D5D0C5] shadow-[0_12px_40px_rgba(79,138,45,0.12)] space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formName} *</label>
                <input name="name" required value={form.name} onChange={handleChange} data-testid="career-name-input"
                  className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
              </div>
              <div>
                <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formPhone}</label>
                <input name="phone" value={form.phone} onChange={handleChange} data-testid="career-phone-input"
                  className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formEmail} *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} data-testid="career-email-input"
                  className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
              </div>
              <div>
                <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formPosition}</label>
                <input name="position" value={form.position} onChange={handleChange} data-testid="career-position-input"
                  className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
              </div>
            </div>
            <div>
              <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formMessage}</label>
              <textarea name="message" rows={4} value={form.message} onChange={handleChange} data-testid="career-message-input"
                className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C] resize-none" />
            </div>

            <div>
              <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formCv} *</label>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" id="cv-input" data-testid="career-cv-input" />
              <label htmlFor="cv-input" className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-[#D5D0C5] hover:border-[#4F8A2D] rounded-2xl px-5 py-4 transition-colors">
                <Upload className="w-5 h-5 text-[#4F8A2D]" strokeWidth={1.8} />
                <span className="text-[#2C2C2C] font-medium">{cv ? cv.name : c.chooseFile}</span>
              </label>
              <p className="text-xs text-[#5C5C5C] mt-2">{c.cvHint}</p>
            </div>

            <button type="submit" disabled={sending} data-testid="career-submit-btn"
              className="inline-flex items-center gap-2 bg-[#4F8A2D] text-white hover:bg-[#3D6E22] disabled:opacity-60 rounded-full px-8 py-4 font-semibold transition-colors">
              <Send className="w-4 h-4" /> {sending ? c.sending : c.send}
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
};

export default Careers;
