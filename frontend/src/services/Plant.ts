import { getCategoryById } from "./Category";

const URL_PLANT = "http://localhost:4000/plants";
const URL_CATEGORY = "http://localhost:4000/categories";

export async function createPlant({
  name,
  image,
  price,
  description,
  category,
  bestSelling,
  trend,
}: {
  name: string;
  image: string;
  price: string;
  description: string;
  category: string;
  bestSelling?: boolean;
  trend?: boolean;
}) {
  const res = await fetch(URL_PLANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      image,
      price,
      description,
      category,
      bestSelling,
      trend,
    }),
  });

  const plant = await res.json();

  // Adiciona a planta ao array de plantas da categoria selecionada
  await addPlantToCategory(category, plant);

  return plant;
}

export async function addPlantToCategory(categoryId: string, plantId: string) {
  try {
    const category = await getCategoryById(categoryId);
    category.plants.push(plantId);

    await fetch(`${URL_CATEGORY}/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getPlants() {
  const res = await fetch(URL_PLANT);
  return res.json();
}

export async function getPlantById(id: string) {
  const res = await fetch(`${URL_PLANT}/${id}`);
  return res.json();
}

export async function updatePlant(
  id: string,
  {
    name,
    image,
    price,
    newPrice,
    description,
    category,
    bestSelling,
    trend,
  }: {
    name: string;
    image: string;
    price: string;
    newPrice?: string;
    description: string;
    category: string;
    bestSelling?: boolean;
    trend?: boolean;
  }
) {
  const res = await fetch(`${URL_PLANT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      image,
      price,
      newPrice,
      description,
      category,
      bestSelling,
      trend,
    }),
  });

  return res.json();
}

export async function deletePlant(id: string) {
  await fetch(`${URL_PLANT}/${id}`, { method: "DELETE" });

  const categoriesRes = await fetch(URL_CATEGORY);
  const categories = await categoriesRes.json();

  for (const category of categories) {
    if (!Array.isArray(category.plants)) {
      category.plants = [];
    }
    const plantIndex = category.plants.findIndex(
      (plant: any) => plant.id === id
    );
    if (plantIndex !== -1) {
      category.plants.splice(plantIndex, 1);
      await fetch(`${URL_CATEGORY}/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      break;
    }
  }
}

export async function deletePlantsByCategory(
  categoryId: string
): Promise<void> {
  const res = await fetch(URL_PLANT);
  const plants = await res.json();

  const plantsToDelete = plants.filter(
    (plant: any) => plant.category === categoryId
  );

  for (const plant of plantsToDelete) {
    await fetch(`${URL_PLANT}/${plant.id}`, {
      method: "DELETE",
    });
  }
}
