// Per-page decorative background graphics. Renders a fixed, non-interactive
// layer at z-index -1 so it sits behind all page content but above the body
// canvas. Each variant uses distinct mutual-fund / finance themed SVGs so
// every page has its own visual identity.

type Variant =
  | "home"
  | "blogs"
  | "blog-post"
  | "services"
  | "resources"
  | "about"
  | "contact"
  | "amc"
  | "account"
  | "admin";

const svg = (markup: string) =>
  `url("data:image/svg+xml;utf8,${markup.replace(/"/g, "'").replace(/#/g, "%23").replace(/\n/g, "")}")`;

// Shared color helpers (semantic green tokens, encoded for data URLs).
const G_DARK = "hsl(152 55%25 30%25)";
const G_MID = "hsl(148 55%25 45%25)";
const G_SOFT = "hsl(152 40%25 40%25)";

// SVG library ---------------------------------------------------------------
const lineChart = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='520' height='320' viewBox='0 0 520 320'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' opacity='0.22'><polyline points='20,260 90,220 160,235 230,170 300,190 370,120 440,140 500,60'/><circle cx='90' cy='220' r='4' fill='${G_DARK}'/><circle cx='230' cy='170' r='4' fill='${G_DARK}'/><circle cx='370' cy='120' r='4' fill='${G_DARK}'/><circle cx='500' cy='60' r='5' fill='${G_DARK}'/><path d='M485 75 L500 60 L500 82' stroke-width='2.5'/></g></svg>`,
);
const bars = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='260' viewBox='0 0 320 260'><g fill='${G_MID}' opacity='0.22'><rect x='30' y='170' width='36' height='60' rx='3'/><rect x='86' y='130' width='36' height='100' rx='3'/><rect x='142' y='95' width='36' height='135' rx='3'/><rect x='198' y='60' width='36' height='170' rx='3'/><rect x='254' y='30' width='36' height='200' rx='3'/></g><g fill='none' stroke='${G_DARK}' stroke-width='1.5' opacity='0.28'><line x1='20' y1='240' x2='310' y2='240'/></g></svg>`,
);
const rupeeCoin = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g opacity='0.22'><circle cx='90' cy='90' r='58' fill='none' stroke='${G_DARK}' stroke-width='3'/><circle cx='90' cy='90' r='48' fill='none' stroke='${G_DARK}' stroke-width='1.2'/><text x='90' y='112' font-family='Georgia, serif' font-size='58' font-weight='700' fill='${G_DARK}' text-anchor='middle'>₹</text></g></svg>`,
);
const donut = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g opacity='0.22' transform='translate(100 100)'><circle r='70' fill='none' stroke='${G_DARK}' stroke-width='24' stroke-dasharray='120 320' transform='rotate(-90)'/><circle r='70' fill='none' stroke='${G_MID}' stroke-width='24' stroke-dasharray='80 320' stroke-dashoffset='-120' transform='rotate(-90)'/><circle r='70' fill='none' stroke='${G_SOFT}' stroke-width='24' stroke-dasharray='60 320' stroke-dashoffset='-200' transform='rotate(-90)'/></g></svg>`,
);
const candlestick = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='240' viewBox='0 0 360 240'><g opacity='0.22' stroke='${G_DARK}' stroke-width='2'><line x1='30' y1='40' x2='30' y2='200'/><rect x='20' y='90' width='20' height='70' fill='${G_MID}'/><line x1='80' y1='60' x2='80' y2='210'/><rect x='70' y='110' width='20' height='60' fill='none'/><line x1='130' y1='30' x2='130' y2='180'/><rect x='120' y='60' width='20' height='90' fill='${G_MID}'/><line x1='180' y1='70' x2='180' y2='220'/><rect x='170' y='120' width='20' height='70' fill='none'/><line x1='230' y1='20' x2='230' y2='170'/><rect x='220' y='40' width='20' height='100' fill='${G_MID}'/><line x1='280' y1='50' x2='280' y2='200'/><rect x='270' y='80' width='20' height='90' fill='${G_MID}'/><line x1='330' y1='10' x2='330' y2='150'/><rect x='320' y='30' width='20' height='90' fill='${G_MID}'/></g></svg>`,
);
const growthArrow = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><g fill='none' stroke='${G_DARK}' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' opacity='0.22'><path d='M40 240 L120 160 L180 200 L260 60'/><path d='M220 60 L260 60 L260 100'/></g></svg>`,
);
const bookOpen = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='200' viewBox='0 0 260 200'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' opacity='0.22'><path d='M20 40 Q80 20 130 40 Q180 20 240 40 L240 170 Q180 150 130 170 Q80 150 20 170 Z'/><line x1='130' y1='40' x2='130' y2='170'/><line x1='50' y1='70' x2='105' y2='63'/><line x1='50' y1='95' x2='105' y2='88'/><line x1='50' y1='120' x2='105' y2='113'/><line x1='155' y1='63' x2='210' y2='70'/><line x1='155' y1='88' x2='210' y2='95'/><line x1='155' y1='113' x2='210' y2='120'/></g></svg>`,
);
const playBubble = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g opacity='0.22'><circle cx='100' cy='100' r='70' fill='none' stroke='${G_DARK}' stroke-width='3'/><polygon points='85,70 85,130 140,100' fill='${G_MID}'/></g></svg>`,
);
const quoteMarks = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='180' viewBox='0 0 240 180'><g fill='${G_DARK}' opacity='0.18' font-family='Georgia, serif' font-size='180' font-weight='700'><text x='0' y='150'>“</text><text x='140' y='150'>”</text></g></svg>`,
);
const gear = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><circle cx='110' cy='110' r='40'/><g><rect x='103' y='20' width='14' height='30' rx='2' fill='${G_DARK}'/><rect x='103' y='170' width='14' height='30' rx='2' fill='${G_DARK}'/><rect x='20' y='103' width='30' height='14' rx='2' fill='${G_DARK}'/><rect x='170' y='103' width='30' height='14' rx='2' fill='${G_DARK}'/><rect x='40' y='40' width='14' height='30' rx='2' fill='${G_DARK}' transform='rotate(-45 47 55)'/><rect x='166' y='40' width='14' height='30' rx='2' fill='${G_DARK}' transform='rotate(45 173 55)'/><rect x='40' y='150' width='14' height='30' rx='2' fill='${G_DARK}' transform='rotate(45 47 165)'/><rect x='166' y='150' width='14' height='30' rx='2' fill='${G_DARK}' transform='rotate(-45 173 165)'/></g></g></svg>`,
);
const shield = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='240' viewBox='0 0 200 240'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><path d='M100 20 L180 50 L180 130 Q180 190 100 220 Q20 190 20 130 L20 50 Z'/><polyline points='65,120 90,145 140,90' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/></g></svg>`,
);
const briefcase = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='200' viewBox='0 0 240 200'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><rect x='20' y='60' width='200' height='120' rx='8'/><path d='M90 60 L90 40 Q90 30 100 30 L140 30 Q150 30 150 40 L150 60'/><line x1='20' y1='115' x2='220' y2='115'/><rect x='105' y='105' width='30' height='20' rx='3' fill='${G_MID}'/></g></svg>`,
);
const document = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='240' viewBox='0 0 200 240'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' opacity='0.22'><path d='M40 20 L130 20 L170 60 L170 220 L40 220 Z'/><path d='M130 20 L130 60 L170 60'/><line x1='60' y1='90' x2='150' y2='90'/><line x1='60' y1='115' x2='150' y2='115'/><line x1='60' y1='140' x2='150' y2='140'/><line x1='60' y1='165' x2='120' y2='165'/></g></svg>`,
);
const download = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g fill='none' stroke='${G_DARK}' stroke-width='3' stroke-linecap='round' opacity='0.22'><line x1='90' y1='30' x2='90' y2='120'/><polyline points='55,90 90,125 125,90'/><path d='M30 140 L30 155 L150 155 L150 140'/></g></svg>`,
);
const people = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='180' viewBox='0 0 260 180'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' opacity='0.22'><circle cx='70' cy='55' r='22'/><path d='M30 150 Q30 100 70 100 Q110 100 110 150'/><circle cx='190' cy='55' r='22'/><path d='M150 150 Q150 100 190 100 Q230 100 230 150'/><circle cx='130' cy='45' r='26'/><path d='M85 155 Q85 95 130 95 Q175 95 175 155'/></g></svg>`,
);
const target = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><circle cx='100' cy='100' r='80'/><circle cx='100' cy='100' r='55'/><circle cx='100' cy='100' r='30'/><circle cx='100' cy='100' r='8' fill='${G_DARK}'/><path d='M100 100 L170 30' stroke-width='3'/><polygon points='160,30 170,30 170,40' fill='${G_DARK}'/></g></svg>`,
);
const envelope = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='180' viewBox='0 0 260 180'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><rect x='20' y='30' width='220' height='130' rx='6'/><polyline points='20,40 130,110 240,40'/></g></svg>`,
);
const chatBubble = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='200' viewBox='0 0 220 200'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><path d='M20 30 Q20 15 35 15 L165 15 Q180 15 180 30 L180 110 Q180 125 165 125 L80 125 L50 160 L50 125 L35 125 Q20 125 20 110 Z'/><circle cx='70' cy='70' r='5' fill='${G_DARK}'/><circle cx='100' cy='70' r='5' fill='${G_DARK}'/><circle cx='130' cy='70' r='5' fill='${G_DARK}'/></g></svg>`,
);
const phone = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><path d='M40 30 Q30 30 30 45 L30 65 Q60 75 75 105 Q75 120 65 130 Q80 155 105 165 Q115 155 130 155 Q160 170 170 140 L170 120 Q170 110 160 110 Q140 110 130 100'/></g></svg>`,
);
const building = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='260' viewBox='0 0 240 260'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' opacity='0.22'><rect x='30' y='60' width='80' height='180'/><rect x='120' y='30' width='90' height='210'/><g fill='${G_DARK}'><rect x='45' y='80' width='15' height='15'/><rect x='80' y='80' width='15' height='15'/><rect x='45' y='110' width='15' height='15'/><rect x='80' y='110' width='15' height='15'/><rect x='45' y='140' width='15' height='15'/><rect x='80' y='140' width='15' height='15'/><rect x='45' y='170' width='15' height='15'/><rect x='80' y='170' width='15' height='15'/><rect x='135' y='50' width='18' height='18'/><rect x='175' y='50' width='18' height='18'/><rect x='135' y='85' width='18' height='18'/><rect x='175' y='85' width='18' height='18'/><rect x='135' y='120' width='18' height='18'/><rect x='175' y='120' width='18' height='18'/><rect x='135' y='155' width='18' height='18'/><rect x='175' y='155' width='18' height='18'/><rect x='135' y='190' width='18' height='18'/><rect x='175' y='190' width='18' height='18'/></g></g></svg>`,
);
const portfolio = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='220' viewBox='0 0 260 220'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' opacity='0.22'><rect x='20' y='20' width='100' height='80' rx='4'/><rect x='140' y='20' width='100' height='80' rx='4'/><rect x='20' y='120' width='100' height='80' rx='4'/><rect x='140' y='120' width='100' height='80' rx='4'/></g><g fill='${G_MID}' opacity='0.28'><circle cx='70' cy='60' r='22'/><rect x='160' y='40' width='60' height='10'/><rect x='160' y='60' width='40' height='10'/><polyline points='30,180 55,160 80,170 110,140' fill='none' stroke='${G_DARK}' stroke-width='2.5'/><rect x='155' y='185' width='10' height='5'/><rect x='170' y='170' width='10' height='20'/><rect x='185' y='155' width='10' height='35'/><rect x='200' y='140' width='10' height='50'/><rect x='215' y='125' width='10' height='65'/></g></svg>`,
);
const wallet = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='180' viewBox='0 0 240 180'><g fill='none' stroke='${G_DARK}' stroke-width='3' opacity='0.22'><rect x='20' y='30' width='200' height='130' rx='10'/><path d='M20 60 L180 60 L180 30' fill='${G_MID}' opacity='0.4'/><circle cx='180' cy='95' r='10' fill='${G_DARK}'/></g></svg>`,
);
const dashboard = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='200' viewBox='0 0 260 200'><g fill='none' stroke='${G_DARK}' stroke-width='2.5' opacity='0.22'><rect x='20' y='20' width='220' height='160' rx='6'/><line x1='20' y1='50' x2='240' y2='50'/><rect x='40' y='70' width='90' height='90' rx='4'/><rect x='150' y='70' width='70' height='40' rx='4'/><rect x='150' y='120' width='70' height='40' rx='4'/><polyline points='50,140 70,110 90,125 120,85'/></g></svg>`,
);

