import Header from '../components/Header'
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoginIcon from '@mui/icons-material/Login';
import Paper from '@mui/material/Paper';
import styles from '../styles/Register.module.css'



const Register = () => {
    return (
        <div>
            <div className="border">
                <Header />
            </div>
            <div className={`${styles.registerhero}`}>
                <div className={`${styles.registrationfromwrapper}`}>
                <Paper elevation={6}>
                    <div className={`flex justify-center align-center`}>
                         <h1 className={`${styles.loginh1}`}>TEACH ONLINE WITH AHOLA</h1>
                    </div>
                     <div className={`center`}>earn from your comfort zone</div>
                        <div className={`${styles.registerform} flex`}>
                          <div>
                                <div className={`margin-bottom`}>
                                    <TextField id="outlined-basic" fullWidth  label="Email" variant="outlined" />
                                </div>
                                <div className={`margin-bottom`}>
                                    <TextField id="outlined-basic" fullWidth  label="Password" variant="outlined" />
                                </div>
                                <div className={`margin-bottom flex align-center ${styles.loginformbtnwrapper}`}>
                                    <LoginIcon />
                                    <button className={`${styles.loginformbtn} large`}> 
                                        SIgnup <span className="hidexs">With Email</span>
                                    </button>
                                </div>
                                {/* <div className="flex align-center  "> */}
                                    {/* <hr /> */}
                                        <div className={`center margin-bottom`}>or you could</div>
                                    {/* <hr /> */}
                                {/* </div> */}
                                <div className={`flex ${styles.sociallogin}  justify-between`}>
                                    <div className={`${styles.socialloginbtnwraper}`}>
                                         <FacebookIcon />
                                        <button className={`${styles.socialloginbtn}`}>
                                            facebook
                                        </button>
                                    </div>
                                    <div className={`${styles.socialloginbtnwraper}`}>
                                        <img src="./images/googleimage.jpg" width='20' height='20' alt="" />
                                        <button className={`${styles.socialloginbtn}`}>
                                            google
                                        </button>
                                    </div>
                                </div>
                          </div>
                        </div>
                </Paper>
                </div>
            </div>
            <div className={`${styles.faqsection}`}>
                <Paper elevation={6}>
                <div className={`padding`}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Requirement to become an Ahola Tutor</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            <p>If you are looking to teach for an online school but you are worried about your lack 
                            of caertification or teaching experience, then today is your
                            lucky day, in Ahola, you don't need to be too certified or experienced to start earning from home. Although we do require some few basic
                            skills listed below:</p>
                            <ul>
                                <li>
                                    Be an exceptional communicator
                                </li>
                                <li>
                                    enjoy sharing your knowledge with others
                                </li>
                                <li>
                                    have a passion for helping others acheive their goals
                                </li>
                            </ul>
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Steps to become a Tutor on Ahola</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            
                            <ol>
                                <li>
                                    Provide some basic information about yourself
                                </li>
                                <li>
                                     Upload your headshot photo
                                </li>
                                <li>
                                     your strengths as a tutor
                                </li>
                                <li>
                                     Record a short video introduction
                                </li>
                                <li>
                                      Choose your availability
                                </li>
                                <li>
                                     Input your price per hour
                                </li>
                            </ol>
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                                       
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Why Tutor on Ahola</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            <p>Because it’s easy and flexible! If you teach with Ahola, you:</p>
                            <ol>
                                <li>
                                get a steady stream of new students looking to learn online

                                </li>
                                <li>
                                manage your lessons and connect with students easily

                                </li>
                                <li>
                                teach whenever and wherever you want

                                </li>
                                <li>
                                     earn by sharing what you know

                                </li>
                                <li>
                                use safe payment methods (Paypal, Payoneer)

                                </li>
                                
                            </ol>
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>What do i need to Tutor on Ahola</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            <p>You will need a laptop or a desktop computer, a stable internet
                                 connection, a webcam, and a microphone.</p>
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>How much can I earn on Ahola</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            <p> Your earnings depend on the hourly rate you set, the number of lessons you teach and how many students continue learning with you after the trial lesson. A tip for newly registered tutors: start with a lower hourly rate to get first students faster. You can change your rate anytime.

</p>
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    
                </div>
            </Paper>
            </div>
        </div>
    )
}

export default Register
