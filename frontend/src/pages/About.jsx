import React from "react";
import { Heart, ShieldCheck, Leaf, Users, Sprout, Repeat, Handshake, Award, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const valueIcons = [Heart, ShieldCheck, Leaf, Users, Sprout, Repeat, Handshake, Award];

const About = () => {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div data-testid="about-page">
      <section className="relative overflow-hidden bg-[#4F8A2D]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.growthHands})` }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D6E22]/95 via-[#3D6E22]/72 to-[#3D6E22]/30" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28 text-white">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{a.title}</h1>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <div className="bg-[#FAF9F6] rounded-3xl p-9 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(79,138,45,0.08)] h-full">
            <h2 className="font-serif text-3xl text-[#4F8A2D] mb-5">{a.visionTitle}</h2>
            <p className="text-[#5C5C5C] leading-relaxed">{a.vision}</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="bg-[#FAF9F6] rounded-3xl p-9 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(79,138,45,0.08)] h-full">
            <h2 className="font-serif text-3xl text-[#4F8A2D] mb-5">{a.missionTitle}</h2>
            <p className="text-[#5C5C5C] leading-relaxed">{a.mission}</p>
          </div>
        </Reveal>
      </section>

      {/* Engagements */}
      <section className="bg-[#EAE4D3]">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-10 text-center">{a.engagementsTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {a.engagements.map((e, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <div className="flex items-start gap-4 bg-[#FAF9F6] rounded-2xl p-5 border border-[#D5D0C5]">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4F8A2D] text-white shrink-0">
                    <Check className="w-4 h-4" strokeWidth={2.4} />
                  </span>
                  <p className="text-[#5C5C5C] leading-relaxed">{e}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] mb-12 text-center">{a.valuesTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {a.values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <Reveal key={v.name} delay={(i % 4) * 0.08}>
                <div className="h-full bg-[#FAF9F6] rounded-3xl p-7 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(79,138,45,0.08)] hover:-translate-y-2 transition-transform duration-300">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E07A45]/15 text-[#E07A45] mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-serif text-xl text-[#2C2C2C] mb-2">{v.name}</h3>
                  <p className="text-sm text-[#5C5C5C] leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Engagement */}
      <section className="bg-[#4F8A2D] text-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl mb-6">{a.engagementTitle}</h2>
            <p className="text-lg text-white/90 leading-relaxed">{a.engagementText}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
