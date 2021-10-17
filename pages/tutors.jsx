
import Header from '../components/Header'
import Autoselect from '../components/Autoselect'
import Tutorprofile from '../components/Tutorprofile'
import styles from '../styles/Tutor.module.css'
import Pagination from '@mui/material/Pagination'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Filters from '../components/Filters'
import {useState} from 'react'

const Tutors = () => {
    const [openfilters, setOpenfilters] = useState(false)

    return (
        <div>
            <div className="border">
                <Header />
                <div className={`border hidexs ${styles.filter}`}>
                    
                </div>
                <div className={`border hide showxs ${styles.filter}`}>
                    <Stack direction="row" spacing={1}>
                        <div>
                            <Chip label="English" color="primary" variant="outlined" />
                        </div>
                        <div onClick={e => setOpenfilters(true)}>
                            <Chip label="Filters" color="success" variant="outlined" />
                        </div>
                        <div>
                            <Chip label="Native Speakers" color="primary" variant="outlined" />
                        </div>
                    </Stack>
                </div>
                <div>
                </div>
            </div>
            <div className={`${styles.tutorpage}`}>
                <div className={`${styles.tutors} w-70 w-s-90 w-xs-90 margin-auto`}>
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
            <Filters open={openfilters} setOpen={setOpenfilters} />
        </div>
    )
}

export default Tutors
