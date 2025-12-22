import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  AboutSection,
  BookTableSection,
  Footer,
  Header,
  HeroSection,
  PopularItems,
  TestimonialSection,
} from "../components";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <PopularItems />
      <BookTableSection />
      <TestimonialSection />
      <Footer />
      <SpeedInsights />
    </div>
  )
}
