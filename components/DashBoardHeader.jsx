import styles from '../styles/Dashboard.module.css'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GlobalContext from '../context/Globalcontext';
import {useContext, useEffect} from 'react'
import {setUser} from '../actions/User'
import {useRouter} from 'next/router'

const DashBoardHeader = () => {

    const {user, setuser} = useContext(GlobalContext)
    const router = useRouter()
    useEffect(() => {
        setuser(setUser())
        setTimeout(() => {
            setuser(setUser())
            if(!localStorage.getItem('user')){
                router.push('/login')
            }
        }, 10000);
    }, [user])

    return (
        <div>
            <div className="headerwrapeer">
                <div className={`w-100 ${styles.header} flex justify-between align-center`}>
                    <div className={` flex jsutify-between align-center`}>
                        <div className='flex align-center'>
                            <img src="./images/oleoscript.png" alt="" className={`${styles.logoimg}`} />
                        </div>
                      
                    </div>
                    <div className="styles header flex align-center padding-x margin-x">
                        <div className="margin-right  flex align-center padding-right border-right">
                            <AccountBalanceWalletIcon />
                            <span className={`hidexs`} >{user?.currentarning.toFixed(2)} USD</span>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className="margin-right flex align-center padding-right border-right">
                          {user?.firstname}
                        </div>
                        <img src="./images/noimage.png" height='35' width='35' alt="" className='round' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardHeader
