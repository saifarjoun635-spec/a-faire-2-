import React from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const Regions = () => {
  const { t } = useLanguage();
  const r = t.regions;

  return (
    <div data-testid="regions-page">
      <section className="relative overflow-hidden bg-[#556B2F]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${MEDIA.abstractBg})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#556B2F]/70" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28 text-white">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{r.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{r.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {r.list.map((city, i) => (
            <Reveal key={city} delay={i * 0.08}>
              <div
                data-testid={`region-card-${i}`}
                className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(85,107,47,0.08)] hover:-translate-y-2 transition-transform duration-300 text-center"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#EAE4D3] text-[#556B2F] mb-5">
                  <MapPin className="w-7 h-7" strokeWidth={1.6} />
                </span>
                <h3 className="font-serif text-2xl text-[#2C2C2C]">{city}</h3>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="text-center font-serif text-xl text-[#C8795A] mt-12">{r.future}</p>
        </Reveal>
      </section>
    </div>
  );
};

export default Regions;
