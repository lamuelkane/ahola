
import Header from '../components/Header'
import Autoselect from '../components/Autoselect'
import Tutorprofile from '../components/Tutorprofile'
import styles from '../styles/Tutor.module.css'
import Pagination from '@mui/material/Pagination'

const Tutors = () => {
    return (
        <div >
            <div className="border">
                <Header />
                <div className={`border hidexs ${styles.filter}`}>
                    <div className={`flex justify-between nowrap align-center`}>
                        <Autoselect />
                        <Autoselect />
                        <Autoselect />
                        <Autoselect />
                        <Autoselect />
                    </div>
                </div>
                <div>
                </div>
            </div>
            <div className={`${styles.tutorpage}`}>
                <div className={`${styles.tutors} w-80 w-s-90 w-xs-90 margin-auto`}>
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                    <Tutorprofile />
                </div>
                <div className="margin-top-100 flex justify-center align-center">
                    <Pagination count={10} color="primary" siblingCount={0} boundaryCount={2} />
                </div>
            </div>
        </div>
    )
}

export default Tutors
