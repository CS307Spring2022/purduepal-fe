import { CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export const Error404 = () => {

  return (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
            zIndex: 1,
            width: "100vw",
            height: "100vh",
            color: "white",
        }}
    >
        <Typography component="h1" sx={{fontWeight: "bold", fontSize: 30}}>
            Error 404: This Page Doesn't Exist!
        </Typography>
        <Link to="/home" style={{textDecoration: "none"}}>
            <Typography component="h3" color="primary" sx={{fontWeight: "bold", fontSize: 20, '&:hover': {transition: "1.2s", color: "#987700"}}}>
                Please go back to home page
            </Typography>
        </Link>
        <CardMedia sx={{justifyContent: "center", width: "512px", height: "512px"}} component="img" image={require('../icons/not-found.png')} />
    </Stack>
  );
}