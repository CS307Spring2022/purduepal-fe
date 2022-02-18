import { Stack } from "@mui/material";
import { Content } from "../../components/Content";

// const sampleData = [
//   {
//     name: "Stephen Strange",
//     username: "drstrange",
//     date: "10/20/16",
//     topic: "Marvel",
//     content:
//       "It's not Mr. Strange, not Master Strange. It's Doctor Strange! When I became a doctor, I swore to do no harm.",
//     img: null,
//     up: 5000000,
//     down: 1000000,
//   },
// ];

export const Home = () => {
  return (
    <Stack
      width={"calc(100vw - 75px)"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Content />
    </Stack>
  );
};
