const URL_VASE = "https://fake-api-pup.onrender.com/api/vases";

export async function createVase({
  name,
  image,
  price,
  description,
}: {
  name: string;
  image: File;
  price: string;
  description: string;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);

  const res = await fetch(URL_VASE, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function getVases() {
  const res = await fetch(URL_VASE, {
    method: "GET",
  });

  return res.json();
}

export async function getVase(id: string) {
  const res = await fetch(`${URL_VASE}/${id}`, {
    method: "GET",
  });

  return res.json();
}

export async function updateVase({
  id,
  name,
  image,
  price,
  description,
}: {
  id: string;
  name: string;
  image: File;
  price: string;
  description: string;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);

  const res = await fetch(`${URL_VASE}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
}

export async function deleteVase(id: string) {
  const res = await fetch(`${URL_VASE}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
