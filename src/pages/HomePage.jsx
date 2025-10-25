import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import ArtikelCard from '../components/ArtikelCard'
import KecamatanCard from '../components/KecamatanCard'
import UMKMCard from '../components/UMKMCard'
import HeroContent from '../components/HeroContent'

const HomePage = () => {
    const umkmData = [
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
            location: "Kota Kudus",
            openHour: "10.00–21.00",
            image: "/images/sampel_umkm.png",
        },
    ]
    const homeKecamatanData = [
        {
            name: "Bae",
            slug: "bae", // 'slug' untuk URL
            placeCount: 27,
            image: "/images/sampel_kecamatan.png" // Ganti dengan gambar spesifik jika ada
        },
        {
            name: "Kaliwungu",
            slug: "kaliwungu", // 'slug' untuk URL
            placeCount: 35,
            image: "/images/sampel_kecamatan_2.png" // Ganti dengan gambar spesifik jika ada
        },
    ];
    return (
        <div className='bg-light min-h-screen'>
            <Navbar />
            <HeroContent
                image="/images/sampel_hero_content.jpeg"
                title="Daftar UMKM di Daerah Kecamatan Kaliwungu Kudus"
                subtitle="Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Kaliwungu Kudus."
            />
            <div className='flex flex-col gap-10 max-w-7xl mx-auto px-4 md:px-8 py-12'>
                <ArtikelCard
                    image="/images/sampel_artikel.png"
                    category="Makanan"
                    title="Produk UMKM di Kudus masuk toko modern"
                    date="12 Oktober 2024"
                    author="admin"
                />
                <ReviewCard />
                <div className="p-6 flex justify-center items-center">
                    <div className="flex gap-4 flex-wrap justify-center">
                        {homeKecamatanData.map((kecamatan) => (
                            <KecamatanCard key={kecamatan.slug} data={kecamatan} />
                        ))}
                    </div>
                </div>
                {umkmData.map((umkm, index) => (
                    <UMKMCard key={index} data={umkm} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default HomePage