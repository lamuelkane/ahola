import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from '../styles/Dashboard.module.css'

const steps = [
  'about',
  'photo',
  'Description',
  'Video',
  'Availability',
];

export default function Steps({step}) {
  return (
    <div className={`${styles.stepswrapper}`}>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
  );
}
