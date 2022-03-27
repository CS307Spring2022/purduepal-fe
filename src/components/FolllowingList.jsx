import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FollowingProfile({ name, bio }) {
  return (
    <Card sx={{ width: "75vw" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="following-name">
          </Avatar>
        }
        title={name}
        subheader={bio}
      />
    </Card>
  );
}

export const FollowingList = () => {
  const peopleList = [
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
    { title: "Bruce Banner", subheader: "Smash" },
    { title: "Thor", subheader: "Worthy" },
  ];

  return (
    <>
      <Stack>
        <Stack
          ml={30}
          direction="row"
          sx={{
            position: "fixed",
            backgroundColor: "#000",
            overflowX: "hidden",
          }}
          width={"100%"}
        >
          <IconButton
            href="/purduepal-fe/profile"
            color="secondary"
            aria-label="add an alarm"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" color="#fff">
            Following List
          </Typography>
        </Stack>
        <Stack
          width={"100vw"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          minHeight={"100vh"}
          overflow={"auto"}
          mt={2}
          sx={{
            marginLeft: { xs: "0px", sm: "75px", md: "200px", lg: "200px" },
            overflowX: "hidden",
          }}
        >
          {peopleList.map((d) => {
            return <FollowingProfile name={d.title} bio={d.subheader} />;
          })}
        </Stack>
      </Stack>
    </>
  );
};
