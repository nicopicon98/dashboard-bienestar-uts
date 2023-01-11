import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface HeaderInterface {
  title: string;
  subtitle: string;
  mb?: string;
}

const Header = ({ title, subtitle, mb = "30px" }: HeaderInterface) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb={mb}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;