"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

type MenuCategory =
  | "all"
  | "mains"
  | "specials"
  | "sides"
  | "drinks"
  | "dessert";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  category: MenuCategory;
  img: string;
  badge?: string;
}

const menuData: MenuItem[] = [
  {
    name: "Jerk Chicken",
    desc: "Leg & thigh pieces marinated in Jamaican jerk seasoning. Add sauce: hot, hotter, or sweet.",
    price: "$15 / $19",
    category: "mains",
    img: "https://res.cloudinary.com/the-infatuation/image/upload/f_auto/q_auto/v1665787203/images/LITTLEKINGSTON_JERKCHICKEN_EUGENELEE_LA-07_sfwd8m.jpg",
  },
  {
    name: "Fried Chicken",
    desc: "Lightly battered leg & thigh pieces served with sweet or savory sauce.",
    price: "$15 / $19",
    category: "mains",
    img: "https://www.africanbites.com/wp-content/uploads/2016/07/IMG_9575-625x650.jpg",
  },
  {
    name: "Curry Chicken",
    desc: "Chicken chunks cooked in Jamaican curry, herbs & spices with potatoes.",
    price: "$15 / $19",
    category: "mains",
    img: "https://cdn.apartmenttherapy.info/image/upload/v1695067592/k/Photo/Recipes/2023-09-jamaican-curry-chicken/jamaican-curry-chicken-172-horizontal.jpg",
  },
  {
    name: "Curry Goat",
    desc: "Bone-in goat meat cooked in Jamaican curry, herbs & spices with potatoes.",
    price: "$18",
    category: "mains",
    img: "https://www.africanbites.com/wp-content/uploads/2015/10/IMG_0981-1-600x650.jpg",
  },
  {
    name: "Vegetarian",
    desc: "Various lentils, chickpeas, beans & peas cooked with herbs & spices.",
    price: "$15 / $19",
    category: "mains",
    img: "https://i0.wp.com/italeatsandtreats.com/wp-content/uploads/2022/11/46C8646F-AA11-443B-8EE8-05B764A01AEC.jpeg?resize=1024%2C683&ssl=1",
  },
  {
    name: "Stew Chicken",
    desc: "Leg & thigh pieces (bone in) cooked with herbs & spices, carrots & potatoes.",
    price: "$15 / $19",
    category: "specials",
    img: "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/jeiluwzf/2eb45be7-8f78-4cbc-a85a-d70bc2e4a339.jpg",
    badge: "Wednesday",
  },
  {
    name: "Braised Oxtail Stew",
    desc: "Beef pieces (bone in) cooked with herbs and spices, served with broad beans.",
    price: "$25 / $32",
    category: "specials",
    img: "https://galvinrestaurants.com/wp-content/uploads/2020/05/best-restaurant-near-me-michelin-london-essex-top-french-brasserie-food-bar-pub-spicy-oxtail-stew-recipe-01.jpg",
    badge: "Thursday",
  },
  {
    name: "Pumpkin Soup",
    desc: "With pumpkin, yuca, carrots, scallions, thyme, pimento, coconut milk.",
    price: "$7 / $10",
    category: "specials",
    img: "https://monicaisinthekitchen.wordpress.com/wp-content/uploads/2024/11/img_5389.jpg",
    badge: "Seasonal",
  },
  {
    name: "Red Bean Soup",
    desc: "With pumpkin, yuca, carrots, scallions, thyme, pimento, coconut milk.",
    price: "$7 / $10",
    category: "specials",
    img: "https://www.thespicehouse.com/cdn/shop/articles/Jamaican_Red_Bean_Soup_676x.jpg?v=1586286977",
    badge: "Seasonal",
  },
  {
    name: "Rice & Red Peas",
    desc: "Cooked with coconut milk, herbs & spices.",
    price: "$7",
    category: "sides",
    img: "https://www.franksoupbowl.com/uploads/1/2/9/9/129986250/published/rice-peas.jpg?1583455174",
  },
  {
    name: "Fried Sweet Plantains",
    desc: "Ripe plantains fried golden and caramelized.",
    price: "$6",
    category: "sides",
    img: "https://www.orchidsandsweettea.com/wp-content/uploads/2024/06/Fried-Sweet-Plantain.jpg",
  },
  {
    name: "Jamaican Patty",
    desc: "Choice of Beef, Curry Chicken, Jerk Chicken, Spinach or Veggie.",
    price: "$4.50",
    category: "sides",
    img: "https://static01.nyt.com/images/2017/05/24/dining/24PATTY1/24PATTY1-superJumbo.jpg",
  },
  {
    name: "Mac & Cheese",
    desc: "Choice of plain or jerk chicken.",
    price: "$4.50 / $6",
    category: "sides",
    img: "https://nowyourecooking.ca/wordpress/wp-content/uploads/2021/10/NYC_MacaroniPie-1-500x500.jpg",
  },
  {
    name: "Rum Cake",
    desc: "Rich, moist cake soaked in Caribbean rum.",
    price: "$9",
    category: "dessert",
    img: "https://www.saveur.com/uploads/2021/12/22/Jamaican-fruit-cake-david-molash.jpg?format=webp&optimize=high&precrop=1%3A1%2Csmart",
  },
  {
    name: "Sweet Potato Pudding",
    desc: "Traditional Jamaican sweet potato pudding.",
    price: "$9",
    category: "dessert",
    img: "https://serenalissy.com/wp-content/uploads/2021/11/Jamaican-Sweet-Potato-Pudding-Recipe.jpg",
  },
  {
    name: "Banana Bread",
    desc: "Homemade, moist, and full of flavor.",
    price: "$8",
    category: "dessert",
    img: "https://enrilemoine.com/wp-content/uploads/2023/02/Jamaican-Banana-Bread-enrilemoine-1.jpg",
  },
  {
    name: "D&G Jamaican Soda",
    desc: "Cream Soda, Ginger Beer, Grape, Kola Champagne, Orange, Pineapple, Ting & more.",
    price: "$3+",
    category: "drinks",
    img: "https://132810519.cdn6.editmysite.com/uploads/1/3/2/8/132810519/FFBT3G7MMRY2X6TRDVGUASDD.jpeg",
  },
  {
    name: "Tropical Rhythm Juice",
    desc: "Fruit Punch, Guava Carrot, Island Mango, Sorrel Ginger & more.",
    price: "$4.50",
    category: "drinks",
    img: "https://cdn-dggkc.nitrocdn.com/QCIdsRJkDKVAGFUGEjbuSeAoMCSQbrOe/assets/images/optimized/rev-3ff9d23/wp-content/uploads/2019/12/Taste-of-trelawny-punches-1-1170x780.jpg",
  },
  {
    name: "Jamaican Teas & Tisanes",
    desc: "Chamomile, Cerasee, Lemongrass, Moringa, Sorrel — hot or iced.",
    price: "$4 / $5",
    category: "drinks",
    img: "https://www.seriouseats.com/thmb/HEJrQQ2cZRwf1QkI5RBDe6QADcM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__12__20201222-sorrel-jamaican-hibiscus-drink-vicky-wasik-10-3ac5a8f246db4d71899529c788b25667.jpg",
  },
  {
    name: "Caribbean Beers",
    desc: "Red Stripe, Dragon Stout, Carib, Presidente, Guinness & more.",
    price: "$8 – $9",
    category: "drinks",
    img: "https://shop.jamaicasfinestcocktails.com/cdn/shop/products/RedStripeInstaVer.png?v=1637420342",
  },
];

