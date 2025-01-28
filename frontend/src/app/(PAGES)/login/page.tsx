"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simule o login aqui, por exemplo, faça uma requisição para a API
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="h-screen bg-green-50">
      <div className="flex justify-center pt-10">
        <Card
          style={{
            width: "400px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "1rem 0",
            margin: "0 0.5rem"
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Entrar
            </Typography>

            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                color="success"
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                color="success"
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Entrar
              </Button>
            </form>

            <Typography variant="body2" component="h6" align="center" gutterBottom style={{margin:"1rem 0 0"}}>
              Ainda não tem uma conta? <Link href="/register" className="hover:text-green-500 underline">Cadastre-se</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
