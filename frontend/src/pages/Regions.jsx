import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const cardImages = [MEDIA.cityMontreal, MEDIA.cityOutaouais, MEDIA.cityMauricie, MEDIA.cityOttawa];

const Regions = () => {
  const { t } = useLanguage();
  const r = t.regions;

  return (
    <div data-testid="regions-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#556B2F]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${MEDIA.abstractBg})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#556B2F]/70" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28 text-white">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-white/15 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4" strokeWidth={1.8} /> {t.tagline}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{r.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{r.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Region cards with photos */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="grid sm:grid-cols-2 gap-8">
          {r.cards.map((city, i) => (
            <Reveal key={city.name} delay={(i % 2) * 0.1}>
              <div
                data-testid={`region-card-${i}`}
                className="group h-full bg-[#FAF9F6] rounded-[2rem] overflow-hidden border border-[#D5D0C5] shadow-[0_8px_30px_rgba(85,107,47,0.08)] hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={cardImages[i % cardImages.length]} alt={city.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full ${city.status.toLowerCase().includes("active") ? "bg-[#556B2F] text-white" : "bg-[#C8795A] text-white"}`}>
                    {city.status}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-[#556B2F]" strokeWidth={1.8} />
                    <h3 className="font-serif text-2xl text-[#2C2C2C]">{city.name}</h3>
                  </div>
                  <p className="text-[#5C5C5C] leading-relaxed">{city.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="text-center font-serif text-xl text-[#C8795A] mt-12">{r.future}</p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-[#EAE4D3]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] text-center mb-12">{r.statsTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {r.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#D5D0C5] text-center">
                  <p className="font-serif text-5xl text-[#556B2F]">{s.value}</p>
                  <p className="text-[#5C5C5C] mt-3">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#C8795A] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl max-w-2xl">{r.ctaTitle}</h2>
            <p className="text-lg text-white/90 mt-4 max-w-xl">{r.ctaText}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/contact" data-testid="regions-contact-btn" className="inline-flex items-center gap-2 bg-white text-[#B06548] hover:bg-[#F9F6F0] rounded-full px-9 py-4 transition-colors font-semibold whitespace-nowrap shadow-lg">
              {t.cta.contact} <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Regions;
