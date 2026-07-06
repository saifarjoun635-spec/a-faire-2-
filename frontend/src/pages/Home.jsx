import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, Sun, HeartPulse, ArrowRight, Heart, HandHeart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const Home = () => {
  const { t } = useLanguage();

  const services = [
    { icon: HomeIcon, img: MEDIA.lobby2, ...t.servicesList.hebergement },
    { icon: Sun, img: MEDIA.elderlyDancing, ...t.servicesList.repitJour },
    { icon: Heart, img: MEDIA.homeCare, ...t.servicesList.repitDomicile },
    { icon: HeartPulse, img: MEDIA.smilingSeniors, ...t.servicesList.repitResidence },
  ];

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[86vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns"
          style={{ backgroundImage: `url(${MEDIA.heroNurse})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2415]/90 via-[#0C2415]/55 to-[#0C2415]/10" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24 lg:py-28 w-full">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white bg-[#E66C37] rounded-full px-4 py-2 shadow-lg"
            >
              <HandHeart className="w-4 h-4" strokeWidth={1.8} /> {t.home.heroBadge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mt-6"
            >
              {t.home.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/90 leading-relaxed mt-6 max-w-xl"
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
                className="inline-flex items-center gap-2 bg-[#E66C37] text-white hover:bg-[#C85526] rounded-full px-8 py-4 transition-colors font-semibold shadow-lg"
              >
                {t.cta.explore} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/don"
                data-testid="hero-donate-btn"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#135229] rounded-full px-8 py-4 transition-colors font-semibold"
              >
                {t.cta.donate}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="inline-flex items-center gap-5 mt-12 bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl px-6 py-4"
            >
              <p className="font-serif text-3xl text-white">24h / 7j</p>
              <p className="text-sm text-white/85 max-w-[200px]">{t.home.heroCardSub}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DEVISE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.homeCare})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#135229]/88" aria-hidden />
        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 py-20 text-center text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-[#BFE3C8] mb-6">{t.home.deviseLabel}</p>
          <Reveal>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-relaxed">{t.home.devise}</p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/75" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24">
          <Reveal className="max-w-2xl mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B2A20]">{t.home.servicesTitle}</h2>
            <p className="text-lg text-[#4B5A51] mt-4">{t.home.servicesSubtitle}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div
                  data-testid={`home-service-card-${i}`}
                  className="group h-full bg-white rounded-3xl overflow-hidden border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(28,116,59,0.18)] transition-all duration-300"
                >
                  <div className="h-44 overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" width="800" height="533" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E7F0E5] text-[#1C743B] mb-5 -mt-14 relative z-10 border-4 border-white shadow-md">
                      <s.icon className="w-6 h-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-serif text-xl text-[#1B2A20] mb-3">{s.title}</h3>
                    <p className="text-sm text-[#4B5A51] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION TEASER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.lobby2})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#E7F0E5]/90" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img
              src={MEDIA.seniorsTalking}
              alt="Moments de joie partagés"
              loading="lazy"
              width="1200"
              height="800"
              className="rounded-[2rem] w-full h-[360px] lg:h-[460px] object-cover shadow-[0_16px_50px_rgba(28,116,59,0.22)]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B2A20]">{t.home.missionTeaserTitle}</h2>
            <p className="text-lg text-[#4B5A51] leading-relaxed mt-6">{t.home.missionTeaserText}</p>
            <Link
              to="/a-propos"
              data-testid="home-about-link"
              className="inline-flex items-center gap-2 mt-8 text-[#1C743B] font-semibold hover:gap-3 transition-all"
            >
              {t.cta.learnMore} <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* DONATE BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.seniorsTalking})` }} aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C85526]/92 to-[#E66C37]/85" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl max-w-2xl">{t.home.donateBannerTitle}</h2>
            <p className="text-lg text-white/90 mt-4 max-w-xl">{t.home.donateBannerText}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/don"
              data-testid="banner-donate-btn"
              className="inline-flex items-center gap-2 bg-white text-[#C85526] hover:bg-[#FBF9F6] rounded-full px-9 py-4 transition-colors font-semibold whitespace-nowrap shadow-lg"
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
