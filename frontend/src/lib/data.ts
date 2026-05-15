import jhumkaImg from "@/assets/p-jhumka.jpg";
import womenKurthaImg from "@/assets/p-women-kurtha.jpg";
import menKurthaImg from "@/assets/p-men-kurtha.jpg";
import shoesImg from "@/assets/p-shoes.jpg";
import sneakersImg from "@/assets/p-sneakers.jpg";
import festivalImg from "@/assets/p-festival.jpg";
import catJhumka from "@/assets/cat-jhumka.jpg";
import catWomenKurtha from "@/assets/cat-women-kurtha.jpg";
import catMenKurtha from "@/assets/cat-men-kurtha.jpg";
import catWomenShoes from "@/assets/cat-women-shoes.jpg";
import catMenShoes from "@/assets/cat-men-shoes.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import catCouple from "@/assets/cat-couple.jpg";
import catNew from "@/assets/cat-new.jpg";

export type Product = {
  id: string;
  name: string;
  material: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage: string;
  category: "jhumka" | "kurtha" | "footwear" | "accessories";
  gender: "women" | "men" | "unisex";
  colors: string[];
  sizes: string[];
  badge?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "silver-temple-jhumka",
    name: "Silver Temple Jhumka",
    material: "Oxidized 925 silver",
    price: 3490,
    oldPrice: 4200,
    image: jhumkaImg,
    hoverImage: catJhumka,
    category: "jhumka",
    gender: "women",
    colors: ["#c9c2b8", "#8a7a5c"],
    sizes: ["One size"],
    badge: "Bestseller",
    description: "Hand-finished temple-style jhumka inspired by Patan's metal artisans. Lightweight, ear-friendly hooks.",
  },
  {
    id: "embroidered-women-kurtha",
    name: "Embroidered Saffron Kurtha",
    material: "Handloom cotton",
    price: 5890,
    image: womenKurthaImg,
    hoverImage: catWomenKurtha,
    category: "kurtha",
    gender: "women",
    colors: ["#d97a3a", "#7a1d1d"],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New",
    description: "Saffron-toned kurtha with hand-embroidered yoke. Cut for everyday flow.",
  },
  {
    id: "men-cotton-kurtha",
    name: "Men's Cream Cotton Kurtha",
    material: "Breathable handloom cotton",
    price: 4990,
    image: menKurthaImg,
    hoverImage: catMenKurtha,
    category: "kurtha",
    gender: "men",
    colors: ["#f1e6c8", "#1a1a1a"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Mandarin-collar kurtha with subtle gold placket detail. Festival to office.",
  },
  {
    id: "handmade-leather-shoes",
    name: "Handmade Leather Derbies",
    material: "Full-grain leather",
    price: 8490,
    oldPrice: 9990,
    image: shoesImg,
    hoverImage: catMenShoes,
    category: "footwear",
    gender: "men",
    colors: ["#5c1f1f", "#2a1a14"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    badge: "-15%",
    description: "Goodyear-welt derbies stitched in Bhaktapur. Develops a beautiful patina with wear.",
  },
  {
    id: "casual-ethnic-sneakers",
    name: "Casual Ethnic Sneakers",
    material: "Canvas + leather trim",
    price: 4290,
    image: sneakersImg,
    hoverImage: catWomenShoes,
    category: "footwear",
    gender: "unisex",
    colors: ["#f1e6c8", "#d97a3a"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    badge: "New",
    description: "Cream sneakers with embroidered star motif. Pairs effortlessly with kurthas or denim.",
  },
  {
    id: "festival-kurtha-set",
    name: "Festival Wear Kurtha Set",
    material: "Silk-blend with zari",
    price: 12490,
    oldPrice: 14990,
    image: festivalImg,
    hoverImage: catWomenKurtha,
    category: "kurtha",
    gender: "women",
    colors: ["#7a1d1d", "#caa040"],
    sizes: ["S", "M", "L", "XL"],
    badge: "Festival",
    description: "Three-piece festival set with rich zari work and matching dupatta.",
  },
];

export const categories = [
  { slug: "jhumka", title: "Girls Jhumka Collection", image: catJhumka, href: "/jhumka" },
  { slug: "women-kurtha", title: "Women Kurtha Collection", image: catWomenKurtha, href: "/women" },
  { slug: "men-kurtha", title: "Men's Kurtha & Traditional", image: catMenKurtha, href: "/men" },
  { slug: "women-shoes", title: "Women's Shoes", image: catWomenShoes, href: "/footwear?gender=women" },
  { slug: "men-shoes", title: "Men's Shoes", image: catMenShoes, href: "/footwear?gender=men" },
  { slug: "accessories", title: "Bags & Accessories", image: catAccessories, href: "/accessories" },
  { slug: "couple", title: "Couple Collections", image: catCouple, href: "/women" },
  { slug: "new", title: "New Arrivals", image: catNew, href: "/women" },
];

export const stories = [
  { id: "1", title: "The Himalayan Street Edit", excerpt: "How young Kathmandu is rewriting ethnic style.", date: "May 2026", tag: "Editorial", image: catCouple },
  { id: "2", title: "Threads of Patan: An Artisan Story", excerpt: "Meet the silversmiths behind our jhumka line.", date: "Apr 2026", tag: "Artisans", image: catJhumka },
  { id: "3", title: "Monsoon Layering Guide", excerpt: "Five ways to style a kurtha this season.", date: "Apr 2026", tag: "Styling", image: catWomenKurtha },
  { id: "4", title: "Trekking the Annapurna in Cream", excerpt: "Travel notes from our spring lookbook shoot.", date: "Mar 2026", tag: "Travel", image: catNew },
];

export const stores = [
  { id: "ktm", city: "Kathmandu", address: "Durbar Marg, Kathmandu 44600", phone: "+977 1 442 0000", hours: "Mon–Sun · 10:00–20:00" },
  { id: "pkr", city: "Pokhara", address: "Lakeside Rd, Pokhara 33700", phone: "+977 61 446 100", hours: "Mon–Sun · 11:00–21:00" },
  { id: "ltp", city: "Lalitpur Pickup", address: "Jhamsikhel, Lalitpur 44700", phone: "+977 1 555 9090", hours: "Mon–Sat · 11:00–19:00" },
];
