import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import ArtikelCard from '../components/ArtikelCard'
import KecamatanCard from '../components/KecamatanCard'
import UMKMCard from '../components/UMKMCard'
import HeroContent from '../components/HeroContent'

const HomePage = () => {
    return (
        <div className='bg-light min-h-screen'>
            <Navbar />
            <HeroContent
                image="/images/sampel_hero_content.jpeg"
                title="Daftar UMKM di Daerah Kecamatan Kaliwungu Kudus"
                subtitle="Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Kaliwungu Kudus."
            />
            <div className='flex flex-col gap-10 max-w-7xl mx-auto px-4 md:px-8 py-12'>
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