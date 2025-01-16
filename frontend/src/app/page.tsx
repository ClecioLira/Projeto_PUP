import CardCategory from "@/components/CardCategory/CardCategory";
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
