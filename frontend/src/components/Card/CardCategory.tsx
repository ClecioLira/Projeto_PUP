"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import { getCategories } from "../../services/Category.Service";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
}

export default function CardCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllCategories();
  }, [categories]);

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
      <h2>Categorias</h2>

      <div className="list-cards-categories">
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <Link href={`/category/${category.id}`}>
              <Card sx={{ maxWidth: 150 }} key={category.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className="img-category-fixed"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))
          .sort()}
      </div>
    </div>
  );
}
