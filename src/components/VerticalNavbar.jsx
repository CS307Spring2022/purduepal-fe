import {
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Typography,
  Link,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ReactComponent as Logo } from "../icons/logo.svg";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsIcon from "@mui/icons-material/Settings";

export const VerticalNavbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const routeParser = (page) => {
    // if (page === "home") {
    //   return "/purduepal-fe";
    // }
    return "/purduepal-fe/" + page.toLowerCase();
  };

  // console.log(matches);
  const icons = [
    {
      logo: (
        <Logo
          fill={theme.palette.primary.main}
          width={"30px"}
          height={"30px"}
        />
      ),
      href: "home",
      text: null,
    },
    {
      logo: <HomeRoundedIcon fontSize="large" />,
      href: "home",
      text: "Home",
    },
    {
      logo: <TagRoundedIcon fontSize="large" />,
      href: "explore",
      text: "Explore",
    },
    {
      logo: <AccountCircleRoundedIcon fontSize="large" />,
      href: "profile?user="+localStorage.getItem("username"),
      text: "Profile",
    },
    {
      logo: <BookmarkBorderRoundedIcon fontSize="large" />,
      href: "saved",
      text: "Saved",
    },
    {
      logo: <NotificationsNoneRoundedIcon fontSize="large" />,
      href: "notifications",
      text: "Notifications",
    },
    {
      logo: <SettingsIcon fontSize="large" />,
      href: "settings",
      text: "Settings",
    },
  ];

  return (
    <Stack
      minWidth={matches ? "200px" : "75px"}
      spacing={1.5}
      sx={{ backgroundColor: "rgba(255,255,255,0.07)", position: "fixed" }}
      height={"100vh"}
      pt={2}
      px={matches ? 2 : 0}
    >
      {icons.map((d, i) => {
        return (
          <Stack
            key={i}
            direction="row"
            justifyContent={matches ? "flex-start" : "center"}
            alignItems={"center"}
          >
            <IconButton color="primary" key={i} href={d.href}>
              {d.logo}
            </IconButton>
            {matches ? (
              <Typography variant="h5" color={theme.palette.primary.main}>
                <Link href={routeParser(d.href)} underline="none">
                  {d.text}
                </Link>
              </Typography>
            ) : null}
          </Stack>
        );
      })}
    </Stack>
  );
};
