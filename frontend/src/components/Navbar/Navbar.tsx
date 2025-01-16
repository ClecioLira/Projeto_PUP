"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <div className="drawer-list">
              <Link href="/">
                <ListItemText primary="Início" />
              </Link>

              <Link href="/register">
                <ListItemText primary="Cadastrar" />
              </Link>

              <Link href="/login">
                <ListItemText primary="Entrar" />
              </Link>
            </div>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <h2>Plante uma Planta</h2>
      </Link>

      <ul className="list">
        <Link href="/">Início</Link>
      </ul>

      <div className="btns">
        <Link href="/register">
          <Button className="btn">Cadastrar</Button>
        </Link>

        <Link href="/login">
          <Button className="btn">Entrar</Button>
        </Link>
      </div>

      <div className="drawer">
        <Button onClick={toggleDrawer(true)}>
          <span>Menu</span>
        </Button>
        <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </nav>
  );
}
