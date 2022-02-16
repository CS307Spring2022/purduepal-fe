import { IconButton, Stack, useTheme } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ReactComponent as Logo } from "../icons/logo.svg";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

export const NavBar = () => {
  const theme = useTheme();
  const icons = [
    {
      logo: (
        <Logo
          fill={theme.palette.primary.main}
          width={"30px"}
          height={"30px"}
        />
      ),
      href: "/home",
    },
    {
      logo: <HomeRoundedIcon fontSize="large" />,
      href: "/home",
    },
    {
      logo: <TagRoundedIcon fontSize="large" />,
      href: "/explore",
    },
    {
      logo: <AccountCircleRoundedIcon fontSize="large" />,
      href: "/explore",
    },
    {
      logo: <BookmarkBorderRoundedIcon fontSize="large" />,
      href: "/saved",
    },
    {
      logo: <NotificationsNoneRoundedIcon fontSize="large" />,
      href: "/notifications",
    },
  ];

  return (
    <Stack
      minWidth={"75px"}
      spacing={1.5}
      sx={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      height={"100vh"}
      pt={2}
    >
      {icons.map((d, i) => {
        return (
          <IconButton color="primary" key={i} href={d.href}>
            {d.logo}
          </IconButton>
        );
      })}
    </Stack>
  );
};
