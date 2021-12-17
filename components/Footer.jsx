import React from 'react'
import styles from '../styles/Home.module.css'
import {footertemplate} from '../Templates/footer'
import ReactNotification from "react-notifications-component";

const Footer = () => {
    return (
        <>
        <div className={`flex justify-between text-white padding ${styles.Footer}`}>
        <div></div>
            
           <div className={`flex justify-between column ${styles.social}`}>
               <div className={`flex column align-center`}>
               <h1 className={`margin-bottom text-indigo-700`}>Ahola Social</h1>
               <div>
               <span className="icon flex"><a href="https://www.facebook.com/"><img className={`${styles.footerimg}`} alt="Facebook" src="images/facebook2x.png" title="facebook"/></a>facebook</span>
               <span className="icon flex"><a href="https://www.twitter.com/"><img className={`${styles.footerimg}`} alt="Twitter" src="images/twitter2x.png" title="twitter"/></a>twitter</span>
               <span className="icon flex"><a href="https://www.instagram.com/"><img className={`${styles.footerimg}`} alt="Instagram" src="images/instagram2x.png" title="instagram"/></a>instagram</span>
               </div>
               </div>  
            </div>
            <div className={`w-50 flex justify-center align-center column ${styles.about}`}>
                <h2 className={`text-indigo-700 margin-bottom`}>About</h2>
                <div className={`center text-xs`}>Lorem ipsum dolor sit amet, consectetur adipiscing.Aenean eget scelerisque magna. Cras interdum do mattis ligula  eten eugravid. </div>
            </div>
            <div className={`center ${styles.contactus}`}>
                <h1 className={`text-indigo-700 margin-bottom`}>Contact Us</h1>
                <h3>Need any help?</h3>
                <div>
                    <a href="mailto:info@ahola.ch">info@ahola.ch</a>
                </div>
            </div>
        </div>
        {/* <ReactNotification /> */}
        </>
    )
}

export default Footer
