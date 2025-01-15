import { Button, TextField } from "@mui/material";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plante uma Planta | Entrar",
};

export default function Login() {
  return (
    <section className="container">
      <header>
        <h1>Entrar</h1>
        <small>Entre em sua conta para comprar suas novas plantas.</small>
      </header>

      <form className="form-container">
        <TextField
          required
          id="outlined"
          autoComplete="off"
          type="email"
          label="E-mail"
          color="success"
        />

        <TextField
          required
          id="outlined-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
          color="success"
        />

        <Button
          type="submit"
          className="btn-enter"
          color="success"
          variant="outlined"
        >
          Entrar
        </Button>
      </form>
    </section>
  );
}
