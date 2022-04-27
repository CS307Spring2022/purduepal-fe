import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, useTheme } from "@mui/material";
import { Card, CardHeader, Avatar } from "@mui/material";
import { CardActions } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import GlobalState from "../contexts/GlobalStates";

const followingList = [
  { name: "Bruce Banner", bio: "Smash" },
  { name: "Thor", bio: "Worthy" },
  { name: "Wong", bio: ".." },
];

const topics = ["Marvel", "Twitter", "DC", "Netflix", "Cricket"];

const handleUnfollowUser = (username) => {
  // console.log(username);
  async function updateUnfollow() {
    const followRecipient = {
      follower: localStorage.getItem("email"),
      username: username,
    };

    await fetch(`http://localhost:5000/unfollowUser`, {
      method: "POST",
      body: JSON.stringify(followRecipient),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  }
  updateUnfollow();
};

const handleUnfollowTopic = (name) => {
  // console.log(name);
  async function updateUnfollow() {
    const followRecipient = {
      email: localStorage.getItem("email"),
      topic: name,
    };

    await fetch(`http://localhost:5000/unfollowTopic`, {
      method: "POST",
      body: JSON.stringify(followRecipient),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  }
  updateUnfollow();
};


const DisplayCard = ({ name, username, showUnfollow, theme }) => {
  return (
    <Card sx={{backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#CFB991"}}>
      <CardHeader avatar={<Avatar aria-label="recipe"></Avatar>} title={name} />
      {showUnfollow ? (
        <CardActions>
          <Button
            onClick={() => {
              handleUnfollowUser(username);
            }}
          >
            Unfollow
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};
const DisplayTopic = ({ name, showUnfollow, theme }) => {
  return (
    <Card sx={{backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#CFB991"}}>
      <CardHeader title={name} />
      {showUnfollow ? (
        <CardActions>
          <Button
            onClick={() => {
              handleUnfollowTopic(name);
            }}
          >
            Unfollow
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default function FollowingList({ number, property, data, isTopic }) {
  // console.log(data);
  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "75%",
    bgcolor: theme.palette.background.default,
    border: "2px solid #ddd",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchParams] = useSearchParams();

  // const myEmail = localStorage.getItem("email")

  const [match] = useState(
    searchParams.get("user") === localStorage.getItem("username")
  );

  const {isSignedIn, setIsSignedIn, userTheme, setUserTheme} = useContext(GlobalState);

  return (
    <div>
      <Button onClick={handleOpen} disableRipple disableElevation>
        <Stack direction="row" spacing={0.5}>
          <Typography color={theme.palette.primary.main} variant="subtitle2">
            {number ? number : data.length}
          </Typography>
          <Typography variant="subtitle2" color={theme.palette.mode === "dark" ? "#c4c4c4" : "#222"}>
            {property}
          </Typography>
        </Stack>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={1}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              color={theme.palette.primary.main}
            >
              <strong>{property}</strong>
            </Typography>
            {isTopic
              ? data.map((d) => {
                  return (
                    <DisplayTopic
                      key={d}
                      name={d}
                      showUnfollow={isSignedIn && match}
                      theme={theme}
                    />
                  );
                })
              : data.map((d, i) => {
                  return (
                    <DisplayCard
                      key={i}
                      name={d.name}
                      username={d.username}
                      showUnfollow={isSignedIn && match}
                      theme={theme}
                    />
                  );
                })}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
