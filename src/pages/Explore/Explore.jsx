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
  NotificationsActiveRounded as FollowFillIcon,
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
  const [followed,setFollowed] = useState(data.usersFollowing.includes(localStorage.getItem("email")));
  const topic = data._id.replaceAll('"','');

  async function updateFollow() {
    const followRecipient = {
      "email": localStorage.getItem("email"),
      "topic": topic
    }
    console.log(followRecipient)
    let response;
    if (!followed) {
      response = await fetch(`http://localhost:5000/followTopic`,{
        method: "POST",
        body: JSON.stringify(followRecipient),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      response = await fetch(`http://localhost:5000/unfollowTopic`,{
        method: "POST",
        body: JSON.stringify(followRecipient),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!response.ok) {
      const message = `An error oc`;
      // window.alert(message);
      console.log(response)
      return;
    }

    const msg = await response.json();
    console.log(msg)
  }

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
      <CardHeader title={topic} />
      <IconButton href={"/purduepal-fe/topicFeed?topic=" + topic}>
        <ExploreIcon color="primary" />
        <Typography color="primary" sx={{ marginLeft: 1 }}>
          Explore
        </Typography>
      </IconButton>
      <IconButton onClick={() => {
          updateFollow();
          setFollowed(!followed);
        }}>
        {followed ? <FollowFillIcon color="primary" /> : <FollowEmptyIcon color="primary"/>}
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
      // console.log(records[0]["_id"])
      setTopicLists(records);
      console.log(records);
    }

    // const topicTimer = setInterval(() => {
    //   getTopics();
    // }, 650);
    // return () => clearInterval(topicTimer);
    getTopics()
  }, []);

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