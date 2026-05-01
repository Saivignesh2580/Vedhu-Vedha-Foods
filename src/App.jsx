import { useState, useEffect } from "react";
import Avakaya from "./assets/Avakaya.jpeg";
import Chilli from "./assets/Chilli.jpeg";
import Ghee from "./assets/Ghee.jpeg";
import Cashew from "./assets/Cashew.jpeg";
import Turmeric from "./assets/Turmeric.jpeg";
import Home_page_banner from "./assets/Home_page_banner.png";
import About_page_banner from "./assets/About_page_banner1.png";
import About_page_banner2 from "./assets/About_page_banner2.png";
import ingre_cachew from "./assets/Ingredients_cashew.png";
import ingre_mango from "./assets/Ingredients_mango.png";
import ingre_mirchi from "./assets/Ingredients_mirchi.png";
import ingre_ghee from "./assets/Ingredients_ghee.png";
import Tomoto from "./assets/Tomoto pickle.jpeg";
import Trchilli from "./assets/Traditional Chilli.jpeg";
import RoastedCachew from "./assets/Roasted Cashew.jpeg";
import Laddu from "./assets/Laddu.jpeg";
import Murukku from "./assets/Murukku.jpeg";
import Chegodilu from "./assets/Chegodilu.png";
import G1 from "./assets/G1.png";
import G2 from "./assets/G2.png";
import G3 from "./assets/G3.png";
import G4 from "./assets/G4.jpeg";

export const IMAGES = {
  avakaya: Avakaya,
  chilli: Chilli,
  ghee: Ghee,
  cashew: Cashew,
  turmeric: Turmeric,
  banner: Home_page_banner,
  tomoto: Tomoto,
  trchilli: Trchilli,
  roastedCachew: RoastedCachew,
  laddu: Laddu,
  murukku: Murukku,
  chegodilu: Chegodilu
};
const WA_BASE = "https://wa.me/919989123535?text=";
const WA_ORDER = WA_BASE + encodeURIComponent("Namaste! I would like to order Vedhu & Vedha home foods.");
const WA_PRODUCT = (name) => WA_BASE + encodeURIComponent(`Namaste! I would like to order: ${name} from Vedhu & Vedha Home Foods.`);

const PRODUCTS = [
  { id:1, category:"Pickles", image: IMAGES.avakaya, name:"Ulavapadu Avakaya", telugu:"అసలైన ఉలవపాడు ఆవకాయ", short:"Mango and regional varieties with rich homemade spice balance. Prepared using premium mangoes grown in Ulapadu.", desc:"Prepared using premium raw mangoes handpicked from Ulapadu farms, blended with traditional Guntur chilli powder, mustard seeds, and cold-pressed gingelly oil. Every batch is hand-mixed and sun-cured for authentic Andhra flavour.", ingredients:"Ulapadu Mangoes, Guntur Chillies, Mustard, Cold-pressed Gingelly Oil", tags:["Handmade","Traditional","Ulapadu Special"], prices:{"250g":"₹199","500g":"₹380","1kg":"₹720"}, seed:"avakaya_mango_pickle", spice:4, sour:4 },
  { id:2, category:"Masalas", image: IMAGES.chilli, name:"Guntur Chilli Powder", telugu:"గుంటూరు మిర్చి పొడి", short:"Prepared from high-grade handpicked Guntur chillies sourced from Repalle village.", desc:"Our Guntur chilli powder is stone-ground from premium variety dried red chillies sourced from the volcanic-mineral-rich soils of Repalle. No artificial colours, no additives — pure and bold.", ingredients:"Guntur Red Chillies (Repalle Variety), Rock Salt", tags:["Stone Ground","No Additives","Repalle Farm"], prices:{"100g":"₹89","250g":"₹199","500g":"₹370"}, seed:"red_chilli_powder_bowl", spice:5, sour:0 },
  { id:3, category:"Masalas", image: IMAGES.turmeric, name:"Turmeric Powder", telugu:"పసుపు పొడి", short:"Pure, aromatic turmeric powder suitable for daily cooking, processed naturally.", desc:"Farm-fresh turmeric rhizomes sun-dried and stone-milled to a vibrant golden powder. Rich in curcumin, deeply aromatic, free from any synthetic colour or preservatives.", ingredients:"Pure Turmeric Rhizomes", tags:["Pure","Sun-dried","Stone-milled"], prices:{"100g":"₹69","250g":"₹149","500g":"₹280"}, seed:"turmeric_powder_golden", spice:1, sour:0 },
  { id:4, category:"Masalas", image: IMAGES.trchilli, name:"Traditional Karapu Podi", telugu:"సాంప్రదాయ కారప్ పొడి", short:"Traditional spicy podi blend for rice, idli, and dosa. The soul of an Andhra breakfast.", desc:"A signature Andhra-style spice blend made with roasted lentils, sesame, dried chillies, and garlic — to be mixed with ghee or gingelly oil and served with hot rice or crispy dosas.", ingredients:"Roasted Chana Dal, Urad Dal, Sesame, Guntur Chilli, Garlic, Cumin, Salt", tags:["Andhra Style","No Preservatives","Breakfast Staple"], prices:{"150g":"₹119","300g":"₹220"}, seed:"andhra_karapu_podi", spice:4, sour:0 },
  { id:6, category:"Pickles", image: IMAGES.tomoto,  name:"Tomato Pachadi", telugu:"టమాటా పచ్చడి", short:"Tangy, hot and sour Andhra-style tomato pickle that wakes up your senses.", desc:"Ripened country tomatoes slow-cooked with tamarind, chilli, and tempering — a beloved Andhra preparation that pairs perfectly with idli, dosa, or plain rice.", ingredients:"Country Tomatoes, Tamarind, Guntur Chilli, Mustard, Curry Leaves, Oil, Salt", tags:["Slow Cooked","Tangy","Traditional"], prices:{"250g":"₹159","500g":"₹299"}, seed:"tomato_pickle_andhra", spice:3, sour:4 },
  { id:7, category:"Cashews", image: IMAGES.roastedCachew, name:"Drum Roasted Cashews", telugu:"డ్రమ్ రోస్టెడ్ జీడిపప్పు", short:"Traditional drum-roasted Vetapalem cashews — extra crispy, deep flavor, zero preservatives.", desc:"Sourced from Vetapalem's renowned cashew farms and roasted the old way — in a large revolving drum over high heat. This method draws out moisture and creates an irresistible crunch.", ingredients:"Premium Vetapalem Cashew Kernels, Himalayan Pink Salt", tags:["Drum Roasted","Vetapalem Origin","Extra Crispy"], prices:{"250g":"₹299","500g":"₹560","1kg":"₹1080"}, seed:"cashew_nuts_roasted_bowl", spice:0, sour:0 },
  { id:9, category:"Dairy", image: IMAGES.ghee, name:"Pure Village Ghee", telugu:"స్వచ్ఛమైన పల్లె నెయ్యి", short:"Slow-heated pure ghee from fresh butter (venna) sourced from village dairy vendors.", desc:"Prepared from freshly churned butter collected from local village dairy households, slow-heated in a traditional vessel over a wood fire. Deeply aromatic, golden, and nutty.", ingredients:"Pure Cow's Butter (Village Dairy), No Additives", tags:["Wood-fire Prepared","Village Dairy","100% Pure"], prices:{"250ml":"₹349","500ml":"₹650","1L":"₹1250"}, seed:"pure_ghee_jar_golden", spice:0, sour:0 },
  { id:10, category:"Sweets", image: IMAGES.laddu, name:"Bellam Laddu", telugu:"బెల్లం లడ్డూ", short:"Traditional jaggery laddus made with roasted gram flour and village jaggery.", desc:"These laddus are made the old-fashioned way — roasted besan, grated village jaggery, ghee, and a hint of cardamom, rolled by hand. A festival staple in every Andhra home.", ingredients:"Besan (Roasted), Village Jaggery, Pure Ghee, Cardamom", tags:["No Refined Sugar","Festival Sweet","Handrolled"], prices:{"250g":"₹219","500g":"₹409"}, seed:"besan_laddu_jaggery", spice:0, sour:0 },
  { id:11, category:"Snacks", image: IMAGES.chegodilu, name:"Chegodilu", telugu:"చెగోడీలు", short:"Crispy fried rice flour rings — the beloved Andhra evening snack.", desc:"Made from freshly ground rice flour, seasoned with cumin, curry leaves, and green chilli. Crunchy, addictive, and purely homemade in small batches.", ingredients:"Rice Flour, Cumin, Green Chilli, Curry Leaves, Salt, Oil", tags:["Andhra Classic","Small Batch","Evening Snack"], prices:{"200g":"₹129","400g":"₹239"}, seed:"chegodilu_rice_snack", spice:2, sour:0 },
  { id:12, category:"Snacks", image: IMAGES.murukku, name:"Murukku", telugu:"మురుక్కు", short:"Crispy spiral rice-lentil snack seasoned with sesame and cumin.", desc:"Pressed through a traditional murukku press from rice flour and urad dal batter, deep-fried in pure sesame oil for the authentic South Indian crunch.", ingredients:"Rice Flour, Urad Dal, Sesame Seeds, Cumin, Butter, Salt", tags:["Traditional Press","Sesame Oil","No Preservatives"], prices:{"200g":"₹119","400g":"₹219"}, seed:"murukku_crispy_snack", spice:1, sour:0 },
];

const CATEGORIES = ["All","Pickles","Masalas","Cashews","Sweets","Dairy","Snacks"];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&family=Noto+Sans+Telugu:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--sa:#E8820C;--tu:#F5A623;--cr:#F2EDE4;--br:#5C3A1E;--bd:#3E2207;--lf:#4A7C3F;--ll:#EAF3DE;--tx:#2C1A06;--mu:#7A5C3A;--wh:#FFFFFF;--bo:rgba(62,34,7,0.10);--cb:#FDFAF6}
body{font-family:'Lato',sans-serif;background:var(--cr);color:var(--tx);overflow-x:hidden}
h1,h2,h3,h4{font-family:'Playfair Display',serif}
.tel{font-family:'Noto Sans Telugu',sans-serif}

.nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:0.6rem 1.5rem}
.nav-in{background:var(--wh);border-radius:2rem;display:flex;align-items:center;justify-content:space-between;padding:0.55rem 1rem 0.55rem 0.9rem;box-shadow:0 2px 20px rgba(62,34,7,0.10)}
.nav-brand{display:flex;align-items:center;gap:0.7rem;cursor:pointer}
.nav-logo{width:38px;height:38px;background:var(--bd);border-radius:0.8rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.nav-logo svg{width:20px;height:20px;fill:white}
.nav-bt{display:flex;flex-direction:column;line-height:1.15}
.nav-btt{font-family:'Playfair Display',serif;font-size:0.95rem;color:var(--bd);font-weight:700;letter-spacing:0.02em}
.nav-bts{font-size:0.58rem;letter-spacing:0.18em;color:var(--sa);text-transform:uppercase;font-weight:700}
.nav-links{display:flex;gap:1.5rem;align-items:center}
.nav-links a{font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;color:var(--mu);text-decoration:none;transition:color 0.2s;cursor:pointer}
.nav-links a:hover,.nav-links a.act{color:var(--bd)}
.nav-cta{background:var(--bd);color:white;border:none;cursor:pointer;padding:0.5rem 1.1rem;border-radius:2rem;font-size:0.75rem;font-weight:700;letter-spacing:0.06em;display:flex;align-items:center;gap:0.45rem;text-decoration:none;transition:background 0.2s;white-space:nowrap}
.nav-cta:hover{background:var(--sa)}
.hbg{display:none;flex-direction:column;gap:4px;cursor:pointer;background:none;border:none;padding:4px}
.hbg span{display:block;width:22px;height:2px;background:var(--br);border-radius:2px}
.mob-menu{display:none;position:fixed;top:76px;left:1rem;right:1rem;z-index:199;background:var(--wh);border-radius:1.5rem;padding:1.5rem;flex-direction:column;gap:1rem;box-shadow:0 4px 30px rgba(62,34,7,0.15)}
.mob-menu.open{display:flex}
.mob-menu a{font-size:0.95rem;font-weight:700;color:var(--br);text-decoration:none;cursor:pointer;padding:0.4rem 0;border-bottom:1px solid var(--bo)}

.hero{
  min-height:100vh;
  padding-top:80px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  max-width:800px;
  margin:0 auto;
  padding-left:2rem;
  padding-right:2rem;
  gap:1.5rem;
}

.hero-telbadge{
  display:inline-flex;
  align-items:center;
  gap:0.5rem;
  background:var(--wh);
  border:1px solid var(--bo);
  border-radius:2rem;
  padding:0.35rem 1rem;
  width:fit-content;
  margin-bottom:1rem;
}

.hero-telbadge span{
  font-family:'Noto Sans Telugu',sans-serif;
  color:var(--sa);
  font-size:0.95rem;
  font-weight:600;
}

.hero-telbadge small{
  font-size:0.72rem;
  color:var(--mu);
}

.hero-title{
  font-size:clamp(2.8rem,6vw,5rem);
  color:var(--bd);
  line-height:1.05;
  margin-bottom:0.5rem;
}

.hero-sub{
  font-size:0.95rem;
  letter-spacing:0.18em;
  text-transform:uppercase;
  color:var(--sa);
  font-weight:700;
  margin-bottom:1rem;
}

.hero-desc{
  color:var(--mu);
  font-size:0.95rem;
  line-height:1.75;
  margin-bottom:0.75rem;
  max-width:500px;
}

.hero-contact{
  font-size:0.88rem;
  color:var(--br);
  font-weight:700;
  margin-bottom:1.5rem;
}

.hero-btns{
  display:flex;
  gap:0.75rem;
  flex-wrap:wrap;
  justify-content:center;
}

.btn-p{background:var(--bd);color:white;border:none;cursor:pointer;padding:0.8rem 1.75rem;border-radius:3rem;font-size:0.88rem;font-weight:700;letter-spacing:0.04em;text-decoration:none;transition:background 0.2s,transform 0.15s;display:inline-block}
.btn-p:hover{background:var(--sa);transform:translateY(-2px)}
.btn-o{background:transparent;color:var(--br);border:2px solid var(--bo);cursor:pointer;padding:0.8rem 1.75rem;border-radius:3rem;font-size:0.88rem;font-weight:700;text-decoration:none;transition:all 0.2s;display:inline-block}
.btn-o:hover{border-color:var(--br);background:var(--wh)}

.sec {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;   /* 🔥 center everything */
}

.sec-t {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: var(--bd);
  margin-bottom: 0.5rem;
}

.sec-s {
  color: var(--mu);
  font-size: 0.95rem;
  max-width: 600px;
  line-height: 1.7;
  margin: 0 auto 2.5rem;   /* 🔥 center paragraph */
}

.div {
  width: 60px;
  height: 3px;
  background: var(--sa);
  margin: 0.75rem auto 2rem;   /* 🔥 center line */
  border-radius: 2px;
}

.tel-strip{background:var(--bd);padding:2rem 2rem;overflow:hidden;white-space:nowrap}
.tel-scroll{display:inline-flex;gap:3rem;animation:scrollL 22s linear infinite}
.tel-item{font-family:'Noto Sans Telugu',sans-serif;font-size:1rem;font-weight:600;color:rgba(255,255,255,0.65);display:flex;align-items:center;gap:1rem;white-space:nowrap}
.tel-dot{width:6px;height:6px;border-radius:50%;background:var(--sa);flex-shrink:0}
@keyframes scrollL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

.cash-sec{background:var(--bd);padding:5rem 2rem}
.cash-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.cash-img{border-radius:2rem;overflow:hidden;aspect-ratio:1}
.cash-img img{width:100%;height:100%;object-fit:cover}
.cash-lbl{font-size:0.68rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--tu);font-weight:700;margin-bottom:0.75rem}
.cash-t{font-size:clamp(1.8rem,3vw,2.5rem);color:white;margin-bottom:0.35rem}
.cash-tel{font-family:'Noto Sans Telugu',sans-serif;font-size:1rem;color:rgba(255,255,255,0.45);margin-bottom:1rem}
.cash-d{color:rgba(255,255,255,0.65);line-height:1.8;margin-bottom:2rem}
.cash-badges{display:flex;gap:0.75rem;flex-wrap:wrap}
.badge{background:rgba(245,166,35,0.15);border:1px solid rgba(245,166,35,0.3);color:var(--tu);padding:0.35rem 0.9rem;border-radius:2rem;font-size:0.73rem;font-weight:700;letter-spacing:0.05em}

