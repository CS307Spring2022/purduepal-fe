import { Grid, Button } from "@mui/material";
import { ProfileDetails } from "./ProfileDetails";

export const Profile = () => {
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
