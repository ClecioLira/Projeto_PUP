import BestSelling from "@/components/BestSelling/BestSelling";
import CategoriesCarousel from "@/components/Carrosel/Carrosel";
import Offer from "@/components/Offer/Offer";
import Trend from "@/components/Trend/Trend";

export default function Home() {
  return (
    <div className="bg-green-50 h-screen">
      <CategoriesCarousel/>
      <BestSelling/>
      <Trend/>
      <Offer/>
    </div>
  );
}
