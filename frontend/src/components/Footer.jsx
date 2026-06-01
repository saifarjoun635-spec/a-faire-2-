import React from "react";
import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { CONTACT_INFO } from "../constants/media";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { to: "/services", label: t.nav.services },
    { to: "/residences", label: t.nav.residences },
    { to: "/a-propos", label: t.nav.about },
    { to: "/regions", label: t.nav.regions },
    { to: "/carrieres", label: t.nav.careers },
    { to: "/don", label: t.nav.donate },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-[#2C2C2C] text-[#EAE4D3]" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#4F8A2D] text-white">
              <Heart className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <span className="font-serif text-xl text-white">Havre d'Amour et de Paix</span>
          </div>
          <p className="text-sm leading-relaxed text-[#C9C3B4] max-w-xs">{t.footer.mission}</p>
        </div>

        <div>
          <h4 className="font-serif text-lg text-white mb-5">{t.footer.quickLinks}</h4>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-[#C9C3B4] hover:text-[#E07A45] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-white mb-5">{t.footer.contact}</h4>
          <ul className="space-y-4 text-sm text-[#C9C3B4]">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-[#E07A45]" strokeWidth={1.8} />
              <a href={CONTACT_INFO.phoneHref} className="hover:text-white transition-colors">
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-[#E07A45]" strokeWidth={1.8} />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                {CONTACT_INFO.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-[#E07A45]" strokeWidth={1.8} />
              <span>{t.contact.addressValue}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 text-center text-xs text-[#9A9484]">
          © {new Date().getFullYear()} {t.org} inc. — {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
