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
import { useEffect, useState } from "react";
import { updatePlant, getPlantById } from "@/services/Plant.Service";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import SelectCategory from "@/components/SelectCategory/SelectCategory";

export default function EditPlant() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlant = async () => {
      if (typeof id === "string") {
        try {
          const plant = await getPlantById(id);
          setName(plant.name);
          setImage(plant.image);
          setPrice(plant.price);
          setDescription(plant.description);
          setCategory(plant.category);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchPlant();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (typeof id === "string") {
      try {
        setLoading(true);
        await updatePlant(id, { name, image, price, description, category });
        setSuccess(true);
        router.push("/allplants");
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
        <h1>Editar planta</h1>
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
              label="Amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              color="success"
            />
          </FormControl>

          <SelectCategory
            selectedCategory={category}
            onSelectCategory={(value) => setCategory(value)}
          />
        </div>

        <Button
          type="submit"
          className="btn-enter"
          color="success"
          variant="outlined"
        >
          {!loading && <span>Editar</span>}
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
          <Alert severity="success">Planta editada com sucesso.</Alert>
        )}
        {error && (
          <Alert severity="error">
            Erro ao editar planta, tente novamente mais tarde.
          </Alert>
        )}
      </form>
    </section>
  );
}
