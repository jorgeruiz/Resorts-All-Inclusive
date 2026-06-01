import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Paquetes from "@/components/Paquetes";
import HotelesCarrusel from "@/components/HotelesCarrusel";
import Beneficios from "@/components/Beneficios";
import Testimonios from "@/components/Testimonios";
import FAQs from "@/components/FAQs";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Paquetes />
        <HotelesCarrusel />
        <Beneficios />
        <Testimonios />
        <FAQs />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
