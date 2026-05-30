import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const Residences = () => {
  const { t } = useLanguage();

  const photos = [
    { src: MEDIA.lobby1, span: "lg:col-span-2 lg:row-span-2" },
    { src: MEDIA.lobby2, span: "" },
    { src: MEDIA.smilingSeniors, span: "" },
  ];

  return (
    <div data-testid="residences-page">
      <section className="bg-[#556B2F] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-24">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{t.residences.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{t.residences.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-5">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className={p.span}>
              <div className="group h-full w-full overflow-hidden rounded-[2rem] shadow-[0_12px_40px_rgba(85,107,47,0.12)]">
                <img
                  src={p.src}
                  alt={`Résidence ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-testid={`residence-photo-${i}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-sm text-[#5C5C5C] mt-8 italic">{t.residences.note}</p>
      </section>
    </div>
  );
};

export default Residences;
