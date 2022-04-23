import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, useTheme } from "@mui/material";
import { Card, CardHeader, Avatar } from "@mui/material";
import { CardActions } from "@mui/material";

const followingList = [
  { name: "Bruce Banner", bio: "Smash" },
  { name: "Thor", bio: "Worthy" },
  { name: "Wong", bio: ".." },
];

const topics = ["Marvel", "Twitter", "DC", "Netflix", "Cricket"];

const handleUnfollow = (username) => {
  console.log(username);
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
  }
  updateUnfollow();
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "75%",
  bgcolor: "#000",
  border: "2px solid #ddd",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const DisplayCard = ({ name, username }) => {
  return (
    <Card>
      <CardHeader avatar={<Avatar aria-label="recipe"></Avatar>} title={name} />
      <CardActions>
        <Button
          onClick={() => {
            handleUnfollow(username);
          }}
        >
          Unfollow
        </Button>
      </CardActions>
    </Card>
  );
};
const DisplayTopic = ({ name }) => {
  return (
    <Card>
      <CardHeader title={name} />
    </Card>
  );
};

export default function FollowingList({ number, property, data, isTopic }) {
  console.log(data);
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} disableRipple disableElevation>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="subtitle2">
            {number ? number : data.length}
          </Typography>
          <Typography variant="subtitle2" color="#c4c4c4">
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
                  return <DisplayTopic key={d} name={d} />;
                })
              : data.map((d, i) => {
                  return (
                    <DisplayCard key={i} name={d.name} username={d.username} />
                  );
                })}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
