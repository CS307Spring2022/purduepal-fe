import { IconButton, Typography, Stack, Card, CardHeader, useTheme } from "@mui/material";
import {NotificationsOutlined as FollowEmptyIcon, Explore as ExploreIcon } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

import GlobalState from "../../contexts/GlobalStates";

const topics = [
  {name:"Marvel"}, 
  {name:"Twitter"},
  {name:"DC"},
  {name:"Netflix"},
  {name:"Cricket"}];

export const TopicCard = ({ data }) => {
  return (
    <Card
    sx={{
      padding: "10px",
      width: "80vw",
      maxWidth: { sm: 400, md: 500, lg: 600, xl: 600 },
      maxHeight: "150vh",
      borderRadius: "15px",
      backgroundColor: "#121212",
    }}
  >
    <CardHeader title={data.name} />
    <IconButton href={"/purduepal-fe/topicFeed?topic="+data.name}>
      <ExploreIcon color="primary"/>
      <Typography color="primary" sx={{marginLeft: 1}}>
        Explore
      </Typography>
    </IconButton>
    <IconButton>
      <FollowEmptyIcon color="primary"/>
      <Typography color="primary" sx={{marginLeft: 1}}>
        Follow
      </Typography>
    </IconButton>
  </Card>
  )

}


export const Explore = () => {
  const theme = useTheme();
  const [isSignedIn] = useContext(GlobalState);

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }

  return (
    <Stack
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
      minHeight={"100vh"}
      overflow={"auto"}
      mt={2}
      sx={{ marginLeft: { xs: "0px", sm: "75px", md: "200px", lg: "200px" } }}
    >
      <Typography sx={{fontSize: 50}} color={theme.palette.primary.main}>
        Explore Topics
      </Typography>
      {topics.map((d, i) => {
        return <TopicCard key={i} data={d} />;
      })}
    </Stack>
  );
};
