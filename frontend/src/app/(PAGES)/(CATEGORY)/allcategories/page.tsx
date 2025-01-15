"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";
import { getCategories } from "../../../../services/Category.Service";
import { Button } from "@mui/material";

interface Category {
  id: string;
  name: string;
}

export default function AllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchAllCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchAllCategories();
  }, []);

  return (
    <section className="container">
      <table>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome da Categoria</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Button>Editar</Button>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Button color="error">Apagar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </table>
    </section>
  );
}
