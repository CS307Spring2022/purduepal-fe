import { Stack, IconButton, Typography } from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { useState } from "react";
import { format } from "d3-format";
import { useEffect } from "react";

import { url } from "../ENV";

const thousandFormat = format(",.2s");
const numberFormat = format(",~s");
let messageToSend = 5;

export const Interactions = ({ up, down, initialReaction, uuid, isSaved }) => {
  const [action, setAction] = useState(initialReaction); //temporary to test interaction
  // 1: upvote, 2: downvote, 3: undo up, 4: undo down, 5: uninteraction

  const [saved, setSaved] = useState(isSaved);

  const handleSavePost = (e) => {
    setSaved(!saved);
    e.preventDefault();
    async function onSubmit() {
      const saveObj = { email: localStorage.getItem("email"), postID: uuid };
      await fetch(`${url}/savePost`, {
        method: "POST",
        body: JSON.stringify(saveObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    onSubmit();
  };

  useEffect(() => {
    async function onSubmit() {
      const interactionData = {
        email: localStorage.getItem("email"),
        postID: uuid,
        interaction: messageToSend,
      };
      messageToSend = 5;
      await fetch(`${url}/interactPost`, {
        method: "POST",
        body: JSON.stringify(interactionData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    onSubmit();
  }, [messageToSend, uuid]);
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      spacing={{ xs: 2.5, sm: 5, md: 6, lg: 10 }}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={0} alignItems={"center"}>
        <IconButton
          onClick={() => {
            messageToSend = action === 1 ? 3 : 1;
            setAction(action !== 1 ? 1 : 0);
            console.log(`like ${action}`);
          }}
          color="primary"
        >
          {action === 1 ? (
            <ThumbUpAltRoundedIcon />
          ) : (
            <ThumbUpAltOutlinedIcon />
          )}
        </IconButton>
        <Typography variant="body2" color={"primary"}>
          {up > 999 ? thousandFormat(up) : numberFormat(up)}
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={0} alignItems={"center"}>
        <IconButton
          onClick={() => {
            messageToSend = action === 2 ? 4 : 2;
            setAction(action !== 2 ? 2 : 0);
            console.log(`dislike ${action}`);
          }}
          color="primary"
        >
          {action === 2 ? (
            <ThumbDownAltRoundedIcon />
          ) : (
            <ThumbDownAltOutlinedIcon />
          )}
        </IconButton>
        <Typography variant="body2" color={"primary"}>
          {down > 999 ? thousandFormat(down) : numberFormat(down)}
        </Typography>
      </Stack>
      <IconButton
        color="primary"
        href={"/purduepal-fe/postThread?postId=" + uuid}
      >
        <ChatRoundedIcon />
      </IconButton>
      <IconButton color="primary">
        <ShareRoundedIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleSavePost}>
        {saved ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
      </IconButton>
    </Stack>
  );
};
