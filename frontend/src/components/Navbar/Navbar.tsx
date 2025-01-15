import { Button } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h2>Plante uma Planta</h2>
      <ul>
        <Link href="#">Home</Link>
        <Link href="#">Home</Link>
        <Link href="#">Home</Link>
      </ul>
      <div>
        <Button className="btn">Cadastrar</Button>

        <Link href="/login">
          <Button className="btn">Entrar</Button>
        </Link>
      </div>
    </nav>
  );
}
