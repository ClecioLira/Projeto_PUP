"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

import ButtonDeletePlant from "../ButtonDelete/ButtonDeletePlant";
import { getCategories } from "@/services/Category.Service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deletePlant } from "@/services/Plant.Service";

interface Plants {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

export default function TablePlantsComponent({ plants, setPlants }: { plants: Plants[], setPlants: (plants: Plants[]) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);

    const handleDeletePlant = async (plantId: string) => {
      try {
        await deletePlant(plantId);
        setPlants(plants.filter((plant) => plant.id !== plantId));
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filterCategory = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId)?.name;
  };

  return (
    <section className="container">
        <TableContainer>
          <Table sx={{ maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome da Planta</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Preço</TableCell>

                <TableCell>
                  <Link href="/createplant">
                    <Button color="success">Criar Nova Planta</Button>
                  </Link>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plants
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((plant) => (
                  <TableRow
                    key={plant.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {plant.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {filterCategory(plant.category)}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {plant.price}
                    </TableCell>

                    <TableCell align="right">
                      <Link href={`/editplant/${plant.id}`}>
                        <Button>Editar</Button>
                      </Link>
                    </TableCell>

                    <TableCell align="right">
                      <ButtonDeletePlant
                        handleDelete={() => handleDeletePlant(plant.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    </section>
  );
}
