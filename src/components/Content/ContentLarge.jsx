import { Interactions } from "../Interactions";

import Card from "@mui/material/Card";
import { useTheme } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";


export const ContentLarge = ({ data }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        padding: "10px",
        width: "98vw",
        maxWidth: { sm: 500, md: 600, lg: 900, xl: 1200 },
        maxHeight: "150vh",
        borderRadius: "15px",
        backgroundColor: "#121212",
      }}
    >
      <Link to="/home" style={{textDecoration: "none", color: "inherit"}}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main }}
              aria-label={data.name}
            ></Avatar>
          }
          action={
            <>
              <Typography
                variant="body1"
                fontSize={15}
                component={"p"}
                color={"#fff"}
              >
                {data.topic}
              </Typography>
              <Typography
                variant="body1"
                fontSize={12}
                component={"p"}
                color={"#c4c4c4"}
              >
                {data.date}
              </Typography>
            </>
          }
          title={data.name}
          subheader={`@${data.username}`}
        />
      </Link>
      {data.img ? <CardMedia component="img" image={data.img} /> : null}
      <CardContent>
        <Typography variant="body1" sx={{fontWeight: "bold", fontSize: 32}} color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Interactions up={data.up} down={data.down} />
      </CardActions>
    </Card>
  );
};
