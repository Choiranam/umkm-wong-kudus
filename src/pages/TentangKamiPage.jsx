import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import PageContainer from "../components/PageContainer"; 

const TentangKamiPage = () => {
  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      <HeroContent
        image="/images/tentang_kami_hero_content.png"
        title="Dari Kudus, Untuk Kudus Cerita di Balik Kudus UMKM Explore"
        subtitle="Kami percaya setiap usaha lokal punya cerita dan semangat untuk tumbuh. Melalui platform ini, kami bantu mereka dikenal lebih luas dengan sentuhan digital"
      />

      {/* 🧱 Ganti div wrapper lama dengan PageContainer */}
      <PageContainer variant="default" className="flex flex-col gap-10">
        {/* Bagian Tentang Kami */}
        <section className="text-dark text-center">
          <h2 className="text-3xl font-black inline-block mr-2">Tentang</h2>
          <h2 className="text-3xl font-normal inline-block">Kami</h2>

          <p className="text-lg leading-relaxed mt-6 mb-4 text-justify">
            Kudus <i>The Taste of Java</i> adalah platform yang bertujuan untuk
            memperkenalkan dan memajukan usaha mikro, kecil, dan menengah (UMKM)
            yang ada di Kabupaten Kudus. Kami hadir untuk membantu pelaku UMKM
            memperluas jangkauan pasar, meningkatkan promosi produk, dan
            memperkuat identitas lokal Kudus sebagai pusat ekonomi kreatif yang
            berkembang.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-justify">
            Dengan dukungan teknologi digital, kami percaya bahwa setiap UMKM
            memiliki potensi untuk dikenal lebih luas, tidak hanya di tingkat
            lokal tetapi juga nasional bahkan internasional.
          </p>

          {/* Tombol Hubungi Kami */}
          <a
            href="/kontak"
            className="block w-fit bg-orange text-white font-medium px-6 py-3 rounded-md shadow-md transition-all duration-300 transform hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97]"
          >
            Hubungi Kami
          </a>
        </section>

        {/* Bagian Visi & Misi */}
        <section className="relative text-dark mt-10">
          {/* Grid dua kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visi */}
            <div className="md:pr-8 md:border-r-2 border-dark/50 pb-6">
              <h2 className="text-2xl font-semibold text-dark mb-2">Visi</h2>
              <p className="text-base leading-relaxed text-justify">
                Visi kami adalah menjadikan Kudus sebagai pusat pengembangan dan
                promosi UMKM unggulan berbasis digital yang berdaya saing tinggi
                serta berkontribusi nyata bagi kemajuan ekonomi daerah. Kami
                berkomitmen untuk membangun ekosistem usaha yang inovatif,
                kolaboratif, dan berkelanjutan, di mana setiap pelaku UMKM
                memiliki kesempatan yang sama untuk berkembang melalui teknologi
                dan kreativitas. Melalui platform ini, kami ingin menghadirkan
                ruang digital yang tidak hanya memperkenalkan produk lokal
                kepada masyarakat luas, tetapi juga memperkuat identitas dan
                potensi daerah Kudus sebagai kota yang mandiri dan berdaya saing
                di tingkat nasional.
              </p>
            </div>

            {/* Misi */}
            <div className="md:pl-8 pb-6">
              <h2 className="text-2xl font-semibold text-dark mb-2">Misi</h2>
              <p className="text-base leading-relaxed text-justify">
                Misi kami adalah memberikan wadah digital bagi para pelaku UMKM
                di Kudus untuk mempromosikan produk dan jasa mereka secara lebih
                luas. Melalui platform ini, kami berupaya meningkatkan literasi
                digital dan kemampuan pemasaran online agar para pelaku usaha
                dapat bersaing di era modern. Kami juga berkomitmen untuk
                mendorong kolaborasi antara UMKM, pemerintah daerah, dan
                masyarakat guna menciptakan ekosistem bisnis yang berkelanjutan.
                Selain itu, kami ingin menyediakan informasi yang akurat dan
                mudah diakses mengenai berbagai UMKM di setiap kecamatan, serta
                mendukung pertumbuhan ekonomi lokal melalui inovasi, kreativitas,
                dan semangat kewirausahaan.
              </p>
            </div>
          </div>

          {/* Garis horizontal penuh di bawah teks judul Visi & Misi */}
          <div className="absolute left-0 right-0 top-10 md:top-[30px] h-px bg-dark/50"></div>
        </section>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default TentangKamiPage;
