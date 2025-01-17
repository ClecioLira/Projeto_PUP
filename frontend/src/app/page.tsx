import CardCategory from "@/components/Card/CardCategory";
import ImageHome from "@/components/ImageHome/ImageHome";

export default function Home() {
  return (
    <main>
      <ImageHome />

      <section className="container">
        <CardCategory/>
      </section>
    </main>
  );
}
