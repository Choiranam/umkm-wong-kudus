import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import ArtikelCard from '../components/ArtikelCard'
import KecamatanCard from '../components/KecamatanCard'
import UMKMCard from '../components/UMKMCard'

const HomePage = () => {
    return (
        <div className='bg-light min-h-screen '>
            <Navbar />
            <div className='justify-between'>
              <div className='p-6'></div>
            <ArtikelCard />
            <ReviewCard />
            <KecamatanCard />
            <UMKMCard />
            </div>
            <Footer />
        </div>
    )
}

export default HomePage