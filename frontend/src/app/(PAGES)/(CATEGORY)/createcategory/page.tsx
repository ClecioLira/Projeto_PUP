"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createCategory } from "@/services/Category";
import Link from "next/link";

const CreateCategory = () => {
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
      await createCategory({ name, image });
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
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Criar Categoria
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                required
                id="outlined"
                label="Nome da Categoria"
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

              <Button
                type="submit"
                className="btn-enter"
                color="success"
                variant="outlined"
              >
                {!loading && <span>Criar</span>}
                {loading && <span>Aguarde...</span>}
              </Button>

              <Link href="/allcategories">
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
                <Alert severity="success">Categoria criada com sucesso.</Alert>
              )}
              {error && (
                <Alert severity="error">
                  Erro ao criar categoria, tente novamente mais tarde.
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreateCategory;
