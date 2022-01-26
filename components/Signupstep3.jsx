import Paper from '@mui/material/Paper';
import styles from '../styles/Dashboard.module.css'
import TextField from '@mui/material/TextField';

const Signupstep3 = ({step, setstep}) => {
    return (
        <div>
            <div className={`${styles.descriptionwrapper}`}>
                <Paper elevation={3}>
                    <div className={`${styles.description}`}>
                        <h1>Profile Description</h1>
                        <p> create a new profile headline and description. It will appear on your tutor card</p>
                        <b>Description for English-speaking students</b>
                        <div className='flex'>
                            <img className={`${styles.profileimage} margin-right`} src="../images/maleteacher.jpg" width='100' height='100' alt="" />
                            <div className="flex column">
                                <b>Lemuel E.</b>
                                <div className={`margin-bottom`}>
                                    <TextField size="small" id="outlined-basic" fullWidth  label="FirstName" variant="outlined" />
                                </div>
                                <i>Good example: “Certified tutor with 5 years of experience”</i>                                                                                                                                      
                            </div>
                        </div>
                        <div className={`${styles.descriptiontextwrapper} flex column`}>
                            <b>Introduce yourself and share briefly about your interests</b>
                            <textarea className={`${styles.decsriptiontextarea}`} placeholder='Hello I am called ... and I am from ...' name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className={`${styles.descriptiontextwrapper} flex column`}>
                            <b>Describe your teaching experience, certification and methodology</b>
                            <textarea className={`${styles.decsriptiontextarea}`} placeholder='I have 2 years of teaching expeerience, I am TOEFL certified and my classes are'  name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className={`${styles.descriptiontextwrapper} flex column`}>
                            <b>Motivate students to book a trial lesson with you</b>
                            <textarea className={`${styles.decsriptiontextarea}`} placeholder='Book trial lesson with me let us discus your goals and how we can acheive them'  name="" id="" cols="30" rows="10"></textarea>
                        </div>

                        <p>400 characters minimum. 0 characters currently.</p>

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

export default Signupstep3
