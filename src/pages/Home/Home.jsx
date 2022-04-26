import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { Content } from "../../components/Content/Content";
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import GlobalState from "../../contexts/GlobalStates";

const Home = () => {
  const theme = useTheme();
  const {isSignedIn, setIsSignedIn, userTheme, setUserTheme} = useContext(GlobalState);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const timelineRecipient = {
        email: localStorage.getItem("email"),
      };
      const response = await fetch(`http://localhost:5000/timeline`, {
        method: "POST",
        body: JSON.stringify(timelineRecipient),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const records = await response.json();

      if (response.status !== 200) {
        const message = `An error oc`;
        // window.alert(message);
        if ("logout" in records[0]) {
          localStorage.removeItem("email");
          localStorage.removeItem("username");
          setIsSignedIn(false);
        }
        return;
      }
      // console.log(records)
      let filteredRecs = []
      for (let i=0; i < records.length; i++) {
        if (records[i].parentID === null){
          filteredRecs.push(records[i])
        }
      }
      setPosts(filteredRecs.reverse());
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
      {posts.map((data, index) => {
        return <Content key={index} data={data} />;
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

export default Home;
