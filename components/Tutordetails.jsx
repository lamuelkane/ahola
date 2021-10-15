import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '../styles/Tutor.module.css'
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Tutordetails() {
  const theme = useTheme();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={`hides`} >
    <Box sx={{ bgcolor: 'background.paper', width: 400 }}>            
      {/* <AppBar position="static"> */}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
        //   aria-label="full width tabs example"
          indicatorColor="primary"
          centered
        >
          <Tab label="Video" {...a11yProps(0)} />
          <Tab label='Description' {...a11yProps(1)} />
          <Tab label="Availability" {...a11yProps(2)} />
        </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
                    <iframe width="400" height="215"
            src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">
            </iframe>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi ut numquam rerum libero? Veniam laudantium maxime voluptatibus necessitatibus nobis natus.
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className={`${styles.tutorshedule}`}>
            <ScheduleComponent >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
    </div>
  );
}
