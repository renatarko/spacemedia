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
      first: "from-blue-600",
      second: "to-blue-800",
      shadow: "shadow-cyan-200",
    },
    image: "/imageRe.png",
    title: "Renata Karolina",
    career: "Web Developer",
    nickname: "",
    buttons: {
      background: "bg-blue-900",
      color: "text-white",
      link: ["Web Design", "Portfolio", "Talk to me", "Instagram"],
    },
    icons: {
      containerBg: "bg-yellow-500",
      background: "bg-white",
      color: "text-yellow-700",
    },
  },
  {
    background: {
      first: "from-green-700",
      second: "to-green-900",
      shadow: "shadow-green-300",
    },
    image: "/bodyform.png",
    title: "Body Form",
    career: "Bodybuilding Gym",
    nickname: "text-green-900",
    buttons: {
      background: "bg-gray-300",
      color: "",
      link: ["Instagram", "App", "Localization", "WhatsApp"],
    },
    icons: {
      containerBg: "bg-white/20 backdrop-blur-sm ",
      background: "bg-green-800",
      color: "text-white",
    },
  },
  {
    background: {
      first: "from-yellow-950",
      second: "to-yellow-700",
      shadow: "shadow-amber-300",
    },
    image: "/woman.jpg",
    title: "Julia Saith",
    career: "Interior Architect",
    nickname: "",
    buttons: {
      background: "bg-amber-100",
      color: "text-yellow-950",
      link: ["Instagram", "Projects", "Blog and Books", "Contact"],
    },
    icons: {
      containerBg: "bg-white/20 backdrop-blur-sm ",
      background: "bg-yellow-700",
      color: "text-white",
    },
  },
];
