import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { deleteCategory } from "@/services/Category.Service";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface TableComponentProps {
  categories: Category[];
  onDelete: (categoryId: string) => void;
}

export default function TableComponent({
  categories,
  onDelete,
}: TableComponentProps) {
  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      onDelete(categoryId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container">
      <table>
        <TableContainer>
          <Table sx={{ maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome da Categoria</TableCell>

                <TableCell>
                  <Link href="/createcategory">
                    <Button color="success">Criar Nova Categoria</Button>
                  </Link>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.name}
                    </TableCell>

                    <TableCell align="right">
                      <Button>Editar</Button>
                    </TableCell>

                    <TableCell align="right">
                      <ButtonDelete
                        categoryId={category.id}
                        onDelete={() => handleDelete(category.id)}
                      />
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
