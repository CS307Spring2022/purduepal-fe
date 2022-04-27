import {
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
  Typography,
  IconButton,
  Modal,
  TextField,
  Button,
  styled,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  NotificationsOutlined as FollowEmptyIcon,
  NotificationsActiveRounded as FollowFillIcon,
} from "@mui/icons-material";
import { useEffect, useContext } from "react";
import GlobalState from "../../contexts/GlobalStates";
import { Content } from "../../components/Content/Content";

import { useSearchParams } from "react-router-dom";

import { url } from "../../ENV";
import FollowingList from "../../components/FolllowingList";

// global.Buffer = global.Buffer || require("buffer").Buffer;

function TabPanel(props) {
  let { children, value, index, data, isSignedIn, ...other } = props;
  const isPosts = children === "Posts";
  // console.log(data);
  // data.reverse();
  // console.log(isSignedIn);
  // console.log(data);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && data && (
        <Box sx={{ p: 3 }}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
            {data.map((d, index) => {
              return <Content isProfile={isSignedIn} key={index} data={d} />;
            })}
          </Stack>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs({ data, isSignedIn }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Interactions" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel isSignedIn={localStorage.getItem("email") === null} value={value} index={0} data={data.createdPostsObject}>
        Posts
      </TabPanel>
      <TabPanel isSignedIn={true} value={value} index={1} data={data.interactedPostsObject}>
        Interactions
      </TabPanel>
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "secondary.main",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

const ProfileDetails = ({ data }) => {
  console.log(data);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const widthCalc = `calc(100vw - ${matches ? "200" : "75"}px)`;

  const [searchParams] = useSearchParams();

  // const myEmail = localStorage.getItem("email")

  const [match] = useState(
    searchParams.get("user") === localStorage.getItem("username")
  );

  const { isSignedIn, setIsSignedIn, userTheme, setUserTheme } =
    useContext(GlobalState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    async function onSubmit() {
      const email = localStorage.getItem("email");
      const editedPerson = {
        firstName: changeFirstName,
        lastName: changeLastName,
        bio: changeBio,
        email: email,
      };

      console.log(JSON.stringify(editedPerson));

      await fetch(`${url}/updateUserInfo`, {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    onSubmit();
  };

  const [changeFirstName, setChangeFirstName] = useState(data.firstName);
  const [invalidChangeFirstName, setInvalidChangeFirstName] = useState(false);
  const [changeFirstNameErrMsg, setChangeFirstNameErrMsg] = useState("");

  const [changeLastName, setChangeLastName] = useState(data.lastName);
  const [invalidChangeLastName, setInvalidChangeLastName] = useState(false);
  const [changeLastNameErrMsg, setChangeLastNameErrMsg] = useState("");

  const [changeBio, setChangeBio] = useState(data.bio);
  const [invalidChangeBio, setInvalidChangeBio] = useState(true);
  const [changeBioErrMsg, setChangeBioErrMsg] = useState("");

  // const buf = Buffer.from(data.profilePic.split("base64,")[1]).toString(
  //   "base64"
  // );

  // console.log(buf);

  useEffect(() => {
    async function onSubmit() {
      const loggedEmail = localStorage.getItem("email");
      const loggedUser = localStorage.getItem("username");
      const profileUser = searchParams.get("user");
      console.log({
        loggedEmail: loggedEmail,
        loggedUser: loggedUser,
        profileUser: profileUser,
      });
      await fetch(`${url}/getUser`, {
        method: "POST",
        body: JSON.stringify({
          loggedEmail: loggedEmail,
          loggedUser: loggedUser,
          profileUser: profileUser,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    onSubmit();
  }, [searchParams]);

  const Input = styled("input")({
    display: "none",
  });

  const handleFileChange = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    formData.append("email", localStorage.getItem("email"));
    async function onSubmit() {
      await fetch(`${url}/addProfileImage`, {
        method: "POST",
        body: formData,
      });
      window.location.reload();
    }
    onSubmit();
  };

  const [changeFollowingUsers, setChangeFollowingUsers] = useState(
    data.followingUsers
  );

  const justNames = [];
  for (let i = 0; i < data.followingUsers.length; i++) {
    justNames.push(data.followingUsers[i]["name"]);
  }

  const [following, setFollowing] = useState(
    isSignedIn && match ? 0 : Number(data.loggedFollows) + 1
  );
  console.log(following);

  async function updateUserFollow() {
    const followRecipient = {
      follower: localStorage.getItem("email"),
      following: data._id,
    };
    console.log(followRecipient);
    let response;
    if (following === 1) {
      response = await fetch(`http://localhost:5000/followUser`, {
        method: "POST",
        body: JSON.stringify(followRecipient),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (following === 2) {
      response = await fetch(`http://localhost:5000/unfollowUser`, {
        method: "POST",
        body: JSON.stringify(followRecipient),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!response.ok) {
      // const message = `An error oc`;
      // window.alert(message);
      console.log(response);
      return;
    }

    const res = await response.json();
    console.log(res);
    if (res.message) {
      response = await fetch(`http://localhost:5000/getFollowers`, {
        method: "POST",
        body: JSON.stringify({ email: data._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // const message = `An error oc`;
        // window.alert(message);
        console.log(response);
        return;
      }

      const newFollowing = await response.json();
      console.log("New Following:" + newFollowing);
      setChangeFollowingUsers(newFollowing.newFollowing);
    }
  }

  useEffect(() => {
    if (changeFirstName.length > 0 && changeFirstNameErrMsg) {
      setChangeFirstNameErrMsg("");
      setInvalidChangeFirstName(false);
    } else {
      setInvalidChangeBio(true);
    }
  }, [changeFirstName, changeFirstNameErrMsg]);

  useEffect(() => {
    if (changeLastName.length > 0 && changeLastNameErrMsg) {
      setChangeLastNameErrMsg("");
      setInvalidChangeLastName(false);
    } else {
      setInvalidChangeBio(true);
    }
  }, [changeLastName, changeLastNameErrMsg]);

  useEffect(() => {
    if (changeBio.length > 0 && changeBio.length < 240) {
      setChangeBioErrMsg("");
      setInvalidChangeBio(false);
    } else {
      setInvalidChangeBio(true);
    }
  }, [changeBio, changeBioErrMsg]);

  return (
    <Grid container spacing={2}>
      <Grid
        width={widthCalc}
        justifyContent={"center"}
        alignItems={"center"}
        item
        container
      >
        <Grid
          sm={12}
          mt={2}
          item
          container
          justifyContent={"space-around"}
          direction={"row"}
          spacing={4}
        >
          <Grid sm={2} item>
            <label htmlFor="upload-profile-picture">
              <Input
                accept="image/png"
                id="upload-profile-picture"
                type="file"
                onChange={(e) => handleFileChange(e)}
                disabled={!(isSignedIn && match)}
              />
              <IconButton
                color={"primary"}
                component="span"
                aria-label="upload profile picture"
                disabled={!(isSignedIn && match)}
              >
                {data.profilePic.length > "data:image/png;base64,".length ? (
                  <img
                    // src={`data:image/png;base64,${buf}`}
                    src={data.profilePic}
                    alt="profile pic of user"
                    width={100}
                    height={100}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: "100px" }} />
                )}
              </IconButton>
            </label>
          </Grid>
          <Grid sm={7} item>
            <Stack direction="column">
              <Typography
                color={theme.palette.mode === "dark" ? "#fff" : "#000"}
                variant={"h4"}
              >
                {`${changeFirstName} ${changeLastName}`}
              </Typography>
              <Typography
                color={theme.palette.mode === "dark" ? "#ddd" : "#222"}
                variant={"subtitle1"}
              >
                {`@${data.username}`}
              </Typography>
            </Stack>
          </Grid>
          <Grid sm={2} item>
            {isSignedIn && match ? (
              <IconButton
                color={"primary"}
                variant={"outlined"}
                onClick={handleOpen}
              >
                <EditIcon />
              </IconButton>
            ) : isSignedIn ? (
              <IconButton
                color="primary"
                onClick={() => {
                  updateUserFollow();
                  setFollowing(following === 1 ? 2 : 1);
                }}
              >
                {following === 2 ? (
                  <FollowFillIcon color="primary" />
                ) : (
                  <FollowEmptyIcon color="primary" />
                )}
                {following === 2 ? "Following" : "Follow"}
              </IconButton>
            ) : null}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  color={"#fff"}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Edit Profile Details
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="changeFirstName"
                  label="First Name"
                  name="changeFirstName"
                  autoComplete="given-name"
                  autoFocus
                  error={invalidChangeFirstName}
                  onChange={(e) => setChangeFirstName(e.target.value)}
                  helperText={changeFirstNameErrMsg}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="changeLastName"
                  label="Last Name"
                  name="changeLastName"
                  autoComplete="given-name"
                  autoFocus
                  error={invalidChangeLastName}
                  onChange={(e) => setChangeLastName(e.target.value)}
                  helperText={changeLastNameErrMsg}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Bio"
                  label="Bio"
                  name="bio"
                  autoComplete="given-name"
                  autoFocus
                  error={invalidChangeBio}
                  onChange={(e) => setChangeBio(e.target.value)}
                  helperText={changeBioErrMsg}
                />
                <Button
                  variant="filled"
                  color={"success"}
                  disabled={
                    invalidChangeBio ||
                    invalidChangeLastName ||
                    invalidChangeFirstName
                  }
                  onClick={handleClose}
                >
                  Submit
                </Button>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
      <Grid item ml={2.5}>
        <Typography
          variant="h6"
          color={theme.palette.mode === "dark" ? "#fff" : "#000"}
        >
          {`${changeBio}`}
        </Typography>
      </Grid>
      <Grid item ml={2.5} sm={12}>
        <Stack direction={"row"} spacing={3}>
          <FollowingList
            property={"Followers"}
            data={changeFollowingUsers}
            isTopic={false}
          />

          <FollowingList
            property={"Following"}
            data={data.usersFollowing}
            isTopic={false}
          />

          <FollowingList
            property={"Topics"}
            data={data.topicsFollowing}
            isTopic
          />
        </Stack>
      </Grid>
      <Grid item sm={12}>
        <BasicTabs data={data} isSignedIn/>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
