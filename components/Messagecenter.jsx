import Message from './Message'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendIcon from '@mui/icons-material/Send';


import styles from '../styles/Messages.module.css'

const Messagecenter = () => {
    return (
            <div className={`${styles.messagecenterwrapper}`}>
                    <div className={`${styles.chatheader}`}>
                        <h3 className='margin-left'>John do</h3>
                    </div>
                    <div className={styles.messagewrapper}>
                        <Message />
                        <Message />
                        <Message />
                        <Message own/>
                        <Message />
                        <Message />
                        <Message />
                        <Message own/>
                        <Message />
                        <Message />
                        <Message own/>
                        <Message />
                    </div>
                    <div className={`${styles.chatbottomwrapper}`}>
                        <div className={`${styles.chatbottom}`}>
                            <div  className={`${styles.chatbottomfilechooser}`}>
                                <AttachFileIcon />
                            </div>
                            <div  className={`${styles.chatbottomimojiicon}`}>
                                <AddReactionIcon />
                            </div>
                            <div className={`${styles.chatbottomtextareawrapper}`}>
                                 <textarea placeholder='write something ...' rows='1' className={`${styles.chatbottomtextarea}`} name="" id="" max-rows='10'></textarea>
                            </div>
                            <div  className={`${styles.chatbottomsendbtn}`}>
                                 <SendIcon />
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Messagecenter