const categories: { key: MenuCategory; label: string }[] = [
  { key: "specials", label: "Specials" },
  { key: "mains", label: "Mains" },
  { key: "sides", label: "Sides & Extras" },
  { key: "dessert", label: "Dessert" },
  { key: "drinks", label: "Drinks" },
  { key: "all", label: "Full Menu" },
];

export function Menu() {
  const [active, setActive] = useState<MenuCategory>("specials");

  const filtered =
    active === "all" ? menuData : menuData.filter((m) => m.category === active);

  return (
    <section id="menu" className="bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <h2 className="font-[Oswald] text-5xl md:text-7xl font-bold text-dark uppercase mb-2">
            Our Menu
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mt-6 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`font-[Oswald] text-sm uppercase tracking-[0.15em] px-5 py-2 rounded-full border-2 transition-all duration-300 ${
                  active === cat.key
                    ? "bg-fyah border-fyah text-white"
                    : "border-dark/20 text-dark/60 hover:border-fyah hover:text-fyah"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {(active === "all" || active === "mains") && (
          <Reveal>
            <p className="text-dark/40 text-sm mb-8 italic">
              Mains served with Rice &amp; Red Peas or White Rice, Steamed
              Vegetables &amp; Plantains.
            </p>
          </Reveal>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden relative mb-5">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="menu-card-image w-full h-full object-cover"
                  />
                  <span className="absolute bottom-4 left-4 bg-fyah text-white text-sm font-bold font-[Oswald] px-4 py-2 rounded-lg shadow-lg">
                    {item.price}
                  </span>
                  {item.badge && (
                    <span className="absolute top-4 right-4 bg-gold text-dark text-[10px] font-bold font-[Oswald] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-[Oswald] text-xl font-bold text-dark group-hover:text-fyah transition-colors uppercase tracking-wider mb-2">
                  {item.name}
                </h3>
                <p className="text-dark/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal delay={0.2}>
          <div className="text-center mt-14">
            <a
              href="#order"
              className="inline-flex items-center gap-2 bg-fyah hover:bg-fyah-dark text-white font-semibold px-10 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fyah/25"
            >
              Order Now
              <span>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
