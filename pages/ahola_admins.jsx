import React from 'react'
import Footer from '../components/Footer'
import AdminHeader from '../components/AdminHeader'
import Head from 'next/head'

const ahola_admins = () => {
    return (
        <div>
             <Head>
                <title>Ahola Admins</title>
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
            <AdminHeader />
            admins
            <Footer />
        </div>
    )
}

export default ahola_admins
