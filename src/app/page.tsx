import AboutSection from "../components/AboutSection"
import BookTableSection from "../components/BookTableSection"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import PopularItems from "../components/PopularItems"
import TestimonialSection from "../components/TestimonialSection"
// SpeedInsights disabled for now or needs to be re-installed/configured for Next.js if needed (it's @vercel/speed-insights/react mostly for Next.js anyway)
// But let's keep it if it was there.
import { SpeedInsights } from '@vercel/speed-insights/next'; // Next.js version usually

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <PopularItems/>
      <BookTableSection/>
      <TestimonialSection/>
      <Footer/>
      <SpeedInsights />
    </div>
  )
}
