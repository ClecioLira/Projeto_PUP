const URL_VASE = "http://localhost:3000/vases";

export async function createVase({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const res = await fetch(URL_VASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image }),
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
  { name, image }: { name: string; image: string }
) {
  const res = await fetch(`${URL_VASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, image }),
  });

  return res.json();
}

export async function deleteVase(id: string): Promise<void> {
  await fetch(`${URL_VASE}/${id}`, {
    method: "DELETE",
  });
}