import { Grid, Button } from "@mui/material";
import { ProfileDetails } from "./ProfileDetails";

export const Profile = () => {
  return (
    <Grid container >
      <Grid sm={8} item>
        <ProfileDetails />
      </Grid>
      <Grid sm={4} item container justifyContent={"center"} alignItems={'center'}>
        <Button>Right Nav</Button>
      </Grid>
    </Grid>
  );
};
