import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

interface Category {
  id: number;
  name: string;
}

interface TableComponentProps {
    categories: Category[];
}

export default function TableComponent({categories}: TableComponentProps) {
  return (
    <section className="container">
      <table>
        <TableContainer>
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

                  <TableCell align="right">
                    <Button>Editar</Button>
                  </TableCell>

                  <TableCell align="right">
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
