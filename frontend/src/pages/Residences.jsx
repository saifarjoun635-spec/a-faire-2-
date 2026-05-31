import React from "react";
import { Link } from "react-router-dom";
import { BedDouble, Sofa, Utensils, ShieldCheck, HeartPulse, Music, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const featureIcons = [BedDouble, Sofa, Utensils, ShieldCheck, HeartPulse, Music];

const Residences = () => {
  const { t } = useLanguage();
  const res = t.residences;
  const leisure = t.servicesList.leisure;

  const photos = [
    { src: MEDIA.lobby1, span: "sm:col-span-2 sm:row-span-2" },
    { src: MEDIA.lobby2, span: "" },
    { src: MEDIA.smilingSeniors, span: "" },
    { src: MEDIA.caregiverHands, span: "sm:col-span-2" },
  ];

  return (
    <div data-testid="residences-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#556B2F]">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${MEDIA.lobby1})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#556B2F]/75" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28 text-white">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{res.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{res.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <img src={MEDIA.lobby2} alt="Espace de vie" className="rounded-[2rem] w-full h-[360px] lg:h-[460px] object-cover shadow-[0_16px_50px_rgba(85,107,47,0.18)]" />
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C]">{res.introTitle}</h2>
          <p className="text-lg text-[#5C5C5C] leading-relaxed mt-6">{res.introText}</p>
        </Reveal>
      </section>

      {/* Features */}
      <section className="bg-[#EAE4D3]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-12 text-center">{res.featuresTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {res.features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.08}>
                  <div className="h-full bg-[#FAF9F6] rounded-3xl p-8 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(85,107,47,0.08)] hover:-translate-y-2 transition-transform duration-300">
                    <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#556B2F] text-white mb-5">
                      <Icon className="w-7 h-7" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-serif text-xl text-[#2C2C2C] mb-2">{f.title}</h3>
                    <p className="text-sm text-[#5C5C5C] leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-10">{res.galleryTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 auto-rows-[220px] gap-5">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 0.07} className={p.span}>
              <div className="group h-full w-full overflow-hidden rounded-[2rem] shadow-[0_12px_40px_rgba(85,107,47,0.12)]">
                <img src={p.src} alt={`Résidence ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" data-testid={`residence-photo-${i}`} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-sm text-[#5C5C5C] mt-6 italic">{res.note}</p>
      </section>

      {/* Loisirs & activités */}
      <section className="bg-[#556B2F] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 text-white mb-6">
              <Music className="w-7 h-7" strokeWidth={1.6} />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl">{t.servicesList.leisureTitle}</h2>
            <p className="text-lg text-white/90 mt-5">{res.leisureIntro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {leisure.map((l) => (
                <li key={l} className="flex items-start gap-3" data-testid="residence-leisure-item">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#C8795A] text-white shrink-0">
                    <Check className="w-4 h-4" strokeWidth={2.4} />
                  </span>
                  <span className="text-white/95">{l}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-20 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C]">{res.ctaTitle}</h2>
          <p className="text-lg text-[#5C5C5C] mt-4">{res.ctaText}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/contact" className="bg-[#556B2F] text-white hover:bg-[#425622] rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.contact}
            </Link>
            <Link to="/services" className="border-2 border-[#556B2F] text-[#556B2F] hover:bg-[#556B2F] hover:text-white rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.explore}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Residences;
