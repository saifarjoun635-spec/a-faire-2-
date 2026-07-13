import { useEffect } from "react";

/**
 * Lightweight SEO hook — updates <title>, meta description and canonical
 * on route change so each page has its own indexable metadata.
 */
export const useSEO = ({ title, description, path = "" }) => {
  useEffect(() => {
    const site = "Groupe Havre d'Amour et de Paix";
    if (title) document.title = `${title} | ${site}`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);

      let og = document.querySelector('meta[property="og:description"]');
      if (og) og.setAttribute("content", description);
    }

    const url = `https://havredamouretdepaix.ca${path || window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", url);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute("content", `${title} | ${site}`);
  }, [title, description, path]);
};
