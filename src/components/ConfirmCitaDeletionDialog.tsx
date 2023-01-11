import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { dialogInfoInterface } from "../scenes/team";
import { Typography } from "@mui/material";
import { franjasToValue } from "../helpers/franjasToTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  dialogInfo: dialogInfoInterface;
  onLoadRejectAppt: boolean;
  onRejectAppt: () => void;
  onCloseDialog: () => void;
}

const ConfirmCitaDeletionDialog = ({
  open,
  dialogInfo: { title, date, franja, name, email },
  onCloseDialog,
  onLoadRejectAppt,
  onRejectAppt,
}: Props) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCloseDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle variant="h4">{title}!</DialogTitle>
      <DialogContent>
        <DialogContentTextComp
          name={name}
          date={date}
          franja={franja}
          email={email}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog} disabled={onLoadRejectAppt} variant="outlined">
          Cancelar
        </Button>

        <Button
          onClick={onRejectAppt}
          variant="contained"
          endIcon={<DeleteIcon />}
          disabled={onLoadRejectAppt}
        >
          {onLoadRejectAppt ? <CircularProgress size={20} /> : "Rechazar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface DialogContentTextCompProps {
  name: string;
  date: string;
  franja: string;
  email: string;
}

const DialogContentTextComp = (props: DialogContentTextCompProps) => {
  return (
    <DialogContentText id="alert-dialog-slide-description">
      Estas seguro que deseas rechazar la cita de {props.name} para la fecha{" "}
      {props.date} en la franja de {franjasToValue(props.franja)}? (Una
      notificacion le llegara al estudiante al email {props.email})
    </DialogContentText>
  );
};

export default ConfirmCitaDeletionDialog;
