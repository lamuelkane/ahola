
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Homehero from '../components/Homehero'
import Course from '../components/Course'
import ShowCase from '../components/ShowCase'
import { Carousel } from '@trendyol-js/react-carousel';


export default function Home() {
  return (
    <div className={styles.contaier}>
      <Head>
        <title>Ahola language school</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <Homehero />
      <div className={`${styles.chourseshowcase}`}>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2>What you can learn with us</h2>
            <div className={`flex wrap justify-between`}>
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
              <Course />
            </div>
            <button className={`${styles.showmoercoursesbutton} pointer`}>View More</button>
          </div>
      </div>
      <div className={`${styles.shwcasewrapper}`}>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper} ${styles.showcasewrapper}`}>
            <h2 className='center'>We Are Available 24 hours a day, 365 days a year</h2>
            <div className={`flex wrap justify-between`}>
              <ShowCase />
              <ShowCase />
              <ShowCase />
              <ShowCase />
              <ShowCase />
              <ShowCase />
              <ShowCase />
              <ShowCase />
            </div>
            <button className={`${styles.showmoercoursesbutton} pointer`}>View More</button>
          </div>
      </div>
      {/* one section  */}
      <div>
        <div className={` ${styles.coolsection} w-80 wrap margin-auto flex justify-between align-center`}>
          <div>
              <h2>Learn From Your Comfort Zone</h2>
              <p className="hide-s">
                Take lessons from whereever and Whenever you want
              </p>
          </div>
          <div>
            <img src="./images/Learnfromhome.jpg" className={`${styles.coolimage}`} alt="" />
          </div>
        </div>
      </div>
      {/* another section */}
      <div>
        <div className={` ${styles.coolsection} ${styles.coolsectionreverse} w-80 wrap margin-auto flex justify-between align-center`}>
          <div>
            <img src="./images/skills1.jpg" className={`${styles.coolimagereverse}`} alt="" />
          </div>
          <div>
              <h2>Learn From Your Comfort Zone</h2>
              <p className="hide-s">
                Take lessons from whereever and Whenever you want
              </p>
          </div>
        </div>
      </div>
      {/* another section */}
      <div>
        <div className={` ${styles.coolsection} w-80 wrap margin-auto flex justify-between align-center`}>
          <div>
              <h2>Learn From Your Comfort Zone</h2>
              <p className="hide-s">
                Take lessons from whereever and Whenever you want
              </p>
          </div>
          <div>
            <img src="./images/skills.jpg" className={`${styles.coolimage}`} alt="" />
          </div>
        </div>
      </div>
      <div className={`${styles.shwcasewrapper}`}>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2>Tutoring for all levels</h2>
            <div className={`flex wrap justify-between ${styles.studentlevels}`}>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Beginner</h2>
                <div>Master the Basics</div>
              </div>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Intermediate</h2>
                <div>Enjoy Speaking With Confidence</div>
              </div>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Advanced</h2>
                <div>Communicate in Social & Business Situations</div>
              </div>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Proficient</h2>
                <div>Speak Like a Native</div>
              </div>
              
            </div>
      </div>
      <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className='center'>Focus on building the skills you need</h2>
            <div className={`flex wrap justify-between ${styles.studentlevels}`}>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Immerse yourself in a new culture</h2>
                <div>Connect with language experts from around the world</div>
              </div>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Get expert help when you need it</h2>
                <div>Learn to solve any problem in any language</div>
              </div>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Speak naturally, always</h2>
                <div>Make a good impression and build trust in any language</div>
              </div>
              <div className={`margin-right margin-top ${styles.tutringlevelsitem}`}>
                <h2>Succeed in your career</h2>
                <div>Develop your working vocabulary and communicate clearly</div>
              </div>
              
            </div>
      </div>

</div>


        <div className={`flex justify-betwee ${styles.registersection} align-center wrap`}>
          <div>
            <h3>Join Our Team</h3>
            <p>Get paid for what you know, by working remotely</p>
            <small>with Ahola, making an extra income has never been easier</small>
            <ul>
              <li>Get new students</li>
              <li>Grow your carear</li>
              <li>Get paid</li>
            </ul>
            <button className={`${styles.showmoercoursesbutton} pointer`}>Become a Tutor</button>
          </div>
          <div>
            <img src="./images/heros.jpg" alt="" className={`${styles.registerimage}`} />
          </div>
        </div>
        
    
    </div>

  )
}
