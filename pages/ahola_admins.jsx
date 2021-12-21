import React from 'react'
import Footer from '../components/Footer'
import AdminHeader from '../components/AdminHeader'
import Head from 'next/head'

const ahola_admins = () => {
    return (
        <div>
             <Head>
                <title>Ahola Admins</title>
                {/* <meta name="description" content="Learn Any language with ease" /> */}
                <link rel="icon" href="./images/logo1.png" />
                <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
                <script type="text/javascript" id="hs-script-loader" defer src="./translate.js" />
            </Head>
            <AdminHeader />
            admins
            <Footer />
        </div>
    )
}

export default ahola_admins
