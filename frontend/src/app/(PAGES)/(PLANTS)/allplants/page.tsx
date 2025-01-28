"use client";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getPlants } from "@/services/Plant";
import { getCategories } from "@/services/Category";
import { deletePlant } from "@/services/Plant";
import { DialogContent, DialogContentText } from "@mui/material";

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

export default function AllCategories() {
  const [plants, setPlants] = useState<Plants[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
  }, []);

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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeletePlant = async (plantId: string) => {
    try {
      await deletePlant(plantId);
      setPlants(plants.filter((plant) => plant.id !== plantId));
    } catch (error) {
      console.error(error);
    }
  };

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
    return <p>Erro ao carregar as plantas</p>;
  }

  return (
    <section className="h-screen bg-green-50">
      <div className="flex justify-center pt-10">
        <TableContainer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table
            sx={{ maxWidth: 700, padding: "0 1rem" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nome da Planta</TableCell>
                <TableCell className="hidden md:table-cell">Nome da Categoria</TableCell>

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
                  <TableRow key={plant.id}>
                    <TableCell component="th" scope="row">
                      <span>{plant.name}</span>
                    </TableCell>

                    <TableCell className="hidden md:table-cell" component="th" scope="row">
                      <span className="break-all">
                        {filterCategory(plant.category)}{" "}
                      </span>
                    </TableCell>

                    <TableCell align="right">
                      <Link href={`/editplant/${plant.id}`}>
                        <Button color="success" variant="contained">
                          <span className="hidden md:block pr-2">Editar</span>
                          <FaRegEdit />
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="right">
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleClickOpen}
                        >
                          <span className="hidden md:block pr-2">Apagar</span>
                          <FaRegTrashCan />
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogContent>
                            <DialogContentText>
                              Tem certeza que deseja apagar esta categoria?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              style={{ color: "#000" }}
                              autoFocus
                              onClick={handleClose}
                            >
                              Cancelar
                            </Button>
                            <Button
                              color="error"
                              onClick={() => {
                                handleClose();
                                handleDeletePlant(plant.id);
                              }}
                              autoFocus
                            >
                              Apagar
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}
