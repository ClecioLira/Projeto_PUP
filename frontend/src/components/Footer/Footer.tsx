import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="https://mui.com/">
        Clécio Lira
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <section className="bg-gradient-to-r p-4 from-green-500 to-green-900 w-full text-white">
      <div className="flex justify-around">
        <h5 className="font-semibold text-2xl">Plante uma Planta</h5>
        <div>
          <ul>
            <li>
              <Link href={""}>Sobre</Link>
            </li>
            <li>
              <Link href={""}>Contatos</Link>
            </li>
            <li>
              <Link href={""}>Politica de privacidade</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <FaFacebook />
          <AiFillInstagram />
          <FaSquareXTwitter />
        </div>
      </div>
      <div className="text-center pt-4">
        <Copyright />
      </div>
    </section>
  );
}
