import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import ArtikelCard from '../components/ArtikelCard'

const HomePage = () => {
    return (
        <div className='bg-light min-h-screen '>
            <Navbar />
            <div className='flex justify-between'>
              <div className='p-6'></div>
            <ArtikelCard />
            <ReviewCard />
            </div>
            <Footer />
        </div>
    )
}

export default HomePage