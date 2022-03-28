import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import GlobalState from "../../contexts/GlobalStates";


export const Notications = () => {
  const [isSignedIn,setIsSignedIn] = useContext(GlobalState);

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }

  return (
    <Stack
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight="100vh"
    >
      <Button>Notifications page</Button>
    </Stack>
  );
};
