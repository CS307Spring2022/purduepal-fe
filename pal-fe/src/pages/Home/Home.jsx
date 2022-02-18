import { Stack } from "@mui/material";
import { Content } from "../../components/Content";

const sampleData = [
  {
    name: "Dr. Stephen Strange",
    username: "@drstrange",
    date: "10/20/16",
    topic: "Marvel",
    content:
      "It's not Mr. Strange, not Master Strange. It's Doctor Strange! When I became a doctor, I swore to do no harm.",
    img: null,
    up: 14000605,
    down: 0,
  },
  {
    name: "Tony Stark",
    username: "@ironman",
    date: "05/02/08",
    topic: "Marvel",
    content: "I. am. IronMan.",
    img: null,
    up: 3000,
    down: 0,
  },
  {
    name: "Steve Rogers",
    username: "@captainamerica",
    date: "07/19/11",
    topic: "Marvel",
    content: "Avengers... Assemble",
    img: null,
    up: 75,
    down: 0,
  },
];

export const Home = () => {
  return (
    <Stack
      width={"calc(100vw - 75px)"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
      height={"100vh"}
      overflow={"auto"}
    >
      {sampleData.map((data, index) => {
        return <Content key={index} data={data} />;
      })}
    </Stack>
  );
};
