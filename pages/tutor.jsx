import Header from '../components/Header'
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule'
import styles from '../styles/Tutor.module.css'
import Reviewprogress from '../components/Reviewprogress';
import StarRateIcon from '@mui/icons-material/StarRate';

const Tutor = () => {
    return (
        <div>
            <div className="border">
                <Header />
            </div>
                <div className={`${styles.tutorpaewrapper}`}>
                    <div className={`${styles.tutoridentitywrapperparent} flex justify-center w-80 margin-auto`}>
                           <div className={`${styles.tutoridentitywrapper}`}>
                           <Paper>
                                <div className={`flex  ${styles.tutoridentity} column w-100`}>
                                    <iframe className={`${styles.tutoridentityvideo}`} src="https://www.youtube.com/embed/j4cuSOz6PHM"></iframe>
                                    <div className={`flex wrap justify-between ${styles.tutoridentityinfo}`}>
                                        <div className={`flex  ${styles.tutorinfoaboutwrapper}`}>
                                            <div  className={`${styles.tutoridentityinfoimgholder}`}>
                                                <img className={`${styles.tutoridentityinfoimg}`} src="./images/maleteacher.jpg" alt="" width="100" height="100"/>
                                                <div className={`${styles.tutoridentityinfoonline}`}>online</div>
                                            </div>
                                            <div className={`${styles.tutoridentityinfoabout}`}>

                                                <b>Tutor Lemuel</b>
                                                <div>English Tutor</div>
                                                <div>from cameroon</div>

                                                <p>
                                                    <span>spaeks</span><span>English</span><span>French</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <Rating name="read-only" value={5} readOnly />
                                                <span>5.0</span>
                                            </div>
                                            <div>2 Lesson</div>
                                            <div>5 active students</div>
                                        </div>
                                    </div>
                                <div>
                                        <hr />
                                            <div className={`${styles.tutordesciptiontext}`}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis 
                                                error sequi dolores architecto soluta.
                                                Natus ab doloribus nemo quia, laudantium culpa molestiae ea mollitia
                                                possimus iste a! Obcaecati, ex quo?
                                            </div>
                                        <hr />
                                            </div>   
                                    </div>
                                </Paper>
                           </div>
                            <div className={`${styles.tutoractionwrapper}`}>
                                <Paper >
                                <div className={`flex column ${styles.tutoraction}`}>
                                    <div className={`flex justify-between ${styles.tutorrate}`}>
                                        <div>Hourly Rate</div>
                                        <div>USD 6.00</div>
                                    </div>
                                    <button className={`${styles.tutoractionbtn}`}>Book A Lesson </button>
                                    <button className={`${styles.tutoractionbtn}`}>Message Lemuel</button>
                                    <button className={`${styles.tutoractionbtn}`}>Add to Favorites</button>
                                </div>
                                </Paper>
                            </div>
                    </div>
                    <div className={`${styles.tutorschedulewrapper}`}>
                        {/* <Paper> */}
                            <div className={`${styles.tutorschedule}`}>
                                <ScheduleComponent >
                                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                                </ScheduleComponent>
                            </div>
                        {/* </Paper> */}
                        <div className={`${styles.tutorreviewswrapper}`}>
                            <Paper>
                                <div className={`${styles.tutorreviews}`}>
                                    <h2 className={`center`}>what students think about Lemuel</h2>
                                    <div>
                                    <div className='flex justify-between'>
                                        <div className={`${styles.tutorreviewoverlay}`}>
                                            <div>5.00</div>
                                            <div> <Rating name="read-only" value={5} readOnly /></div>
                                            <div>37 Reviews</div>
                                        </div>
                                        <div>
                                            <div className={`flex justify-between`}>
                                                <div>5 <StarRateIcon /> </div>
                                                <div><Reviewprogress /></div>
                                                <div>(5)</div>
                                            </div>
                                        </div>
                                    </div>
                                        <div className={`flex justify-between ${styles.tutorreview}`}>
                                            <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                            <div className={`${styles.tutorreviewtext}`}>
                                                <b>Lemuel 5 <StarRateIcon /></b>
                                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                                    dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                                    , voluptas est. Libero, fugiat aspernatur?
                                                </div>
                                            </div>                                                                                                      
                                        </div>
                                        <div className={`flex justify-between ${styles.tutorreview}`}>
                                            <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                            <div className={`${styles.tutorreviewtext}`}>
                                                <b>Lemuel 5 <StarRateIcon /></b>
                                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                                    dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                                    , voluptas est. Libero, fugiat aspernatur?
                                                </div>
                                            </div>                                                                                                      
                                        </div>
                                        <div className={`flex justify-between ${styles.tutorreview}`}>
                                            <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                            <div className={`${styles.tutorreviewtext}`}>
                                                <b>Lemuel 5 <StarRateIcon /></b>
                                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                                    dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                                    , voluptas est. Libero, fugiat aspernatur?
                                                </div>
                                            </div>                                                                                                      
                                        </div>
                                        <div className={`flex justify-between ${styles.tutorreview}`}>
                                            <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                            <div className={`${styles.tutorreviewtext}`}>
                                                <b>Lemuel 5 <StarRateIcon /></b>
                                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                                    dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                                    , voluptas est. Libero, fugiat aspernatur?
                                                </div>
                                            </div>                                                                                                      
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div>
                    
                    <div>
                        
                    </div>
                </div>
            </div>
    )
}

export default Tutor
