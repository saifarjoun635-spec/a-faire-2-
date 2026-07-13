import React, { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA, CONTACT_INFO } from "../constants/media";
import { Reveal } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const { t } = useLanguage();
  const c = t.contact;
  useSEO({
    title: "Contact — Nous joindre",
    description:
      "Communiquez avec Groupe Havre d'Amour et de Paix inc. Téléphone 514-464-5880, courriel info@ghap-hlpg.ca. 245 boul. Robert Bourassa, Montréal, QC.",
    path: "/contact",
  });
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2415] via-[#135229] to-[#1C743B] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 25%, #E66C37 0%, transparent 45%), radial-gradient(circle at 80% 75%, #BFE3C8 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{c.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{c.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/55" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-14">
          <Reveal>
            <h2 className="font-serif text-3xl text-[#1B2A20] mb-8">{c.infoTitle}</h2>
            <ul className="space-y-7">
              {info.map((it) => (
                <li key={it.label} className="flex items-start gap-5">
                  <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#DBE4D8] text-[#1C743B] shadow-sm shrink-0">
                    <it.icon className="w-6 h-6" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#4B5A51] font-semibold mb-1">{it.label}</p>
                    {it.href ? (
                      <a href={it.href} className="text-lg text-[#1B2A20] hover:text-[#1C743B] transition-colors">{it.value}</a>
                    ) : (
                      <p className="text-lg text-[#1B2A20]">{it.value}</p>
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
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DBE4D8] shadow-[0_12px_40px_rgba(28,116,59,0.14)] space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{c.formName} *</label>
                  <input name="name" required value={form.name} onChange={handleChange} data-testid="contact-name-input"
                    className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20]" />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{c.formPhone}</label>
                  <input name="phone" value={form.phone} onChange={handleChange} data-testid="contact-phone-input"
                    className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20]" />
                </div>
              </div>
              <div>
                <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{c.formEmail} *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} data-testid="contact-email-input"
                  className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20]" />
              </div>
              <div>
                <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{c.formSubject}</label>
                <input name="subject" value={form.subject} onChange={handleChange} data-testid="contact-subject-input"
                  className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20]" />
              </div>
              <div>
                <label className="text-sm uppercase tracking-widest text-[#4B5A51] font-semibold mb-2 block">{c.formMessage} *</label>
                <textarea name="message" required rows={4} value={form.message} onChange={handleChange} data-testid="contact-message-input"
                  className="bg-transparent border-b-2 border-[#DBE4D8] focus:border-[#1C743B] px-0 py-2 outline-none transition-colors w-full text-[#1B2A20] resize-none" />
              </div>
              <button type="submit" disabled={sending} data-testid="contact-submit-btn"
                className="inline-flex items-center gap-2 bg-[#1C743B] text-white hover:bg-[#135229] disabled:opacity-60 rounded-full px-8 py-4 font-semibold transition-colors">
                <Send className="w-4 h-4" /> {sending ? c.sending : c.send}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
