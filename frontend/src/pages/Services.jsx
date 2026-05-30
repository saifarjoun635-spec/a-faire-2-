import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Sun, HeartPulse, Heart, Check, Utensils, HeartHandshake, Music, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MEDIA } from "../constants/media";
import { Reveal } from "../components/Reveal";

const PageHeader = ({ title, subtitle, image }) => (
  <section className="relative overflow-hidden bg-[#556B2F]">
    {image && (
      <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${image})` }} aria-hidden />
    )}
    <div className="absolute inset-0 bg-[#556B2F]/70" aria-hidden />
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
    className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(85,107,47,0.08)]"
  >
    <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAE4D3] text-[#556B2F]">
        <Icon className="w-6 h-6" strokeWidth={1.6} />
      </span>
      <h3 className="font-serif text-2xl text-[#2C2C2C]">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-[#5C5C5C]">
          <Check className="w-5 h-5 text-[#556B2F] mt-0.5 shrink-0" strokeWidth={2} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Services = () => {
  const { t } = useLanguage();
  const sl = t.servicesList;

  const mainServices = [
    { icon: HomeIcon, ...sl.hebergement },
    { icon: Sun, ...sl.repitJour },
    { icon: Heart, ...sl.repitDomicile },
    { icon: HeartPulse, ...sl.repitResidence },
  ];

  return (
    <div data-testid="services-page">
      <PageHeader title={sl.title} subtitle={sl.subtitle} image={MEDIA.lobby1} />

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {mainServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="h-full bg-[#FAF9F6] rounded-3xl p-8 border border-[#D5D0C5] shadow-[0_8px_30px_rgba(85,107,47,0.08)] hover:-translate-y-1.5 transition-transform duration-300">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#556B2F] text-white mb-5">
                  <s.icon className="w-7 h-7" strokeWidth={1.6} />
                </span>
                <h3 className="font-serif text-2xl text-[#2C2C2C] mb-3">{s.title}</h3>
                <p className="text-[#5C5C5C] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#EAE4D3]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid lg:grid-cols-2 gap-8">
          <Reveal><ListBlock icon={Utensils} title={sl.everydayTitle} items={sl.everyday} testid="block-everyday" /></Reveal>
          <Reveal delay={0.1}><ListBlock icon={HeartHandshake} title={sl.careTitle} items={sl.care} testid="block-care" /></Reveal>
          <Reveal><ListBlock icon={Music} title={sl.leisureTitle} items={sl.leisure} testid="block-leisure" /></Reveal>
          <Reveal delay={0.1}><ListBlock icon={Users} title={sl.clientTitle} items={sl.clients} testid="block-clients" /></Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-20 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C]">{t.contact.subtitle}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/contact" className="bg-[#556B2F] text-white hover:bg-[#425622] rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.contact}
            </Link>
            <Link to="/don" className="border-2 border-[#C8795A] text-[#C8795A] hover:bg-[#C8795A] hover:text-white rounded-full px-8 py-4 font-semibold transition-colors">
              {t.cta.donate}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;
