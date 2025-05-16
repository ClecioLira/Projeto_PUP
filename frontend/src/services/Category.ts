const URL_CATEGORY = "https://fake-api-pup.onrender.com/api/categories";

export async function createCategory({
  name,
  image,
}: {
  name: string;
  image: File;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const res = await fetch(URL_CATEGORY!, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function getCategories() {
  const res = await fetch(URL_CATEGORY, {
    method: "GET",
  });

  return res.json();
}

export async function getCategory(id: string) {
  const res = await fetch(`${URL_CATEGORY!}/${id}`, {
    method: "GET",
  });

  return res.json();
}

export async function updateCategory({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: File;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const res = await fetch(`${URL_CATEGORY!}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${URL_CATEGORY!}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
