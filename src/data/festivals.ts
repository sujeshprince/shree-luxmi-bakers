import type { Festival } from "@/types";

/** Indian festival gifting themes. Recurring occasions — no invented dates. */

export const festivals: Festival[] = [
  {
    id: "diwali",
    name: "Diwali",
    tagline: "Light up every home",
    description:
      "Dry-fruit towers, kaju katli boxes and chocolate hampers wrapped in festive gold.",
    image: "/images/festivals/diwali.jpg",
    accent: "#D4AF37",
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    tagline: "A bond, boxed in sweetness",
    description:
      "Rakhi-ready sweet boxes with chocolates and mithai for brothers and sisters.",
    image: "/images/festivals/raksha-bandhan.jpg",
    accent: "#C86B4A",
  },
  {
    id: "holi",
    name: "Holi",
    tagline: "Colours & gujiya",
    description:
      "Fresh gujiya, thandai fudge and festive combos made for colourful gatherings.",
    image: "/images/festivals/holi.jpg",
    accent: "#C05B7A",
  },
  {
    id: "christmas",
    name: "Christmas",
    tagline: "Warm bakes, merry hearts",
    description:
      "Plum cakes, gingerbread, plum pudding and gift tins for the holiday table.",
    image: "/images/festivals/christmas.jpg",
    accent: "#2F6B4F",
  },
  {
    id: "valentines",
    name: "Valentine's Day",
    tagline: "Sweet nothings, made edible",
    description:
      "Heart-shaped cakes, chocolate boxes and dessert dates for your person.",
    image: "/images/festivals/valentines.jpg",
    accent: "#B33A5B",
  },
  {
    id: "eid",
    name: "Eid",
    tagline: "Sheer khurma & more",
    description:
      "Khurma, baklava-style sweets and elegant boxes for festive gifting.",
    image: "/images/festivals/eid.jpg",
    accent: "#3E7C6B",
  },
  {
    id: "new-year",
    name: "New Year",
    tagline: "Ring it in deliciously",
    description:
      "Countdown cakes, party hampers and bite-size treats for the celebration.",
    image: "/images/festivals/new-year.jpg",
    accent: "#8C6D46",
  },
];
