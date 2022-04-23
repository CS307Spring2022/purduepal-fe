import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { ContentLarge} from "../../components/Content/ContentLarge";
import { Content } from "../../components/Content/Content";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import GlobalState from '../../contexts/GlobalStates'



const PostThread = () => {
  const theme = useTheme();
  const [isSignedIn] = useContext(GlobalState);
  const [searchParams] = useSearchParams();

  const [parentPost, setParentPost] = useState({});
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function getComments() {
      // console.log("hit")
      const postThreadRecipient = {
        "email": localStorage.getItem("email"),
        "postId": searchParams.get("postId")
      }
      const response = await fetch(`http://localhost:5000/postThread`,{
        method: "POST",
        body: JSON.stringify(postThreadRecipient),
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
      console.log(records)

      setParentPost(records["parentPost"]);
      setComments(records["comments"])
    }

    const postTimer = setInterval(() => {
      getComments();
    }, 650);
    return () => clearInterval(postTimer);
  }, [comments.length]);

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }  

  console.log(searchParams.get('postId'))

  return (
    <Stack
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
      // height={"100vh"}
      minHeight={"100vh"}
      overflow={"auto"}
      mt={2}
      sx={{ marginLeft: { xs: "0px", sm: "75px", md: "200px", lg: "200px" } }}
    >
      {Object.keys(parentPost).length === 0 ? null : <ContentLarge key={0} data={parentPost}/>}
      {comments.map((data, index) => {
        return <Content key={index+1} data={data} />;
      })}
      <Typography variant="p" sx={{ fontSize: "30px" }} color="primary">
        End of Comments!
      </Typography>
      <div>
        <svg width={100} height={50}>
          <rect
            width="100%"
            height={50}
            fill={theme.palette.background.default}
          ></rect>
        </svg>
      </div>
    </Stack>
  );
};

export default PostThread;