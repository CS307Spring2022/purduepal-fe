import { IconButton, Stack, useTheme } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ReactComponent as Logo } from "../icons/logo.svg";

export const NavBar = () => {
  const theme = useTheme();
  return (
    <Stack
      minWidth={"75px"}
      spacing={1.5}
      sx={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      height={"100vh"}
      mt={2}
    >
      <IconButton color="primary" href="/home">
        <Logo
          fill={theme.palette.primary.main}
          width={"30px"}
          height={"30px"}
        />
      </IconButton>
      <IconButton color="primary" href="/home">
        <HomeRoundedIcon fontSize="large" />
      </IconButton>
      <IconButton color="primary" href="/explore">
        <TagRoundedIcon fontSize="large" />
      </IconButton>
      <IconButton color="primary" href="/profile">
        <AccountCircleRoundedIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
};
