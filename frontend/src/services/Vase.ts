const URL_VASE = "https://fake-api-pup.onrender.com/vases";

export async function createVase({
  name,
  image,
  price,
  description,
}: {
  name: string;
  image: string;
  price: string;
  description: string;
}) {
  const res = await fetch(URL_VASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image, price, description }),
  });

  return res.json();
}

export async function getVases() {
  const res = await fetch(URL_VASE);
  return res.json();
}

export async function getVaseById(id: string) {
  const res = await fetch(`${URL_VASE}/${id}`);
  if (!res.ok) {
    throw new Error(`Vase with ID ${id} not found`);
  }
  return res.json();
}

export async function updateVase(
  id: string,
  {
    name,
    image,
    price,
    description,
  }: { name: string; image: string; price: string; description: string }
) {
  const res = await fetch(`${URL_VASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image, price, description }),
  });

  return res.json();
}

export async function deleteVase(id: string): Promise<void> {
  await fetch(`${URL_VASE}/${id}`, {
    method: "DELETE",
  });
}
