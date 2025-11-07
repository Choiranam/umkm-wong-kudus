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
    slug: "jasa-angkut-dan-pasir-bata-merah-jumbo",
    category: "Jasa",
    description:
      "Menyediakan layanan angkut material bangunan dan kebutuhan konstruksi.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "07:00-17:00",
    image: "/images/jasaangkut_hero.jpg",
    link: "https://maps.app.goo.gl/yimn1Ms8XH6ekbYLA",
  },
  {
    id: 10,
    name: "Ayam Geprek Sa’i Dawe",
    slug: "ayam-geprek-sai",
    category: "Makanan",
    description:
      "Ayam geprek dengan level pedas sesuai selera dan harga bersahabat.",
    location: "Dawe",
    kecamatanSlug: "dawe", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/ayamgepreksai_hero.jpg",
    link: "https://maps.app.goo.gl/5G3DAEiX19ufwgaS6",
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
    slug: "sari-rasa-bakso-malvinas",
    category: "Makanan",
    description: "Bakso urat dengan kuah kaldu gurih dan porsi mengenyangkan.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/baksomalvinas_hero.jpg",
    link: "https://maps.app.goo.gl/ppj9kcANtYxC613S6",
  },
  {
    id: 14,
    name: "Warung Makan Mak Ru",
    slug: "warung-makan-mak-ru",
    category: "Makanan",
    description: "Menu masakan rumahan lengkap dengan sambal khas Kudus.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "08:00-20:00",
    image: "/images/warungmakanmakru_hero.jpg",
    link: "https://maps.app.goo.gl/ShKhKN6G8jLoNxqb6",
  },
  {
    id: 15,
    name: "Kasehito Works",
    slug: "kasehito-works",
    category: "Jasa",
    description:
      "Menyediakan jasa desain, sablon, dan percetakan lokal berkualitas.",
    location: "Gebog",
    kecamatanSlug: "gebog", // Ditambahkan
    openHour: "09:00-18:00",
    image: "/images/kasehitoworks_hero.jpeg",
    link: "https://maps.app.goo.gl/Hnqm3izDEuR4iDTaA",
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
      "/images/oporsungginan_hero.jpg",
    link: "https://maps.app.goo.gl/ih4WzCWEq4Mw81nw7",
  },
  {
    id: 18,
    name: "Warung Enthog Pak Badi",
    slug: "warung-enthog-pak-badi",
    category: "Makanan",
    description:
      "Spesialis olahan enthog dengan sambal korek pedas menggugah selera.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "10:00-22:00",
    image:
      "/images/enthogpakbadi_hero.jpg",
    link: "https://maps.app.goo.gl/usFhu6CUCSuysUG2A",
  },
  {
    id: 19,
    name: "Jasa Powder Coating & Platting Kudus",
    slug: "jasa-powder-coating-dan-platting-kudus",
    category: "Jasa",
    description:
      "Melayani coating dan platting untuk berbagai kebutuhan industri dan otomotif.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "08:00-17:00",
    image:
      "/images/powdercoating_hero.jpg",
    link: "https://maps.app.goo.gl/QeruafGAk4xGBpdFA",
  },
  {
    id: 20,
    name: "Kedai Es Bang Maman",
    slug: "kedai-es-bang-maman",
    category: "Minuman",
    description:
      "Es segar berbagai rasa dengan topping buah dan jelly favorit anak muda.",
    location: "Jati",
    kecamatanSlug: "jati", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/esbangmaman_hero.jpg",
    link: "https://maps.app.goo.gl/Fi5eeThuzfuthEyz8",
  },

  // Jekulo
  {
    id: 21,
    name: "Jus Pojokan",
    slug: "jus-pojokan",
    category: "Minuman",
    description:
      "Jus segar berbagai rasa yang cocok dinikmati saat siang hari.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/juspojokan_hero.jpg",
    link: "https://maps.app.goo.gl/qziXm98Q1MiogAcG7",
  },
  {
    id: 22,
    name: "Kedai Twins Seblak Bandung n Juice Jekulo",
    slug: "kedai-twins-seblak-bandung-juice-jekulo",
    category: "Minuman",
    description:
      "Kedai seblak dan jus kekinian khas Bandung dengan cita rasa lokal.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/kedaytwins_hero.jpg",
    link: "https://maps.app.goo.gl/7UPi7Rnx5UUV6hGXA",
  },
  {
    id: 23,
    name: "Lentog Tanjung Bang Saiful",
    slug: "lentog-tanjung-bang-saiful",
    category: "Makanan",
    description: "Lentog khas Kudus dengan cita rasa gurih yang legendaris.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "06:00-14:00",
    image: "/images/lentogbangsyaiful_hero.jpg",
    link: "https://maps.app.goo.gl/i3hFof87YiH1Jfcm7",
  },
  {
    id: 24,
    name: "Berkah Es Buah",
    slug: "berkah-es-buah",
    category: "Minuman",
    description:
      "Es buah segar dengan campuran jelly dan susu, favorit semua kalangan.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/berkahesbuah_hero.jpg",
    link: "https://maps.app.goo.gl/NP9wzm62FCP3voiz5",
  },
  {
    id: 25,
    name: "Warnet Jaya Sentosa",
    slug: "warnet-jaya-sentosa",
    category: "Jasa",
    description:
      "Warnet dengan koneksi cepat dan nyaman untuk bermain maupun bekerja.",
    location: "Jekulo",
    kecamatanSlug: "jekulo", // Ditambahkan
    openHour: "08:00-22:00",
    image:
      "/images/warnetjayasentosa_hero.jpeg",
    link: "https://maps.app.goo.gl/PmLuRVBMbQZ9TM1P8",
  },

  // Kaliwungu
  {
    id: 26,
    name: "Jahe Rempah Leggit",
    slug: "jahe-rempah-leggit",
    category: "Minuman",
    description: "Minuman jahe hangat dengan campuran rempah alami khas Kudus.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "08:00-21:00",
    image: "/images/jaherempahreggit_hero.jpg",
    link: "https://maps.app.goo.gl/BkJaMkRkfC5fNqEg6",
  },
  {
    id: 27,
    name: "Warung Makan Bu Carik",
    slug: "warung-makan-bu-carik",
    category: "Makanan",
    description:
      "Warung makan sederhana dengan menu rumahan yang lezat dan murah.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "07:00-20:00",
    image: "/images/warungmakanbucarik_hero.jpg",
    link: "https://maps.app.goo.gl/gTMSEWRBQXFjzw2w7",
  },
  {
    id: 28,
    name: "Tehatea Indonesia",
    slug: "tehatea-indonesia",
    category: "Minuman",
    description:
      "Gerai teh kekinian dengan berbagai varian rasa dan topping menarik.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/tehatea_hero.jpeg",
    link: "https://maps.app.goo.gl/F8N4e7jorns2isec6",
  },
  {
    id: 29,
    name: "Warung Makan 2 Putra",
    slug: "warung-makan-2-putra",
    category: "Makanan",
    description: "Tempat makan dengan menu ayam goreng dan sambal khas.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "08:00-21:00",
    image: "/images/warungmakan2putra_hero.jpg",
    link: "https://maps.app.goo.gl/38fiNxsfuYd8tWKe6",
  },
  {
    id: 30,
    name: "Jasa Angkut Barang",
    slug: "jasa-angkut-barang",
    category: "Jasa",
    description:
      "Layanan angkut cepat dan aman untuk kebutuhan pindahan dan kiriman.",
    location: "Kaliwungu",
    kecamatanSlug: "kaliwungu", // Ditambahkan
    openHour: "24 Jam",
    image: "/images/jasaangkutbarang_hero.jpg",
    link: "https://maps.app.goo.gl/y5THumCBYsXwknGv7",
  },

  // Kota Kudus
  {
    id: 31,
    name: "Susu Moeria",
    slug: "susu-moeria",
    category: "Minuman",
    description: "Susu murni dengan berbagai varian rasa khas Kudus.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan (menggunakan slug untuk nama 2 kata)
    openHour: "09:00-22:00",
    image: "/images/susumoeria_hero.jpg",
    link: "https://maps.app.goo.gl/ykPM75GR4zvotqGu7",
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
    slug: "es-gempol-pak-masykur",
    category: "Minuman",
    description:
      "Minuman tradisional Kudus dengan gempol segar dan santan manis.",
    location: "Kota Kudus",
    kecamatanSlug: "kota-kudus", // Ditambahkan
    openHour: "09:00-20:00",
    image: "/images/gempol_hero.jpg",
    link: "https://maps.app.goo.gl/FbW5YErAMVZPSgE17",
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
    slug: "xgam-tech",
    category: "Jasa",
    description: "Layanan servis laptop, komputer, dan rakit PC profesional.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/xgamtech_hero.jpg",
    link: "https://maps.app.goo.gl/gWn3E69AAsSdHF5E8",
  },
  {
    id: 37,
    name: "Jasa Las dan Bubut Mulyo Rejo",
    slug: "jasa-las-dan-bubut-mulyo-rejo",
    category: "Jasa",
    description:
      "Layanan las dan bubut untuk kebutuhan industri dan rumah tangga.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "08:00-17:00",
    image: "/images/jasalas_hero.jpg",
    link: "https://maps.app.goo.gl/AxEporVGMVhUg6Gx8",
  },
  {
    id: 38,
    name: "Putra Kalimosodo",
    slug: "putra-kalimosodo",
    category: "Jasa",
    description: "Penyedia jasa transportasi dan material bangunan terpercaya.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "08:00-17:00",
    image: "/images/kalimosodo_hero.jpg",
    link: "https://maps.app.goo.gl/uH67vcG4Dvs7KoGk8",
  },
  {
    id: 39,
    name: "Ikan Bakar Nasuky Mubarok Jepang",
    slug: "ikan-bakar-nasuky-mubarok-jepang",
    category: "Makanan",
    description: "Ikan bakar khas Kudus dengan sambal pedas menggoda.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/ikanbakar_hero.jpg",
    link: "https://maps.app.goo.gl/gmQKifDFtnkAR7v9A",
  },
  {
    id: 40,
    name: "RM Bu Sarah",
    slug: "rm-bu-sarah",
    category: "Makanan",
    description: "Rumah makan keluarga dengan masakan tradisional Jawa.",
    location: "Mejobo",
    kecamatanSlug: "mejobo", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/rmbusarah_hero.jpg",
    link: "https://maps.app.goo.gl/7ECiqEckKkN3vUTp6",
  },

  // Undaan
  {
    id: 41,
    name: "Queen Seblak Prasmanan",
    slug: "queen-seblak-prasmanan",
    category: "Makanan",
    description:
      "Seblak dengan berbagai topping dan level pedas yang bisa dipilih.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "10:00-22:00",
    image: "/images/queenseblak_hero.jpg",
    link: "https://maps.app.goo.gl/jBP4apLhmMCffGhX9",
  },
  {
    id: 42,
    name: "Ayam Geprek Mak Ginting",
    slug: "ayam-geprek-mak-ginting",
    category: "Makanan",
    description: "Ayam geprek renyah dengan sambal pedas khas Kudus.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "09:00-21:00",
    image: "/images/geprekmakginting_hero.jpg",
    link: "https://maps.app.goo.gl/EoNQcjSTJTfPQRcQ7",
  },
  {
    id: 43,
    name: "Warung Sate & Gule Pak Sugiyo",
    slug: "warung-sate-dan-gule-pak-sugiyo",
    category: "Makanan",
    description: "Sate kambing empuk dan gule gurih khas Kudus.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "08:00-21:00",
    image: "/images/warungsatedangule_hero.jpg",
    link: "https://maps.app.goo.gl/1rY63jpYL1TG5zCi7",
  },
  {
    id: 44,
    name: "MJ Teknik",
    slug: "mj-teknik",
    category: "Jasa",
    description: "Layanan instalasi listrik dan servis alat rumah tangga.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "08:00-17:00",
    image: "/images/mjteknik_hero.jpg",
    link: "https://maps.app.goo.gl/ybAKugTzb2kkbV1s7",
  },
  {
    id: 45,
    name: "Fotocopy & Jasa Travel",
    slug: "fotocopy-dan-jasa-travel",
    category: "Jasa",
    description: "Layanan fotokopi cepat dan travel antar kota.",
    location: "Undaan",
    kecamatanSlug: "undaan", // Ditambahkan
    openHour: "07:00-21:00",
    image: "/images/fotocopy_hero.jpeg",
    link: "https://maps.app.goo.gl/bNhm4hXN8YRd7bvz9",
  },
];