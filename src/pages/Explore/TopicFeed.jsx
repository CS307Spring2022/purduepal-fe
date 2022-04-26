import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { Content } from "../../components/Content/Content";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import GlobalState from "../../contexts/GlobalStates";

const sampleData = [
  {
    uuid: "1aklsdf8asdfhj",
    name: "Dr. Stephen Strange",
    username: "drstrange",
    date: "10/20/16",
    topic: "Marvel",
    content:
      "It's not Mr. Strange, not Master Strange. It's Doctor Strange! When I became a doctor, I swore to do no harm.",
    img: null,
    up: 14000605,
    down: 0,
    parentId: "",
  },
  {
    uuid: "0756sd8asdsdfhj",
    name: "Tony Stark",
    username: "ironman",
    date: "05/02/08",
    topic: "Marvel",
    content: "I. am. IronMan.",
    img: null,
    up: 3000,
    down: 0,
    parentId: "",
  },
  {
    uuid: "agg6jgsgdsbsd2gj",
    name: "Steve Rogers",
    username: "captainamerica",
    date: "07/19/11",
    topic: "Marvel",
    content: "Avengers... Assemble",
    img: null,
    up: 75,
    down: 0,
    parentId: "",
  },
  {
    uuid: "6zbkp4s4a43sghgeha",
    name: "Thor",
    username: "godofthunder",
    date: "11/11/11",
    topic: "Marvel",
    content: "Stormbreaker",
    img: "https://i0.wp.com/thenewsfetcher.com/wp-content/uploads/2020/01/45dc07a7fec3414781000b10577e539e.jpeg",
    up: 1000,
    down: 0,
    parentId: "",
  },
  {
    uuid: "b04uwqual3s2f0j",
    name: "Hulk",
    username: "greenguy",
    date: "07/19/11",
    topic: "Marvel",
    content: "Strongest Avenger",
    img: null,
    up: 80,
    down: 0,
    parentId: "",
  },
];

const RecordsList = ({ topicName }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://127.0.0.1:5000/topic_posts?email=${localStorage.getItem(
          "email"
        )}&topic=${topicName}`
      );
      

      if (!response.ok) {
        console.log(response)
        const messsage = `An error occurred: ${response.statusText}`;
        console.log(messsage);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();
    return;
  }, [records.length]);

  // console.log(records);
  // return <h1>Something</h1>;
  return records.map((data, index) => {
    return <Content key={index} data={data} />;
  });
};

export const TopicFeed = () => {
  const theme = useTheme();
  const {isSignedIn, setIsSignedIn, userTheme, setUserTheme} = useContext(GlobalState);

  const [searchParams] = useSearchParams();

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
      <RecordsList topicName={searchParams.get("topic")} />
      <Typography variant="p" sx={{ fontSize: "30px" }} color="primary">
        End of Posts!
      </Typography>
      {<RecordsList />}
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
