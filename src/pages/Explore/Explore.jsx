import { Button, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

import GlobalState from "../../contexts/GlobalStates";

export const Explore = () => {
  const [isSignedIn,setIsSignedIn] = useContext(GlobalState);

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }

  return (
    <Stack
      width="100vw"
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
    >
      <Button>Explore page</Button>
    </Stack>
  );
};
