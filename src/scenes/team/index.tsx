import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridEventListener,
  esES,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import Header from "../../components/Header";
import { franjasToValue } from "../../helpers/franjasToTitle";
import stateToValue from "../../helpers/stateToValue";
import { useState } from "react";
import ConfirmCitaDeletionDialog from "../../components/ConfirmCitaDeletionDialog";
import { Snackbar } from "@material-ui/core";
import CustomizedSnackbars from "../../components/CustomizedSnackBar";

interface rowFranjaInterface {
  row: {
    franja: string;
  };
}

interface rowStateInterface {
  row: {
    state: number;
  };
}

export interface dialogInfoInterface {
  title: string;
  date: string;
  franja: string;
  name: string;
  email: string;
}

const dialogInfoInit = {
  title: "",
  date: "",
  franja: "",
  name: "",
  email: "",
};

const Team = () => {
  const [mockDataTeamState, setmockDataTeamState] = useState(mockDataTeam);
  const [idOnDelete, setIdOnDelete] = useState<number>(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [onLoadRejectAppt, setOnLoadRejectAppt] = useState(false);
  const [openedSnackBar, setOpenedSnackBar] = useState(false);
  const [dialogInfo, setDialogInfo] =
    useState<dialogInfoInterface>(dialogInfoInit);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Fecha",
    },
    {
      field: "franja",
      headerName: "Franja",
      headerAlign: "left",
      renderCell: ({ row: { franja } }: rowFranjaInterface) => {
        return <Typography>{franjasToValue(franja)}</Typography>;
      },
    },
    {
      field: "state",
      headerName: "Estado",
      headerAlign: "left",
      flex: 1,
      renderCell: ({ row: { state } }: rowStateInterface) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            bgcolor={
              state === 0 ? colors.redAccent[500] : colors.greenAccent[300]
            }
            borderRadius="4px"
          >
            {stateToValue(state) === "rechazada" && (
              <SmsFailedOutlinedIcon htmlColor="white" />
            )}
            {stateToValue(state) === "aceptada" && (
              <CheckCircleOutlineOutlinedIcon htmlColor="white" />
            )}
            <Typography color="white" sx={{ ml: "5px" }}>
              {stateToValue(state)?.toUpperCase()}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleEvent: GridEventListener<"rowClick"> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    const {
      row: { date, email, franja, name },
    } = params;
    setDialogInfo({
      title: "Rechazar cita",
      date,
      franja,
      name,
      email,
    });
    setIdOnDelete(+params.id);
    dialogOpenHandler();
  };

  const dialogOpenHandler = () => {
    setDialogVisible(true);
  };
  const dialogCloseHandler = () => {
    setDialogVisible(false);
  };
  const rejectApptHandler = () => {
    setOnLoadRejectAppt(true);
    console.log("Click en reject");
    setTimeout(() => {
      setOnLoadRejectAppt(false);
      dialogCloseHandler();
      openSnackBarHandler();
      const newMockDataValue = mockDataTeamState.filter(
        (e) => e.id !== idOnDelete
      );
      setmockDataTeamState(newMockDataValue);
    }, 1000);
  };
  const openSnackBarHandler = () => {
    setOpenedSnackBar(true);
  };
  const closeSnackBarHandler = () => {
    setOpenedSnackBar(false);
  };

  return (
    <Box m="20px">
      <Header title="CITAS" subtitle="Todas las citas" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          onRowClick={handleEvent}
          rows={mockDataTeamState}
          columns={columns}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      <ConfirmCitaDeletionDialog
        open={dialogVisible}
        onCloseDialog={dialogCloseHandler}
        dialogInfo={dialogInfo}
        onRejectAppt={rejectApptHandler}
        onLoadRejectAppt={onLoadRejectAppt}
      />
      <CustomizedSnackbars
        openedSnackBar={openedSnackBar}
        onOpenSnackBar={openSnackBarHandler}
        onCloseSnackBar={closeSnackBarHandler}
        message="Cita rechaza con exito"
      />
    </Box>
  );
};

export default Team;
