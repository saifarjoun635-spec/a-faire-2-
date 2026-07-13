import React from "react";
import { Link } from "react-router-dom";
import { BedDouble, Sofa, Utensils, ShieldCheck, HeartPulse, Music, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

const featureIcons = [BedDouble, Sofa, Utensils, ShieldCheck, HeartPulse, Music];

const Residences = () => {
  const { t } = useLanguage();
  const res = t.residences;
  const leisure = t.servicesList.leisure;
  useSEO({
    title: "Résidences — Milieu de vie chaleureux & sécuritaire",
    description:
      "Découvrez nos résidences de type Ressource Intermédiaire : chambres confortables, repas maison, activités adaptées et accompagnement 24/7.",
    path: "/residences",
  });

  const photos = [
    { src: MEDIA.lobby1, span: "sm:col-span-2 sm:row-span-2", pos: "object-center" },
    { src: MEDIA.lobby2, span: "", pos: "object-center" },
    { src: MEDIA.smilingSeniors, span: "", pos: "object-top" },
  ];

  return (
    <div data-testid="residences-page">
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
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{res.title}</h1>
            <p className="text-lg text-white/90 mt-5 max-w-2xl">{res.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/55" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img src={MEDIA.lobby2} alt="Espace de vie" loading="lazy" width="1200" height="675" className="rounded-[2rem] w-full h-[360px] lg:h-[460px] object-cover shadow-[0_16px_50px_rgba(28,116,59,0.22)]" />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B2A20]">{res.introTitle}</h2>
            <p className="text-lg text-[#4B5A51] leading-relaxed mt-6">{res.introText}</p>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.lobby1})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#E7F0E5]/45" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="inline-block font-serif text-3xl sm:text-4xl text-[#1B2A20] bg-white/85 backdrop-blur-sm rounded-2xl px-7 py-3 shadow-sm">{res.featuresTitle}</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {res.features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.08}>
                  <div className="h-full bg-white rounded-3xl p-8 border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(28,116,59,0.18)] transition-all duration-300">
                    <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1C743B] text-white mb-5">
                      <Icon className="w-7 h-7" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-serif text-xl text-[#1B2A20] mb-2">{f.title}</h3>
                    <p className="text-sm text-[#4B5A51] leading-relaxed">{f.desc}</p>
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
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2A20] mb-10">{res.galleryTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 auto-rows-[220px] gap-5">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 0.07} className={p.span}>
              <div className="group h-full w-full overflow-hidden rounded-[2rem] shadow-[0_12px_40px_rgba(28,116,59,0.15)]">
                <img src={p.src} alt={`Résidence ${i + 1}`} loading="lazy" width="1200" height="776" className={`h-full w-full object-cover ${p.pos} transition-transform duration-700 group-hover:scale-105`} data-testid={`residence-photo-${i}`} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-sm text-[#4B5A51] mt-6 italic">{res.note}</p>
      </section>

      {/* Loisirs & activités */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7A2E0E] via-[#C85526] to-[#E66C37] text-white">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #F9E5D0 0%, transparent 45%), radial-gradient(circle at 85% 75%, #F0B27A 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-14 items-center">
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
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#C85526] shrink-0">
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
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2A20]">{res.ctaTitle}</h2>
          <p className="text-lg text-[#4B5A51] mt-4">{res.ctaText}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/contact" className="bg-[#1C743B] text-white hover:bg-[#135229] rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.contact}
            </Link>
            <Link to="/services" className="border-2 border-[#1C743B] text-[#1C743B] hover:bg-[#1C743B] hover:text-white rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.explore}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Residences;
