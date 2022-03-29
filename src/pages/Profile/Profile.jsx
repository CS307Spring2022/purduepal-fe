import { Grid, Button } from "@mui/material";
import { ProfileDetails } from "./ProfileDetails";
import { useContext} from "react";
import { Navigate } from "react-router-dom";

import GlobalState from "../../contexts/GlobalStates";

export const Profile = () => {
  const [isSignedIn] = useContext(GlobalState);

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }
  
  return (
    <Grid sx={{overflowX: "hidden"}} ml={{xs:0, sm:"110px",md:"240px",lg:"240px"}} maxWidth="100vw" minHeight={"100vh"} container >
      <Grid sm={8} item>
        <ProfileDetails />
      </Grid>
      <Grid sm={4} item container justifyContent={"center"} alignItems={'center'}>
        <Button>Right Nav</Button>
      </Grid>
    </Grid>
  );
};
