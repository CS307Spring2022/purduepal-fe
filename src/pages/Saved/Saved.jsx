import { Button, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

import GlobalState from "../../contexts/GlobalStates";

const Saved = () => {
  const [isSignedIn] = useContext(GlobalState);

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }

  return (
    <Stack
      width={"calc(100vw - 75px)"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight="100vh"
    >
      <Button>Saved page</Button>
    </Stack>
  );
};

export default Saved