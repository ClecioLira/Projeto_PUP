import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface ButtonDeletePlantProps {
  handleDelete: () => void;
}

export default function ButtonDeletePlant({ handleDelete }: ButtonDeletePlantProps) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleClickOpen} color="error">
          Apagar
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Tem certeza que deseja apagar essa planta?"}
          </DialogTitle>
          <DialogActions>
  
            <Button onClick={handleClose} color="inherit">
              Cancelar
            </Button>
  
            <Button onClick={() => { handleClose(); handleDelete(); }} autoFocus color="error">
              Apagar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}