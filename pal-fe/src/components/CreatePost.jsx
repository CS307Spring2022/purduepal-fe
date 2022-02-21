import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  Fab,
  IconButton,
  Stack,
  TextField,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useTheme, useMediaQuery } from "@mui/material";

const filter = createFilterOptions();

export default function FreeSoloCreateOption() {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={topicOptions}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: "50%" }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Choose Topic" />}
    />
  );
}

const topicOptions = [
  { title: "Marvel" },
  { title: "DC" },
  { title: "Purdue" },
  { title: "Math" },
];

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const fabPosWidth = matches ? "80px" : "16px";
  const fabPosHeight = matches ? "22px" : "40px";
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
          position: "fixed",
          bottom: fabPosWidth,
          right: fabPosHeight,
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
            <FreeSoloCreateOption />
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
