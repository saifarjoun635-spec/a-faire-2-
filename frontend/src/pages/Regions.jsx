import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA, REGION_CREDITS } from "../constants/media";
import { Reveal } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

const cardImages = [MEDIA.cityMontreal, MEDIA.cityOutaouais, MEDIA.cityMauricie, MEDIA.cityOttawa];

const Regions = () => {
  const { t } = useLanguage();
  const r = t.regions;
  useSEO({
    title: "Régions desservies — Montréal, Outaouais, Mauricie, Ottawa",
    description:
      "GHAP est présent à Montréal, en Outaouais, en Mauricie et à Ottawa. Trouvez la résidence ou le service de répit le plus proche de vous.",
    path: "/regions",
  });

  return (
    <div data-testid="regions-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2415] via-[#135229] to-[#1C743B]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 25%, #E66C37 0%, transparent 45%), radial-gradient(circle at 80% 75%, #BFE3C8 0%, transparent 50%)",
          }}
          aria-hidden
        />
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
                className="group h-full bg-[#FFFFFF] rounded-[2rem] overflow-hidden border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.08)] hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={cardImages[i % cardImages.length]} alt={city.name} loading="lazy" width="960" height="640" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-2 right-3 text-[10px] text-white/90 bg-black/40 rounded px-1.5 py-0.5" data-testid={`region-photo-credit-${i}`}>
                    {REGION_CREDITS[i % REGION_CREDITS.length]}
                  </span>
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full ${city.status.toLowerCase().includes("active") ? "bg-[#1C743B] text-white" : "bg-[#E66C37] text-white"}`}>
                    {city.status}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-[#1C743B]" strokeWidth={1.8} />
                    <h3 className="font-serif text-2xl text-[#1B2A20]">{city.name}</h3>
                  </div>
                  <p className="text-[#4B5A51] leading-relaxed">{city.desc}</p>
                  <div className="mt-4 flex items-start gap-2 bg-[#E7F0E5] rounded-xl px-4 py-3">
                    <MapPin className="w-4 h-4 text-[#1C743B] mt-0.5 shrink-0" strokeWidth={1.8} />
                    <span className="text-sm text-[#1B2A20] font-medium">{city.areas}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="text-center font-serif text-xl text-[#AD4A1F] mt-12">{r.future}</p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-[#E7F0E5]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2A20] text-center mb-12">{r.statsTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {r.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#DBE4D8] text-center">
                  <p className="font-serif text-5xl text-[#1C743B]">{s.value}</p>
                  <p className="text-[#4B5A51] mt-3">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#E66C37] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl max-w-2xl">{r.ctaTitle}</h2>
            <p className="text-lg text-white/90 mt-4 max-w-xl">{r.ctaText}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/contact" data-testid="regions-contact-btn" className="inline-flex items-center gap-2 bg-white text-[#C85526] hover:bg-[#FBF9F6] rounded-full px-9 py-4 transition-colors font-semibold whitespace-nowrap shadow-lg">
              {t.cta.contact} <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Regions;
