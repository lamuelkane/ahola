import styles from '../styles/Dashboard.module.css'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DashBoardHeader = () => {
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
                            <span className={`hidexs`} >1000 USD</span>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className="margin-right flex align-center padding-right border-right">
                           <span className={`hidexs`} > English, USA </span>
                           <KeyboardArrowDownIcon />
                        </div>
                        <img src="./images/noimage.png" height='35' width='35' alt="" className='round' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardHeader
