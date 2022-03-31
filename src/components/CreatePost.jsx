import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  Fab,
  IconButton,
  Stack,
  Input,
  TextField,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CommentRounded } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { url } from "../ENV";

const filter = createFilterOptions();

export default function FreeSoloCreateOption({ isComment }) {
  const [value, setValue] = useState(null);
  const [errorTopic, setErrorTopic] = useState(false);
  const [errorTopicMessage, setErrorTopicMessage] = useState("");

  console.log(isComment)

  // const [searchParams] = useSearchParams();

  // const [isComment,setIsComment] = useState(searchParams.get("postId")!==null);

  useEffect(() => {
    if (value !== null) {
      if (value.length <= 0 || value.length > 50) {
        setErrorTopic(true);
        setErrorTopicMessage("Topic must be between 1-50 characters");
      } else {
        setErrorTopic(false);
        setErrorTopicMessage("");
      }
    }
  }, [value]);

  if (isComment) {
    return null;
  }
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue);
        if (typeof newValue === "string") {
          console.log("here",newValue, newValue.length);
          if (newValue.length === 0 || newValue.length > 50) {
            setErrorTopic(true);
            setErrorTopicMessage("Topic must be 1-50 characters");
          } else {
            setErrorTopic(false);
            setErrorTopicMessage("");
            setValue({
              title: newValue,
            });
            console.log(newValue)
            localStorage.setItem("topicName",newValue.title);
          }
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          console.log(newValue, newValue.length);
          if (
            newValue.inputValue.length === 0 ||
            newValue.inputValue.length > 50
          ) {
            setErrorTopic(true);
            setErrorTopicMessage("Topic must be 1-50 characters");
          } else {
            setErrorTopic(false);
            setErrorTopicMessage("");
            setValue({
              title: newValue.inputValue,
            });
            console.log(newValue)
            localStorage.setItem("topicName",newValue.inputValue);
          }
        } else {
          setValue(newValue);
          console.log(newValue);
          localStorage.setItem("topicName",newValue.title);

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
      id="topic-chosen-autocomplete"
      options={topicOptions}
      getOptionLabel={(option) => {
        // console.log(option)
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          console.log("hit 1")
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          console.log("hit 2")
          return option.inputValue;
        }
        // Regular option
        console.log("hit 3")
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: "50%" }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          error={errorTopic}
          helperText={errorTopicMessage}
          label="Choose Topic"
          id="topic-chosen-textfield"
        />
      )}
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
  const [searchParams] = useSearchParams();

  const [isComment, setIsComment] = useState(
    searchParams.get("postId") !== null
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const fabPosWidth = matches ? "80px" : "16px";
  const fabPosHeight = matches ? "22px" : "40px";
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorText(false);
    setErrorTextMessage("");
  };
  // const [post, setPost] = useState(false);
  const handleSubmit = () => {
    //dummy code to handle creating post
    // setPost(true);
    // setInterval(setPost(true), 1000);
    // setPost(false);
    // console.log(post);

    async function makePost() {
      const body = {
        "user": localStorage.getItem("email"),
        "contentType": 0,
        "content": postText,
        "postImage": image,
        "parentID": isComment ? searchParams.get("postId") : null,
        "topicName": localStorage.getItem("topicName")
      }
      console.log(body)
      let response;
      response = await fetch(`http://localhost:5000/createPost`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = `An error oc`;
        // window.alert(message);
        console.log(response)
        return;
      }

      const records = await response.json();
      // console.log(records)

      }

      makePost();
    }

  const isURL = (str) => {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return true;
  };

  const [image,setImage] = useState("");

  const [paste, setPaste] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [errorTextMessage, setErrorTextMessage] = useState("");
  const handleTextLength = (text) => {
    // console.log(isURL(text),text);
    const urlValid = isURL(text);
    if (text.length > 280 || text.length <= 0) {
      console.log(urlValid, text);
      if (
        !urlValid &&
        (text.includes("http://") || text.includes("https://"))
      ) {
        setErrorText(true);
        setErrorTextMessage("URL is invalid");
      } else if (!urlValid) {
        setErrorText(true);
        setErrorTextMessage("Post Must Contain Between 1-280 characters");
      } else {
        setErrorText(false);
        setErrorTextMessage("");
      }
    } else {
      if (
        !urlValid &&
        (text.includes("http://") || text.includes("https://"))
      ) {
        setErrorText(true);
        setErrorTextMessage("URL is invalid");
      } else {
        setErrorText(false);
        setErrorTextMessage("");
      }
    }
  };

  async function handleFileChange(e) {
    e.preventDefault();

    // let formData = new FormData();
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (e) => {
      let res = reader.result
      console.log(res)
      setImage(res)
      console.log(image)
    }
  };

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
        {isComment ? <CommentRounded /> : <AddIcon />}
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
              {isComment ? "Reply to Post" : "Create a Post"}
            </Typography>
            <FreeSoloCreateOption isComment={isComment} />
            <TextField
              multiline
              rows={4}
              error={errorText}
              fullWidth
              placeholder="Type something"
              inputProps={ariaLabel}
              helperText={errorTextMessage}
              onChange={(e) => {
                if (!paste) {
                  // console.log("changed!! "+e.target.value)
                  setPostText(e.target.value);
                  console.log("changed!! " + postText);
                  handleTextLength(e.target.value);
                }
                setPaste(false);
              }}
              onPaste={(e) => {
                // console.log("pasted!! ")
                setPaste(true);
                e.clipboardData.items[0].getAsString((text) => {
                  setPostText(text);
                  handleTextLength(text);
                });
              }}
            />
            <Stack direction={"row"}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-pic"
                type="file"
                onChange={(e) => {let file = e.target.files[0]; console.log(file); let reader = new FileReader(); reader.readAsDataURL(file); console.log(reader.result); handleFileChange(e)}}
              />
              <label htmlFor="upload-pic">
                <IconButton color="primary" variant="raised" component="span">
                  <AddAPhotoIcon/>
                </IconButton>
              </label> 
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
