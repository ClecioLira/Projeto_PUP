"use client";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import { getPlants } from "@/services/Plant.Service";
import TablePlantsComponent from "@/components/Table/TablePlants";

interface Plants {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
}

export default function AllPlants() {
  const [plants, setPlants] = useState<Plants[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPlants() {
      try {
        const plantsData = await getPlants();
        setPlants(plantsData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPlants();
  }, [plants]);

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
    return <p>Erro ao carregar as plantas</p>;
  }

  return (
    <section className="container">
      <TablePlantsComponent setPlants={setPlants} plants={plants}/>
    </section>
  );
}
