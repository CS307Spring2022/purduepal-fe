import { Grid, IconButton, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Interactions } from "../Interactions";

import "./Content.css"

export const Content = ({ data }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"space-between"}
      mt={35}
      sx={{padding: "10px", width: "98vw", maxWidth:{sm:500,md:600,lg:600,xl:600}, maxHeight: "50vh", borderRadius: "15px", backgroundColor: "#121212" }}
    >
      <Grid item container direction={"row"} justifyContent={"space-around"}>
        <Grid item md={1} container justifyContent={"center"}>
          <Grid item>
            <IconButton>
              <AccountCircleRoundedIcon
                sx={{fontSize:{xs: "40px",sm:"45px",md:"60px",lg:"75px"}}}
                color="primary"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction={"column"} spacing={2}>
          <Grid item container direction={"column"}>
            <Grid item>
              <Stack direction={"row"} spacing={0.25}>
                <Typography variant="h5" color={"#fff"} sx={{fontSize:{xs:"18px",sm:"22px"}}}>
                  {data.name}
                </Typography>
                <Typography variant="h6" color={"#bbb"} sx={{fontSize:{xs:"15px"}}}>
                  {data.username}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Typography variant="body2" color={"#ddd"}>
                {data.topic}
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant="body1" component={"p"} color={"#fff"}>
                {data.date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item mr={1}>
            <Typography variant="body1" component={"p"} color={"#fff"}>
              {data.content}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} mx={1}>
        <Interactions up={data.up} down={data.down} />
      </Grid>
    </Grid>
  );
};