.pp{padding-top:80px;min-height:100vh}
.pp-hero{text-align:center;padding:4rem 2rem 2rem}
.pp-title{font-size:clamp(2.5rem,6vw,4rem);color:var(--bd);margin-bottom:0.4rem}
.pp-sub{color:var(--mu);font-style:italic;font-size:1rem;margin-top:1.75rem;margin-bottom:1.75rem}
.sbar{max-width:700px;margin:0 auto 2.5rem;background:var(--wh);border-radius:3rem;display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.5rem;box-shadow:0 2px 16px rgba(62,34,7,0.08)}
.sbar input{border:none;outline:none;font-size:0.9rem;color:var(--tx);background:transparent;width:100%;font-family:'Lato',sans-serif}
.sbar input::placeholder{color:var(--mu)}
.cat-row{display:flex;gap:0.7rem;flex-wrap:wrap;justify-content:center;margin-bottom:3rem;padding:0 2rem}
.cat-btn{padding:0.48rem 1.2rem;border-radius:3rem;font-size:0.82rem;font-weight:700;cursor:pointer;border:1.5px solid var(--bo);background:var(--wh);color:var(--br);transition:all 0.2s;letter-spacing:0.03em}
.cat-btn.act{background:var(--bd);color:white;border-color:var(--bd)}
.cat-btn:hover:not(.act){border-color:var(--br)}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:1.75rem;padding:0 2rem 4rem;max-width:1200px;margin:0 auto}
.pcard{background:var(--wh);border-radius:1.5rem;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 2px 12px rgba(62,34,7,0.06)}
.pcard:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(62,34,7,0.12)}
.pcard-img{position:relative;aspect-ratio:4/3;overflow:hidden}
.pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s}
.pcard:hover .pcard-img img{transform:scale(1.05)}
.pcat-badge{position:absolute;top:0.85rem;left:0.85rem;background:rgba(92,58,30,0.82);color:white;padding:0.28rem 0.72rem;border-radius:2rem;font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;display:flex;align-items:center;gap:0.4rem;backdrop-filter:blur(4px)}
.pcat-dot{width:5px;height:5px;border-radius:50%;background:var(--sa)}
.pcard-body{padding:1.4rem}
.pcard-name{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--sa);margin-bottom:0.2rem}
.pcard-tel{font-family:'Noto Sans Telugu',sans-serif;font-size:0.78rem;color:var(--mu);margin-bottom:0.55rem}
.pcard-desc{font-size:0.85rem;color:var(--mu);line-height:1.6;margin-bottom:1.1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.pcard-link{font-size:0.78rem;font-weight:700;color:var(--br);letter-spacing:0.06em;text-transform:uppercase;display:flex;align-items:center;gap:0.4rem}

.dp{padding-top:80px;min-height:100vh}
.back-btn{display:inline-flex;align-items:center;gap:0.5rem;font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:var(--br);cursor:pointer;padding:1rem 2rem;background:none;border:none}
.back-btn:hover{color:var(--sa)}
.dp-in{display:grid;grid-template-columns:1fr 1fr;gap:4rem;max-width:1200px;margin:0 auto;padding:1rem 2rem 4rem;align-items:start}
.dp-img{border-radius:1.5rem;overflow:hidden;aspect-ratio:3/4}
.dp-img img{width:100%;height:100%;object-fit:cover}
.dp-badges{display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem;flex-wrap:wrap}
.dp-catbadge{background:rgba(232,130,12,0.12);color:var(--sa);padding:0.32rem 0.8rem;border-radius:2rem;font-size:0.72rem;font-weight:700;letter-spacing:0.08em}
.dp-fresh{display:flex;align-items:center;gap:0.4rem;font-size:0.72rem;font-weight:700;color:var(--lf);letter-spacing:0.06em}
.dp-title{font-size:clamp(1.8rem,3.5vw,2.8rem);color:var(--bd);line-height: 1.2; /* 👈 add this */
margin-bottom:0.3rem}
.dp-tel{
  font-family:'Noto Sans Telugu',sans-serif;
  font-size:1.1rem;
  color:var(--mu);
  margin-top:2.5rem;   /* 👈 ADD THIS */
  margin-bottom:1rem;
}
.dp-q{border-left:3px solid var(--sa);padding-left:1rem;margin-bottom:1.5rem}
.dp-q p{font-style:italic;color:var(--mu);line-height:1.75;font-size:0.95rem}
.dp-meta{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem}
.dp-ml{font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--sa);font-weight:700;margin-bottom:0.4rem}
.dp-mv{font-weight:700;color:var(--bd);font-size:0.9rem;line-height:1.5}
.dp-tags{display:flex;gap:0.5rem;flex-wrap:wrap}
.dp-tag{background:rgba(62,34,7,0.06);color:var(--br);padding:0.28rem 0.75rem;border-radius:2rem;font-size:0.76rem;font-weight:700}
.dp-pbox{background:var(--bd);border-radius:1.25rem;padding:1.5rem;margin-top:1.5rem}
.dp-ptitle{font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.45);font-weight:700;margin-bottom:1rem}
.dp-pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:0.7rem;margin-bottom:1.25rem}
.dp-popt{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:0.75rem;padding:0.6rem;text-align:center;cursor:pointer;transition:all 0.2s}
.dp-popt.sel{background:var(--sa);border-color:var(--sa)}
.dp-psize{font-size:0.7rem;color:rgba(255,255,255,0.55);margin-bottom:0.2rem}
.dp-pprice{font-size:0.95rem;color:white;font-weight:700}
.dp-wa{background:var(--sa);color:white;border:none;cursor:pointer;width:100%;padding:1rem;border-radius:0.85rem;font-size:0.95rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:0.6rem;transition:background 0.2s;text-decoration:none}
.dp-wa:hover{background:#c97010}
.dp-fulld{margin-top:2rem;padding-top:2rem;border-top:1px solid var(--bo)}
.dp-fulld h4{font-size:0.95rem;color:var(--bd);margin-bottom:0.75rem}
.dp-fulld p{color:var(--mu);line-height:1.8;font-size:0.9rem}

.ing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:1.5rem}
.ing-card{background:var(--wh);border-radius:1.25rem;padding:1.75rem 1.5rem;border:1px solid var(--bo);transition:transform 0.2s,box-shadow 0.2s}
.ing-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(62,34,7,0.1)}
.ing-icon{font-size:2rem;margin-bottom:0.75rem}
.ing-name{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--br);margin-bottom:0.2rem}
.ing-tel{font-family:'Noto Sans Telugu',sans-serif;font-size:0.78rem;color:var(--sa);margin-bottom:0.45rem}
.ing-txt{color:var(--mu);font-size:0.86rem;line-height:1.65}

