import React from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import PageContainer from "../components/PageContainer";

const TentangUMKMPage = () => {
  return (
    <div className="bg-light min-h-screen font-poppins overflow-x-hidden w-full">
      <Navbar />

      <HeroContent
        image="/images/tentang_umkm_hero_content.png"
        title="Mengenal Lebih Dekat UMKM di Kudus"
        subtitle="Pelajari pengertian, peran, dan potensi UMKM yang menjadi tulang punggung ekonomi daerah."
      />

      <PageContainer
        variant="default"
        className="flex flex-col gap-8 sm:gap-12 -mb-12"
      >
        <div
          className="bg-light flex flex-col my-5 sm:mb-16"
          data-aos="fade-up"
          data-aos-mirror="true"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-8 sm:mb-10">
            <span className="font-bold">Apa</span> itu UMKM?
          </h2>

          <div
            className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 lg:gap-12"
            data-aos="fade-right"
            data-aos-mirror="true"
          >
            <div className="md:w-1/2 text-dark leading-relaxed text-base sm:text-lg text-center md:text-left space-y-4">
              <p>
                UMKM adalah singkatan dari Usaha Mikro, Kecil, dan Menengah.
                Menurut Undang-Undang Nomor 20 Tahun 2008, UMKM merupakan
                kegiatan ekonomi produktif yang dimiliki oleh perorangan maupun
                badan usaha perorangan yang memenuhi kriteria usaha mikro,
                kecil, dan menengah.
              </p>
              <p>
                UMKM tidak hanya berperan dalam kegiatan ekonomi, tetapi juga
                membantu pelestarian budaya lokal dan inovasi produk kreatif
                yang khas di masing-masing daerah.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-end">
              <img
                src="/images/apa_itu_umkm_1.png"
                alt="Pelaku UMKM Kudus"
                className="rounded-md shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
              />
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row-reverse items-center md:items-end justify-between gap-8 lg:gap-12 mt-10 sm:mt-14"
            data-aos="fade-left"
            data-aos-mirror="true"
          >
            <div className="md:w-1/2 text-dark leading-relaxed text-base sm:text-lg text-center md:text-right space-y-4">
              <p>
                UMKM berperan penting dalam mendorong pertumbuhan ekonomi
                nasional dan menjadi tulang punggung perekonomian Indonesia.
                Lebih dari 90% pelaku usaha di Indonesia berasal dari sektor
                UMKM dan berkontribusi besar terhadap pembukaan lapangan kerja,
                pemerataan ekonomi, serta peningkatan kesejahteraan masyarakat.
              </p>
              <p>
                Selain itu, UMKM terus berkembang dengan memanfaatkan teknologi
                digital, memperluas pasar, dan meningkatkan kualitas produk agar
                lebih kompetitif di tingkat lokal maupun global.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-start">
              <img
                src="/images/apa_itu_umkm_2.png"
                alt="UMKM Produk Lokal Kudus"
                className="rounded-md shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className="bg-light rounded-xl p-4 sm:p-6"
          data-aos="fade-up"
          data-aos-mirror="true"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-5 sm:mb-6">
            <span className="font-bold">Kriteria</span> & Klasifikasi UMKM
          </h2>
          <p className="text-center text-dark mb-6 sm:mb-8 text-sm sm:text-base">
            Berdasarkan Undang-Undang Nomor 20 Tahun 2008, berikut klasifikasi
            UMKM berdasarkan jumlah aset dan omzet tahunan:
          </p>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-l-2 border-r-2 border-t-2 border-dark/50 rounded-lg overflow-hidden text-left">
              <thead className="bg-light text-dark border-b border-dark/50">
                <tr>
                  <th className="py-3 px-4 font-bold border-r border-dark/50">
                    Jenis Usaha
                  </th>
                  <th className="py-3 px-4 font-bold border-r border-dark/50">
                    Aset Maksimal
                  </th>
                  <th className="py-3 px-4 font-bold">Omzet Tahunan</th>
                </tr>
              </thead>
              <tbody className="text-dark">
                <tr className="border-b border-dark/50">
                  <td className="py-3 px-4 border-r border-dark/50">
                    Usaha Mikro
                  </td>
                  <td className="py-3 px-4 border-r border-dark/50">
                    ≤ Rp 50 juta
                  </td>
                  <td className="py-3 px-4">≤ Rp 300 juta</td>
                </tr>
                <tr className="border-b border-dark/50">
                  <td className="py-3 px-4 border-r border-dark/50">
                    Usaha Kecil
                  </td>
                  <td className="py-3 px-4 border-r border-dark/50">
                    &gt; Rp 50 juta – Rp 500 juta
                  </td>
                  <td className="py-3 px-4">
                    &gt; Rp 300 juta – Rp 2,5 miliar
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-r border-dark/50">
                    Usaha Menengah
                  </td>
                  <td className="py-3 px-4 border-r border-dark/50">
                    &gt; Rp 500 juta – Rp 10 miliar
                  </td>
                  <td className="py-3 px-4">
                    &gt; Rp 2,5 miliar – Rp 50 miliar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-6">
            <div className="bg-light rounded-xl border border-dark/50 overflow-hidden">
              <div className="bg-light px-4 py-2 text-sm font-bold text-center border-b border-dark/50">
                Usaha Mikro
              </div>
              <div className="grid grid-cols-2 text-xs sm:text-sm">
                <div className="px-3 py-2 bg-light border-r border-dark/50 text-center">
                  <p className="text-xs font-medium text-dark mb-1">
                    Aset Maksimal
                  </p>
                  <p className="block font-medium text-dark/50 text-xs">
                    ≤ Rp 50 juta
                  </p>
                </div>
                <div className="px-3 py-2 text-center">
                  <p className="text-xs font-medium text-dark mb-1">
                    Omzet Tahunan
                  </p>
                  <p className="block font-medium text-dark/50 text-xs">
                    ≤ Rp 300 juta
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light rounded-xl border border-dark/50 overflow-hidden">
              <div className="bg-light px-4 py-2 text-sm font-bold text-center border-b border-dark/50">
                Usaha Kecil
              </div>
              <div className="grid grid-cols-2 text-xs sm:text-sm">
                <div className="px-3 py-2 bg-light border-r border-dark/50 text-center">
                  <p className="text-xs font-medium text-dark mb-1">
                    Aset Maksimal
                  </p>
                  <p className="block font-medium text-dark/50 text-xs">
                    &gt; Rp 50 juta – Rp 500 juta
                  </p>
                </div>
                <div className="px-3 py-2 text-center">
                  <p className="text-xs font-medium text-dark mb-1">
                    Omzet Tahunan
                  </p>
                  <p className="block font-medium text-dark/50 text-xs">
                    &gt; Rp 300 juta – Rp 2,5 miliar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light rounded-xl border border-dark/50 overflow-hidden">
              <div className="bg-light px-4 py-2 text-sm font-bold text-center border-b border-dark/50">
                Usaha Menengah
              </div>
              <div className="grid grid-cols-2 text-xs sm:text-sm">
                <div className="px-3 py-2 bg-light border-r border-dark/50 text-center">
                  <p className="text-xs font-medium text-dark mb-1">
                    Aset Maksimal
                  </p>
                  <p className="block font-medium text-dark/50 text-xs">
                    &gt; Rp 500 juta – Rp 10 miliar
                  </p>
                </div>
                <div className="px-3 py-2 text-center">
                  <p className="text-xs font-medium text-dark mb-1">
                    Omzet Tahunan
                  </p>
                  <p className="block font-medium text-dark/50 text-xs">
                    &gt; Rp 2,5 miliar – Rp 50 miliar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-light rounded-xl my-12 sm:my-16"
          data-aos="fade-up"
          data-aos-mirror="true"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-5 sm:mb-6 px-4">
            <span className="font-bold">Peran</span> UMKM di Kudus
          </h2>
          <p className="text-center text-dark mb-8 sm:mb-10 px-4 text-sm sm:text-base">
            UMKM di Kudus berkembang di berbagai bidang, mencerminkan
            kreativitas dan semangat masyarakat lokal dalam menggerakkan
            perekonomian daerah.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div
              className="bg-green text-light rounded-xl p-5 sm:p-8 flex flex-col items-center text-center shadow-md"
              data-aos="fade-up"
              data-aos-mirror="true"
            >
              <Icon
                icon="simple-icons:snapcraft"
                className="text-4xl sm:text-5xl mb-3 sm:mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Konveksi & Kerajinan
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                Industri konveksi dan kerajinan di Kudus berkembang pesat dengan
                berbagai produk seperti batik, bordir, serta kerajinan tangan
                berbahan kayu. Banyak pelaku usaha yang berhasil menembus pasar
                nasional bahkan ekspor berkat kualitas produk mereka.
              </p>
            </div>

            <div
              className="bg-orange text-light rounded-xl p-5 sm:p-8 flex flex-col items-center text-center shadow-md"
              data-aos="fade-up"
              data-aos-mirror="true"
            >
              <Icon
                icon="hugeicons:noodles"
                className="text-4xl sm:text-5xl mb-3 sm:mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Kuliner Lokal
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                Sektor kuliner menjadi daya tarik utama di Kudus, dengan beragam
                makanan khas seperti lentog tanjung, jenang Kudus, dan sate
                kerbau. UMKM kuliner tidak hanya melestarikan cita rasa
                tradisional, tetapi juga berinovasi dalam kemasan dan pemasaran
                digital.
              </p>
            </div>

            <div
              className="bg-yellow text-light rounded-xl p-5 sm:p-8 flex flex-col items-center text-center shadow-md"
              data-aos="fade-up"
              data-aos-mirror="true"
            >
              <Icon
                icon="streamline-flex:wrench-hand"
                className="text-4xl sm:text-5xl mb-3 sm:mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Jasa & Layanan
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                UMKM di bidang jasa seperti laundry, barbershop, percetakan,
                hingga bengkel berperan penting dalam memenuhi kebutuhan harian
                masyarakat. Sektor ini juga menjadi peluang besar bagi generasi
                muda untuk membuka usaha mandiri dengan modal terjangkau.
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-light rounded-xl px-4 sm:px-0"
          data-aos="fade-up"
          data-aos-mirror="true"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-4 sm:mb-5">
            <span className="font-bold">Tantangan</span> & Dukungan
          </h2>
          <p className="text-center text-dark mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Perjalanan UMKM tidak lepas dari berbagai hambatan, namun dukungan
            dari pemerintah dan masyarakat terus menguatkan keberlanjutan usaha
            kecil di Kudus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div
              className="bg-dark/70 text-light rounded-lg p-5 sm:p-8 shadow-md"
              data-aos="fade-right"
              data-aos-mirror="true"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">
                Tantangan
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>Akses permodalan yang terbatas.</li>
                <li>Kurangnya literasi digital.</li>
                <li>Persaingan dengan produk industri besar.</li>
                <li>Minimnya inovasi dan tenaga kerja terampil.</li>
              </ul>
            </div>

            <div
              className="bg-orange text-light rounded-lg p-5 sm:p-8 shadow-md"
              data-aos="fade-left"
              data-aos-mirror="true"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">
                Dukungan
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>Program pembiayaan dari pemerintah daerah.</li>
                <li>Pelatihan digital marketing dan e-commerce.</li>
                <li>Pendampingan dari lembaga dan komunitas.</li>
                <li>Platform promosi seperti katalog UMKM online.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-0">
          <div
            className="bg-light rounded-xl px-6 sm:px-8 pt-6 pb-10 md:pt-8 md:pb-14 mt-12 sm:mt-16 mb-20 sm:mb-28 relative overflow-visible shadow-md max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-mirror="true"
          >
            <Icon
              icon="icon-park-outline:noodles"
              className="absolute -top-4 sm:-top-5 -left-4 sm:-left-5 text-orange text-4xl sm:text-5xl opacity-80 rotate-315"
            />
            <Icon
              icon="ri:drinks-2-line"
              className="absolute -bottom-4 sm:-bottom-5 -right-4 sm:-right-5 text-green text-4xl sm:text-5xl opacity-80 rotate-45"
            />
            <Icon
              icon="iconoir:quote-solid"
              className="absolute bottom-2 sm:bottom-3 left-5 sm:left-6 text-orange text-3xl sm:text-4xl rotate-y-180"
            />
            <Icon
              icon="iconoir:quote-solid"
              className="absolute top-2 sm:top-3 right-5 sm:right-6 text-orange text-3xl sm:text-4xl"
            />

            <div className="text-center max-w-2xl mx-auto text-dark leading-relaxed text-sm sm:text-base md:text-lg relative z-10">
              <p className="mb-3">
                UMKM bukan sekadar usaha kecil, tetapi fondasi ekonomi yang
                menggerakkan kehidupan masyarakat. Mari dukung pelaku UMKM di
                Kudus agar terus berkembang, berinovasi, dan memberikan manfaat
                bagi daerah.
              </p>
              <p>
                Dengan mengenal dan mempromosikan produk lokal, kita turut
                membangun perekonomian yang mandiri dan berdaya saing.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default TentangUMKMPage;
