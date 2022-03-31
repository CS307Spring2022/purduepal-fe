import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { Content } from "../../components/Content/Content";
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import GlobalState from "../../contexts/GlobalStates";

// const sampleData = [
//   {
//     uuid: "1aklsdf8asdfhj",
//     name: "Dr. Stephen Strange",
//     username: "drstrange",
//     date: "10/20/16",
//     topic: "Marvel",
//     content:
//       "It's not Mr. Strange, not Master Strange. It's Doctor Strange! When I became a doctor, I swore to do no harm.",
//     img: null,
//     up: 14000605,
//     down: 0,
//     parentId: "",
//   },
//   {
//     uuid: "0756sd8asdsdfhj",
//     name: "Tony Stark",
//     username: "ironman",
//     date: "05/02/08",
//     topic: "Marvel",
//     content: "I. am. IronMan.",
//     img: null,
//     up: 3000,
//     down: 0,
//     parentId: "",
//   },
//   {
//     uuid: "agg6jgsgdsbsd2gj",
//     name: "Steve Rogers",
//     username: "captainamerica",
//     date: "07/19/11",
//     topic: "Marvel",
//     content: "Avengers... Assemble",
//     img: null,
//     up: 75,
//     down: 0,
//     parentId: "",
//   },
//   {
//     uuid: "6zbkp4s4a43sghgeha",
//     name: "Thor",
//     username: "godofthunder",
//     date: "11/11/11",
//     topic: "Marvel",
//     content: "Stormbreaker",
//     img: "https://i0.wp.com/thenewsfetcher.com/wp-content/uploads/2020/01/45dc07a7fec3414781000b10577e539e.jpeg",
//     up: 1000,
//     down: 0,
//     parentId: "",
//   },
//   {
//     uuid: "b04uwqual3s2f0j",
//     name: "Hulk",
//     username: "greenguy",
//     date: "07/19/11",
//     topic: "Marvel",
//     content: "Strongest Avenger",
//     img: null,
//     up: 80,
//     down: 0,
//     parentId: "",
//   },
//   {
//     uuid: "erxok768yi730qpfsda",
//     name: "Jim",
//     username: "jimmy",
//     date: "07/11/12",
//     topic: "Food",
//     content: "Some Paella",
//     img: "https://mui.com/static/images/cards/paella.jpg",
//     up: 800,
//     down: 0,
//     parentId: "",
//   },
// ];

const Home = () => {
  const theme = useTheme();
  const [isSignedIn, setIsSignedIn] = useContext(GlobalState);

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
