"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateCategory, getCategoryById } from "@/services/Category";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (typeof id === "string") {
        try {
          const category = await getCategoryById(id);
          setName(category.name);
          setImage(category.image);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (typeof id === "string") {
      try {
        setLoading(true);
        await updateCategory(id, { name, image });
        setSuccess(true);
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
            <Typography style={{marginBottom: '1rem'}} variant="h5" component="h1" align="center" gutterBottom>
              Editar Categoria
            </Typography>

            <form
              className="form-container"
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
                {!loading && <span>Editar</span>}
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
                <Alert severity="success">Categoria editada com sucesso.</Alert>
              )}
              {error && (
                <Alert severity="error">
                  Erro ao editar categoria, tente novamente mais tarde.
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
