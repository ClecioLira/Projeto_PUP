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
import { getPlants } from "@/services/Plant.Service";
import { Button } from "@mui/material";

interface Plant {
  id: string;
  name: string;
  image: string;
  price: string;
  trend: boolean;
}

export default function Trend() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllTrend() {
      try {
        const plantsData = await getPlants();
        setPlants(plantsData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllTrend();
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
    return <p>Erro ao carregar as trends.</p>;
  }

  return (
    <div className="container-card">
      <h2>Trends</h2>

      <div className="list-cards">
        {plants
          .filter((plant) => plant.trend)
          .map((plant) => (
            <Link key={plant.id} href={`/plantdetail/${plant.id}`}>
              <Card sx={{ maxWidth: 150 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className="img-card-fixed"
                    image={plant.image}
                    alt={plant.name}
                  />
                  <CardContent>
                    <div className="content">
                      <Typography
                        gutterBottom
                        variant="body2"
                        fontWeight="600"
                        component="div"
                      >
                        {plant.name}
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
                        R$ {plant.price}
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
