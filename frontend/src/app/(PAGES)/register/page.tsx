import { Button, TextField } from "@mui/material";

export default function Register() {
  return (
    <section className="container">
      <div>
        <h1>Cadastro</h1>
        <small>Cadastre sua conta para comprar suas novas plantas.</small>
      </div>

      <form className="form-container">
        <TextField required id="outlined" label="Nome" type="text" color="success" />

        <TextField required id="outlined" label="E-mail" type="email" color="success" />

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
