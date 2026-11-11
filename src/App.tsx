import { Header } from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { Footer } from "./components/Footer";
import { Wave } from "./components/ui/Wave";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Benefits } from "./components/sections/Benefits";
import { Trainings } from "./components/sections/Trainings";
import { Immersive } from "./components/sections/Immersive";
import { Testimonials } from "./components/sections/Testimonials";
import { Plans } from "./components/sections/Plans";
import { TrialForm } from "./components/sections/TrialForm";
import { Location } from "./components/sections/Location";
import { Gallery } from "./components/sections/Gallery";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

const NAVY = "var(--color-navy-950)";
const SAND = "var(--color-sand-50)";
const SKY = "var(--color-sky-100)";

export default function App() {
  useSmoothScroll();
  useScrollAnimations();

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <Wave from={NAVY} to={SAND} />
        <About />
        <Wave from={SAND} to={SKY} />
        <Benefits />
        <Wave from={SKY} to={NAVY} />
        <Trainings />
        <Immersive />
        <Testimonials />
        <Wave from={SKY} to={SAND} />
        <Plans />
        <Wave from={SAND} to={NAVY} />
        <Gallery />
        <TrialForm />
        <Wave from={NAVY} to={SAND} />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
