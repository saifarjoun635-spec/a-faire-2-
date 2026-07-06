import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/residences", label: t.nav.residences },
    { to: "/a-propos", label: t.nav.about },
    { to: "/regions", label: t.nav.regions },
    { to: "/carrieres", label: t.nav.careers },
    { to: "/contact", label: t.nav.contact },
  ];

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl bg-[#FBF9F6]/85 border-b border-[#DBE4D8]/60"
      data-testid="main-navbar"
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" data-testid="navbar-logo">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1C743B] text-white">
            <Heart className="w-5 h-5" strokeWidth={1.8} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-sm sm:text-lg text-[#1B2A20] leading-tight">Groupe Havre d'Amour et de Paix</span>
            <span className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#4B5A51]">Ressource Intermédiaire • Répit</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.to === "/" ? "home" : l.to.replace("/", "")}`}
              className={({ isActive }) =>
                `font-body text-[14px] font-medium transition-colors ${
                  isActive ? "text-[#1C743B]" : "text-[#1B2A20] hover:text-[#1C743B]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            data-testid="lang-toggle-btn"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1B2A20] hover:text-[#1C743B] transition-colors border border-[#DBE4D8] rounded-full px-3 py-1.5"
          >
            <Globe className="w-4 h-4" strokeWidth={1.8} />
            {lang === "fr" ? "EN" : "FR"}
          </button>

          <Link
            to="/don"
            data-testid="nav-donate-btn"
            className="hidden sm:inline-flex bg-[#E66C37] text-white hover:bg-[#C85526] rounded-full px-5 py-2.5 transition-colors font-body font-semibold text-sm shadow-md"
          >
            {t.nav.donate}
          </Link>

          <button
            className="lg:hidden text-[#1B2A20]"
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[#DBE4D8]/60 bg-[#FBF9F6]" data-testid="mobile-menu">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-3 font-body font-medium text-base ${
                    isActive ? "text-[#1C743B]" : "text-[#1B2A20]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/don"
              className="mt-2 text-center bg-[#E66C37] text-white rounded-full px-5 py-3 font-semibold"
            >
              {t.nav.donate}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
