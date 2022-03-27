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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect } from "react";

import { url } from "../../ENV";
import { Link } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography color={"#fff"}>{children}</Typography>
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

function BasicTabs() {
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
      <TabPanel value={value} index={0}>
        Posts
      </TabPanel>
      <TabPanel value={value} index={1}>
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

export const ProfileDetails = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const widthCalc = `calc(100vw - ${matches ? "200" : "75"}px)`;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    async function onSubmit() {
      const email = localStorage.getItem("email");
      const editedPerson = {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        email: email,
      };

      console.log(JSON.stringify(editedPerson));

      await fetch(`${url}/update`, {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    onSubmit();
  };

  const routeParser = (page) => {
    // if (page === "home") {
    //   return "/purduepal-fe";
    // }
    return "/purduepal-fe/" + page.toLowerCase();
  };

  const [firstName, setFirstName] = useState("Dr. Stephen");
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");

  const [lastName, setLastName] = useState("Strange");
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [lastNameErrMsg, setLastNameErrMsg] = useState("");

  const [bio, setBio] = useState("MD. Sorcerer Supreme. Avenger.");
  const [invalidBio, setInvalidBio] = useState(false);
  const [bioErrMsg, setBioErrMsg] = useState("");

  useEffect(() => {
    if (firstName.length > 0 && firstNameErrMsg) {
      setFirstNameErrMsg("");
      setInvalidFirstName(false);
    }
  }, [firstName, firstNameErrMsg]);

  useEffect(() => {
    if (lastName.length > 0 && lastNameErrMsg) {
      setLastNameErrMsg("");
      setInvalidLastName(false);
    }
  }, [lastName, lastNameErrMsg]);

  useEffect(() => {
    if (bio.length > 0 && bioErrMsg && bio.length < 240) {
      setBioErrMsg("");
      setInvalidBio(false);
    }
  }, [bio, bioErrMsg]);

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
            <IconButton color={"primary"}>
              <AccountCircleIcon sx={{ fontSize: "100px" }} />
            </IconButton>
          </Grid>
          <Grid sm={7} item>
            <Stack direction="column">
              <Typography color={"#fff"} variant={"h4"}>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography color={"#ddd"} variant={"subtitle1"}>
                @drstrange
              </Typography>
            </Stack>
          </Grid>
          <Grid sm={2} item>
            <IconButton
              color={"primary"}
              variant={"outlined"}
              onClick={handleOpen}
            >
              <EditIcon />
            </IconButton>
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
                  id="FirstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  error={invalidFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  helperText={firstNameErrMsg}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Lastname"
                  label="Last Name"
                  name="lastName"
                  autoComplete="given-name"
                  autoFocus
                  error={invalidLastName}
                  onChange={(e) => setLastName(e.target.value)}
                  helperText={lastNameErrMsg}
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
                  error={invalidBio}
                  onChange={(e) => setBio(e.target.value)}
                  helperText={bioErrMsg}
                />
                <Button
                  variant="filled"
                  color={"success"}
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
        <Typography variant="h6" color="#fff">
          {`${bio}`}
        </Typography>
      </Grid>
      <Grid item ml={2.5} sm={12}>
        <Stack direction={"row"} spacing={3}>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle2" color={"#fff"}>
              10M
            </Typography>
            <Typography variant="subtitle2" color={"#ddd"}>
              Followers
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.25}>
            <Link href={routeParser("following-list")} underline="none">
              <Typography variant="subtitle2" color={"#fff"}>
                23 Following
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid item sm={12}>
        <BasicTabs />
      </Grid>
    </Grid>
  );
};
