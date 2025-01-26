"use client";

import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { createPlant } from "@/services/Plant.Service";
import SelectCategory from "@/components/SelectCategory/SelectCategory";
import Link from "next/link";

export default function CreatePlant() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [trend, setTrend] = useState(false);

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
      await createPlant({
        name,
        image,
        price,
        description,
        category,
        bestSelling,
        trend,
      });
      setSuccess(true);
      setName("");
      setImage("");
      setPrice("");
      setDescription("");
      setCategory("");
      setBestSelling(false);
      setTrend(false);
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
          color="success"
          value={description}
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
              value={price}
              onChange={handlePriceChange}
              color="success"
            />
          </FormControl>

          <SelectCategory
            selectedCategory={category}
            onSelectCategory={(value) => setCategory(value)}
          />
        </div>

        <div className="form-container-div">
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                value={bestSelling}
                onChange={(e) => setBestSelling(e.target.checked)}
              />
            }
            label="Mais Vendidos"
          />

          <FormControlLabel
            control={
              <Checkbox
                color="success"
                value={trend}
                onChange={(e) => setTrend(e.target.checked)}
              />
            }
            label="Trend"
          />
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

        <Link href="/allplants">
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
          <Alert severity="success">Planta criada com sucesso.</Alert>
        )}
        {error && (
          <Alert severity="error">
            Erro ao criar planta, tente novamente mais tarde.
          </Alert>
        )}
      </form>
    </section>
  );
}
