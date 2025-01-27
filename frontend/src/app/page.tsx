import BestSelling from "@/components/BestSelling/BestSelling";
import CardCategory from "@/components/Card/CardCategory";
import ImageHome from "@/components/ImageHome/ImageHome";
import Promo from "@/components/Promo/Promo";
import Trend from "@/components/Trend/Trend";

export default function Home() {
  return (
    <main>
      <ImageHome />

      <section className="container">
        <CardCategory/>
      </section>
    
      <section className="container">
        <BestSelling/>
      </section>

      <section className="container">
        <Trend/>
      </section>

      <section className="container">
        <Promo/>
      </section>
    </main>
  );
}
