import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import Pricing from "@/components/Pricing";
import ApplicationStatus from "@/components/ApplicationStatus";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <Team />
        <Pricing />
        <ApplicationStatus />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
