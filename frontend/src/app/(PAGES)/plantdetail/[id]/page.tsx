"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getPlantById } from "@/services/Plant.Service";
import { Box, CircularProgress } from "@mui/material";

interface Plant {
  id: string;
  name: string;
  image: string;
  price: string;
  newPrice: string;
  description: string;
  category: string;
}
export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState<Plant>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlant() {
      try {
        if (typeof id === "string") {
          const plantData = await getPlantById(id);
          setPlant(plantData);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPlant();
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
    return <p>Erro ao carregar a planta</p>;
  }

  return <h1>Detalhes da Planta {plant?.name}</h1>;
}
