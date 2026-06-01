import React, { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { CONTACT_INFO } from "../constants/media";
import { Reveal } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(c.success);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(c.error);
    } finally {
      setSending(false);
    }
  };

  const info = [
    { icon: Phone, label: c.phone, value: CONTACT_INFO.phone, href: CONTACT_INFO.phoneHref },
    { icon: Mail, label: c.email, value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: MapPin, label: c.address, value: c.addressValue, href: null },
  ];

  return (
    <div data-testid="contact-page">
      <section className="bg-[#4F8A2D] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{c.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{c.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-14">
        <Reveal>
          <h2 className="font-serif text-3xl text-[#2C2C2C] mb-8">{c.infoTitle}</h2>
          <ul className="space-y-7">
            {info.map((it) => (
              <li key={it.label} className="flex items-start gap-5">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EAE4D3] text-[#4F8A2D] shrink-0">
                  <it.icon className="w-6 h-6" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#5C5C5C] font-semibold mb-1">{it.label}</p>
                  {it.href ? (
                    <a href={it.href} className="text-lg text-[#2C2C2C] hover:text-[#4F8A2D] transition-colors">{it.value}</a>
                  ) : (
                    <p className="text-lg text-[#2C2C2C]">{it.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            data-testid="contact-form"
            className="bg-[#FAF9F6] rounded-3xl p-8 sm:p-10 border border-[#D5D0C5] shadow-[0_12px_40px_rgba(79,138,45,0.12)] space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formName} *</label>
                <input name="name" required value={form.name} onChange={handleChange} data-testid="contact-name-input"
                  className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
              </div>
              <div>
                <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formPhone}</label>
                <input name="phone" value={form.phone} onChange={handleChange} data-testid="contact-phone-input"
                  className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
              </div>
            </div>
            <div>
              <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formEmail} *</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} data-testid="contact-email-input"
                className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
            </div>
            <div>
              <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formSubject}</label>
              <input name="subject" value={form.subject} onChange={handleChange} data-testid="contact-subject-input"
                className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C]" />
            </div>
            <div>
              <label className="text-sm uppercase tracking-widest text-[#5C5C5C] font-semibold mb-2 block">{c.formMessage} *</label>
              <textarea name="message" required rows={4} value={form.message} onChange={handleChange} data-testid="contact-message-input"
                className="bg-transparent border-b-2 border-[#D5D0C5] focus:border-[#4F8A2D] px-0 py-2 outline-none transition-colors w-full text-[#2C2C2C] resize-none" />
            </div>
            <button type="submit" disabled={sending} data-testid="contact-submit-btn"
              className="inline-flex items-center gap-2 bg-[#4F8A2D] text-white hover:bg-[#3D6E22] disabled:opacity-60 rounded-full px-8 py-4 font-semibold transition-colors">
              <Send className="w-4 h-4" /> {sending ? c.sending : c.send}
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
};

export default Contact;
