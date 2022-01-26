import React from 'react'
import AdminHeader from '../components/AdminHeader'
import styles from '../styles/Dashboard.module.css'
import Footer from '../components/Footer'

const Courses = () => {

    const subjects = [
        {
          subject: 'English',
          type: 'lang'
        },
        {
          subject: 'French',
          type: 'lang'
        },
        {
          subject: 'German',
          type: 'lang'
        },
        {
          subject: 'Spanish',
          type: 'lang'
        },
        {
          subject: 'Italian',
          type: 'lang'
        },
        {
          subject: 'Chinese',
          type: 'lang'
        },
        {
          subject: 'janpanese',
          type: 'lang'
        },
        {
          subject: 'Vietnamese',
          type: 'lang'
        },
        {
          subject: 'Russian',
          type: 'lang'
        },
        {
          subject: 'Korean',
          type: 'lang'
        },
        {
          subject: 'Arabic',
          type: 'lang'
        },
        {
          subject: 'Polish',
          type: 'lang'
        },
        {
          subject: 'Turkish',
          type: 'lang'
        },
        {
          subject: 'Dutch',
          type: 'lang'
        }, {
          subject: 'Greek',
          type: 'lang'
        }, {
          subject: 'Swidish',
          type: 'lang'
        }, {
          subject: 'Norwegian',
          type: 'lang'
        }, {
          subject: 'Hungarian',
          type: 'lang'
        }, {
          subject: 'Romanian',
          type: 'lang'
        }, {
          subject: 'Croatian',
          type: 'lang'
        }, {
          subject: 'Bulgarian',
          type: 'lang'
        }, {
          subject: 'Thai',
          type: 'lang'
        }, {
          subject: 'Slovak',
          type: 'lang'
        }, 
        
        
        {
          subject: 'Geography',
          type: 'subj'
        }, {
          subject: 'Philosophy',
          type: 'subj'
        }, {
          subject: 'Writing',
          type: 'subj'
        }, {
          subject: 'Sociology',
          type: 'subj'
        }, {
          subject: 'Java',
          type: 'subj'
        }, {
          subject: 'Photography',
          type: 'subj'
        }, {
          subject: 'Literature',
          type: 'subj'
        }, {
          subject: 'Chemistry',
          type: 'subj'
        }, {
          subject: 'Biology',
          type: 'subj'
        }, {
          subject: 'Physics',
          type: 'subj'
        }, 
        {
          subject: 'History',
          type: 'subj'
        }, {
          subject: 'Accounting',
          type: 'subj'
        },
        {
          subject: 'Belly dance',
          type: 'skill'
        },
        
        
        {
          subject: 'Webdesign',
          type: 'skill'
        }, {
          subject: 'Sales',
          type: 'skill'
        },
        {
          subject: 'Public Speaking',
          type: 'skill'
        }, {
          subject: 'Business',
          type: 'skill'
        },
        {
          subject: 'Gyminastic',
          type: 'skill'
        }, {
          subject: 'Law',
          type: 'subj'
        },
        {
          subject: 'math',
          type: 'subj'
        },
      ]



    return (
        <div>
            <AdminHeader />
            <div>
                <div className={`flex justify-center margin align-center`}>
                    <input type="text" />
                    <input type="text" />
                    <button className={` ${styles.coursebtn} bg-green-700 margin-left hover:bg-green-900`}>save</button>
                </div>
                <div className={`flex justify-center column align-center`}>
                    { 
                        subjects.map(sub => <div key={sub._id} className={` ${styles.course} flex nowrap justify-between align-center`}>
                                <span className={`margin-right ${styles.coursename}`} style={{textAlign: 'start'}}>{sub.subject}</span>
                                <span className={`margin-right`} style={{textAlign: 'start'}}>{sub.type}</span>
                                <button className={` ${styles.coursebtn} bg-red-700 hover:bg-red-900`}>Delete</button>
                        </div> )
                    }

                    <table>
                        <thead>
                            
                        </thead>
                    </table>
                </div>
            </div>
                <Footer />
        </div>
    )
}

export default Courses
