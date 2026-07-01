/**
 * Curated Unsplash imagery. URLs point at the Unsplash CDN with sizing params
 * (no API key ships to the browser). Attribution is required by the Unsplash
 * license and rendered in the hero credit / footer.
 */

function unsplash(id: string, w = 2000) {
  return `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const HERO_IMAGE = {
  src: unsplash("photo-1531259736756-6caccf485f81", 3840),
  credit: "Ken Theimer",
  creditUrl: "https://unsplash.com/@kentheimer",
};

export const CTA_IMAGE = {
  src: unsplash("photo-1508873699372-7aeab60b44ab", 2000),
  credit: "Dose Media",
  creditUrl: "https://unsplash.com/@dose",
};

export const STEP_IMAGE = {
  src: unsplash("photo-1616593772450-6220bc809944", 1400),
  credit: "Kelly Sikkema",
  creditUrl: "https://unsplash.com/@kellysikkema",
};

/** Example subjects for the "popular topics" showcase. */
export interface TopicCard {
  title: string;
  blurb: string;
  image: string;
  credit: string;
}

export const TOPIC_CARDS: TopicCard[] = [
  {
    title: "Programming",
    blurb: "From first loops to full apps",
    image: unsplash("photo-1515879218367-8466d910aaa4", 1000),
    credit: "Chris Ried",
  },
  {
    title: "Painting & Art",
    blurb: "Colour theory to finished pieces",
    image: unsplash("photo-1507010444286-828ea71bfac7", 1000),
    credit: "Jelleke Vanooteghem",
  },
  {
    title: "Mathematics",
    blurb: "Intuition before formulas",
    image: unsplash("photo-1585875350095-933e478b7e8e", 1000),
    credit: "Mason",
  },
  {
    title: "Music",
    blurb: "Theory, chords and practice",
    image: unsplash("photo-1510915361894-db8b60106cb1", 1000),
    credit: "Jefferson Santos",
  },
  {
    title: "Photography",
    blurb: "Light, composition and edit",
    image: unsplash("photo-1542038784456-1ea8e935640e", 1000),
    credit: "Reinhart Julian",
  },
  {
    title: "Languages",
    blurb: "Read, write and converse",
    image: unsplash("photo-1456513080510-7bf3a84b82f8", 1000),
    credit: "Aaron Burden",
  },
];
