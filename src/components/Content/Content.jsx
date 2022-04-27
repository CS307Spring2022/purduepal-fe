import { Interactions } from "../Interactions";

import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import "./Content.css";
import { CardActionArea } from "@mui/material";

export const Content = ({ data, saved, isProfile }) => {
  const theme = useTheme();
  // console.log(data)

  const dateTimeFormatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const isURL = (str) => {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return true;
  };

  return (
    <Card
      sx={{
        padding: "10px",
        width: "80vw",
        maxWidth: { sm: 400, md: 500, lg: 600, xl: 600 },
        maxHeight: "150vh",
        borderRadius: "15px",
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#CFB991",
      }}
    >
      <CardActionArea href={"/purduepal-fe/postThread?postId=" + data._id}>
        <CardHeader
          avatar={
            <Link to={"/profile?user=" + data.user.username}>
              <Avatar
                sx={{ bgcolor: theme.palette.primary.main }}
                aria-label={data.user.firstname + " " + data.user.lastName}
              ></Avatar>
            </Link>
          }
          action={
            <>
              <Typography
                variant="body1"
                fontSize={15}
                component={"p"}
                color={theme.palette.mode === "dark" ? "#fff" : "#000"}
              >
                {data.topic}
              </Typography>
              <Typography
                variant="body1"
                fontSize={12}
                component={"p"}
                color={theme.palette.mode === "dark" ? "#c4c4c4" : "#555960"}
              >
                {dateTimeFormatter.format(new Date(data.timestamp))}
              </Typography>
            </>
          }
          title={data.user.firstName + " " + data.user.lastName}
          subheader={`@${data.user.username}`}
        />
        {data.parentID !== null ? (
          <Button
            color="primary"
            sx = {{
              textTransform: "none",
            }}
            href = {"/purduepal-fe/postThread?postId=" + data.parentID}
          >
            Replying to @{data.parentUser}
          </Button>
        ) : null}
        {data.img ? <CardMedia component="img" image={data.img} /> : null}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {isURL(data.content) ? (
              <a href={data.content}>{data.content}</a>
            ) : (
              data.content
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Interactions
          up={data.likeCount == null ? 0 : data.likeCount}
          down={data.dislikeCount == null ? 0 : data.dislikeCount}
          uuid={data._id}
          initialReaction={data.reactionType}
          isSaved={data.isSaved}
          isProfile={isProfile}
        />
      </CardActions>
    </Card>
  );
};
