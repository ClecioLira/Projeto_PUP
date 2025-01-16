"use client";

import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { createPlant } from "@/services/Plant.Service";
import SelectCategory from "@/components/SelectCategory/SelectCategory";

export default function CreatePlant() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      setError(true);
      return;
    }

    setSuccess(false);
    setError(false);

    try {
      setLoading(true);
      await createPlant({ name, image, description, category });
      setSuccess(true);
      setName("");
      setImage("");
      setDescription("");
      setCategory("");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <header>
        <h1>Criar Planta</h1>
      </header>

      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined"
          label="Nome da Planta"
          type="text"
          color="success"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          id="outlined"
          label="URL da Imagem"
          type="text"
          color="success"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <TextField
          required
          id="outlined-textarea"
          label="Descrição da Planta"
          placeholder="Placeholder"
          color="success"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />

        <SelectCategory selectedCategory={category} onSelectCategory={(value) => setCategory(value)}/>

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
