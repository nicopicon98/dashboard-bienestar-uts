import { useContext, useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, IconButton, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

const TopBar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ctxColor = useContext(ColorModeContext);

  const [serverStatus, setServerStatus] = useState(true)

  console.log("render")

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Bar */}
      <Box
        display="flex"
        bgcolor={colors.primary[400]}
        borderRadius="3px"
        padding={1.5}
        alignItems="center"
      >
        <Typography mr={0.5} p={0}>Estado del servidor</Typography>
        <Box>
          {serverStatus
            ? <ThumbUpAltRoundedIcon color="success" />
            : <ThumbDownAltRoundedIcon color="error" />
          }
        </Box>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={ctxColor?.colorModeHandler}>
          {theme.palette.mode === 'dark'
            ? (
              <DarkModeOutlinedIcon />
            )
            : <LightModeOutlinedIcon />
          }
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TopBar