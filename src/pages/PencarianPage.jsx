import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroContent from '../components/HeroContent';
import UMKMCard from '../components/UMKMCard';

const PencarianPage = () => {
  // Data dummy untuk hasil pencarian
  const umkmData = [
    {
      name: "Ramboo Chicken",
      category: "Makanan",
      description: "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      image: "/images/sampel_umkm.png",
    },
    {
      name: "Ramboo Chicken",
      category: "Makanan",
      description: "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      image: "/images/sampel_umkm.png",
    },
  ];

  return (
    <div className="bg-light min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <HeroContent
        image="/images/pencarian_hero_content.png"
        title="Temukan berbagai usaha lokal sesuai kata kunci pilihanmu."
        subtitle="Dukung pelaku UMKM lokal dan temukan produk, layanan serta kuliner pilihan di kudus."
      />

      {/* Hasil Pencarian */}
      <div className="color-yellow w-full py-12 px-4 md:px-16 flex-grow">
        <div className="max-w-6xl mx-auto text-dark">
          {/* Info Pencarian */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <span className="text-xl">💡</span>
              <p>Hasil Pencarian untuk <span className="text-orange-500 font-bold">“Ra”</span></p>
            </div>
            <p className="text-gray-500 mt-2">Ditemukan 2 UMKM yang terkait</p>
          </div>

          {/* List UMKM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {umkmData.map((umkm, index) => (
              <UMKMCard
                key={index}
                name={umkm.name}
                category={umkm.category}
                description={umkm.description}
                location={umkm.location}
                openHour={umkm.openHour}
                image={umkm.image}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PencarianPage;
