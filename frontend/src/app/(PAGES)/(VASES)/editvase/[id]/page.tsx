"use client";

import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateVase, getVaseById } from "@/services/Vase.Service";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditVase() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVase = async () => {
      if (typeof id === "string") {
        try {
          const vase = await getVaseById(id);
          setName(vase.name);
          setImage(vase.image);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchVase();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (typeof id === "string") {
      try {
        setLoading(true);
        await updateVase(id, { name, image });
        setSuccess(true);
        router.push("/allvases");
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="container">
      <header>
        <h1>Editar vaso</h1>
      </header>

      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined"
          label="Nome do Vaso"
          type="text"
          color="success"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          id="outlined"
          label="URL da Imagem"
          type="text"
          color="success"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button
          type="submit"
          className="btn-enter"
          color="success"
          variant="outlined"
        >
          {!loading && <span>Editar</span>}
          {loading && <span>Aguarde...</span>}
        </Button>

        <Link href="/allvases">
          <Button
            type="submit"
            className="btn-enter"
            variant="outlined"
            color="success"
          >
            Voltar
          </Button>
        </Link>

        {success && (
          <Alert severity="success">Vaso editado com sucesso.</Alert>
        )}
        {error && (
          <Alert severity="error">
            Erro ao editar vaso, tente novamente mais tarde.
          </Alert>
        )}
      </form>
    </section>
  );
}
