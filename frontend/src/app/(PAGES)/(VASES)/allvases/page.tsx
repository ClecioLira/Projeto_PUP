"use client";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import { getVases } from "@/services/Vase.Service";
import TableVases from "@/components/Table/TableVases";

interface Vase {
  id: string;
  name: string;
  image: string;
}

export default function AllVases() {
  const [vases, setVases] = useState<Vase[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllVases() {
      try {
        const vasesData = await getVases();
        setVases(vasesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllVases();
  }, []);

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
    return <p>Erro ao carregar os vasos</p>;
  }

  return (
    <section className="container">
      <TableVases vases={vases} setVases={setVases} />
    </section>
  );
}
