import { Stack, Typography, useTheme } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Content } from "../../components/Content/Content";

import GlobalState from "../../contexts/GlobalStates";

const Saved = () => {
  const theme = useTheme();
  const [isSignedIn] = useContext(GlobalState);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const saveRecipient = {
        "email": localStorage.getItem("email")
      }
      const response = await fetch(`http://localhost:5000/savedPosts`,{
        method: "POST",
        body: JSON.stringify(saveRecipient),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = `An error oc`;
        // window.alert(message);
        console.log(response)
        return;
      }

      const records = await response.json();
      console.log(records)
      setPosts(records);
    }

    const postTimer = setInterval(() => {
      getPosts();
    }, 650);
    return () => clearInterval(postTimer);
  }, [posts.length]);

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
      {posts && posts.map((data, index) => {
        return <Content key={index} data={data} saved />;
      })}
      <Typography variant="p" sx={{ fontSize: "30px" }} color="primary">
        End of Posts!
      </Typography>

      <div>
        <svg width={100} height={50}>
          <rect
            width="100%"
            height={50}
            fill={theme.palette.background.default}
          ></rect>
        </svg>
      </div>
    </Stack>
  );
};

export default Saved;
