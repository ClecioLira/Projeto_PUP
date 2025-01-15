"use client";

import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { createCategory } from "../../../../services/Category.Service";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      setLoading(true);
      await createCategory({ name });
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }

    setName("");
  };

  return (
    <section className="container">
      <header>
        <h1>Criar categoria</h1>
      </header>

      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined"
          label="Nome da Categoria"
          type="text"
          color="success"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        {success && (
          <Alert severity="success">Categoria criada com sucesso.</Alert>
        )}
        {error && (
          <Alert severity="error">
            Erro ao criar categoria, tente novamente mais tarde.
          </Alert>
        )}
      </form>
    </section>
  );
}
