import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <div className={styles.contaier}>
      <div className="headerwrapeer">
          <div className={`w-100 ${styles.header} flex justify-between align-center`}>
              <div className={` flex jsutify-between align-center`}>
                  <div className='flex align-center'>
                      <img src="./images/oleoscript.png" alt="" className={`${styles.logoimg}`} />
                  </div>
                  <nav className={`${styles.menunav}`}>
                    <ul className={`${styles.menu} flex justify-between align-center`} >
                        <li className={`${styles.menuitem} margin-right`}><Link href='/tutors' >find a tutor</Link></li>
                        <li className={`${styles.menuitem} margin-right`}><Link href='/register' >become a tutor</Link></li>
                        <li className={`${styles.menuitem} margin-right`}><Link href='/contactus' >contact us</Link></li>
                        <li className={`${styles.menuitem} margin-right`}><Link href='/aboutus' >about us</Link></li>
                    </ul>
                  </nav>
              </div>
              <div className="styles header flex align-center padding-x margin-x">
                  <div className="margin-right padding-right border-right">
                      English, USA 
                  </div>
                  <div className="margin-x"><Link href='/login' >login</Link></div>
              </div>
          </div>
      </div>

    </div>
  )
}
