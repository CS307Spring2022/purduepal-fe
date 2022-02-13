import { IconButton, Stack } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export const NavBar = () => {
  return (
    <Stack
      minWidth={"75px"}
      spacing={1.5}
      sx={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      height={"100vh"}
    >
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
