import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, Sun, HeartPulse, Sparkles, ArrowRight, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const Home = () => {
  const { t } = useLanguage();

  const services = [
    { icon: HomeIcon, ...t.servicesList.hebergement },
    { icon: Sun, ...t.servicesList.repitJour },
    { icon: Heart, ...t.servicesList.repitDomicile },
    { icon: HeartPulse, ...t.servicesList.repitResidence },
  ];

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
          style={{ backgroundImage: `url(${MEDIA.abstractBg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F6F0]/40 to-[#F9F6F0]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4F8A2D] bg-[#EAE4D3] rounded-full px-4 py-2"
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.8} /> {t.home.heroBadge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2C2C] leading-[1.08] mt-6"
            >
              {t.home.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-[#5C5C5C] leading-relaxed mt-6 max-w-xl"
            >
              {t.home.heroText}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-9"
            >
              <Link
                to="/services"
                data-testid="hero-explore-btn"
                className="inline-flex items-center gap-2 bg-[#4F8A2D] text-white hover:bg-[#3D6E22] rounded-full px-8 py-4 transition-colors font-semibold"
              >
                {t.cta.explore} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/don"
                data-testid="hero-donate-btn"
                className="inline-flex items-center gap-2 border-2 border-[#4F8A2D] text-[#4F8A2D] hover:bg-[#4F8A2D] hover:text-white rounded-full px-8 py-4 transition-colors font-semibold"
              >
                {t.cta.donate}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <img
              src={MEDIA.caregiverHands}
              alt="Accompagnement bienveillant"
              className="rounded-[2rem] w-full h-[380px] lg:h-[520px] object-cover shadow-[0_20px_60px_rgba(79,138,45,0.18)]"
            />
            <div className="absolute -bottom-6 -left-2 sm:left-6 bg-[#FAF9F6] rounded-3xl px-6 py-5 shadow-[0_12px_40px_rgba(79,138,45,0.15)] border border-[#D5D0C5] max-w-[230px]">
              <p className="font-serif text-2xl text-[#4F8A2D]">24h / 7j</p>
              <p className="text-sm text-[#5C5C5C] mt-1">Sécurité & accompagnement permanents</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DEVISE */}
      <section className="bg-[#4F8A2D] text-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D7E0C2] mb-6">{t.home.deviseLabel}</p>
          <Reveal>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-relaxed">{t.home.devise}</p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <Reveal className="max-w-2xl mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C]">{t.home.servicesTitle}</h2>
          <p className="text-lg text-[#5C5C5C] mt-4">{t.home.servicesSubtitle}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div
                data-testid={`home-service-card-${i}`}
                className="h-full bg-[#FAF9F6] rounded-3xl p-8 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(79,138,45,0.08)] hover:-translate-y-2 transition-transform duration-300"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EAE4D3] text-[#4F8A2D] mb-6">
                  <s.icon className="w-7 h-7" strokeWidth={1.6} />
                </span>
                <h3 className="font-serif text-xl text-[#2C2C2C] mb-3">{s.title}</h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MISSION TEASER */}
      <section className="bg-[#EAE4D3]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img
              src={MEDIA.smilingSeniors}
              alt="Moments de joie partagés"
              className="rounded-[2rem] w-full h-[360px] lg:h-[460px] object-cover shadow-[0_16px_50px_rgba(79,138,45,0.18)]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C]">{t.home.missionTeaserTitle}</h2>
            <p className="text-lg text-[#5C5C5C] leading-relaxed mt-6">{t.home.missionTeaserText}</p>
            <Link
              to="/a-propos"
              data-testid="home-about-link"
              className="inline-flex items-center gap-2 mt-8 text-[#4F8A2D] font-semibold hover:gap-3 transition-all"
            >
              {t.cta.learnMore} <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* DONATE BANNER */}
      <section className="relative overflow-hidden bg-[#E07A45] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl max-w-2xl">{t.home.donateBannerTitle}</h2>
            <p className="text-lg text-white/90 mt-4 max-w-xl">{t.home.donateBannerText}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/don"
              data-testid="banner-donate-btn"
              className="inline-flex items-center gap-2 bg-white text-[#C75F2E] hover:bg-[#F9F6F0] rounded-full px-9 py-4 transition-colors font-semibold whitespace-nowrap shadow-lg"
            >
              <Heart className="w-5 h-5" /> {t.cta.donate}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
