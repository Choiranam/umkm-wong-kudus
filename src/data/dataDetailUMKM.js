import { desc, embed, image } from "framer-motion/client";

export const dataDetailUMKM = [
  // BAE
  {
    id: 1,
    name: "Warung Makan Om W",
    slug: "warung-makan-om-w",
    heroImage: "/images/omw_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Makan Om W"',
    heroSubtitle:
      "Warung sederhana khas Kudus dengan cita rasa rumahan yang lezat dan harga bersahabat.",
    description:
      "Warung sederhana dengan menu rumahan khas Kudus yang lezat dan terjangkau.",
    about:
      "<strong>Warung Makan Om W</strong> adalah warung makan di Desa Bacin, Kec. Bae, Kabupaten Kudus yang menyajikan aneka lauk rumahan. Cocok untuk makan sehari-hari dengan suasana santai.",
    rating: "4.7 / 5",
    location: {
      address: "Jl. Kapten Ali Mahmudi, Kudus",
      fullAddress:
        "Jl. Kapten Ali Mahmudi RT 3 RW 3, Desa Bacin, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59311",
      mapsUrl: "https://maps.app.goo.gl/p2y9yqgkziBTC84BA",
      embedUrl:
        "https://www.google.com/maps?q=-6.7843175,110.84337095&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "6285850934454",
      email: "-",
      instagram: "warungmakan.om.w",
    },
    menus: [
      {
        name: "Rica Entok",
        description: "Rica entok dengan bumbu khas Kudus.",
        price: "Rp 22.000",
        image: "/images/omw_menu1.jpg",
      },
      {
        name: "Ayam Goreng",
        description: "Ayam goreng bumbu spesial dengan sambal terasi.",
        price: "Rp 22.000",
        image: "/images/omw_menu2.jpg",
      },
      {
        name: "Tongseng Entok",
        description: "Tongseng entok dengan bumbu khas Kudus.",
        price: "Rp 22.000",
        image: "/images/omw_menu3.jpg",
      },
      {
        name: "Tonbas Entog",
        description: "Tonbas entog dengan bumbu khas Kudus.",
        price: "Rp 22.000",
        image: "/images/omw_menu4.jpg",
      },
    ],
    galleryImages: [
      "/images/omw_galerifoto1.jpg",
      "/images/omw_galerifoto2.jpg",
      "/images/omw_galerifoto3.jpg",
      "/images/omw_galerifoto4.jpg",
      "/images/omw_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: false },
    ],
  },
  {
    id: 2,
    name: "Ayam Geprek Jawi",
    slug: "ayam-geprek-jawi",
    heroImage: "/images/geprekjawi_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Ayam Geprek Jawi"',
    heroSubtitle:
      "Menyajikan ayam geprek pedas dengan sambal khas yang menggugah selera.",
    about:
      "<strong>Ayam Geprek Jawi</strong> adalah outlet ayam geprek yang berlokasi di Kota Kudus, dekat kampus UMK, dengan variasi sambal pedas sebagai daya tariknya.",
    description:
      "Outlet ayam geprek dengan rasa pedas khas Kudus dan harga mahasiswa.",
    rating: "4.0 / 5",
    location: {
      address: "Jl. Lingkar Utara, Kudus",
      fullAddress:
        "Jl. Lkr. Utara, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/Gdz1A9GPonLXUVsy8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7834093,110.8657576&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "6281225771772",
      email: "-",
      instagram: "ayamgeprekjawi",
    },
    menus: [
      {
        name: "Ayam Geprek Original",
        description: "Ayam geprek dengan sambal pedas khas Jawi.",
        price: "Rp 10.000",
        image: "/images/geprekjawi_menu1.jpg",
      },
      {
        name: "Ayam Geprek Sambal Matah",
        description: "Ayam geprek dengan taburan keju leleh.",
        price: "Rp 13.000",
        image: "/images/geprekjawi_menu2.jpg",
      },
      {
        name: "Ayam Geprek Mozarella",
        description: "Ayam geprek dengan saus mozarella gurih.",
        price: "Rp 15.000",
        image: "/images/geprekjawi_menu3.jpeg",
      },
      {
        name: "Lele Geprek",
        description: "Lele geprek dengan sambal pedas khas Jawi.",
        price: "Rp 12.000",
        image: "/images/geprekjawi_menu4.jpeg",
      },
    ],
    galleryImages: [
      "/images/geprekjawi_galerifoto1.jpg",
      "/images/geprekjawi_galerifoto2.jpg",
      "/images/geprekjawi_galerifoto3.jpg",
      "/images/geprekjawi_galerifoto4.jpg",
      "/images/geprekjawi_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 21.00", isOpen: true },
    ],
  },
  {
    id: 3,
    name: "Soto Lamongan Mbak Yuli",
    slug: "soto-lamongan-mbak-yuli",
    heroImage: "/images/lamonganyuli_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Soto Lamongan Mbak Yuli"',
    heroSubtitle:
      "Soto Lamongan gurih dengan koya melimpah dan potongan ayam kampung.",
    about:
      "<strong>Soto Lamongan Mbak Yuli</strong> adalah warung soto yang menyajikan citarasa Lamongan di Kudus; soto ayam kuah bening dengan koya khas yang menggugah selera.",
    description:
      "Warung soto dengan cita rasa Lamongan dan koya melimpah di Kudus.",
    rating: "4.3 / 5",
    location: {
      address: "Jl. Lingkar Utara, Kudus",
      fullAddress:
        "Jl. Lkr. Utara, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/indZFwYSP1aQHWaTA",
      embedUrl:
        "https://www.google.com/maps?q=-6.783404,110.8631827&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Soto Lamongan",
        description: "Soto ayam kuah bening dengan koya khas Lamongan.",
        price: "Rp 10.000",
        image: "/images/lamonganyuli_menu1.jpg",
      },
    ],
    galleryImages: [
      "/images/lamonganyuli_galerifoto1.jpg",
      "/images/lamonganyuli_galerifoto2.jpg",
      "/images/lamonganyuli_galerifoto3.jpg",
      "/images/lamonganyuli_galerifoto4.jpg",
      "/images/lamonganyuli_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "06.30 - 10.00", isOpen: true },
      { day: "Selasa", hours: "06.30 - 13.00", isOpen: true },
      { day: "Rabu", hours: "06.30 - 13.00", isOpen: true },
      { day: "Kamis", hours: "06.30 - 12.00", isOpen: true },
      { day: "Jumat", hours: "06.30 - 10.00", isOpen: true },
      { day: "Sabtu", hours: "06.30 - 10.00", isOpen: true },
      { day: "Minggu", hours: "06.30 - 10.00", isOpen: true },
    ],
  },
  {
    id: 4,
    name: "Es Cincau Pasundan",
    slug: "es-cincau-pasundan",
    heroImage: "/images/cincaupasundan_hero.png",
    heroTitle: 'Informasi Lengkap tentang UMKM "Es Cincau Pasundan"',
    heroSubtitle:
      "Minuman segar dengan cincau hitam khas Pasundan dan gula merah cair.",
    about:
      "<strong>Es Cincau Pasundan</strong> di Bendokerep, Bae, Kudus adalah kedai minuman yang populer dengan harga terjangkau dan menu cincau alami.",
    description:
      "Minuman cincau hitam khas Pasundan dengan cita rasa segar dan manis alami dari gula merah.",
    rating: "4.7 / 5",
    location: {
      address: "Jl. Bendokerep, Kudus",
      fullAddress:
        "6V7M+F8C, Bendokerep, Karangbener, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59323",
      mapsUrl: "https://maps.app.goo.gl/3Q2n52R4HtU9dXy38",
      embedUrl:
        "https://www.google.com/maps?q=-6.7863083,110.8832585&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "6285866640818",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Es Cincau Pasundan",
        description: "Minuman cincau hitam dengan gula merah cair.",
        price: "Rp 5.000",
        image: "/images/cincaupasundan_menu1.jpg",
      },
    ],
    galleryImages: [
      "/images/cincaupasundan_galerifoto1.jpeg",
      "/images/cincaupasundan_galerifoto2.png",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 16.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 16.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 16.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 16.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 16.00", isOpen: true },
    ],
  },
  {
    id: 5,
    name: "Jasa Tulis Kudus",
    slug: "jasa-tulis-kudus",
    heroImage: "/images/jasatulis_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Jasa Tulis Kudus"',
    heroSubtitle:
      "Melayani jasa pengetikan, cetak dokumen, dan administrasi harian.",
    about:
      "<strong>Jasa Tulis Kudus</strong> merupakan layanan pengetikan dan cetak dokumen yang berlokasi di Panjang, Bae, Kudus. Pelayanan cepat dan buka selama 24 jam membuatnya cocok untuk kebutuhan mendesak seperti tugas sekolah, administrasi, dan cetak cepat.",
    description:
      "Layanan pengetikan, cetak dokumen, dan administrasi yang buka 24 jam di Kudus.",
    rating: "5 / 5",
    location: {
      address: "Panjang, Kudus",
      fullAddress:
        "Unnamed Road, Panjang, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59326",
      mapsUrl: "https://maps.app.goo.gl/yuRDNSCH69zDq3He9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7826663,110.8483528&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "6285163123943",
      email: "-",
      instagram: "jasatuliskudus",
    },
    menus: [
      {
        name: "Jasa Tugas",
        description: "Melayani pengetikan tugas sekolah dan kuliah.",
        price: "Mulai Rp 5.000",
        image: "/images/jasatulis_menu1.jpeg",
      },
      {
        name: "Jasa Tulis Tangan",
        description: "Melayani penulisan dokumen secara manual.",
        price: "Mulai Rp 3.000",
        image: "/images/jasatulis_menu2.jpeg",
      },
      {
        name: "Jasa Edit",
        description: "Melayani editing dokumen dan tata bahasa.",
        price: "Mulai Rp 20.000",
        image: "/images/jasatulis_menu3.png",
      },
      {
        name: "Jasa Ketik",
        description: "Melayani pengetikan dokumen cepat dan rapi.",
        price: "Mulai Rp 4.000",
        image: "/images/jasatulis_menu4.jpeg",
      },
    ],
    galleryImages: [
      "/images/jasatulis_galerifoto1.png",
      "/images/jasatulis_galerifoto2.png",
      "/images/jasatulis_galerifoto3.png",
      "/images/jasatulis_galerifoto4.png",
      "/images/jasatulis_galerifoto5.png",
    ],
    openingHours: [
      { day: "Senin", hours: "Buka 24 Jam", isOpen: true },
      { day: "Selasa", hours: "Buka 24 Jam", isOpen: true },
      { day: "Rabu", hours: "Buka 24 Jam", isOpen: true },
      { day: "Kamis", hours: "Buka 24 Jam", isOpen: true },
      { day: "Jumat", hours: "Buka 24 Jam", isOpen: true },
      { day: "Sabtu", hours: "Buka 24 Jam", isOpen: true },
      { day: "Minggu", hours: "Buka 24 Jam", isOpen: true },
    ],
  },
  // DAWE
  {
    id: 6,
    name: "Swike Dawe Restaurant",
    slug: "swike-dawe-restaurant",
    heroImage: "/images/swikedawe_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Swike Dawe Restaurant"',
    heroSubtitle:
      "Restoran legendaris menawarkan swike (kodok kuah tauco) khas Kudus.",
    about:
      "<strong>Swike Dawe Restaurant</strong> adalah salah satu tempat kuliner khas Kudus yang terkenal dengan menu swike — kodok kuah tauco — dan telah menjadi destinasi lokal sejak lama.",
    description:
      "Restoran khas Kudus yang menyajikan swike kuah tauco dan berbagai menu tradisional legendaris.",
    rating: "4.3 / 5",
    location: {
      address: "Dawe, Kudus",
      fullAddress:
        "7V79+V32, Dawe, Piji, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/Uw7pQGGRbTZ23Ai38",
      embedUrl:
        "https://www.google.com/maps?q=-6.7353662,110.8676438&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Sop Daging",
        description: "Sop daging sapi dengan kuah bening segar.",
        price: "Rp 30.000",
        image: "/images/swikedawe_menu1.jpg",
      },
      {
        name: "Swike Kuah dan Pepes Telur Kodok",
        description: "Swike kodok kuah tauco dan pepes telur kodok.",
        price: "Rp 50.000",
        image: "/images/swikedawe_menu2.jpg",
      },
    ],
    galleryImages: [
      "/images/swikedawe_galerifoto1.jpg",
      "/images/swikedawe_galerifoto2.jpg",
      "/images/swikedawe_galerifoto3.jpg",
      "/images/swikedawe_galerifoto4.jpg",
      "/images/swikedawe_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 15.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 15.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 15.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 15.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 15.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 15.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 15.00", isOpen: true },
    ],
  },
  {
    id: 7,
    name: "WEKATE GANK",
    slug: "wekate-gank",
    heroImage: "/images/wekategank_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "WEKATE GANK"',
    heroSubtitle:
      "Kafe & lounge nongkrong malam dengan suasana kekinian di Kudus.",
    about:
      "<strong>WEKATE GANK</strong> adalah tempat nongkrong malam di Kudus yang menawarkan suasana santai, musik, dan menu kafe/lounge yang cocok untuk anak muda.",
    description:
      "Kafe dan lounge dengan suasana modern dan santai, buka 24 jam penuh untuk menemani waktu nongkrongmu di Kudus.",
    rating: "5 / 5",
    location: {
      address: "Kudus, Jawa Tengah, Indonesia",
      fullAddress:
        "6VR9+MC5, Gg. 4, Bonduren, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/adjgTfQ4HJkW6GET8",
      embedUrl:
        "https://www.google.com/maps?q=-6.758369,110.8685629&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Berbagai Aneka Minuman",
        description: "Aneka minuman segar dan kopi kekinian.",
        price: "Mulai Rp 5.000",
        image: "/images/wekategank_menu1.jpeg",
      },
    ],
    galleryImages: [
      "/images/wekategank_galerifoto1.jpeg",
      "/images/wekategank_galerifoto2.png",
      "/images/wekategank_galerifoto3.jpeg",
    ],
    openingHours: [
      { day: "Senin", hours: "Buka 24 Jam", isOpen: true },
      { day: "Selasa", hours: "Buka 24 Jam", isOpen: true },
      { day: "Rabu", hours: "Buka 24 Jam", isOpen: true },
      { day: "Kamis", hours: "Buka 24 Jam", isOpen: true },
      { day: "Jumat", hours: "Buka 24 Jam", isOpen: true },
      { day: "Sabtu", hours: "Buka 24 Jam", isOpen: true },
      { day: "Minggu", hours: "Buka 24 Jam", isOpen: true },
    ],
  },
  {
    id: 8,
    name: "Rumah Makan Mak Kiyem",
    slug: "rumah-makan-mak-kiyem",
    heroImage: "/images/makkiyem_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Rumah Makan Mak Kiyem"',
    heroSubtitle:
      "Warung makan malam hingga siang dengan aneka menu rumahan dan lodeh khas Kudus.",
    about:
      "<strong>Rumah Makan Mak Kiyem</strong> adalah warung makan populer di Desa Cendono, Kec. Dawe, Kudus yang menyediakan menu makan malam hingga pagi, dengan suasana santai dan rasa masakan rumahan yang khas.",
    description:
      "Warung makan khas Kudus yang menyajikan aneka menu rumahan seperti pecel dan rames lodeh dengan harga terjangkau.",
    rating: "4.2 / 5",
    location: {
      address: "Cendono Wetan, Kudus",
      fullAddress:
        "6VW8+Q3X, Cendono Wetan, Cendono, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/DjZGXsB4cgqrZQB96",
      embedUrl:
        "https://www.google.com/maps?q=-6.7530186,110.865249&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "https://wa.me/6285640083741",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Pecel",
        description: "Nasi dengan sayur pecel dan lauk pilihan.",
        price: "Rp 7.000",
        image: "/images/makkiyem_menu1.jpg",
      },
      {
        name: "Rames Lodeh Bu Kiyem",
        description: "Rames khas Kudus dengan lauk lodeh.",
        price: "Rp 8.000",
        image: "/images/makkiyem_menu2.jpg",
      },
    ],
    galleryImages: [
      "/images/makkiyem_galerifoto1.jpg",
      "/images/makkiyem_galerifoto2.jpg",
      "/images/makkiyem_galerifoto3.jpg",
      "/images/makkiyem_galerifoto4.jpg",
      "/images/makkiyem_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "03.00 - 01.00", isOpen: true },
      { day: "Selasa", hours: "03.00 - 01.00", isOpen: true },
      { day: "Rabu", hours: "03.00 - 01.00", isOpen: true },
      { day: "Kamis", hours: "03.00 - 01.00", isOpen: true },
      { day: "Jumat", hours: "03.00 - 01.00", isOpen: true },
      { day: "Sabtu", hours: "03.00 - 01.00", isOpen: true },
      { day: "Minggu", hours: "03.00 - 01.00", isOpen: true },
    ],
  },
  // GEBOG
  {
    id: 11,
    name: "Warung Makan Mbah Sapar",
    slug: "warung-makan-mbah-sapar",
    heroImage: "/images/mbahsapar_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Makan Mbah Sapar"',
    heroSubtitle:
      "Warung makan rumahan populer untuk sarapan dengan menu khas lokal di Kudus.",
    about:
      "<strong>Warung Makan Mbah Sapar</strong> adalah warung makan di Desa Gondosari, Kec. Gebog, Kabupaten Kudus yang dikenal sebagai tempat sarapan favorit dengan suasana sederhana namun ramai oleh pengunjung lokal.",
    description:
      "Warung makan khas Kudus yang menyajikan sop daging kerbau, nasi pecel, dan berbagai jamu tradisional segar.",
    rating: "4.5 / 5",
    location: {
      address: "Beru, Kudus",
      fullAddress: "Beru, Gondosari, Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/8vQpd1VTCgSWGQFRA",
      embedUrl:
        "https://www.google.com/maps?q=-6.7305572,110.8450368&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Sop",
        description: "Sop daging kerbau dengan kuah bening segar.",
        price: "Rp 5.000",
        image: "/images/mbahsapar_menu1.jpg",
      },
      {
        name: "Nasi Pecel",
        description: "Nasi dengan sayur pecel dan lauk pilihan.",
        price: "Rp 7.000",
        image: "/images/mbahsapar_menu2.jpg",
      },
      {
        name: "Aneka Jamu",
        description: "Berbagai minuman jamu tradisional segar.",
        price: "Mulai Rp 5.000",
        image: "/images/mbahsapar_menu3.jpg",
      },
    ],
    galleryImages: [
      "/images/mbahsapar_galerifoto1.jpg",
      "/images/mbahsapar_galerifoto2.jpg",
      "/images/mbahsapar_galerifoto3.jpg",
      "/images/mbahsapar_galerifoto4.jpg",
      "/images/mbahsapar_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "06.00 – 13.30", isOpen: true },
      { day: "Selasa", hours: "06.00 – 13.30", isOpen: true },
      { day: "Rabu", hours: "06.00 – 13.30", isOpen: true },
      { day: "Kamis", hours: "06.00 – 13.30", isOpen: true },
      { day: "Jumat", hours: "06.00 – 13.30", isOpen: true },
      { day: "Sabtu", hours: "06.00 – 13.30", isOpen: true },
      { day: "Minggu", hours: "06.00 – 13.30", isOpen: true },
    ],
  },
  {
    id: 12,
    name: "Nasi Uduk dan Nasi Kuning Gang Satu",
    slug: "nasi-uduk-dan-nasi-kuning-gang-satu",
    heroImage: "/images/nasiuduk_hero.jpg",
    heroTitle:
      'Informasi Lengkap tentang UMKM "Nasi Uduk dan Nasi Kuning Gang Satu"',
    heroSubtitle:
      "Kedai sarapan pagi menyajikan nasi uduk dan nasi kuning khas Kudus sejak pagi hari.",
    about:
      "<strong>Nasi Uduk dan Nasi Kuning Gang Satu</strong> adalah warung sarapan populer di Gebog, Kudus yang buka sejak pagi dan menjadi favorit banyak pengunjung untuk menikmati nasi uduk serta nasi kuning cepat saji.",
    description:
      "Warung sarapan khas Kudus yang menyajikan nasi uduk dan nasi kuning dengan cita rasa gurih dan lauk lengkap.",
    rating: "4.9 / 5",
    location: {
      address: "Jl. Raya Jurang Gang 1, Kudus",
      fullAddress:
        "Jl Raya Jurang Gang 1, RT.01/RW.1, Krasak, Jurang, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/GZtkthTbKMB8uVmX8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7489773,110.8442676&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "https://wa.me/6285866665024",
      email: "-",
      instagram: "nasi_uduk_gang_satu",
    },
    menus: [
      {
        name: "Nasi Uduk",
        description: "Nasi uduk dengan lauk pilihan dan sambal khas.",
        price: "Rp 8.000",
        image: "/images/nasiuduk_menu1.jpg",
      },
      {
        name: "Nasi Kuning",
        description: "Nasi kuning dengan lauk lengkap dan sambal terasi.",
        price: "Rp 10.000",
        image: "/images/nasiuduk_menu2.jpg",
      },
    ],
    galleryImages: [
      "/images/nasiuduk_galerifoto1.jpg",
      "/images/nasiuduk_galerifoto2.jpg",
      "/images/nasiuduk_galerifoto3.jpg",
      "/images/nasiuduk_galerifoto4.jpg",
      "/images/nasiuduk_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "Tutup", isOpen: close },
      { day: "Selasa", hours: "06.00 - 12.00", isOpen: true },
      { day: "Rabu", hours: "06.00 - 12.00", isOpen: true },
      { day: "Kamis", hours: "06.00 - 12.00", isOpen: true },
      { day: "Jumat", hours: "05.30 - 11.00", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 12.00", isOpen: true },
      { day: "Minggu", hours: "06.00 - 12.00", isOpen: true },
    ],
  },
  // JATI
  {
    id: 16,
    name: "Cakrawala Sego Sambel",
    slug: "cakrawala-sego-sambel",
    heroImage: "/images/cakrawala_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Cakrawala Sego Sambel"',
    heroSubtitle:
      "Warung makan malam hingga larut yang populer dengan sego sambel dan lauk goreng-gorengan di Kudus.",
    about:
      "<strong>Cakrawala Sego Sambel</strong> adalah rumah makan yang berlokasi di Jl. Jend. Ahmad Yani No.1, Getas Pejaten, Kudus. Tempat ini buka sejak sore hingga tengah malam dan menjadi pilihan favorit untuk menikmati kuliner malam hari di Kudus.",
    description:
      "Warung makan malam khas Kudus yang menyajikan sego sambel dengan lauk goreng seperti ayam kampung, bebek, bandeng, dan entog.",
    rating: "4.4 / 5",
    location: {
      address: "Jl. Jend. Ahmad Yani No.1, Kudus",
      fullAddress:
        "Jl. Jend. Ahmad Yani No.1, Getas, Getas Pejaten, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59343",
      mapsUrl: "https://maps.app.goo.gl/KAEdTUUM8rNoydMx5",
      embedUrl:
        "https://www.google.com/maps?q=-6.8197711,110.8367989&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "https://wa.me/628562765946",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Ayam Goreng",
        description: "Ayam kampung goreng dengan sambal khas Kudus.",
        price: "Rp 23.000",
        image: "/images/cakrawala_menu1.jpg",
      },
      {
        name: "Lele Bakar",
        description: "Lele bakar dengan sambal khas Kudus.",
        price: "Rp 10.000",
        image: "/images/cakrawala_menu2.jpg",
      },
      {
        name: "Bebek Goreng",
        description: "Bebek goreng dengan sambal khas Kudus.",
        price: "Rp 25.000",
        image: "/images/cakrawala_menu3.jpg",
      },
      {
        name: "Ayam Bakar",
        description: "Ayam bakar dengan sambal khas Kudus.",
        price: "Rp 23.000",
        image: "/images/cakrawala_menu4.jpg",
      },
    ],
    galleryImages: [
      "/images/cakrawala_galerifoto1.jpg",
      "/images/cakrawala_galerifoto2.jpg",
      "/images/cakrawala_galerifoto3.jpg",
      "/images/cakrawala_galerifoto4.jpg",
      "/images/cakrawala_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "09.30 - 00.30", isOpen: true },
      { day: "Selasa", hours: "09.30 - 00.30", isOpen: true },
      { day: "Rabu", hours: "09.30 - 00.30", isOpen: true },
      { day: "Kamis", hours: "09.30 - 00.30", isOpen: true },
      { day: "Jumat", hours: "09.30 - 00.30", isOpen: true },
      { day: "Sabtu", hours: "09.30 - 00.30", isOpen: true },
      { day: "Minggu", hours: "09.30 - 00.30", isOpen: true },
    ],
  },
  // JEKULO
  {},
  // KALIWUNGU

  // KOTA KUDUS
  {
    id: 32,
    name: "Ramboo Chicken",
    slug: "ramboo-chicken",
    heroImage: "/images/ramboo_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Ramboo Chicken"',
    heroSubtitle:
      "Nikmati cita rasa ayam geprek khas Kudus dengan berbagai pilihan menu lezat dan harga terjangkau.",
    about:
      "<strong>Ramboo Chicken</strong> adalah sebuah usaha kuliner populer di Kudus yang berlokasi di daerah Krandon. Tempat makan ini mengkhususkan diri pada sajian aneka hidangan olahan ayam yang beragam, menjadikannya pilihan favorit bagi warga lokal. Menu andalan mereka berfokus pada ayam geprek dan rice bowl dengan berbagai saus khas.",
    rating: "4.8 / 5",
    description:
      "Ramboo Chicken dikenal dengan ayam geprek dan sambal koreknya yang pedas menggugah selera. Menggunakan bahan segar dan bumbu khas Kudus yang autentik.",
    location: {
      address: "Jl. Sunan Muria No.21, Kudus",
      fullAddress:
        "Jl. KH Moh. Arwani, Pejaten, Krandon, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59314",
      mapsUrl: "https://maps.app.goo.gl/xVjQFurMT4EqQVaw6",
      embedUrl:
        "https://www.google.com/maps?q=-6.792574,110.8408274&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "6289673183625",
      email: "ramboo@gmail.com",
      instagram: "ramboochicken",
    },
    menus: [
      {
        name: "Dada Ramboo Fighter",
        description: "Ayam goreng tepung dengan sambal pedas khas Kudus.",
        price: "Rp 23.000",
        image: "/images/ramboo_menu1.jpg",
      },
      {
        name: "Basic Breash",
        description: "Ayam bakar dengan olesan madu manis gurih.",
        price: "Rp 20.000",
        image: "/images/ramboo_menu2.jpg",
      },
      {
        name: "Double Chicken",
        description: "Pedasnya nampol dengan sambal korek khas Ramboo Chicken.",
        price: "Rp 25.000",
        image: "/images/ramboo_menu3.jpg",
      },
      {
        name: "Kentang Goreng",
        description: "Ayam renyah gurih cocok untuk semua kalangan.",
        price: "Rp 11.000",
        image: "/images/ramboo_menu4.jpg",
      },
    ],
    galleryImages: [
      "/images/ramboo_galerifoto1.jpg",
      "/images/ramboo_galerifoto2.jpg",
      "/images/ramboo_galerifoto3.jpg",
      "/images/ramboo_galerifoto4.jpg",
      "/images/ramboo_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: false },
    ],
  },
  {
    id: 1,
    name: "Soto Kudus Bu Jatmi",
    slug: "soto-kudus-bu-jatmi",
    heroImage: "/images/sotokudusbujatmi_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Soto Kudus Bu Jatmi"',
    heroSubtitle:
      "Warung soto legendaris yang menjadi ikon kuliner khas Kudus, menyajikan cita rasa autentik dengan pilihan daging kerbau maupun ayam.",
    description:
      "Soto Kudus Bu Jatmi merupakan salah satu kuliner paling terkenal di Kudus yang telah melayani pelanggan selama bertahun-tahun. Dikenal dengan kuah bening gurih dan taburan bawang goreng melimpah, warung ini menjadi destinasi wajib bagi pecinta kuliner tradisional.",
    about:
      "<strong>Soto Kudus Bu Jatmi</strong> adalah warung makan yang telah lama dikenal masyarakat Kudus karena kelezatan soto khasnya. Menggunakan resep turun-temurun dengan bumbu rempah pilihan, Soto Kudus Bu Jatmi menawarkan dua varian utama yaitu soto daging kerbau dan soto ayam. Tempatnya sederhana namun selalu ramai pengunjung dari pagi hingga malam hari, baik warga lokal maupun wisatawan yang ingin mencicipi cita rasa asli Kudus.",
    rating: "4.5 / 5",
    location: {
      address: "Jl. Kyai H. Wahid Hasyim No.43, Kudus",
      fullAddress:
        "Jl. Kyai H. Wahid Hasyim No.43, Magersari, Panjunan, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59317",
      mapsUrl: "https://maps.app.goo.gl/BDb4ivbpLwgvVNS18",
      embedUrl:
        "https://www.google.com/maps?q=-6.8111989,110.83808&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "sotokudusbujatmi",
    },
    menus: [
      {
        name: "Soto Kerbau",
        description:
          "Soto khas Kudus dengan daging kerbau empuk dan kuah bening gurih beraroma rempah.",
        price: "Rp 15.000",
        image: "/images/sotokudusbujatmi_menu1.jpg",
      },
      {
        name: "Soto Ayam",
        description:
          "Soto ayam khas Kudus dengan suwiran ayam kampung dan taburan bawang goreng melimpah.",
        price: "Rp 15.000",
        image: "/images/sotokudusbujatmi_menu2.jpg",
      },
      {
        name: "Perkedel Kentang",
        description:
          "Perkedel gurih renyah pelengkap soto yang dibuat dari kentang pilihan.",
        price: "Rp 4.000",
        image: "/images/sotokudusbujatmi_menu3.jpg",
      },
      {
        name: "Es Kopyor",
        description:
          "Minuman segar dari kelapa kopyor asli yang cocok dinikmati setelah menyantap soto.",
        price: "Rp 25.000",
        image: "/images/sotokudusbujatmi_menu4.jpg",
      },
    ],
    galleryImages: [
      "/images/sotokudusbujatmi_galerifoto1.jpg",
      "/images/sotokudusbujatmi_galerifoto2.jpg",
      "/images/sotokudusbujatmi_galerifoto3.jpg",
      "/images/sotokudusbujatmi_galerifoto4.jpg",
      "/images/sotokudusbujatmi_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 35,
    name: "Sultan Barber Top",
    slug: "sultan-barber-top",
    heroImage: "/images/sultanbarbertop_hero.jpg",
    heroTitle: 'Informasi Lengkap tentang UMKM "Sultan Barber Top"',
    heroSubtitle:
      "Barbershop modern di Kudus yang menawarkan potongan rambut bergaya, layanan premium, dan suasana nyaman untuk semua kalangan.",
    description:
      "Sultan Barber Top adalah barbershop modern yang menjadi salah satu destinasi perawatan rambut pria terpopuler di Kudus. Dengan tim barber berpengalaman, tempat ini menghadirkan berbagai gaya potongan rambut terkini, pelayanan ramah, serta suasana santai dan bersih yang membuat pelanggan merasa nyaman.",
    about:
      "<strong>Sultan Barber Top</strong> adalah barbershop profesional yang mengutamakan kualitas layanan dan kenyamanan pelanggan. Berlokasi strategis di pusat kota Kudus, Sultan Barber Top menyediakan layanan potong rambut modern, shaving, hair wash, hingga styling dengan produk perawatan rambut terbaik. Mengusung konsep tempat yang cozy dan bergaya urban, barbershop ini menjadi pilihan utama bagi pria yang ingin tampil rapi dan stylish setiap hari.",
    rating: "5.0 / 5",
    location: {
      address: "Jl. Pemuda No.56, Kudus",
      fullAddress:
        "Jl. Pemuda No.56, Magersari, Panjunan, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59317",
      mapsUrl: "https://maps.app.goo.gl/tisWKdCUm5aWueGB9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8092534,110.8438943&hl=id&z=16&output=embed",
    },
    contact: {
      whatsapp: "085184711418",
      email: "-",
      instagram: "sultan_barbertop.id",
    },
    menus: [
      {
        name: "Haircut",
        description:
          "Layanan potong rambut profesional dengan gaya sesuai tren terbaru dan bentuk wajah pelanggan.",
        price: "Rp 25.000",
        image: "/images/sultanbarbertop_menu1.jpg",
      },
      {
        name: "Haircut + Wash",
        description:
          "Potong rambut dilengkapi dengan cuci rambut agar hasil lebih maksimal dan segar.",
        price: "Rp 35.000",
        image: "/images/sultanbarbertop_menu1.jpg",
      },
      {
        name: "Shaving / Beard Trim",
        description:
          "Cukur kumis atau janggut dengan hasil rapi dan aman menggunakan alat steril.",
        price: "Rp 20.000",
        image: "/images/sultanbarbertop_menu1.jpg",
      },
      {
        name: "Hair Styling",
        description:
          "Penataan rambut menggunakan pomade atau wax premium agar tampil stylish setiap saat.",
        price: "Rp 15.000",
        image: "/images/sultanbarbertop_menu1.jpg",
      },
    ],
    galleryImages: [
      "/images/sultanbarbertop_galerifoto1.jpg",
      "/images/sultanbarbertop_galerifoto2.jpg",
      "/images/sultanbarbertop_galerifoto3.jpg",
      "/images/sultanbarbertop_galerifoto4.jpg",
      "/images/sultanbarbertop_galerifoto5.jpg",
    ],
    openingHours: [
      { day: "Senin", hours: "10.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "10.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "10.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "10.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "10.00 - 22.00", isOpen: true },
    ],
  },
  // MEJOBO
  // UNDAAN
];

export default dataDetailUMKM;
