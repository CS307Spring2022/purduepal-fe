import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { Card, CardHeader, Avatar } from "@mui/material";

const followingList = [
  { name: "Bruce Banner", bio: "Smash" },
  { name: "Thor", bio: "Worthy" },
  { name: "Bruce Banner", bio: "Smash" },
];

const topics = ["Marvel", "Twitter", "DC", "Netflix", "Cricket"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "75%",
  bgcolor: "#444",
  border: "2px solid #ddd",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const DisplayCard = ({ name, bio }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe"></Avatar>}
        title={name}
        subheader={bio}
      />
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

export default function FollowingList({ number, property, isTopic }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} disableRipple disableElevation>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="subtitle2" color="#fff">
            {number ? number : topics.length}
          </Typography>
          <Typography variant="subtitle2" color="#ddd">
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
            <Typography id="modal-modal-title" variant="h4" component="h2">
              <strong>{property}</strong>
            </Typography>
            {isTopic
              ? topics.map((d) => {
                  return <DisplayTopic key={d} name={d} />;
                })
              : followingList.map((d, i) => {
                  return <DisplayCard key={i} name={d.name} bio={d.bio} />;
                })}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
