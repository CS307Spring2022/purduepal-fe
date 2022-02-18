import { Grid, IconButton, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Interactions } from "./Interactions";

export const Content = ({ data }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"space-between"}
      sx={{ width: "50vw", height: "30vh", border: "2.5px white solid" }}
    >
      <Grid item container direction={"row"} justifyContent={"space-around"}>
        <Grid item mt={1} md={2} container justifyContent={"center"}>
          <Grid item>
            <IconButton>
              <AccountCircleRoundedIcon
                sx={{ fontSize: "75px" }}
                color="primary"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item md={8} mt={2} container direction={"column"} spacing={2}>
          <Grid item container direction={"column"}>
            <Grid item>
              <Stack direction={"row"} spacing={0.25}>
                <Typography variant="h5" color={"#fff"}>
                  {data.name}
                </Typography>
                <Typography variant="h6" color={"#bbb"}>
                  {data.username}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography variant="body2" color={"#ddd"}>
                {data.topic}
              </Typography>
            </Grid>
          </Grid>
          <Grid item mr={1}>
            <Typography variant="body1" component={"p"} color={"#fff"}>
              {data.content}
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Typography mt={2} variant="body1" component={"p"} color={"#fff"}>
            {data.date}
          </Typography>
        </Grid>
      </Grid>
      <Grid item md={12} mx={1}>
        <Interactions up={data.up} down={data.down} />
      </Grid>
    </Grid>
  );
};
