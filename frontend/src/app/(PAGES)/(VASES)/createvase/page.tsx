"use client";

import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { createVase } from "@/services/Vase.Service";
import Link from "next/link";

export default function CreateVase() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      setLoading(true);
      await createVase({ name, image });
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }

    setName("");
    setImage("");
  };

  return (
    <section className="container">
      <header>
        <h1>Criar Vaso</h1>
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
          {!loading && <span>Criar</span>}
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
          <Alert severity="success">Vaso criado com sucesso.</Alert>
        )}
        {error && (
          <Alert severity="error">
            Erro ao criar vaso, tente novamente mais tarde.
          </Alert>
        )}
      </form>
    </section>
  );
}
