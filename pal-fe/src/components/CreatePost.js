import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Fab, IconButton, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#333",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ariaLabel = { "aria-label": "description" };

export const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = useState(false);
  const handleSubmit = () => {
    //dummy code to handle creating post
    setPost(true);
    setInterval(setPost(true), 1000);
    setPost(false);
    console.log(post);
  };
  const [errorText, setErrorText] = useState(false);
  const handleTextLength = (text) =>
    text.length > 280 || text.length <= 0
      ? setErrorText(true)
      : setErrorText(false);

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              color={"#eee"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Create a Post
            </Typography>
            <TextField
              multiline
              rows={4}
              error={errorText}
              fullWidth
              placeholder="Type something"
              inputProps={ariaLabel}
              onChange={(e) => {
                setPostText(e.target.value);
                handleTextLength(postText);
              }}
            />
            <Stack direction={"row"}>
              <IconButton color="primary">
                <AddAPhotoIcon />
              </IconButton>
            </Stack>
            <Button
              disabled={errorText ? true : false}
              variant="contained"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
