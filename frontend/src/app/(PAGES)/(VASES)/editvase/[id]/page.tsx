"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateVase, getVaseById } from "@/services/Vase";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditVase() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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

  useEffect(() => {
    const fetchVase = async () => {
      if (typeof id === "string") {
        try {
          const vase = await getVaseById(id);
          setName(vase.name);
          setImage(vase.image);
          setPrice(vase.price);
          setDescription(vase.description);
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
        await updateVase(id, { name, image, price, description });
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
    <section className="h-screen pt-10 bg-green-50">
      <div className="flex justify-center pt-10">
        <Card
          style={{
            width: "400px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "1rem 0",
            margin: "0 0.5rem",
          }}
        >
          <CardContent>
            <Typography
              style={{ marginBottom: "1rem" }}
              variant="h5"
              component="h1"
              align="center"
              gutterBottom
            >
              Editar Vaso
            </Typography>

            <form
              className="form-container"
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
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

              <FormControl>
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
