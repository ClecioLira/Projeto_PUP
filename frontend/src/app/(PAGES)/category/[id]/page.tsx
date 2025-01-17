"use client";

import { useParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { getCategories } from "@/services/Category.Service";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
  plants: [
    {
      id: string;
      name: string;
      image: string;
      price: string;
      description: string;
      category: string;
    }
  ];
}

export default function Plants() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(
          categoriesData.filter((category: Category) => category.id === id)
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllCategories();
  }, []);

  if (loading) {
    return (
      <div className="progress">
        <Box sx={{ display: "flex" }}>
          <CircularProgress size="5rem" color="success" />
        </Box>
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar as categorias</p>;
  }
  return (
    <div className="card-categories">
        <h2>Plantas {categories[0]?.name}</h2>

      <p></p>
      <div className="list-cards-categories">
        {categories &&
          categories.map((category) =>
            category.plants.map((plant) => (
                <Card sx={{ maxWidth: 150 }} key={plant.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      className="img-category-fixed"
                      image={plant.image}
                      alt={plant.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="body2" component="div">
                        {plant.name}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
                        {plant.price}
                      </Typography>
                      <Link href={``}>
                        <Button variant="contained" color="success">Comprar</Button>
                      </Link>
                    </CardContent>
                  </CardActionArea>
                </Card>
            ))
          )}
      </div>
    </div>
  );
}
