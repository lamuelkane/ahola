import DashBoardHeader from "../components/DashBoardHeader"
import Steps from "../components/Steps"
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import styles from '../styles/Dashboard.module.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'

const Signupstep1 = ({step, setstep}) => {
    return (
        <div>
            <div className={`${styles.mainsignupwrapper}`}>
                <Paper elevation={3}>
                    <div className={`${styles.mainsignp}`}>
                        <div className={`margin-bottom`}>
                            <TextField size="small" id="outlined-basic" fullWidth  label="FirstName" variant="outlined" />
                        </div>
                        <div className={`margin-bottom`}>
                            <TextField size="small" id="outlined-basic" fullWidth  label="LastName" variant="outlined" />
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: 300 }} >
                                <InputLabel id="demo-simple-select-disabled-label">Country of Origin</InputLabel>
                                <Select
                                labelId="demo-simple-select-disabled-label"
                                id="demo-simple-select-disabled"
                                // value={age}
                                label="Country of Origin"
                                // onChange={handleChange}
                                autoWidth
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={`flex `}>
                            <div>
                                <FormControl sx={{ m: 1, width: 150 }} >
                                    <InputLabel id="demo-simple-select-disabled-label">Language</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="demo-simple-select-disabled"
                                    // value={age}
                                    label="Age"
                                    // onChange={handleChange}
                                    autoWidth
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={`margin-bottom`}>
                                <FormControl sx={{ m: 1, width: 150 }} >
                                    <InputLabel id="demo-simple-select-disabled-label">Level</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="demo-simple-select-disabled"
                                    // value={age}
                                    label="Age"
                                    // onChange={handleChange}
                                    autoWidth
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    <FormHelperText>Level</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <div>Add Language</div>
                          <div className={`margin-bottom`}>
                                <FormControl sx={{ m: 1, width: 300 }} >
                                    <InputLabel id="demo-simple-select-disabled-label">Subject taught</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="demo-simple-select-disabled"
                                    // value={age}
                                    label="Age"
                                    // onChange={handleChange}
                                    autoWidth
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                   
                                </FormControl>
                            </div>
                            <div className={`margin-bottom`}>
                                <TextField size="small" id="outlined-basic"  label="Password" variant="outlined" InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}/>
                            </div>
                            <div className={`margin-bottom`}>
                                <FormGroup>
                                        <FormControlLabel control={<Checkbox  />} label="please comfirm you are over 18" />
                                </FormGroup>
                            </div>
                            <div className="flex">
                            <button className={styles.backbtn} onClick={e => setstep(step - 1)} >Back</button>
                            <button className={styles.nextbtn} onClick={e => setstep(step + 1)} >Next</button>
                        </div>
                    </div>
                </ Paper>
            </div>
       
        </div>
    )
}

export default Signupstep1