const variants: Record<Variant, { images: string; positions: string; sizes: string }> = {
  home: {
    images: `${lineChart}, ${growthArrow}, ${rupeeCoin}, ${donut}`,
    positions: `right -30px top 60px, left -20px bottom 80px, right 6% bottom 10%, left 8% top 42%`,
    sizes: `520px 320px, 300px 300px, 180px 180px, 200px 200px`,
  },
  blogs: {
    images: `${bookOpen}, ${playBubble}, ${quoteMarks}, ${lineChart}`,
    positions: `left -20px top 80px, right -20px top 120px, left 10% bottom 12%, right 6% bottom 8%`,
    sizes: `260px 200px, 200px 200px, 240px 180px, 380px 240px`,
  },
  "blog-post": {
    images: `${quoteMarks}, ${bookOpen}, ${document}`,
    positions: `left -30px top 100px, right -30px bottom 120px, right 5% top 40%`,
    sizes: `240px 180px, 260px 200px, 200px 240px`,
  },
  services: {
    images: `${briefcase}, ${gear}, ${shield}, ${bars}`,
    positions: `left -20px top 90px, right -30px top 140px, right 6% bottom 12%, left 8% bottom 8%`,
    sizes: `240px 200px, 220px 220px, 200px 240px, 320px 260px`,
  },
  resources: {
    images: `${document}, ${download}, ${bookOpen}, ${gear}`,
    positions: `left -20px top 80px, right -20px top 120px, left 10% bottom 10%, right 8% bottom 12%`,
    sizes: `200px 240px, 180px 180px, 260px 200px, 200px 200px`,
  },
  about: {
    images: `${people}, ${target}, ${shield}, ${growthArrow}`,
    positions: `left -30px top 100px, right -20px top 120px, left 8% bottom 12%, right 8% bottom 10%`,
    sizes: `260px 180px, 200px 200px, 180px 220px, 260px 260px`,
  },
  contact: {
    images: `${envelope}, ${chatBubble}, ${phone}`,
    positions: `left -30px top 100px, right -20px top 140px, right 10% bottom 15%`,
    sizes: `260px 180px, 220px 200px, 180px 180px`,
  },
  amc: {
    images: `${building}, ${portfolio}, ${donut}`,
    positions: `left -20px bottom 60px, right -30px top 100px, left 12% top 45%`,
    sizes: `240px 260px, 260px 220px, 180px 180px`,
  },
  account: {
    images: `${wallet}, ${donut}, ${bars}, ${rupeeCoin}`,
    positions: `left -20px top 100px, right -20px top 120px, left 8% bottom 12%, right 8% bottom 10%`,
    sizes: `240px 180px, 200px 200px, 280px 230px, 160px 160px`,
  },
  admin: {
    images: `${dashboard}, ${candlestick}, ${bars}`,
    positions: `left -20px top 100px, right -30px top 140px, left 10% bottom 10%`,
    sizes: `260px 200px, 320px 220px, 280px 230px`,
  },
};

interface Props {
  variant: Variant;
}

export const PageBackground = ({ variant }: Props) => {
  const v = variants[variant];
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "hsl(var(--background))",
        backgroundImage: `${v.images}, radial-gradient(circle at 12% 20%, hsl(148 55% 90% / 0.55), transparent 45%), radial-gradient(circle at 88% 78%, hsl(152 55% 88% / 0.45), transparent 50%)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${v.positions}, 0 0, 0 0`,
        backgroundSize: `${v.sizes}, auto, auto`,
      }}
    />
  );
};

export default PageBackground;
