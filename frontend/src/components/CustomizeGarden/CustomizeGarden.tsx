import Image from "next/image";
import garden from "@/assets/images/garden.jpeg";

export default function CustomizeGarden() {
  return (
    <section className="flex flex-col p-4 mt-8 items-center justify-center">
      <div className="p-4 bg-white rounded-md shadow-md shadow-gray-500 flex flex-col md:flex-row gap-4 md:w-10/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12">
        <div className="md:w-1/2">
          <h2 className="font-semibold text-2xl mb-4">Customize seu Jardim.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nihil
            odio dolor numquam accusantium, vitae reprehenderit nam veniam
            incidunt quibusdam sint harum in hic quae, temporibus praesentium
            iusto. Sapiente, impedit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Culpa nihil odio dolor numquam accusantium, vitae
            reprehenderit nam veniam incidunt quibusdam sint harum in hic quae,
            temporibus praesentium iusto. Sapiente, impedit.
          </p>
        </div>
        <Image
          src={garden}
          alt="Banner"
          quality={100}
          loading="lazy"
          className="md:w-1/2 object-cover"
        />
      </div>
    </section>
  );
}
