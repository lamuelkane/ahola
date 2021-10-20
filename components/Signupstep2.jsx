import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import styles from '../styles/Dashboard.module.css'

const Input = styled('input')({
  display: 'none',
});

const Signupstep2 = ({step, setstep}) => {
    return (
        <div>
            <div className={`${styles.tutorphotowrapper} `}>
                <Paper elevation={3}>
                    <div className={`flex wrap ${styles.tutorphoto} `}>
                        <div className={`${styles.tutorphoto1} `}>
                            <h2>Tips for an amazing photo</h2>
                            <div className={`flex`}>
                                <img className={`margin-right ${styles.samplephoto}`} src="./images/maleteacher.jpg" width='100' height='100' alt="" />
                                <img className={`margin-right ${styles.samplephoto}`} src="./images/femaleteacher.jpg" width='100' height='100' alt="" />
                                <img className={`margin-right ${styles.samplephoto}`} src="./images/maleteacher.jpg" width='100' height='100' alt="" />
                            </div>
                            <ul>
                                <li>
                                Smile and look at the camera
                                </li>
                                <li>
                                Frame your head and shoulders

                                </li>
                                <li>
                                Your photo is centered and upright

                                </li>
                                <li>
                                Use neutral lighting and background

                                </li>
                                <li>
                                Your face and eyes are fully visible (except for religious reasons)

                                </li>
                                <li>
                                Avoid logos or contact information

                                </li>
                                <li>
                                You are the only person in the photo
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.tutorphoto2} `}>
                            <h3>Make a Good first impression</h3>
                            <p>Tutors who look friendly and professional get the most students</p>
                            <div classNam={`flex justify-between`}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span">
                                        Upload 
                                    </Button>
                                </label>
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

export default Signupstep2