.why-sec{background:var(--cb);padding:5rem 2rem}
.why-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.why-list{display:flex;flex-direction:column;gap:1.5rem}
.why-item{display:flex;gap:1rem;align-items:flex-start}
.why-num{min-width:2.5rem;height:2.5rem;border-radius:50%;background:var(--sa);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0}
.why-tt{font-family:'Playfair Display',serif;font-size:1rem;color:var(--br);margin-bottom:0.25rem}
.why-tx{color:var(--mu);font-size:0.86rem;line-height:1.6}
.why-img{border-radius:2rem;overflow:hidden;aspect-ratio:4/5}
.why-img img{width:100%;height:100%;object-fit:cover}

.cta{background:var(--bd);padding:5rem 2rem;text-align:center}
.cta-t{font-size:clamp(1.8rem,4vw,2.8rem);color:white;margin-bottom:0.75rem}
.cta-s{color:rgba(255,255,255,0.6);font-size:0.95rem;margin-bottom:2rem;max-width:460px;margin-left:auto;margin-right:auto;line-height:1.75}
.btn-wh{background:white;color:var(--bd);padding:0.85rem 2.5rem;border-radius:3rem;font-size:0.9rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;transition:all 0.2s}
.btn-wh:hover{background:var(--sa);color:white}

.ab-hero{background:var(--bd);padding:8rem 2rem 5rem;text-align:center}
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.ab-img{border-radius:2rem;overflow:hidden;aspect-ratio:3/4}
.ab-img img{width:100%;height:100%;object-fit:cover}
.mission{background:var(--sa);color:white;border-radius:1.25rem;padding:2rem 2.5rem;margin:2rem 0;font-family:'Playfair Display',serif;font-style:italic;font-size:1.05rem;line-height:1.75}

