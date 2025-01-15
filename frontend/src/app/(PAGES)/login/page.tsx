import { Button, TextField } from "@mui/material";

export default function Login() {
  return (
    <section className="container">
      <form className="login">
        <TextField required id="outlined" label="E-mail" color="success"/>

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
