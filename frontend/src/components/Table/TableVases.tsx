import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

import ButtonDelete from "../ButtonDelete/ButtonDeleteCategory";
import { deleteVase } from "@/services/Vase.Service";
import Link from "next/link";

interface Vase {
  id: string;
  name: string;
  image: string;
}

export default function TableVases({
  vases,
  setVases,
}: { vases: Vase[], setVases: (vases: Vase[]) => void }) {
  const handleDeleteVase = async (vaseId: string) => {
        try {
          await deleteVase(vaseId);
          setVases(vases.filter((vase) => vase.id !== vaseId));
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <section className="container">
        <TableContainer>
          <Table sx={{ maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome do Vaso</TableCell>

                <TableCell>
                  <Link href="/createvase">
                    <Button color="success">Criar Novo Vaso</Button>
                  </Link>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vases
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((vase) => (
                  <TableRow
                    key={vase.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {vase.name}
                    </TableCell>

                    <TableCell align="right">
                      <Link href={`/editvase/${vase.id}`}>
                        <Button>Editar</Button>
                      </Link>
                    </TableCell>

                    <TableCell align="right">
                      <ButtonDelete
                        categoryId={vase.id}
                        onDelete={() => handleDeleteVase(vase.id)}
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
