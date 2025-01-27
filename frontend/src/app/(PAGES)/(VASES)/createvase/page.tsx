"use client";

import {
  Alert,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { createVase } from "@/services/Vase.Service";
import Link from "next/link";

export default function CreateVase() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (e: any) => {
    let value = e.target.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, "");

    // Formata como número com separadores de milhares e decimais, sem o símbolo da moeda
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);

    setPrice(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      setLoading(true);
      await createVase({ name, image, price, description });
      setSuccess(true);
      setImage("");
      setPrice("");
      setDescription("");
      setName("");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
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
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          id="outlined"
          label="URL da Imagem"
          type="text"
          color="success"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
        />

        <TextField
          required
          id="outlined-textarea"
          label="Descrição do Vaso"
          color="success"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />

        <div className="form-container-div">
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount" color="success">
              Preço
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              label="Preço"
              value={price || ""}
              onChange={handlePriceChange}
              color="success"
            />
          </FormControl>
        </div>

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

        {success && <Alert severity="success">Vaso criado com sucesso.</Alert>}
        {error && (
          <Alert severity="error">
            Erro ao criar vaso, tente novamente mais tarde.
          </Alert>
        )}
      </form>
    </section>
  );
}