.ing-ph{background:var(--lf);padding:8rem 2rem 5rem;text-align:center}
.ing-det{display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:4rem;align-items:center}
.ing-det:nth-child(even)>:first-child{order:2}
.ing-di{border-radius:1.5rem;overflow:hidden;aspect-ratio:4/3}
.ing-di img{width:100%;height:100%;object-fit:cover}
.ing-dtag{font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--sa);font-weight:700;margin-bottom:0.5rem}
.ing-dt{font-size:1.55rem;color:var(--br);margin-bottom:0.25rem;font-family:'Playfair Display',serif}
.ing-dtel{font-family:'Noto Sans Telugu',sans-serif;color:var(--mu);font-size:0.88rem;margin-bottom:0.75rem}
.ing-dd{color:var(--mu);line-height:1.8;font-size:0.92rem}

.gal-hero{background:var(--bd);padding:8rem 2rem 5rem;text-align:center}
.gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.gal-item{border-radius:1rem;overflow:hidden;aspect-ratio:1;cursor:pointer;transition:transform 0.2s}
.gal-item:hover{transform:scale(1.02)}
.gal-item img{width:100%;height:100%;object-fit:cover}
.gal-item.tall{grid-row:span 2;aspect-ratio:auto}

.con-hero{background:var(--sa);padding:8rem 2rem 5rem;text-align:center}
.con-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:3rem}
.con-card{background:var(--wh);border-radius:1.25rem;padding:1.75rem;border:1px solid var(--bo)}
.con-lbl{font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--mu);font-weight:700;margin-bottom:0.35rem}
.con-val{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--br);margin-bottom:0.35rem}
.con-lk{color:var(--sa);text-decoration:none;font-weight:700;font-size:0.83rem}
.con-lk:hover{color:var(--br)}

.foot{background:var(--bd);color:rgba(255,255,255,0.6);padding:3rem 2rem}
.foot-in{max-width:1200px;margin:0 auto}

.wa-icon svg{width:18px;height:18px;fill:currentColor}

@media(max-width:900px){
  .nav-links,.nav-cta{display:none}
  .hbg{display:flex}
  .hero{grid-template-columns:1fr;text-align:center;padding-bottom:3rem}
  .hero-right{display:none}
  .hero-btns{justify-content:center}
  .hero-desc{margin-left:auto;margin-right:auto}
  .cash-in,.why-in,.ab-grid,.ing-det,.con-grid,.dp-in{grid-template-columns:1fr;gap:2rem}
  .ing-det:nth-child(even)>:first-child{order:0}
  .dp-meta{grid-template-columns:1fr}
  .gal-grid{grid-template-columns:repeat(2,1fr)}
  .gal-item.tall{grid-row:span 1}
  .pgrid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){.pgrid{grid-template-columns:1fr}.gal-grid{grid-template-columns:1fr 1fr}}
`;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" style={{width:18,height:18,fill:"currentColor"}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function Navbar({ page, setPage, menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="nav">
        <div className="nav-in">
          <div className="nav-brand" onClick={() => setPage("home")}>
            <div className="nav-logo">
              <svg viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </div>
            <div className="nav-bt"><span className="nav-btt">VEDHU &amp; VEDHA</span><span className="nav-bts">HOME FOODS</span></div>
          </div>
          <div className="nav-links">
            {[["home","HOME"],["products","PRODUCTS"],["about","OUR STORY"],["ingredients","INGREDIENTS"],["gallery","GALLERY"],["contact","CONTACT"]].map(([p,l])=>(
              <a key={p} className={page===p?"act":""} onClick={()=>setPage(p)}>{l}</a>
            ))}
          </div>
          <a className="nav-cta" href={WA_ORDER} target="_blank" rel="noreferrer"><WaIcon/>Place Order</a>
          <button className="hbg" onClick={()=>setMenuOpen(o=>!o)} aria-label="menu"><span/><span/><span/></button>
        </div>
      </nav>
      <div className={`mob-menu ${menuOpen?"open":""}`}>
        {[["home","Home"],["products","Products"],["about","Our Story"],["ingredients","Ingredients"],["gallery","Gallery"],["contact","Contact"]].map(([p,l])=>(
          <a key={p} onClick={()=>{setPage(p);setMenuOpen(false);}}>{l}</a>
        ))}
        <a href={WA_ORDER} target="_blank" rel="noreferrer" style={{color:"var(--sa)",borderBottom:"none"}}>Place Order on WhatsApp</a>
      </div>
    </>
  );
}

const TeluguStrip = () => {
  const items = ["అమ్మ చేతి రుచి","స్వచ్ఛమైన పదార్థాలు","గ్రామ సంప్రదాయం","చేతితో తయారు","ప్రేమతో వండిన","నిజమైన రుచి","వేటపాలెం నుండి","ప్రకృతి సేద్యం","నో ప్రిజర్వేటివ్స్","సాంప్రదాయ వంట"];
  const doubled = [...items,...items];
  return (
    <div className="tel-strip">
      <div className="tel-scroll">
        {doubled.map((t,i)=><span className="tel-item" key={i}><span className="tel-dot"/>{t}</span>)}
      </div>
    </div>
  );
};

function ProductCard({ product:p, onClick }) {
  return (
    <div className="pcard" onClick={onClick}>
      <div className="pcard-img">
        <img src={p.image} alt={p.name} />
        <div className="pcat-badge"><span className="pcat-dot"/>{p.category.toUpperCase()}</div>
      </div>
      <div className="pcard-body">
        <div className="pcard-name">{p.name}</div>
        <div className="pcard-tel">{p.telugu}</div>
        <div className="pcard-desc">{p.short}</div>
        <div className="pcard-link">VIEW DETAILS <span>→</span></div>
      </div>
    </div>
  );
}

function ProductsPage({ setProduct }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter(p => {
    const mc = cat==="All" || p.category===cat;
    const q = search.toLowerCase();
    const ms = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.telugu.includes(q);
    return mc && ms;
  });
  return (
    <div className="pp">
      <div className="pp-hero">
        <h1 className="pp-title">Our Products</h1>
        <div className="tel" style={{color:"var(--sa)",fontSize:"1.1rem",marginBottom:"0.5rem"}}></div>
        <p className="pp-sub">Traditional homemade foods crafted in small batches for authentic flavor.</p>
        <div className="sbar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mu)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Looking for Pickles, Ghee, or Chegodilu?"/>
          {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"var(--mu)",cursor:"pointer",fontSize:"1rem"}}>✕</button>}
        </div>
        <div className="cat-row">
          {CATEGORIES.map(c=><button key={c} className={`cat-btn ${cat===c?"act":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </div>
      {filtered.length===0 ? (
        <div style={{textAlign:"center",padding:"4rem 2rem",color:"var(--mu)"}}>
          <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>🔍</div>
          <p>No products found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="pgrid">
          {filtered.map(p=><ProductCard key={p.id} product={p} onClick={()=>setProduct(p)}/>)}
        </div>
      )}
    </div>
  );
}

