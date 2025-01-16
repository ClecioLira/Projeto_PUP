const URL = "http://localhost:3000/categories";

export async function createCategory({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image, plants: [] }),
  });

  return res.json();
}

export async function getCategories() {
  const res = await fetch(URL);
  return res.json();
}

export async function getCategoryById(id: string) {
  const res = await fetch(`${URL}/${id}`);
  return res.json();
}

export async function updateCategory(
  id: string,
  { name, image }: { name: string; image: string }
) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image }),
  });

  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to parse response as JSON");
  }
}
