import BetaHero from "./components/BetaHero";
import Header from "./components/Header";
import HeroSectionImageWithReviews from "./components/Hero";

export default function Component() {
  return (
    <div className="bg-[#DCCCA3] mt-6 mx-auto w-[95%] border-2 rounded-lg ">
        <Header />
        {/* <HeroSectionImageWithReviews /> */}
        <BetaHero/>
    </div>
  );
}
