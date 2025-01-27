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
import Link from "next/link";
import { getVases } from "@/services/Vase.Service";
import { Button } from "@mui/material";

interface Vase {
  id: string;
  name: string;
  image: string;
  price: string;
}

export default function Vases() {
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
          <CircularProgress size="5rem" color="success" />
        </Box>
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar os vasos.</p>;
  }

  return (
    <div className="container-card">
      <h2>Vasos</h2>

      <div className="list-cards">
        {vases
          .map((vase) => (
            <Link key={vase.id} href={`/vasedetail/${vase.id}`}>
              <Card sx={{ maxWidth: 150 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className="img-card-fixed"
                    image={vase.image}
                    alt={vase.name}
                  />
                  <CardContent>
                    <div className="content">
                      <Typography
                        gutterBottom
                        variant="body2"
                        fontWeight="600"
                        component="div"
                      >
                        {vase.name}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
                        R$ {vase.price}
                      </Typography>
                    </div>

                    <Button
                      className="btn-buy"
                      variant="contained"
                      color="success"
                    >
                      Comprar
                    </Button>
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
