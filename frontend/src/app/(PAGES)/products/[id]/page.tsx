"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/Category";
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
  _id: number;
  name: string;
  imageUrl: string;
  plants: [
    {
      _id: string;
      name: string;
      imageUrl: string;
      price: string;
      newPrice: string;
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

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(
          categoriesData.filter((category: Category) => category._id === Number(id))
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
      <div className="flex items-center justify-center bg-green-50 h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress size="5rem" color="success" />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50 h-screen">
        <p className="text-red-600 font-semibold text-xl">
          Ocorreu um erro ao carregar as plantas. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-center text-center pb-14">
      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900 text-center my-6 pb-4">
        Plantas {categories[0]?.name}
      </h2>

      <div className="flex flex-wrap gap-4 justify-center text-center mb-8">
        {categories &&
          categories.map((category) =>
            category.plants.map((plant) => (
              <Card sx={{ maxWidth: 200 }} key={plant._id} className="shadow-md shadow-gray-400 hover:scale-105 transition">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={plant.imageUrl}
                    alt={plant.name}
                    style={{height: '150px', width: '200px'}}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {plant.name}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      R$ {plant.price}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      {plant.newPrice}
                    </Typography>

                    <Link href={`/plantdetail/${plant._id}`}>
                      <Button variant="contained" color="success">
                        Comprar
                      </Button>
                    </Link>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
      </div>
    </main>
  );
}
