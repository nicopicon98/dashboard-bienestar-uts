import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import useNextAppointmentTimer from "../../hooks/useNextAppointmentTimer";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import StatBoxVariant from "../../components/StatBoxVariant";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const startStr = "2022/12/28";
  const franja = "16:00 - 17:00";
  const franjaStart = franja.slice(0, 5);
  const {
    nxtAppmtTmrState: { formatted },
  } = useNextAppointmentTimer(`${startStr} ${franjaStart}:00`);
  const startStrLastAppt = "2022/12/27";
  const franjaLastAppt = "16:00 - 17:00";
  const joinedLastApptInfo = `${startStrLastAppt} - ${franjaStart}`;
  let iconVariant = <SmsFailedOutlinedIcon color="error" fontSize="large" />;
  const attended = true;
  if (attended) {
    iconVariant = (
      <CheckCircleOutlineOutlinedIcon color="success" fontSize="large" />
    );
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Bienvenido al portal de citas" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            DESCARGAR REPORTE
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Jose David Gomez"
            subtitle="Proxima cita"
            progress={0.75}
            increase={formatted}
            increaseVisible={false}
            icon={<NextAppointmentPhoto img={"../../assets/user.png"} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Sergio Andres Gomez"
            subtitle="Ultima cita"
            progress={0.5}
            increase={joinedLastApptInfo}
            increaseVisible={false}
            icon={<NextAppointmentPhoto img={"../../assets/user.png"} />}
            iconVariant={iconVariant}
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxVariant
            subTitle="Citas ultimo mes"
            citas={80}
            citasAccepted={70}
            citasRejected={10}
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxVariant
            subTitle="Citas proximas"
            citas={114}
            citasAccepted={100}
            citasRejected={14}
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box gridColumn="span 8" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Todas las citas (mes)
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                76
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Header title="Citas" mb={"0px"} subtitle="Ultimo mes" />
          <Box height="30vh">
            <PieChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Ultimas citas
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                bgcolor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.franja}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

interface Props {
  img: string;
}

const NextAppointmentPhoto = ({ img }: Props) => {
  return (
    <Box display="flex" justifyContent="left" alignItems="center">
      <img
        alt="profile-user"
        width="50px"
        height="50px"
        src={img}
        style={{ cursor: "pointer", borderRadius: "50%" }}
      />
    </Box>
  );
};

export default Dashboard;
