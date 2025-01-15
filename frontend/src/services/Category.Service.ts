const URL = "http://localhost:3000/categories"

export async function createCategory({ name }: { name: string }) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, plants: [] }),
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

export async function updateCategory(id: string, { name }: { name: string }) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
