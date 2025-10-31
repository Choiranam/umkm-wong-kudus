import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import PageContainer from "../components/PageContainer";

const TentangKamiPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
      easing: "ease-out-cubic",
      once: false,
      offset: 120,
      mirror: true,
    });
  }, []);

  return (
    <div className="bg-light min-h-screen font-poppins overflow-x-hidden w-full">
      <Navbar />
      <HeroContent
        image="/images/tentang_kami_hero_content.png"
        title={
          <>
            Dari Kudus untuk Kudus
            <br />
            Cerita di Balik UMKM Wong Kudus
          </>
        }
        subtitle="Kami percaya setiap usaha lokal memiliki potensi besar untuk berkembang. Melalui platform ini, kami hadir untuk membantu UMKM Kudus agar lebih dikenal luas dengan dukungan teknologi digital."
        className="text-center px-4 md:px-0"
      />

      <PageContainer
        variant="default"
        className="flex flex-col gap-20 px-6 md:px-0"
      >
        <section
          className="text-dark text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="text-2xl md:text-3xl font-normal mb-6 mt-5">
            <span className="font-bold">Tentang</span> Kami
          </h2>

          <div
            className="max-3xl mx-auto text-justify text-base md:text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p>
              <span className="font-semibold">UMKM Wong Kudus</span> adalah
              sebuah website yang dikembangkan untuk memperkenalkan dan
              memajukan usaha mikro, kecil, dan menengah (UMKM) di Kabupaten
              Kudus. Website ini dibuat sebagai wadah digital untuk membantu
              para pelaku UMKM memperluas jangkauan pasar, meningkatkan promosi
              produk, serta memperkuat identitas lokal Kudus sebagai daerah
              dengan semangat kewirausahaan yang tinggi.
            </p>

            <p className="mt-4">
              Melalui website ini, kami ingin mendorong pelaku UMKM agar lebih
              siap menghadapi era digital dengan menyediakan platform yang mudah
              digunakan, informatif, dan mendukung pertumbuhan ekonomi lokal.
            </p>
          </div>
        </section>

        {/* === Visi & Misi === */}
        <section className="relative text-dark">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 text-center md:text-left"
            data-aos="fade-up"
          >
            <div
              className="md:pr-8 md:border-r-2 border-dark/50 space-y-4"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="text-2xl font-semibold mb-2">Visi</h2>
              <p className="text-base leading-relaxed text-justify">
                Menjadikan Kudus sebagai pusat pengembangan dan promosi UMKM
                berbasis digital yang berdaya saing tinggi serta berkontribusi
                nyata bagi kemajuan ekonomi daerah. Kami berkomitmen membangun
                ekosistem usaha yang inovatif, kolaboratif, dan berkelanjutan,
                di mana setiap pelaku UMKM memiliki kesempatan yang sama untuk
                berkembang melalui teknologi dan kreativitas.
              </p>
            </div>

            <div
              className="md:pl-8 space-y-4"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <h2 className="text-2xl font-semibold mb-2">Misi</h2>
              <p className="text-base leading-relaxed text-justify">
                Memberikan wadah digital bagi pelaku UMKM di Kudus untuk
                mempromosikan produk dan jasa mereka secara lebih luas. Kami
                berupaya meningkatkan literasi digital, kemampuan pemasaran
                online, serta mendorong kolaborasi antara UMKM, pemerintah
                daerah, dan masyarakat guna menciptakan ekosistem bisnis yang
                berkelanjutan.
              </p>
            </div>
          </div>

          <div className="absolute left-0 right-0 hidden md:block top-10 md:top-[30px] h-px bg-dark/50"></div>
        </section>

        <section
          className="text-light text-center space-y-2"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="bg-orange rounded-2xl py-8 px-4 md:px-10 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-normal">
              <span className="font-bold">Siapa</span> di Balik Website Ini?
            </h1>
            <p className="text-base max-w-2xl mx-auto mt-2 leading-relaxed">
              Kenali lebih dekat orang-orang di balik pengembangan proyek ini.
            </p>
          </div>
        </section>

        <section
          className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Teks */}
          <div className="flex-1 flex flex-col justify-between space-y-6 text-dark">
            <div>
              <h2 className="text-2xl md:text-3xl font-normal mb-4 text-center md:text-left">
                <span className="font-bold">Tim</span> Kami
              </h2>

              <div className="block md:hidden mb-6" data-aos="fade-up">
                <img
                  src="/images/team.png"
                  alt="Foto Tim"
                  className="w-full h-auto max-h-[350px] rounded-lg shadow-md object-cover"
                />
              </div>

              <div
                className="space-y-6 text-base leading-relaxed text-justify"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <p>
                  <span className="font-medium">UMKM Wong Kudus</span> dibuat
                  oleh siswa SMK Raden Umar Said Kudus, jurusan Rekayasa
                  Perangkat Lunak. Kami berkolaborasi untuk menciptakan website
                  yang dapat membantu UMKM Kudus berkembang di era digital.
                </p>

                <p>
                  Kami percaya bahwa teknologi dapat menjadi sarana untuk
                  memperkenalkan karya lokal ke dunia, sekaligus menjadi wadah
                  pembelajaran yang bermakna bagi kami sebagai pelajar yang
                  ingin terus berkontribusi untuk masyarakat Kudus melalui
                  inovasi.
                </p>
              </div>
            </div>
          </div>

          <div
            className="hidden md:flex flex-1 justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-delay="250"
          >
            <img
              src="/images/team.png"
              alt="Foto Tim"
              className="w-full md:w-[85%] h-auto max-h-[350px] rounded-lg shadow-md object-cover"
            />
          </div>
        </section>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {[
            {
              name: "Azzan Isham Alawiy",
              role: "Frontend Developer",
              desc: "Sebagai Frontend Developer, aku fokus sama desain dan interaksi biar tiap halaman webnya keren dan enak dipake. Pengen bikin user betah dan enjoy tiap kali buka websitenya.",
              image: "/images/isham.jpg",
            },
            {
              name: "Muhammad Choirul'anam",
              role: "Frontend Developer",
              desc: "Sebagai Frontend Developer, saya fokus mengembangkan struktur dan fungsionalitas tampilan agar website terlihat rapi, responsif, serta mudah digunakan di berbagai perangkat.",
              image: "/images/anam.jpg",
            },
            {
              name: "Yusuf Rizqy Mubarok",
              role: "Backend Developer",
              desc: "Sebagai Backend Developer, saya mengelola logika server dan basis data untuk memastikan website berjalan dengan lancar, aman, efisien, serta mudah dikembangkan.",
              image: "/images/yusuf.jpg",
            },
          ].map((data, index) => (
            <motion.div
              key={data.name}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative rounded-t-xl overflow-hidden">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-dark group-hover:text-orange transition">
                  {data.name}
                </h3>
                <p className="text-dark text-justify text-sm sm:text-base">
                  {data.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default TentangKamiPage;
