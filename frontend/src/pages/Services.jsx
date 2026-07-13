import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Sun, HeartPulse, Heart, Check, Utensils, HeartHandshake, Music, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";

const PageHeader = ({ title, subtitle }) => (
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
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="text-lg text-white/90 mt-5 max-w-2xl">{subtitle}</p>}
      </Reveal>
    </div>
  </section>
);

const ListBlock = ({ icon: Icon, title, items, testid }) => (
  <div
    data-testid={testid}
    className="bg-white rounded-3xl p-8 border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)]"
  >
    <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E7F0E5] text-[#1C743B]">
        <Icon className="w-6 h-6" strokeWidth={1.6} />
      </span>
      <h3 className="font-serif text-2xl text-[#1B2A20]">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-[#4B5A51]">
          <Check className="w-5 h-5 text-[#1C743B] mt-0.5 shrink-0" strokeWidth={2} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Services = () => {
  const { t } = useLanguage();
  const sl = t.servicesList;
  useSEO({
    title: "Services — Hébergement RI, Répit centre de jour & à domicile",
    description:
      "Nos services : hébergement en Ressource Intermédiaire (RI), répit au centre de jour, répit à domicile et répit en résidence pour aînés, DI-TSA et santé mentale.",
    path: "/services",
  });

  const mainServices = [
    { icon: HomeIcon, img: MEDIA.lobby1, ...sl.hebergement },
    { icon: Sun, img: MEDIA.elderlyDancing, ...sl.repitJour },
    { icon: Heart, img: MEDIA.childRespite, ...sl.repitDomicile },
    { icon: HeartPulse, img: MEDIA.smilingSeniors, ...sl.repitResidence },
  ];

  return (
    <div data-testid="services-page">
      <PageHeader title={sl.title} subtitle={sl.subtitle} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${MEDIA.softLight})` }} aria-hidden />
        <div className="absolute inset-0 bg-[#FBF9F6]/55" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-6">
            {mainServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group h-full bg-white rounded-3xl overflow-hidden border border-[#DBE4D8] shadow-[0_8px_30px_rgba(28,116,59,0.10)] hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(28,116,59,0.18)] transition-all duration-300">
                  <div className="h-52 overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" width="1200" height="800" className="h-full w-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1C743B] text-white mb-5 -mt-16 relative z-10 border-4 border-white shadow-md">
                      <s.icon className="w-7 h-7" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-serif text-2xl text-[#1B2A20] mb-3">{s.title}</h3>
                    <p className="text-[#4B5A51] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FBF9F6]">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-8">
          <Reveal><ListBlock icon={Utensils} title={sl.everydayTitle} items={sl.everyday} testid="block-everyday" /></Reveal>
          <Reveal delay={0.1}><ListBlock icon={HeartHandshake} title={sl.careTitle} items={sl.care} testid="block-care" /></Reveal>
          <Reveal><ListBlock icon={Music} title={sl.leisureTitle} items={sl.leisure} testid="block-leisure" /></Reveal>
          <Reveal delay={0.1}><ListBlock icon={Users} title={sl.clientTitle} items={sl.clients} testid="block-clients" /></Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-20 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2A20]">{t.contact.subtitle}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/contact" className="bg-[#1C743B] text-white hover:bg-[#135229] rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.contact}
            </Link>
            <Link to="/don" className="border-2 border-[#AD4A1F] text-[#AD4A1F] hover:bg-[#AD4A1F] hover:text-white rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.donate}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;
