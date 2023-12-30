export const mediasType = [
  { name: "Select the link type", path: "" },
  { name: "Link", path: "" },
  {
    name: "WhatsApp",
    path: "https://api.whatsapp.com/send?phone=",
  },
  { name: "Instagram", path: "https://www.instagram.com/" },
  { name: "Facebook", path: "" },
  { name: "TikToc", path: "" },
  { name: "Email", path: "mailto:" },
  { name: "Phone", path: "tel:" },
];

export const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.05,
  speed: 2000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export const homeImagesCel = [
  {
    background: {
      first: "#0b89af",
      second: "#175a73",
      shadow: "#a5f3fc",
    },
    image: "/imageRe.png",
    title: "Renata Karolina",
    career: "Web Developer",
    nickname: "",
    buttons: {
      background: "#174a62",
      color: "#26c9ea",
      link: ["Web Design", "Portfolio", "Talk to me", "Instagram"],
    },
    icons: {
      containerBg: "#eab308",
      background: "#ffff",
      color: "#a16207",
    },
  },
  {
    background: {
      first: "#4d7c0f",
      second: "#14532d",
      shadow: "#a3e63550",
    },
    image: "/bodyform.png",
    title: "Body Form",
    career: "Bodybuilding Gym",
    nickname: "text-green-900",
    buttons: {
      background: "#d4d4d4",
      color: "#0a0a0a",
      link: ["Instagram", "App", "Localization", "WhatsApp"],
    },
    icons: {
      containerBg: "#fff2",
      background: "#3f6212",
      color: "#fff",
    },
  },
  {
    background: {
      first: "#422006",
      second: "#a16207",
      shadow: "#fcd34d50",
    },
    image: "/woman.jpg",
    title: "Julia Saith",
    career: "Interior Architect",
    nickname: "",
    buttons: {
      background: "#fef3c7",
      color: "#422006",
      link: ["Instagram", "Projects", "Blog and Books", "Contact"],
    },
    icons: {
      containerBg: "#fff2",
      background: "#a16207",
      color: "#fff",
    },
  },
];
