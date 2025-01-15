import { Button, TextField } from "@mui/material";

export default function Login() {
  return (
    <section className="login">
      <form className="container">
        <TextField required id="outlined" label="E-mail" />
        <TextField
          id="outlined-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
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
