const URL_CATEGORY = "https://fake-api-pup.onrender.com/api/plants";

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
  image: File;
  price: string;
  description: string;
  category: string;
  bestSelling: boolean;
  trend: boolean;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("category", category);
  if (bestSelling) {
    formData.append("bestSelling", bestSelling.toString());
  }
  if (trend) {
    formData.append("trend", trend.toString());
  }
  const res = await fetch(URL_CATEGORY, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function getPlants() {
  const res = await fetch(URL_CATEGORY, {
    method: "GET",
  });

  return res.json();
}

export async function getPlant(id: string) {
  const res = await fetch(`${URL_CATEGORY}/${id}`, {
    method: "GET",
  });

  return res.json();
}

export async function updatePlant({
  id,
  name,
  image,
  price,
  newPrice,
  description,
  category,
  bestSelling,
  trend,
}: {
  id: string;
  name: string;
  image: File;
  price: string;
  newPrice?: string;
  description: string;
  category: string;
  bestSelling?: boolean;
  trend?: boolean;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  if (newPrice) {
    formData.append("newPrice", newPrice);
  }
  formData.append("description", description);
  formData.append("category", category);
  if (bestSelling) {
    formData.append("bestSelling", bestSelling.toString());
  }
  if (trend) {
    formData.append("trend", trend.toString());
  }

  const res = await fetch(`${URL_CATEGORY}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
}

export async function deletePlant(id: string) {
  const res = await fetch(`${URL_CATEGORY}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
