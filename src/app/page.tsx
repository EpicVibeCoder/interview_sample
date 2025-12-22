import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";

// Code-split heavier interactive sections (client components) to avoid pulling all
// their JS into the initial bundle through a barrel import.
const PopularItems = dynamic(() => import("@/components/sections/PopularItems").then((m) => m.default));
const BookTableSection = dynamic(() => import("@/components/sections/BookTableSection").then((m) => m.default));
const TestimonialSection = dynamic(() => import("@/components/sections/TestimonialSection").then((m) => m.default));

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <PopularItems />
      <BookTableSection />
      <TestimonialSection />
      <Footer />
      <SpeedInsights />
    </>
  );
}
