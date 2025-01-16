"use client";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableComponent from "@/components/Table/Table";

import { useState, useEffect } from "react";
import { getCategories } from "../../../../services/Category.Service";

interface Category {
  id: string;
  name: string;
  image: string;
}

export default function AllCategories() {
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
          <CircularProgress size="5rem" color="success"/>
        </Box>
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar as categorias</p>;
  }

  return (
    <section className="container">
      <TableComponent categories={categories}></TableComponent>
    </section>
  );
}
