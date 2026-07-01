/**
 * Curated Unsplash imagery. URLs point at the Unsplash CDN with sizing params
 * (no API key ships to the browser). Attribution is required by the Unsplash
 * license and rendered in the footer / hero credit.
 */

function unsplash(id: string, w = 2400) {
  return `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const HERO_IMAGE = {
  src: unsplash("photo-1621619856624-42fd193a0661"),
  credit: "Milad Fakurian",
  creditUrl: "https://unsplash.com/@fakurian",
};

export const CTA_IMAGE = {
  src: unsplash("photo-1516422821770-ee3c71d84383", 2000),
  credit: "Julien de Salaberry",
  creditUrl: "https://unsplash.com/@juliendesalaberry",
};
