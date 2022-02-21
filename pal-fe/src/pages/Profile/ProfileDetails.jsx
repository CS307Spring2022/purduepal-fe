import {
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
  const [value, setValue] = React.useState(0);

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
          <Tab label="Media" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Posts
      </TabPanel>
      <TabPanel value={value} index={1}>
        Interactions
      </TabPanel>
      <TabPanel value={value} index={2}>
        Media
      </TabPanel>
    </Box>
  );
}

export const ProfileDetails = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const widthCalc = `calc(100vw - ${matches ? "200" : "75"}px)`;
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
                Dr. Stephen Strange
              </Typography>
              <Typography color={"#ddd"} variant={"subtitle1"}>
                @drstrange
              </Typography>
            </Stack>
          </Grid>
          <Grid sm={2} item>
            <IconButton color={"primary"} variant={"outlined"}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item ml={2.5}>
        <Typography variant="h6" color="#fff">
          MD. Sorcerer Supreme. Avenger.
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
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle2" color={"#fff"}>
              23
            </Typography>
            <Typography variant="subtitle2" color={"#ddd"}>
              Following
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item sm={12}>
        <BasicTabs />
      </Grid>
    </Grid>
  );
};
