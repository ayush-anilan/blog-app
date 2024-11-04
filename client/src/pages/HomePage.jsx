import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Posts />
            <Footer />
        </>
    )
}

export default HomePage