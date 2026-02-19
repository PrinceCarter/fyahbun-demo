import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Catering } from "@/components/Catering";
import { HowWeCook } from "@/components/HowWeCook";
import { Testimonials } from "@/components/Testimonials";
import { Instagram } from "@/components/Instagram";
import { OrderSection } from "@/components/OrderSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Catering />
      <HowWeCook />
      <Testimonials />
      <Instagram />
      <OrderSection />
      <Footer />
    </main>
  );
}
