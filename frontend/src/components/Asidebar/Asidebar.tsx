"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { Divider } from "@mui/material";
import { IoMdCart } from "react-icons/io";

const Asidebar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, color: "green" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "3rem",
          }}
        >
          <ListItemText>
            <Link href="/">Início</Link>
          </ListItemText>

          <Divider></Divider>

          <ListItemButton>
            <Link href="/register">Cadastrar</Link>
          </ListItemButton>
          <ListItemButton>
            <Link href="/login">Entrar</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex items-center justify-between text-white bg-gradient-to-r from-green-500 to-green-900">
      <div className="text-transparent">.</div>

      <Button onClick={toggleDrawer(true)} style={{ color: "#fff" }}>
        <IoMdCart size="1.3rem" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Asidebar;
