import Image from "next/image";
import banner from "../../assets/Images/banner.jpg";

export default function ImageHome() {
  return (
    <section className="sectionImage" style={{ position: "relative", width: "100%" }}>
      <Image
        src={banner}
        alt="Banner"
        fill
        quality={100}
        priority
      />

      <p>Plante uma Planta</p>
    </section>
  );
}
