import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Link from 'next/link'
import {useState} from 'react'

import styles from '../styles/Dashboard.module.css'

const Signupstep4 = ({step, setstep}) => {
    const [videolink, setvideolink] = useState()

    function reverseString(str) {
    return str.split("").reverse().join("");
}


    return (
        <div>
            <div className={`${styles.tutorphotowrapper} `}>
                <Paper elevation={3}>
                    <div className={`flex wrap ${styles.tutorphoto} `}>
                        <div className={`${styles.tutorphoto1} `}>
                            <h2>Tips for an intro video</h2>
                            
                            <ul>
                                <li>
                                    Record a video and upload to youtube
                                </li>
                                <li>
                                    Take 30 seconds to talk about your self
                                </li>
                                <li>
                                    Talk about the students goals and how you think you can help
                                </li>
                                <li>
                                    Talk about your teaching method and why you chose it
                                </li>
                                <li>
                                    Talk about your lesson materials
                                </li>
                                <li>
                                    be friendly and wear a smile throughout the video
                                </li>
                                <li>
                                     Aviod useless informations 
                                </li>
                                <li>
                                     make sure the video does not go against our <Link href='/privacy-policy'>policy</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.tutorphoto2} `}>
                            <h3>Copy and paste your video link in the input feild</h3>
                            <div className={`${styles.videopreview}`}>
                             {  !videolink ? <span>paste link to view video here</span> : <iframe width="400" height="215"
            src={`https://www.youtube.com/embed/${videolink}`}>
            </iframe>
                            }
                             </div>
                            <div className={`margin-bottom`}>
                                 <TextField size="small" id="outlined-basic" onChange={e => {
                                     clearTimeout(typing)
                                     const {value} = e.target
                                     let str = reverseString(value)
                                                                         
                                     let sub = str.substring(0, str.indexOf("="))
                                     let typing = setTimeout(() => {
                                        setvideolink(reverseString(sub))
                                     }, 3000);
                                 }} fullWidth  label="Paste link here" variant="outlined" />
                            </div>
                        </div>
                        <div className="flex">
                            <button className={styles.backbtn} onClick={e => setstep(step - 1)} >Back</button>
                            <button className={styles.nextbtn} onClick={e => setstep(step + 1)} >Next</button>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Signupstep4
