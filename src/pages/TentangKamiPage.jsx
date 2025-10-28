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
        title="Dari Kudus, Untuk Kudus — Cerita di Balik Kudus UMKM Explore"
        subtitle="Kami percaya setiap usaha lokal memiliki cerita dan semangat untuk tumbuh. Melalui platform ini, kami membantu mereka dikenal lebih luas dengan sentuhan digital."
      />

      <PageContainer variant="default" className="flex flex-col gap-16">
        {/* Tentang Kami */}
        <section className="text-dark text-center">
          <h2 className="text-3xl font-black inline-block mr-2">Tentang</h2>
          <h2 className="text-3xl font-normal inline-block">Kami</h2>

          <p className="text-lg leading-relaxed mt-6 mb-4 text-justify">
            <span className="font-semibold">
              Kudus <i>The Taste of Java</i>
            </span>{" "}
            adalah platform yang bertujuan untuk memperkenalkan dan memajukan
            usaha mikro, kecil, dan menengah (UMKM) di Kabupaten Kudus. Kami hadir
            untuk membantu para pelaku UMKM memperluas jangkauan pasar,
            meningkatkan promosi produk, serta memperkuat identitas lokal Kudus
            sebagai pusat ekonomi kreatif yang berkembang.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-justify">
            Dengan dukungan teknologi digital, kami yakin setiap UMKM memiliki
            potensi besar untuk dikenal lebih luas — tidak hanya di tingkat lokal,
            tetapi juga nasional bahkan internasional.
          </p>

          <a
            href="/kontak"
            className="block w-fit bg-orange text-white font-medium px-6 py-3 rounded-md shadow-md transition-all duration-300 transform hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97] mx-auto"
          >
            Hubungi Kami
          </a>
        </section>

        {/* Visi & Misi */}
        <section className="relative text-dark mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visi */}
            <div className="md:pr-8 md:border-r-2 border-dark/50 pb-6">
              <h2 className="text-2xl font-semibold mb-3">Visi</h2>
              <p className="text-base leading-relaxed text-justify">
                Menjadikan Kudus sebagai pusat pengembangan dan promosi UMKM
                unggulan berbasis digital yang berdaya saing tinggi serta
                berkontribusi nyata bagi kemajuan ekonomi daerah. Kami berkomitmen
                membangun ekosistem usaha yang inovatif, kolaboratif, dan
                berkelanjutan, di mana setiap pelaku UMKM memiliki kesempatan yang
                sama untuk berkembang melalui teknologi dan kreativitas.
              </p>
            </div>

            {/* Misi */}
            <div className="md:pl-8 pb-6">
              <h2 className="text-2xl font-semibold mb-3">Misi</h2>
              <p className="text-base leading-relaxed text-justify">
                Memberikan wadah digital bagi pelaku UMKM di Kudus untuk
                mempromosikan produk dan jasa mereka secara lebih luas. Kami
                berupaya meningkatkan literasi digital, kemampuan pemasaran online,
                serta mendorong kolaborasi antara UMKM, pemerintah daerah, dan
                masyarakat guna menciptakan ekosistem bisnis yang berkelanjutan.
              </p>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-10 md:top-[30px] h-px bg-dark/50"></div>
        </section>

        {/* Tim Kami */}
        <section className="mt-10">
          <header className="bg-orange text-white py-6 rounded-lg text-center">
            <h1 className="text-3xl font-bold">Siapa di Balik Website Ini</h1>
            <p className="text-gray-100 mt-2 text-base">
              Kenali lebih dekat orang-orang hebat di balik proyek ini.
            </p>
          </header>

          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            {/* Tentang Tim */}
            <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto py-8 mb-12">
              <div className="flex-1 text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Tim <span className="text-orange">Kami</span>
                </h2>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  <span className="font-medium">UMKM Wong Kudus</span> adalah
                  platform yang dirancang oleh pelajar SMK Raden Umar Said Kudus,
                  Jawa Tengah. Kami merupakan siswa jurusan Rekayasa Perangkat
                  Lunak yang memiliki semangat untuk memperkenalkan dunia coding
                  kepada masyarakat.
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  Kami percaya bahwa pemrograman merupakan keterampilan penting di
                  era digital, dan melalui karya ini kami ingin menginspirasi serta
                  memberikan manfaat nyata bagi lingkungan sekitar.
                </p>
              </div>

              <div className="flex-1 flex justify-center md:justify-end">
                <img
                  src="/images/team.png"
                  alt="Foto Tim"
                  className="w-4/5 max-w-md rounded-lg shadow-md object-contain"
                />
              </div>
            </section>

            {/* Anggota Tim */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img
                  src="/images/anam.jpg"
                  alt="Muhammad Choirul'anam"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange transition">
                    Muhammad Choirul'anam
                  </h3>
                  <p className="text-gray-600 mt-2 text-justify">
                    Sebagai <span className="font-medium">Lead Programmer</span>,
                    saya berkomitmen untuk menghadirkan inovasi dan solusi digital
                    yang bermanfaat bagi masyarakat.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img
                  src="/images/isham.jpg"
                  alt="Azzan Isham Alawiy"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange transition">
                    Azzan Isham Alawiy
                  </h3>
                  <p className="text-gray-600 mt-2 text-justify">
                    Sebagai <span className="font-medium">UI/UX Designer</span>{" "}
                    sekaligus frontend developer, saya senang dapat menciptakan
                    pengalaman pengguna yang menarik dan bermanfaat.
                  </p>
                </div>
              </div>

              <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img
                  src="/images/yusuf.jpg"
                  alt="Yusuf Rizqy Mubarok"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange transition">
                    Yusuf Rizqy Mubarok
                  </h3>
                  <p className="text-gray-600 mt-2 text-justify">
                    Sebagai <span className="font-medium">Backend Developer</span>,
                    saya bangga bisa berkontribusi dalam pengembangan Website UMKM
                    Wong Kudus dan memperluas dampak positifnya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default TentangKamiPage;
