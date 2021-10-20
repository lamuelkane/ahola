import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import {useState} from 'react'

import DashBoardHeader from "../components/DashBoardHeader"
import Steps from "../components/Steps"
import styles from '../styles/Dashboard.module.css'
import Signupstep1 from "../components/Signupstep1";
import Signupstep2 from "../components/Signupstep2";
import Signupstep3 from "../components/Signupstep3";
import Signupstep4 from "../components/Signupstep4";

const Singup = () => {
    const [step, setstep] = useState(3)
    return (
        <div>
            <div className="border">
                 <DashBoardHeader />
            </div>
            <div className={`${styles.stepsbodywrapper}`}>
            <div className="border w-100">
                <Steps step={step} />
            </div>
                { step === 0 && <Signupstep1 step={step} setstep={setstep} />}
                { step === 1 && <Signupstep2 step={step} setstep={setstep} />}
                { step === 2 && <Signupstep3 step={step} setstep={setstep} />}
                { step === 3 && <Signupstep4 step={step} setstep={setstep} />}
            </div>
        </div>
    )
}

export default Singup
