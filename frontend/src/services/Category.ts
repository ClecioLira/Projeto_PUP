import { deletePlantsByCategory } from "./Plant";

const URL_CATEGORY = "http://localhost:3000/categories";

export async function createCategory({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const res = await fetch(URL_CATEGORY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image, plants: [] }),
  });

  return res.json();
}

export async function getCategories() {
  const res = await fetch(URL_CATEGORY);
  return res.json();
}

export async function getCategoryById(id: string) {
  const res = await fetch(`${URL_CATEGORY}/${id}`);
  if (!res.ok) {
    throw new Error(`Category with ID ${id} not found`);
  }
  return res.json();
}

export async function updateCategory(
  id: string,
  { name, image }: { name: string; image: string }
) {
  const res = await fetch(`${URL_CATEGORY}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image }),
  });

  return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
  await deletePlantsByCategory(id);

  await fetch(`${URL_CATEGORY}/${id}`, {
    method: "DELETE",
  });
}