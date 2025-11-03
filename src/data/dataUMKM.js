import { s } from "framer-motion/client";

export const dataUMKM = [
  // BAE
  {
    id: 1,
    name: "Warung Makan Om W",
    slug: "warung-makan-om-w",
    category: "Makanan",
    description:
      "Warung sederhana dengan menu rumahan khas Kudus yang lezat dan terjangkau.",
    location: "Bae",
    kecamatanSlug: "bae",
    openHour: "09:00-21:00",
    image: "/images/omw_hero.jpg",
    link: "https://maps.app.goo.gl/p2y9yqgkziBTC84BA",
  },
  {
    id: 2,
    name: "Ayam Geprek Jawi",
    slug: "ayam-geprek-jawi",
    category: "Makanan",
    description:
      "Menyajikan ayam geprek pedas dengan sambal khas yang menggugah selera.",
    location: "Bae",
    kecamatanSlug: "bae", // Ditambahkan
    openHour: "09:00-22:00",
    image: "/images/geprekjawi_hero.jpg",
    link: "https://maps.app.goo.gl/34kSNYhPqqgnU87T8",
  },
  {
    id: 3,
    name: "Soto Lamongan Mbak Yuli",
    slug: "soto-lamongan-mbak-yuli",
    category: "Makanan",
    description:
      "Soto Lamongan gurih dengan koya melimpah dan potongan ayam kampung.",
    location: "Bae",
    kecamatanSlug: "bae", // Ditambahkan
    openHour: "07:00-20:00",
    image: "/images/lamonganyuli_hero.jpg",
    link: "https://maps.app.goo.gl/JdsXJfJK2SiJLZPA7",
  },
  {
    id: 4,
    name: "Es Cincau Pasundan",
    slug: "es-cincau-pasundan",
    category: "Minuman",
    description:
      "Minuman segar dengan cincau hitam khas Pasundan dan gula merah cair.",
    location: "Bae",
    kecamatanSlug: "bae", // Ditambahkan
    openHour: "10:00-21:00",
    image: "/images/cincaupasundan_hero.png",
    link: "https://maps.app.goo.gl/gVm4V6t2bqPczEJZ9",
  },
  {
    id: 5,
    name: "Jasa Tulis Kudus",
    slug: "jasa-tulis-kudus",
    category: "Jasa",
    description:
      "Melayani jasa pengetikan, cetak dokumen, dan administrasi harian.",
    location: "Bae",
    kecamatanSlug: "bae", // Ditambahkan
    openHour: "08:00-17:00",
    image: "/images/jasatulis_hero.jpg",
    link: "https://maps.app.goo.gl/4sNnVAGGSV7RziFPA",
  },

  // DAWE
  {
    id: 6,
    name: "Swike Dawe Restaurant",
    slug: "swike-dawe-restaurant",
    category: "Makanan",
    description:
      "Restoran khas Kudus yang menyajikan swike lezat dengan resep tradisional.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/swikedawe_hero.jpg",
    link: "https://maps.app.goo.gl/USGE5s2iZ31mx3et8",
  },
  {
    id: 7,
    name: "WEKATE GANK",
    slug: "wekate-gank",
    category: "Minuman",
    description:
      "Kedai minuman kekinian dengan berbagai pilihan topping dan rasa.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/wekategank_hero.jpg",
    link: "https://maps.app.goo.gl/hdpT54AXQ2vHhwEc7",
  },
  {
    id: 8,
    name: "Rumah Makan Mak Kiyem",
    slug: "rumah-makan-mak-kiyem",
    category: "Makanan",
    description:
      "Tempat makan dengan cita rasa masakan Jawa rumahan yang otentik.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "08:00-21:00",
    image: "/images/makkiyem_hero.jpg",
    link: "https://maps.app.goo.gl/D7Su82QRZCHX7t698",
  },
  {
    id: 9,
    name: "Jasa Angkut & Pasir & Bata Merah Jumbo",
    category: "Jasa",
    description:
      "Menyediakan layanan angkut material bangunan dan kebutuhan konstruksi.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "07:00-17:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Jasa+Angkut+Dawe",
    link: "https://maps.app.goo.gl/cRj82EGc6TAkoriM9",
  },
  {
    id: 10,
    name: "Ayam Geprek Sa’i Dawe",
    category: "Makanan",
    description:
      "Ayam geprek dengan level pedas sesuai selera dan harga bersahabat.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "10:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Ayam+Geprek+Sai",
    link: "https://maps.app.goo.gl/PfPe7WbfSfYS3LkJ7",
  },

  // GEBOG
  {
    id: 11,
    name: "Warung Makan Mbah Sapar",
    slug: "warung-makan-mbah-sapar",
    category: "Makanan",
    description:
      "Warung makan legendaris dengan menu khas Kudus yang menggugah selera.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "07:00-20:00",
    image: "/images/mbahsapar_hero.jpg",
    link: "https://maps.app.goo.gl/gYeV2iWeC7LmAuHT7",
  },
  {
    id: 12,
    name: "Nasi Uduk dan Nasi Kuning Gang Satu",
    slug: "nasi-uduk-dan-nasi-kuning-gang-satu",
    category: "Makanan",
    description:
      "Menyajikan nasi uduk dan nasi kuning dengan lauk variatif setiap hari.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "06:00-11:00",
    image: "/images/nasiuduk_hero.jpg",
    link: "https://maps.app.goo.gl/kwHfceBeg9Je1TSX9",
  },
  {
    id: 13,
    name: "Sari Rasa Bakso Malvinas",
    category: "Makanan",
    description: "Bakso urat dengan kuah kaldu gurih dan porsi mengenyangkan.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "09:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Bakso+Malvinas",
    link: "https://maps.app.goo.gl/TXvZsQTRpQKZHKwq8",
  },
  {
    id: 14,
    name: "Warung Makan Mak Ru",
    category: "Makanan",
    description: "Menu masakan rumahan lengkap dengan sambal khas Kudus.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "08:00-20:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Mak+Ru",
    link: "https://maps.app.goo.gl/juay76Sbna2XWySPA",
  },
  {
    id: 15,
    name: "Kasehito Works",
    category: "Jasa",
    description:
      "Menyediakan jasa desain, sablon, dan percetakan lokal berkualitas.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "09:00-18:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Kasehito+Works",
    link: "https://maps.app.goo.gl/LCfCY8JhJnu6xnMa7",
  },

  // JATI
  {
    id: 16,
    name: "Cakrawala Sego Sambel",
    slug: "cakrawala-sego-sambel",
    category: "Makanan",
    description:
      "Sego sambel khas dengan berbagai lauk pedas yang menggoda selera.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/cakrawala_hero.jpg",
    link: "https://maps.app.goo.gl/wj7ySDm62qgiSFq89",
  },
  {
    id: 17,
    name: "Nasi Opor Sunggingan",
    slug: "nasi-opor-sunggingan",
    category: "Makanan",
    description:
      "Opor ayam lembut dengan kuah santan kental dan bumbu khas Kudus.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "07:00-14:00",
    image:
      "https://placehold.co/260x160/E2E8F0/334155?text=Nasi+Opor+Sunggingan",
    link: "https://maps.app.goo.gl/CTwWoJNguH22eQwT9",
  },
  {
    id: 18,
    name: "Warung Enthog Pak Badi",
    category: "Makanan",
    description:
      "Spesialis olahan enthog dengan sambal korek pedas menggugah selera.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "10:00-22:00",
    image:
      "https://placehold.co/260x160/E2E8F0/334155?text=Warung+Enthog+Pak+Badi",
    link: "https://maps.app.goo.gl/8f5GghbHSAEopjy69",
  },
  {
    id: 19,
    name: "Jasa Powder Coating & Platting Kudus",
    category: "Jasa",
    description:
      "Melayani coating dan platting untuk berbagai kebutuhan industri dan otomotif.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "08:00-17:00",
    image:
      "https://placehold.co/260x160/E2E8F0/334155?text=Powder+Coating+Kudus",
    link: "https://maps.app.goo.gl/mQzmND44WD8YSs4J9",
  },
  {
    id: 20,
    name: "Kedai Es Bang Maman",
    category: "Minuman",
    description:
      "Es segar berbagai rasa dengan topping buah dan jelly favorit anak muda.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "10:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Es+Bang+Maman",
    link: "https://maps.app.goo.gl/Vu7RMPYneemyVbAv8",
  },

  // Jekulo
  {
    id: 21,
    name: "Jus Pojokan",
    category: "Minuman",
    description:
      "Jus segar berbagai rasa yang cocok dinikmati saat siang hari.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Jus+Pojokan",
    link: "https://maps.app.goo.gl/Zhkh25gYKHdmAoAg7",
  },
  {
    id: 22,
    name: "Kedai Twins Seblak Bandung n Juice Jekulo",
    category: "Minuman",
    description:
      "Kedai seblak dan jus kekinian khas Bandung dengan cita rasa lokal.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "10:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Kedai+Twins",
    link: "https://maps.app.goo.gl/K3dFrRZs7dZ6uojF9",
  },
  {
    id: 23,
    name: "Lentog Tanjung Bang Saiful",
    category: "Makanan",
    description: "Lentog khas Kudus dengan cita rasa gurih yang legendaris.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "06:00-14:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Lentog+Bang+Saiful",
    link: "https://maps.app.goo.gl/CZdrZBNNK8U5Z7uw9",
  },
  {
    id: 24,
    name: "Berkah Es Buah",
    category: "Minuman",
    description:
      "Es buah segar dengan campuran jelly dan susu, favorit semua kalangan.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Berkah+Es+Buah",
    link: "https://maps.app.goo.gl/MuzML5nP25Hv2MpD8",
  },
  {
    id: 25,
    name: "Warnet Jaya Sentosa",
    category: "Jasa",
    description:
      "Warnet dengan koneksi cepat dan nyaman untuk bermain maupun bekerja.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "08:00-22:00",
    image:
      "https://placehold.co/260x160/E2E8F0/334155?text=Warnet+Jaya+Sentosa",
    link: "https://maps.app.goo.gl/UHzpMvoGS6CTRYiY6",
  },

  // Kaliwungu
  {
    id: 26,
    name: "Jahe Rempah Leggit",
    category: "Minuman",
    description: "Minuman jahe hangat dengan campuran rempah alami khas Kudus.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "08:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Jahe+Leggit",
    link: "https://maps.app.goo.gl/VJYX3uXpSy5SogKL8",
  },
  {
    id: 27,
    name: "Warung Makan Bu Carik",
    category: "Makanan",
    description:
      "Warung makan sederhana dengan menu rumahan yang lezat dan murah.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "07:00-20:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Bu+Carik",
    link: "https://maps.app.goo.gl/CcQzT44jBLxcTz317",
  },
  {
    id: 28,
    name: "Tehatea Indonesia",
    category: "Minuman",
    description:
      "Gerai teh kekinian dengan berbagai varian rasa dan topping menarik.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "10:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Tehatea",
    link: "https://maps.app.goo.gl/iDRzzu1SYC9EwriG8",
  },
  {
    id: 29,
    name: "Warung Makan 2 Putra",
    category: "Makanan",
    description: "Tempat makan dengan menu ayam goreng dan sambal khas.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "08:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=2+Putra",
    link: "https://maps.app.goo.gl/zjbtUzu1nr5dotyeA",
  },
  {
    id: 30,
    name: "Jasa Angkut Barang",
    category: "Jasa",
    description:
      "Layanan angkut cepat dan aman untuk kebutuhan pindahan dan kiriman.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "24 Jam",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Jasa+Angkut",
    link: "https://maps.app.goo.gl/qyHNi7Gf39h9Lq9g8",
  },

  // Kota Kudus
  {
    id: 31,
    name: "Susu Moeria",
    category: "Minuman",
    description: "Susu murni dengan berbagai varian rasa khas Kudus.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan (menggunakan slug untuk nama 2 kata)
    openHour: "09:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Susu+Moeria",
    link: "https://maps.app.goo.gl/Cfm2eHz19kBCU9Pz9",
  },
  {
    id: 32,
    name: "Ramboo Chicken",
    slug: "ramboo-chicken",
    category: "Makanan",
    description:
      "Ayam geprek dengan sambal korek yang pedas dan menggugah selera.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan
    openHour: "08:00-21:00",
    image: "/images/ramboo_hero.jpg",
    link: "https://maps.app.goo.gl/LYVqkhzbW1onRtQv6",
  },
  {
    id: 33,
    name: "Es Gempol Pak Masykur",
    category: "Minuman",
    description:
      "Minuman tradisional Kudus dengan gempol segar dan santan manis.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan
    openHour: "09:00-20:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Es+Gempol",
    link: "https://maps.app.goo.gl/V6sZgXXHEN2feiq17",
  },
  {
    id: 34,
    name: "Sultan Barber Top",
    slug: "sultan-barber-top",
    category: "Jasa",
    description:
      "Barbershop modern dengan pelayanan profesional, tempat nyaman, dan hasil cukur rapi bergaya kekinian.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan
    openHour: "10.00 - 22.00",
    image: "/images/sultanbarbertop_hero.jpg",
    link: "https://maps.app.goo.gl/tisWKdCUm5aWueGB9",
  },
  {
    id: 35,
    name: "Soto Kudus Bu Jatmi",
    slug: "soto-kudus-bu-jatmi",
    category: "Makanan",
    description:
      "Warung legendaris dengan cita rasa soto khas Kudus yang gurih dan autentik sejak puluhan tahun.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan
    openHour: "07.00 - 22.00",
    image: "/images/sotokudusbujatmi_hero.jpg",
    link: "https://maps.app.goo.gl/BDb4ivbpLwgvVNS18",
  },

  // Mejobo
  {
    id: 36,
    name: "XGAM_Tech",
    category: "Jasa",
    description: "Layanan servis laptop, komputer, dan rakit PC profesional.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=XGAM_Tech",
    link: "https://maps.app.goo.gl/9euCZPP28Ux55TVx9",
  },
  {
    id: 37,
    name: "Jasa Las dan Bubut Mulyo Rejo",
    category: "Jasa",
    description:
      "Layanan las dan bubut untuk kebutuhan industri dan rumah tangga.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "08:00-17:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Mulyo+Rejo",
    link: "https://maps.app.goo.gl/743qWsjwzsDYsPn16",
  },
  {
    id: 38,
    name: "Putra Kalimosodo",
    category: "Jasa",
    description: "Penyedia jasa transportasi dan material bangunan terpercaya.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "08:00-17:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Putra+Kalimosodo",
    link: "https://maps.app.goo.gl/7H7z1BAqDx88Sfjp7",
  },
  {
    id: 39,
    name: "Ikan Bakar Nasuky Mubarok Jepang",
    category: "Makanan",
    description: "Ikan bakar khas Kudus dengan sambal pedas menggoda.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "10:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Ikan+Bakar+Nasuky",
    link: "https://maps.app.goo.gl/BNpXA6PkwAXc279z6",
  },
  {
    id: 40,
    name: "RM Bu Sarah",
    category: "Makanan",
    description: "Rumah makan keluarga dengan masakan tradisional Jawa.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=RM+Bu+Sarah",
    link: "https://maps.app.goo.gl/kE4cSEL21bcZH7Xa6",
  },

  // Undaan
  {
    id: 41,
    name: "Queen Seblak Prasmanan",
    category: "Makanan",
    description:
      "Seblak dengan berbagai topping dan level pedas yang bisa dipilih.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "10:00-22:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Seblak+Queen",
    link: "https://maps.app.goo.gl/z287J9zCbZojfoMfA",
  },
  {
    id: 42,
    name: "Ayam Geprek Mak Ginting",
    category: "Makanan",
    description: "Ayam geprek renyah dengan sambal pedas khas Kudus.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "09:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Mak+Ginting",
    link: "https://maps.app.goo.gl/jGCtZ2MbyygA1iD68",
  },
  {
    id: 43,
    name: "Warung Sate & Gule Pak Sugiyo",
    category: "Makanan",
    description: "Sate kambing empuk dan gule gurih khas Kudus.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "08:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=Pak+Sugiyo",
    link: "https://maps.app.goo.gl/wbTHjq9ZrMd1NCCC8",
  },
  {
    id: 44,
    name: "MJ Teknik",
    category: "Jasa",
    description: "Layanan instalasi listrik dan servis alat rumah tangga.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "08:00-17:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=MJ+Teknik",
    link: "https://maps.app.goo.gl/MPsgnJEDyhLbUE4C6",
  },
  {
    id: 45,
    name: "Fotocopy & Jasa Travel",
    category: "Jasa",
    description: "Layanan fotokopi cepat dan travel antar kota.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "07:00-21:00",
    image: "https://placehold.co/260x160/E2E8F0/334155?text=FotoCopy+Travel",
    link: "https://maps.app.goo.gl/1tu74aqqG5myETN17",
  },
];