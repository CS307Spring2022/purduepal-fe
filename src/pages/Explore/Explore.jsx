import {
  IconButton,
  Typography,
  Stack,
  Card,
  CardHeader,
  useTheme,
} from "@mui/material";
import {
  NotificationsOutlined as FollowEmptyIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import GlobalState from "../../contexts/GlobalStates";

// const topics = [
//   { name: "Marvel" },
//   { name: "Twitter" },
//   { name: "DC" },
//   { name: "Netflix" },
//   { name: "Cricket" },
// ];

const TopicCard = ({ data }) => {
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
      <CardHeader title={data._id.replace(/"/g,'')} />
      <IconButton href={"/purduepal-fe/topicFeed?topic=" + data.topicName}>
        <ExploreIcon color="primary" />
        <Typography color="primary" sx={{ marginLeft: 1 }}>
          Explore
        </Typography>
      </IconButton>
      <IconButton>
        <FollowEmptyIcon color="primary" />
        <Typography color="primary" sx={{ marginLeft: 1 }}>
          Follow
        </Typography>
      </IconButton>
    </Card>
  );
};

const Explore = () => {
  const theme = useTheme();
  const [isSignedIn] = useContext(GlobalState);

  const [topicLists, setTopicLists] = useState([]);

  useEffect(() => {
    async function getTopics() {
      const response = await fetch(`http://localhost:5000/topics`);
      if (!response.ok) {
        const message = `An error oc`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setTopicLists(records);
      console.log(records);
    }

    const topicTimer = setInterval(() => {
      getTopics();
    }, 650);
    return () => clearInterval(topicTimer);
  }, [topicLists.length]);

  if (!isSignedIn) {
    return <Navigate to="/" />;
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
      <Typography sx={{ fontSize: 50 }} color={theme.palette.primary.main}>
        Explore Topics
      </Typography>
      {topicLists &&
        topicLists.map((d, i) => {
          return <TopicCard key={i} data={d} />;
        })}
    </Stack>
  );
};

export default Explore;