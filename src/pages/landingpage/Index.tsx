import Hero from "./Hero";
import Reward from "./Reward";
import Contributors from "./Contributors";
import Faqs from "./Faqs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LandingPage(): JSX.Element {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Reward />
      <Contributors />
      <Faqs />
      <Footer />
    </main>
  );
}
