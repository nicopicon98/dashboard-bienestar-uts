import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";

interface Props {
  subTitle: string;
  citas: number;
  citasAccepted: number;
  citasRejected: number;
}

const StatBoxVariant = (props: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const citasAcceptedPercentage = (props.citasAccepted * 100) / props.citas;
  const citasRejectedPercentage = (props.citasRejected * 100) / props.citas;

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="center">
        <Typography variant="h5" fontWeight="bold" marginBottom={0.5}>
          {props.subTitle}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginBottom={0.5}>
        <Typography variant="h5" fontWeight="600">
          {props.citas}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Typography variant="h6" fontWeight="bold">
              Aceptadas&nbsp;
            </Typography>
            <CheckCircleOutlineOutlinedIcon color="success" />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Typography fontWeight="bold">{props.citasAccepted}</Typography>
            <Typography fontStyle="italic">({citasAcceptedPercentage.toFixed(1) + "%"})</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Typography variant="h6" fontWeight="bold">
              Rechazadas&nbsp;
            </Typography>
            <SmsFailedOutlinedIcon color="error" />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Typography fontWeight="bold">{props.citasRejected}</Typography>
            <Typography fontStyle="italic">({citasRejectedPercentage.toFixed(1) + "%"})</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBoxVariant;