function ProductDetail({ product:p, onBack }) {
  const [sel, setSel] = useState(Object.keys(p.prices)[0]);
  useEffect(()=>{ setSel(Object.keys(p.prices)[0]); },[p.id]);
  return (
    <div className="dp">
      <button className="back-btn" onClick={onBack}>← BACK TO KITCHEN</button>
      <div className="dp-in">
        <div className="dp-img"><img src={p.image} alt={p.name} /></div>
        <div>
          <div className="dp-badges">
            <span className="dp-catbadge">{p.category.toUpperCase()}</span>
            <span className="dp-fresh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--lf)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              FRESHLY PREPARED
            </span>
          </div>
          <h1 className="dp-title">{p.name}</h1>
          <div className="dp-tel tel">{p.telugu}</div>
          <div className="dp-q"><p>{p.short}</p></div>
          <div className="dp-meta">
            <div>
              <div className="dp-ml">Pure Ingredients</div>
              <div className="dp-mv">{p.ingredients}</div>
            </div>
            <div>
              <div className="dp-ml">Traditional Notes</div>
              <div className="dp-tags">{p.tags.map(t=><span className="dp-tag" key={t}>{t}</span>)}</div>
            </div>
          </div>
          <div className="dp-pbox">
            <div className="dp-ptitle">SELECT QUANTITY</div>
            <div className="dp-pgrid">
              {Object.entries(p.prices).map(([sz,pr])=>(
                <div key={sz} className={`dp-popt ${sel===sz?"sel":""}`} onClick={()=>setSel(sz)}>
                  <div className="dp-psize">{sz}</div>
                  <div className="dp-pprice">{pr}</div>
                </div>
              ))}
            </div>
            <a className="dp-wa" href={WA_PRODUCT(`${p.name} (${sel} - ${p.prices[sel]})`)} target="_blank" rel="noreferrer">
              <WaIcon/> Place Order — {p.prices[sel]}
            </a>
          </div>
          <div className="dp-fulld">
            <h4>About this Product</h4>
            <p>{p.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage, setProduct }) {
  return (
    <>
      <section style={{background:"linear-gradient(150deg,#F2EDE4 55%,#FEF0D8 100%)",paddingBottom:"4rem"}}>
        <div className="hero">
          <div>
            <div className="hero-telbadge"><span>అమ్మ చేతి రుచి</span><small>Amma Cheti Ruchi</small></div>
            <h1 className="hero-title">Vedhu<br/>&amp; Vedha</h1>
            <div className="hero-sub">Home Foods · మా ఊరు నుంచి మీ ఇంటి వరకు</div>
            <p className="hero-desc">Traditional Andhra homemade foods crafted in small batches. From Vetapalem's fields to your table — pure, honest, full of love.</p>
            <div className="hero-contact">V Lakshmi · +91 9989123535</div>
            <div className="hero-btns">
              <button className="btn-p" onClick={()=>setPage("products")}>Explore Products</button>
              <a className="btn-o" href={WA_ORDER} target="_blank" rel="noreferrer">Order on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <TeluguStrip/>

      {/* Featured Products */}
      <div className="sec">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem",marginBottom:"2.5rem"}}>
          <div><h2 className="sec-t">Our Products</h2><div className="div" style={{margin:"0.5rem 0 0"}}/></div>
          <button className="btn-o" onClick={()=>setPage("products")} style={{padding:"0.5rem 1.2rem",fontSize:"0.8rem"}}>View All →</button>
        </div>
        <div className="pgrid" style={{padding:0}}>
          {PRODUCTS.slice(0,4).map(p=><ProductCard key={p.id} product={p} onClick={()=>setProduct(p)}/>)}
        </div>
      </div>

      {/* Cashew */}
      <div className="cash-sec">
        <div className="cash-in">
          <div className="cash-img"><img src={IMAGES.cashew} alt="Cashews"/></div>
          <div>
            <div className="cash-lbl">The Vetapalem Legacy</div>
            <h2 className="cash-t">Premium Cashew Nuts</h2>
            <div className="cash-tel">ప్రీమియం జీడిపప్పు</div>
            <p className="cash-d">Vetapalem is world-famous for its cashew processing industry. We use the <strong style={{color:"white"}}>traditional drum-roasting method</strong> — high heat removes moisture, making kernels extra crispy and deeply flavored.</p>
            <div className="cash-badges"><span className="badge">Traditional Roast</span><span className="badge">Extra Crispy</span><span className="badge">Zero Preservatives</span></div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="sec">
        <h2 className="sec-t">Pure Ingredients</h2>
        <div className="div"/>
        <p className="sec-s">Sourced directly from farmers, prepared using village secrets passed down through generations.</p>
        <div className="ing-grid">
          {[{e:"🥭",n:"Ulavapadu Mangoes",t:"ఉలవపాడు మామిడికాయలు",d:"Handpicked at peak ripeness from Ulapadu farms. Natural tanginess, deep colour, zero additives."},{e:"🌶️",n:"Repalle Chillies",t:"రెపల్లె మిర్చి",d:"High-grade Guntur variety from mineral-rich Repalle village soil — bold heat, pure red colour."},{e:"🧈",n:"Homemade Ghee",t:"పల్లె నెయ్యి",d:"Slow-heated from fresh butter (venna) from village vendors. Wood-fire tradition preserved."},{e:"🌿",n:"Bapu-Style Tradition",t:"సాంప్రదాయ పద్ధతి",d:"Andhra village cooking wisdom — Amma Cheti Ruchi in every jar and packet."}].map(i=>(
            <div className="ing-card" key={i.n}>
              <div className="ing-icon">{i.e}</div>
              <div className="ing-name">{i.n}</div>
              <div className="ing-tel tel">{i.t}</div>
              <div className="ing-txt">{i.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why */}
      <div className="why-sec">
        <div className="why-in">
          <div>
            <h2 className="sec-t">Why Choose Us?</h2>
            <div className="div"/>
            <div className="why-list">
              {[{n:"01",t:"Authentic & Trustworthy",d:"Prepared exactly how we feed our own family — clean, honest, and pure."},{n:"02",t:"Direct Farmer Sourcing",d:"Repalle chillies and Ulapadu mangoes sourced directly to ensure supreme quality."},{n:"03",t:"Traditional Methods",d:"Stone-grinding, drum-roasting, and wood-fire slow-cooking — the way it's always been."},{n:"04",t:"No Preservatives Added",d:"Every batch is preservative-free. Pure nature and tradition in every bite."}].map(w=>(
                <div className="why-item" key={w.n}>
                  <div className="why-num">{w.n}</div>
                  <div><div className="why-tt">{w.t}</div><div className="why-tx">{w.d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="why-img"><img src={IMAGES.banner} alt="Kitchen"/></div>
            <p style={{fontSize:"0.78rem",color:"var(--mu)",textAlign:"center",marginTop:"0.75rem",fontStyle:"italic"}}>"Handcrafted with care in Vetapalem."</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2 className="cta-t">Handmade with Love,<br/>Delivered for You.</h2>
        <p className="cta-s">Ready to taste real Andhra village flavour? Connect on WhatsApp for quick ordering.</p>
        <a className="btn-wh" href={WA_ORDER} target="_blank" rel="noreferrer"><WaIcon/>Chat on WhatsApp</a>
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <div className="ab-hero">
        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",color:"white",fontFamily:"'Playfair Display',serif"}}>Our Story</h1>
        <div className="tel" style={{color:"rgba(255,255,255,0.45)",fontSize:"1rem",marginTop:"0.35rem"}}>మా కథ</div>
        <div style={{color:"rgba(255,255,255,0.55)",fontStyle:"italic",fontSize:"0.95rem",marginTop:"0.5rem"}}>"From Our Village to Your Home"</div>
      </div>
      <div className="sec">
        <div className="ab-grid">
          <div className="ab-img"><img src={About_page_banner} alt="Vetapalem"/></div>
          <div>
            <h2 className="sec-t">Vedhu & Vedha Home Foods</h2>
            <div className="div"/>
            <p style={{color:"var(--mu)",lineHeight:"1.8",marginBottom:"1.5rem"}}>Born with a simple vision: preserve the real taste of homemade food while supporting local farmers and village traditions of Andhra Pradesh.</p>
            {[{t:"Born in Vetapalem",te:"",d:"Our foods are prepared in Vetapalem, where traditional cooking methods are still part of everyday life. Food made with patience, skill, and care always tastes better."},{t:"Rooted in Trust",te:"నమ్మకంలో పాతుకున్నది",d:"We source high-quality raw materials directly from trusted farmers, then prepare every batch in a hygienic environment using handcrafted methods."}].map(x=>(
              <div key={x.t} style={{marginBottom:"1.5rem"}}>
                <div style={{fontFamily:"'Playfair Display',serif",color:"var(--br)",fontSize:"1rem",marginBottom:"0.2rem"}}>{x.t}</div>
                <div className="tel" style={{fontSize:"0.78rem",color:"var(--sa)",marginBottom:"0.35rem"}}>{x.te}</div>
                <div style={{color:"var(--mu)",fontSize:"0.88rem",lineHeight:"1.65"}}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:"4rem"}}>
          <h2 className="sec-t">Our Mission</h2><div className="div"/>
          <div className="mission">"To bring pure homemade taste from our village to modern homes, while preserving traditional food practices and creating value for local farming communities."</div>
          <div className="ab-grid" style={{marginTop:"2rem"}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",color:"var(--br)",fontSize:"1.1rem",marginBottom:"0.3rem"}}>Family-Oriented Quality</div>
              <div className="tel" style={{fontSize:"0.83rem",color:"var(--sa)",marginBottom:"0.75rem"}}></div>
              <p style={{color:"var(--mu)",lineHeight:"1.8",fontSize:"0.9rem"}}>We prepare food the way we prepare it for our own families. Every jar of pickle and every packet of snack carries the warmth of a Vetapalem home.</p>
              <div style={{marginTop:"1rem",color:"var(--lf)",fontWeight:"700",fontSize:"0.88rem"}}>✓ Hygienic Environment &amp; Care</div>
            </div>
            <div className="ab-img" style={{aspectRatio:"4/3"}}><img src={About_page_banner2} alt="Kitchen"/></div>
          </div>
        </div>
      </div>
    </>
  );
}

function IngredientsPage() {
  const items = [
    {tag:"Vetapalem Legacy",t:"Premium Cashew Nuts",te:"ప్రీమియం జీడిపప్పు",d:"Drum-roasted the traditional way — high heat draws moisture out for an irresistible crunch no modern roaster can replicate.",seed:ingre_cachew},
    {tag:"Ulapadu Region",t:"Ulavapadu Mangoes",te:"ఉలవపాడు మామిడికాయలు",d:"Famed for natural sweetness and deep tanginess, handpicked at peak ripeness for our signature pickles. Pure mango, zero additives.",seed:ingre_mango},
    {tag:"Repalle Village",t:"Repalle Chillies",te:"రెపల్లె మిర్చి",d:"Guntur variety from mineral-rich volcanic soil of Repalle — bold heat, deep red colour, and unmistakable aroma.",seed:ingre_mirchi},
    {tag:"Village Tradition",t:"Homemade Ghee",te:"పల్లె నెయ్యి",d:"Prepared from fresh butter (venna) sourced from village dairy vendors, slow-heated over a wood fire.",seed:ingre_ghee},
  ];
  return (
    <>
      <div className="ing-ph">
        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",color:"white",fontFamily:"'Playfair Display',serif"}}>Our Ingredients</h1>
        <div className="tel" style={{color:"rgba(255,255,255,0.65)",fontSize:"1rem",marginTop:"0.5rem"}}>మా పదార్థాలు</div>
        <div style={{color:"rgba(255,255,255,0.5)",marginTop:"0.4rem",fontStyle:"italic",fontSize:"0.9rem"}}>Every ingredient tells a story of the land</div>
      </div>
      <div className="sec">
        <h2 className="sec-t">Sourced with Integrity</h2><div className="div"/>
        <p className="sec-s">We go straight to the source — farms, villages, and local vendors — ensuring every ingredient meets our family standard of quality.</p>
        {items.map(i=>(
          <div className="ing-det" key={i.t}>
            <div className="ing-di"><img src={i.seed} alt={i.t} loading="lazy"/></div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div className="ing-dtag">{i.tag}</div>
              <h3 className="ing-dt">{i.t}</h3>
              <div className="ing-dtel tel">{i.te}</div>
              <p className="ing-dd">{i.d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function GalleryPage() {
  const images = [G1,G2,G3,G4];
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="gal-hero">
        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",color:"white",fontFamily:"'Playfair Display',serif"}}>Gallery</h1>
        <div className="tel" style={{color:"rgba(255,255,255,0.5)",fontSize:"1rem",marginTop:"0.5rem"}}></div>
      </div>
      <div className="sec">
        <div className="gal-grid">
          {images.map((img,i)=>(
        <div 
          key={i} 
          className={`gal-item ${i===0||i===7 ? "tall" : ""}`} 
          onClick={()=>setActive(img)}
        >
          <img src={img} alt={`Gallery ${i+1}`} loading="lazy"/>
        </div>
      ))}
        </div>
      </div>
      {active && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",cursor:"pointer"}} onClick={()=>setActive(null)}>
          <img src={`https://picsum.photos/seed/${active}/900/700`} alt="" style={{maxWidth:"100%",maxHeight:"90vh",borderRadius:"1rem"}}/>
        </div>
      )}
    </>
  );
}

function ContactPage() {
  return (
    <>
      <div className="con-hero">
        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",color:"white",fontFamily:"'Playfair Display',serif"}}>Contact Us</h1>
        <div className="tel" style={{color:"rgba(255,255,255,0.75)",fontSize:"1rem",marginTop:"0.4rem"}}></div>
        <p style={{color:"rgba(255,255,255,0.8)",marginTop:"0.5rem",fontSize:"0.9rem"}}>Order directly from our kitchen for fresh delivery.</p>
      </div>
      <div className="sec">
        <h2 className="sec-t">Direct Reach</h2><div className="div"/>
        <div className="con-grid">
          <div className="con-card"><div className="con-lbl">Call V Lakshmi</div><div className="con-val">+91 9989123535</div><a className="con-lk" href="tel:+919989123535">Tap to Call →</a></div>
          <div className="con-card"><div className="con-lbl">WhatsApp Orders</div><div className="con-val">Chat Now</div><a className="con-lk" href={WA_ORDER} target="_blank" rel="noreferrer">Open WhatsApp →</a></div>
          <div className="con-card"><div className="con-lbl">Email Support</div><div className="con-val" style={{fontSize:"0.98rem"}}>info@vetapalemfood.com</div><a className="con-lk" href="mailto:info@vetapalemfood.com">Send Email →</a></div>
          <div style={{background:"var(--ll)",borderRadius:"1.25rem",padding:"1.75rem",border:"1px solid rgba(74,124,63,0.2)"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"var(--br)",marginBottom:"0.75rem"}}>Kitchen Address</div>
            <div style={{color:"var(--mu)",lineHeight:"1.8",fontSize:"0.88rem"}}>Main Road,<br/>Vetapalem, Andhra Pradesh - 523187</div>
            <div style={{color:"var(--lf)",fontWeight:"700",fontSize:"0.83rem",marginTop:"0.5rem"}}>Mon - Sat: 9:00 AM - 8:00 PM</div>
          </div>
        </div>
        <div style={{maxWidth:"480px",margin:"0 auto",textAlign:"center",paddingTop:"2rem"}}>
          <h2 className="sec-t" style={{fontSize:"1.6rem"}}>Ready to taste Vetapalem?</h2>
          <p style={{color:"var(--mu)",lineHeight:"1.8",margin:"1rem 0 1.5rem",fontSize:"0.9rem"}}>Connect on WhatsApp for product pricing, bulk quantities, and shipping details. 🌍 Global Shipping Available.</p>
          <a href={WA_ORDER} target="_blank" rel="noreferrer" style={{background:"#25D366",color:"white",padding:"1rem 2rem",borderRadius:"1rem",textDecoration:"none",fontWeight:"700",display:"inline-flex",alignItems:"center",gap:"0.6rem",fontSize:"0.95rem"}}>
            <WaIcon/> Order via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-in">
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"white",marginBottom:"0.25rem"}}>Vedhu &amp; Vedha Home Foods</div>
        <div className="tel" style={{fontSize:"0.9rem",color:"rgba(255,255,255,0.4)",marginBottom:"0.25rem"}}>అమ్మ చేతి రుచి · మా ఊరు నుంచి మీ ఇంటి వరకు</div>
        <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.35)",fontStyle:"italic",marginBottom:"1.5rem"}}>"From Our Village to Your Home"</div>
        <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.3)",borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"1.5rem"}}>
          © 2026 Vedhu &amp; Vedha Foods. All rights reserved. &nbsp;|&nbsp; Vetapalem, Andhra Pradesh &nbsp;|&nbsp; +91 9989123535
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const navigate = (p) => { setPage(p); setProduct(null); setMenuOpen(false); };

  useEffect(()=>{ window.scrollTo(0,0); setMenuOpen(false); },[page, product]);

  return (
    <div>
      <style>{S}</style>
      <Navbar page={page} setPage={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <main>
        {product ? (
          <ProductDetail product={product} onBack={()=>setProduct(null)}/>
        ) : page==="home" ? (
          <HomePage setPage={navigate} setProduct={setProduct}/>
        ) : page==="products" ? (
          <ProductsPage setProduct={setProduct}/>
        ) : page==="about" ? <AboutPage/>
          : page==="ingredients" ? <IngredientsPage/>
          : page==="gallery" ? <GalleryPage/>
          : <ContactPage/>
        }
      </main>
      <Footer/>
    </div>
  );
}