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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2415] via-[#135229] to-[#1C743B]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #E66C37 0%, transparent 45%), radial-gradient(circle at 80% 75%, #BFE3C8 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28 text-white">
          <Reveal>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{a.title}</h1>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/50" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="bg-white rounded-3xl p-9 border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)] h-full">
              <h2 className="font-serif text-3xl text-[#1C743B] mb-5">{a.visionTitle}</h2>
              <p className="text-[#4B5A51] leading-relaxed">{a.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="bg-white rounded-3xl p-9 border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)] h-full">
              <h2 className="font-serif text-3xl text-[#1C743B] mb-5">{a.missionTitle}</h2>
              <p className="text-[#4B5A51] leading-relaxed">{a.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engagements */}
      <section className="relative overflow-hidden bg-[#E7F0E5]">
        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2A20]">{a.engagementsTitle}</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {a.engagements.map((e, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#DBE4D8] shadow-sm">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1C743B] text-white shrink-0">
                    <Check className="w-4 h-4" strokeWidth={2.4} />
                  </span>
                  <p className="text-[#4B5A51] leading-relaxed">{e}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/55" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B2A20] mb-12 text-center">{a.valuesTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <Reveal key={v.name} delay={(i % 4) * 0.08}>
                  <div className="h-full bg-white rounded-3xl p-7 border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(28,116,59,0.18)] transition-all duration-300">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E66C37]/15 text-[#C85526] mb-5">
                      <Icon className="w-6 h-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-serif text-xl text-[#1B2A20] mb-2">{v.name}</h3>
                    <p className="text-sm text-[#4B5A51] leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#135229] via-[#1C743B] to-[#0C2415] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #E66C37 0%, transparent 45%), radial-gradient(circle at 85% 70%, #BFE3C8 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-20 text-center">
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
