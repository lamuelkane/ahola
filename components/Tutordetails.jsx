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

export default function Tutordetails({teacher}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const week = [
    '',
    'mo',
    'tu',
    'we',
    'th',
    'fr',
    'sa',
    'su'
  ]

  const hoursgroup = [
    {
      interval: [0, 1, 2, 3],
      value: '00-04'
    },
    {
      interval: [4, 5, 6, 7],
      value: '04-08'
    },
    {
      interval: [8, 9, 10, 11],
      value: '08-12'
    },
    {
      interval: [12, 13, 14, 15],
      value: '12-16'
    },
    {
      interval: [16, 17 , 18, 19],
      value: '16-20'
    },
    {
      interval: [20, 21, 22, 23],
      value: '20-23'
    },
   
  ]


 const getvilbleperiod = (avail, interval) => {
    for (let i = 0; i < interval.length; i++) {
      const element = interval[i];
      for (let j = 0; j < avail.length; j++) {
        const el = avail[j];
        if(element === el) return true
        
      }
    }

    return false
 }

  return (
    <div className={`hidel`} >
    <Box sx={{ bgcolor: 'background.paper', width: 350 }}>            
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
          <Tab label="video" {...a11yProps(0)} />
          <Tab label="availability" {...a11yProps(1)} />
        </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
                    <iframe width="350" height="215"
            src="https://www.youtube.com/embed/j4cuSOz6PHM">
            </iframe>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={`${styles.tutorshedule} border-green-400`}>
            <div className={`grid grid-cols-7 border border-green-400`}>
                 {
                   week.map((day, dayidx) => (
                  <React.Fragment  key={day} >
                      <span key={day} className={` p-1 border border-blue-800  center text-xs`}>{day}</span>
                  {   hoursgroup.map((item, i) => (
                    <React.Fragment  key={i} >
                      {/* {dayidx === 1 && i === 2 &&  console.log(teacher.availaibility[day], day, teacher.firstname)} */}
                      <span className={` p-1 border border-blue-800 ${dayidx !== 0 && getvilbleperiod(teacher.availaibility[day], item.interval) && 'bg-blue-400'} center text-xs`}>{dayidx === 0? item.value : ''}</span>
                    </React.Fragment >
                     ))}
                  </React.Fragment >
                   ))
                 }
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
    </div>   
  );
}
