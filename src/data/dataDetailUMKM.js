import { desc, embed, image } from "framer-motion/client";

export const dataDetailUMKM = [
  // BAE
  {
    id: 1,
    name: "Warung Makan Om W",
    slug: "warung-makan-om-w",
    heroImage: "/images/omw_hero.webp",
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
        image: "/images/omw_menu1.webp",
      },
      {
        name: "Ayam Goreng",
        description: "Ayam goreng bumbu spesial dengan sambal terasi.",
        price: "Rp 22.000",
        image: "/images/omw_menu2.webp",
      },
      {
        name: "Tongseng Entok",
        description: "Tongseng entok dengan bumbu khas Kudus.",
        price: "Rp 22.000",
        image: "/images/omw_menu3.webp",
      },
      {
        name: "Tonbas Entog",
        description: "Tonbas entog dengan bumbu khas Kudus.",
        price: "Rp 22.000",
        image: "/images/omw_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/omw_galerifoto1.webp",
      "/images/omw_galerifoto2.webp",
      "/images/omw_galerifoto3.webp",
      "/images/omw_galerifoto4.webp",
      "/images/omw_galerifoto5.webp",
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
    heroImage: "/images/geprekjawi_hero.webp",
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
        image: "/images/geprekjawi_menu1.webp",
      },
      {
        name: "Ayam Geprek Sambal Matah",
        description: "Ayam geprek dengan taburan keju leleh.",
        price: "Rp 13.000",
        image: "/images/geprekjawi_menu2.webp",
      },
      {
        name: "Ayam Geprek Mozarella",
        description: "Ayam geprek dengan saus mozarella gurih.",
        price: "Rp 15.000",
        image: "/images/geprekjawi_menu3.webp",
      },
      {
        name: "Lele Geprek",
        description: "Lele geprek dengan sambal pedas khas Jawi.",
        price: "Rp 12.000",
        image: "/images/geprekjawi_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/geprekjawi_galerifoto1.webp",
      "/images/geprekjawi_galerifoto2.webp",
      "/images/geprekjawi_galerifoto3.webp",
      "/images/geprekjawi_galerifoto4.webp",
      "/images/geprekjawi_galerifoto5.webp",
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
    heroImage: "/images/lamonganyuli_hero.webp",
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
        image: "/images/lamonganyuli_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/lamonganyuli_galerifoto1.webp",
      "/images/lamonganyuli_galerifoto2.webp",
      "/images/lamonganyuli_galerifoto3.webp",
      "/images/lamonganyuli_galerifoto4.webp",
      "/images/lamonganyuli_galerifoto5.webp",
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
    heroImage: "/images/cincaupasundan_hero.webp",
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
        image: "/images/cincaupasundan_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/cincaupasundan_galerifoto1.webp",
      "/images/cincaupasundan_galerifoto2.webp",
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
    heroImage: "/images/jasatulis_hero.webp",
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
        image: "/images/jasatulis_menu1.webp",
      },
      {
        name: "Jasa Tulis Tangan",
        description: "Melayani penulisan dokumen secara manual.",
        price: "Mulai Rp 3.000",
        image: "/images/jasatulis_menu2.webp",
      },
      {
        name: "Jasa Edit",
        description: "Melayani editing dokumen dan tata bahasa.",
        price: "Mulai Rp 20.000",
        image: "/images/jasatulis_menu3.webp",
      },
      {
        name: "Jasa Ketik",
        description: "Melayani pengetikan dokumen cepat dan rapi.",
        price: "Mulai Rp 4.000",
        image: "/images/jasatulis_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/jasatulis_galerifoto1.webp",
      "/images/jasatulis_galerifoto2.webp",
      "/images/jasatulis_galerifoto3.webp",
      "/images/jasatulis_galerifoto4.webp",
      "/images/jasatulis_galerifoto5.webp",
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
    id: 6,
    name: "Resto MVR Kudus",
    slug: "resto-mvr-kudus",
    heroImage: "/images/restomvr_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Resto MVR Kudus"',
    heroSubtitle:
      "Restoran modern dengan suasana nyaman yang menyajikan aneka hidangan lezat khas Nusantara.",
    about:
      "<strong>Resto MVR Kudus</strong> adalah restoran keluarga yang berlokasi di Kudus, menyajikan berbagai hidangan lezat dengan cita rasa khas Indonesia. Dikenal dengan pelayanan ramah dan tempat yang nyaman, cocok untuk makan bersama keluarga maupun acara santai.",
    description:
      "Resto MVR Kudus menghadirkan pengalaman kuliner yang memadukan cita rasa tradisional dan modern. Setiap hidangan diolah dari bahan berkualitas, menjadikannya pilihan tepat bagi pecinta kuliner di Kudus.",
    rating: "4.4 / 5",
    location: {
      address: "Kayuapu Kulon, Gondangmanis, Kudus",
      fullAddress:
        "Jl. Lkr. Utara Umk No.Utara, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/Qx8qinbztc2nCYP78",
      embedUrl:
        "https://www.google.com/maps?q=-6.7804136,110.8696728&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085641742274",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Prasmanan Ayam Lada Hitam",
        description: "Ayam lada hitam dengan cita rasa gurih pedas khas restoran.",
        price: "Rp 20.000",
        image: "/images/mvr_menu1.webp",
      },
      {
        name: "Ikan Bakar",
        description: "Ikan segar dibakar dengan bumbu spesial yang menggugah selera.",
        price: "Rp 30.000",
        image: "/images/mvr_menu2.webp",
      },
      {
        name: "Gurami Asam Manis",
        description: "Gurami goreng disajikan dengan saus asam manis segar dan lezat.",
        price: "Mulai Rp 23.000",
        image: "/images/mvr_menu3.webp",
      },
      {
        name: "Mie Goreng",
        description: "Mie goreng spesial dengan sayuran segar dan topping pilihan.",
        price: "Rp 17.000",
        image: "/images/mvr_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/mvr_galerifoto1.webp",
      "/images/mvr_galerifoto2.webp",
      "/images/mvr_galerifoto3.webp",
      "/images/mvr_galerifoto4.webp",
      "/images/mvr_galerifoto5.webp",
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
    id: 7,
    name: "VJO Cafe and Bistro",
    slug: "vjo-cafe-bistro",
    heroImage: "/images/vjocafe_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "VJO Cafe dan Bistro"',
    heroSubtitle:
      "Cafe dan bistro modern dengan suasana nyaman, menyajikan aneka hidangan dan minuman kekinian.",
    about:
      "<strong>VJO Cafe dan Bistro</strong> merupakan tempat nongkrong favorit di Kudus yang menawarkan beragam menu makanan dan minuman lezat dengan cita rasa modern. Suasananya nyaman dan estetik, cocok untuk bersantai, rapat santai, maupun kumpul bersama teman.",
    description:
      "VJO Cafe dan Bistro menghadirkan konsep kuliner kekinian dengan pilihan menu kopi, pasta, hingga hidangan khas Nusantara yang disajikan secara modern.",
    rating: "3.5 / 5",
    location: {
      address: "Kayuapu Kulon, Gondangmanis, Kudus",
      fullAddress:
        "Jl. Permata Kav., Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/vR6jvMG1dUXZiA4Z8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7905626,110.8661988&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "08999090734",
      email: "-",
      instagram: "vjocafeandbistro",
    },
    menus: [
      {
        name: "Mie Setan Level 2",
        description: "Ayam lada hitam dengan cita rasa gurih pedas khas restoran.",
        price: "Rp 9.500",
        image: "/images/vjocafe_menu1.webp",
      },
      {
        name: "Nasi Ayam Baper",
        description: "Ikan segar dibakar dengan bumbu spesial yang menggugah selera.",
        price: "Rp 14.000",
        image: "/images/vjocafe_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/vjocafe_galerifoto1.webp",
      "/images/vjocafe_galerifoto2.webp",
      "/images/vjocafe_galerifoto3.webp",
      "/images/vjocafe_galerifoto4.webp",
      "/images/vjocafe_galerifoto5.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 8,
    name: "Toko Al Maira",
    slug: "toko-al-maira",
    heroImage: "/images/tokoalmaira_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Al Maira"',
    heroSubtitle:
      "Toko bahan makanan lengkap yang menyediakan berbagai kebutuhan dapur harian dengan harga terjangkau.",
    about:
      "<strong>Toko Al Maira</strong> merupakan toko bahan makanan yang berlokasi di Kudus. Menyediakan berbagai kebutuhan dapur seperti beras, gula, minyak, tepung, bumbu dapur, dan kebutuhan pokok lainnya dengan kualitas terjamin dan harga bersahabat.",
    description:
      "Toko Al Maira melayani pembelian bahan makanan dan kebutuhan rumah tangga harian. Cocok untuk belanja keluarga maupun kebutuhan usaha kuliner di sekitar Kudus.",
    rating: "4.9 / 5",
    location: {
      address: "Ngembal Rejo, Ngembalrejo, Kudus",
      fullAddress:
        "Ngembal Rejo, Ngembalrejo, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59322",
      mapsUrl: "https://maps.app.goo.gl/hibmYHSqD5Zk8BN46",
      embedUrl:
        "https://www.google.com/maps?q=-6.7918289,110.8784789&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085641114311",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
  name: "Bahan Bahan Makanan",
  description:
    "Menjual berbagai bahan makanan pokok seperti beras, gula, minyak goreng, tepung, dan bumbu dapur lengkap untuk kebutuhan rumah tangga.",
  price: "Mulai dari Rp 5.000",
  image: "/images/tokoalmaria_menu1.webp",
},
{
  name: "Minuman dan Snack",
  description:
    "Tersedia aneka minuman ringan, kopi, teh, serta berbagai camilan kemasan untuk teman bersantai.",
  price: "Mulai dari Rp 3.000",
  image: "/images/tokoalmaria_menu1.webp",
},
{
  name: "Produk Rumah Tangga",
  description:
    "Menyediakan perlengkapan harian seperti sabun, deterjen, dan kebutuhan kebersihan rumah.",
  price: "Mulai dari Rp 7.000",
  image: "/images/tokoalmaria_menu1.webp",
},
    ],
    galleryImages: [
      "/images/tokoalmaira_galerifoto1.webp",
      "/images/tokoalmaira_galerifoto2.webp",
      "/images/tokoalmaira_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "11.00 - 02.00", isOpen: true },
      { day: "Selasa", hours: "11.00 - 02.00", isOpen: true },
      { day: "Rabu", hours: "11.00 - 02.00", isOpen: true },
      { day: "Kamis", hours: "11.00 - 02.00", isOpen: true },
      { day: "Jumat", hours: "11.00 - 02.00", isOpen: true },
      { day: "Sabtu", hours: "11.00 - 02.00", isOpen: true },
      { day: "Minggu", hours: "17.00 - 02.00", isOpen: true },
    ],
  },
  {
    id: 9,
    name: "Siskanuna Boutique",
    slug: "siskanuna-boutique",
    heroImage: "/images/siskanuna_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Siskanuna Boutique"',
    heroSubtitle:
      "Butik pakaian wanita yang menyediakan berbagai busana modis, elegan, dan nyaman untuk segala kesempatan.",
    about:
      "<strong>Siskanuna Boutique</strong> merupakan toko pakaian wanita di Kudus yang menawarkan koleksi busana modern, mulai dari pakaian kasual hingga formal. Dengan desain terkini dan bahan berkualitas, butik ini menjadi pilihan tepat bagi wanita yang ingin tampil stylish dan percaya diri.",
    description:
      "Siskanuna Boutique menghadirkan beragam pakaian wanita dengan gaya kekinian, mulai dari dress, tunik, hijab, hingga aksesori fashion pendukung dengan harga terjangkau.",
    rating: "5 / 5",
    location: {
      address: "Kepyar, Dersalam, Kudus",
      fullAddress:
        "Jl. Kampus UMK Kapling Segeran No.3, Kepyar, Dersalam, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59321",
      mapsUrl: "https://maps.app.goo.gl/CiKBLYS2JEE1zver9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7945419,110.8664624&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
       {
    name: "Dress & Gamis",
    description:
      "Koleksi dress dan gamis elegan untuk berbagai acara, dari kasual hingga formal.",
    price: "Mulai dari Rp 75.000",
    image: "/images/siskanuna_menu1.webp",
  },
  {
    name: "Blouse & Atasan",
    description:
      "Beragam model blouse dan atasan modis dengan bahan nyaman dan desain kekinian.",
    price: "Mulai dari Rp 50.000",
    image: "/images/siskanuna_menu1.webp",
  },
  {
    name: "Hijab & Aksesoris",
    description:
      "Pilihan hijab segi empat, pashmina, dan aksesoris wanita yang stylish dan serasi.",
    price: "Mulai dari Rp 25.000",
    image: "/images/siskanuna_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/siskanuna_galerifoto1.webp",
      "/images/siskanuna_galerifoto2.webp",
      "/images/siskanuna_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "12.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "12.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "12.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "12.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "12.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "12.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: close },
    ],
  },
  {
    id: 10,
    name: "Terebatik",
    slug: "terebatik",
    heroImage: "/images/terebatik_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Terebatik"',
    heroSubtitle:
      "Butik pakaian wanita yang menghadirkan koleksi busana batik modern, elegan, dan nyaman untuk berbagai acara.",
    about:
      "<strong>Terebatik</strong> merupakan butik batik wanita di Kudus yang menawarkan berbagai pilihan busana dengan sentuhan motif batik khas Nusantara. Menggabungkan gaya tradisional dan modern, Terebatik cocok bagi wanita yang ingin tampil anggun dan berkelas.",
    description:
      "Terebatik menyediakan aneka busana batik seperti dress, blouse, outer, hingga setelan kerja dengan bahan berkualitas dan desain kekinian. Cocok untuk acara formal maupun kasual.",
    rating: "5 / 5",
    location: {
      address: "Kayuapu Kulon, Gondangmanis, Kudus",
      fullAddress:
        "Jl. Lkr. Utara Umk No.250, Kayuapu Kulon, Gondangmanis, Kec. Bae, Kabupaten Kudus, Jawa Tengah 59327",
      mapsUrl: "https://maps.app.goo.gl/A6VKPguSi9g3Fr3s8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7753933,110.8660364&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085711556655",
      email: "-",
      instagram: "-",
    },
    menus: [
   {
    name: "Busana Pria",
    description:
      "Koleksi pakaian pria mulai dari kemeja batik, kaos, hingga busana formal dengan desain modern dan bahan berkualitas.",
    price: "Mulai dari Rp 75.000",
    image: "/images/terebatik_menu1.webp",
  },
  {
    name: "Busana Wanita",
    description:
      "Tersedia berbagai pilihan busana wanita seperti gamis, blouse, batik, dan dress elegan untuk berbagai acara.",
    price: "Mulai dari Rp 85.000",
    image: "/images/terebatik_menu1.webp",
  },
  {
    name: "Busana Anak-anak",
    description:
      "Menawarkan pakaian anak-anak dengan motif lucu dan bahan nyaman, cocok untuk aktivitas sehari-hari maupun acara spesial.",
    price: "Mulai dari Rp 50.000",
    image: "/images/terebatik_menu1.webp",
  },
  {
    name: "Aksesori & Pelengkap",
    description:
      "Lengkapi penampilan Anda dengan aksesori seperti sabuk, jilbab, topi, dan tas yang serasi dengan gaya busana pilihan.",
    price: "Mulai dari Rp 20.000",
    image: "/images/terebatik_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/terebatik_galerifoto1.webp",
      "/images/terebatik_galerifoto2.webp",
      "/images/terebatik_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 17.00", isOpen: true },
    ],
  },
  // DAWE
  {
    id: 11,
    name: "Swike Dawe Restaurant",
    slug: "swike-dawe-restaurant",
    heroImage: "/images/swikedawe_hero.webp",
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
        image: "/images/swikedawe_menu1.webp",
      },
      {
        name: "Swike Kuah dan Pepes Telur Kodok",
        description: "Swike kodok kuah tauco dan pepes telur kodok.",
        price: "Rp 50.000",
        image: "/images/swikedawe_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/swikedawe_galerifoto1.webp",
      "/images/swikedawe_galerifoto2.webp",
      "/images/swikedawe_galerifoto3.webp",
      "/images/swikedawe_galerifoto4.webp",
      "/images/swikedawe_galerifoto5.webp",
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
    id:12,
    name: "WEKATE GANK",
    slug: "wekate-gank",
    heroImage: "/images/wekategank_hero.webp",
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
        image: "/images/wekategank_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/wekategank_galerifoto1.webp",
      "/images/wekategank_galerifoto2.webp",
      "/images/wekategank_galerifoto3.webp",
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
    id: 13,
    name: "Rumah Makan Mak Kiyem",
    slug: "rumah-makan-mak-kiyem",
    heroImage: "/images/makkiyem_hero.webp",
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
      whatsapp: "6285640083741",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Pecel",
        description: "Nasi dengan sayur pecel dan lauk pilihan.",
        price: "Rp 7.000",
        image: "/images/makkiyem_menu1.webp",
      },
      {
        name: "Rames Lodeh Bu Kiyem",
        description: "Rames khas Kudus dengan lauk lodeh.",
        price: "Rp 8.000",
        image: "/images/makkiyem_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/makkiyem_galerifoto1.webp",
      "/images/makkiyem_galerifoto2.webp",
      "/images/makkiyem_galerifoto3.webp",
      "/images/makkiyem_galerifoto4.webp",
      "/images/makkiyem_galerifoto5.webp",
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
  {
    id: 14,
    name: "Jasa Angkut & Pasir & Bata Merah Jumbo",
    slug: "jasa-angkut-dan-pasir-bata-merah-jumbo",
    heroImage: "/images/jasaangkut_hero.webp",
    heroTitle:
      'Informasi Lengkap tentang UMKM "Jasa Angkut & Pasir & Bata Merah Jumbo"',
    heroSubtitle:
      "Melayani kebutuhan material bangunan dan pengiriman barang dengan cepat, aman, dan terpercaya.",
    about:
      "<strong>Jasa Angkut & Pasir & Bata Merah Jumbo</strong> merupakan penyedia layanan pengiriman bahan bangunan dan material konstruksi di wilayah Kudus dan sekitarnya. Layanan meliputi pengantaran pasir, bata merah jumbo, serta jasa angkut berbagai kebutuhan proyek secara efisien dan profesional.",
    description:
      "Melayani pengiriman pasir, bata merah jumbo, dan jasa angkut untuk kebutuhan rumah, proyek, maupun toko bangunan dengan harga bersaing dan pelayanan ramah.",
    rating: "5 / 5",
    location: {
      address: "Kutatan, Lau, Kudus",
      fullAddress:
        "7V9G+C2R KUTUTAN, RT.05/RW.7, Kutatan, Lau, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/ue9UszJj8V6UH9C4A",
      embedUrl:
        "https://www.google.com/maps?q=-6.7313946,110.8750102&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Jasa Angkut Pasir",
        description:
          "Layanan pengiriman dan pengangkutan pasir bangunan ke lokasi proyek dengan cepat dan tepat waktu.",
        price: "Rp 150.000",
        image: "/images/jasaangkutdll_menu1.webp",
      },
      {
        name: "Jasa Angkut Bata Merah Jumbo",
        description:
          "Pengiriman bata merah jumbo dalam jumlah besar dengan tenaga profesional dan kendaraan angkut khusus.",
        price: "Rp 120.000",
        image: "/images/jasaangkutdll_menu2.webp",
      },
      {
        name: "Jasa Angkut Pindahan",
        description:
          "Melayani jasa pindahan rumah, kos, maupun kantor dengan kendaraan bak dan tenaga angkut berpengalaman.",
        price: "Rp 250.000",
        image: "/images/jasaangkutdll_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/jasaangkutdll_galerifoto1.webp",
      "/images/jasaangkutdll_galerifoto2.webp",
      "/images/jasaangkutdll_galerifoto3.webp",
      "/images/jasaangkutdll_galerifoto4.webp",
      "/images/jasaangkutdll_galerifoto5.webp",
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
    id: 15,
    name: "Ayam Geprek Sai",
    slug: "ayam-geprek-sai",
    heroImage: "/images/ayamgepreksai_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Ayam Geprek Sai"',
    heroSubtitle:
      "Rasakan sensasi ayam geprek dengan sambal pilihan dan cita rasa khas yang disukai semua kalangan. Cocok untuk makan siang, malam, atau pesanan bersama teman dan keluarga.",
    about:
      "<strong>Ayam Geprek Sai</strong> menyajikan ayam geprek dengan sambal pedas menggoda dan bumbu khas rumahan yang gurih. Setiap potongan ayam digoreng renyah lalu digeprek dengan sambal segar yang bisa disesuaikan tingkat kepedasannya. Kami berkomitmen memberikan rasa terbaik dengan bahan berkualitas dan pelayanan cepat.",
    description:
      "Nikmati ayam geprek renyah dengan sambal pedas yang bisa kamu pilih sendiri tingkatnya. Disajikan dengan nasi hangat dan lauk pendamping, cocok untuk makan di tempat maupun pesan antar. Ayam Geprek Sai Dawe siap jadi pilihan favorit pecinta kuliner pedas di Kudus!",
    rating: "4.3 / 5",
    location: {
      address: "Cendono Wetan, Cendono, Kudus",
      fullAddress:
        "Jl. Raya Kudus - Colo, Cendono Wetan, Cendono, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/xpHHdoKUgjFedBaAA",
      embedUrl:
        "https://www.google.com/maps?q=-6.7439998,110.8634183&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081326425112",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Geprek Paha",
        description:
          "Ayam bagian paha yang digoreng renyah lalu digeprek dengan sambal pedas khas Sai Dawe. Cocok untuk kamu yang suka sensasi gurih dan lembutnya daging ayam.",
        price: "Rp 13.500",
        image: "/images/sai_menu1.webp",
      },
      {
        name: "Paket Geprek 3",
        description:
          "Paket hemat berisi ayam geprek, nasi hangat, sambal pedas, dan lalapan segar. Pilihan pas untuk makan siang atau malam bersama teman dan keluarga.",
        price: "Rp 17.000",
        image: "/images/sai_menu2.webp",
      },
      {
        name: "Nasi Goreng",
        description:
          "Nasi goreng khas Sai Dawe dengan bumbu rumahan gurih, potongan ayam, dan telur. Disajikan hangat dan siap menggugah selera.",
        price: "Rp 14.000",
        image: "/images/sai_menu3.webp",
      },
      {
        name: "Burger",
        description:
          "Roti lembut dengan isian ayam crispy, sayuran segar, dan saus spesial Sai Dawe. Nikmat untuk camilan sore atau makan cepat.",
        price: "Rp 12.000",
        image: "/images/sai_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/sai_galerifoto1.webp",
      "/images/sai_galerifoto2.webp",
      "/images/sai_galerifoto3.webp",
      "/images/sai_galerifoto4.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "9.30 - 21.00", isOpen: true },
      { day: "Selasa", hours: "9.30 - 21.00", isOpen: true },
      { day: "Rabu", hours: "9.30 - 21.00", isOpen: true },
      { day: "Kamis", hours: "9.30 - 21.00", isOpen: true },
      { day: "Jumat", hours: "9.30 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "9.30 - 21.00", isOpen: true },
      { day: "Minggu", hours: "9.30 - 21.00", isOpen: true },
    ],
  },
  {
    id: 16,
    name: "Warung Makan Sendang Mulia",
    slug: "warung-makan-sendang-mulia",
    heroImage: "/images/sendangmulia_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Makan Sendang Mulia"',
    heroSubtitle:
      "Warung makan keluarga di Kudus yang menyajikan aneka masakan rumahan lezat dengan cita rasa khas Jawa.",
    about:
      "<strong>Warung Makan Sendang Mulia</strong> menghadirkan berbagai menu masakan rumahan yang lezat, mulai dari ayam goreng, sayur lodeh, hingga sambal terasi yang menggugah selera. Dikenal dengan rasa autentik dan suasana nyaman, tempat ini menjadi pilihan favorit warga Kudus untuk makan bersama keluarga.",
    description:
      "Warung makan di Kudus dengan sajian masakan rumahan khas Jawa yang enak, terjangkau, dan cocok untuk makan bersama keluarga.",
    rating: "4.5 / 5",
    location: {
      address: "Jl. Raya Kudus, Colo, Kudus",
      fullAddress:
        "Jl. Raya Kudus - Colo, Dawe, Cendono, Kudus, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/ULwtaQN7BWRcuMzL8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7407578,110.8645519&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Aneka Masakan Rumahan",
    description:
      "Menawarkan berbagai hidangan lezat seperti swike, sup ayam, ayam goreng, tumis sayur, dan masakan rumahan lainnya yang disajikan hangat setiap hari.",
    price: "Mulai dari Rp 10.000",
        image: "/images/sendangmulia_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/sendangmulia_galerifoto1.webp",
      "/images/sendangmulia_galerifoto2.webp",
      "/images/sendangmulia_galerifoto3.webp", 
    ],
    openingHours: [
      { day: "Senin", hours: "06.30 - 15.00", isOpen: true },
      { day: "Selasa", hours: "06.30 - 15.00", isOpen: true },
      { day: "Rabu", hours: "06.30 - 15.00", isOpen: true },
      { day: "Kamis", hours: "06.30 - 15.00", isOpen: true },
      { day: "Jumat", hours: "06.30 - 15.00", isOpen: true },
      { day: "Sabtu", hours: "06.30 - 15.00", isOpen: true },
      { day: "Minggu", hours: "06.30 - 15.00", isOpen: true },
    ],
  },
  {
    id: 17,
    name: "Toko ADIB AZKA",
    slug: "toko-adib-azka",
    heroImage: "/images/tokoadibazka_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko ADIB AZKA"',
    heroSubtitle:
      "Toko perlengkapan rumah tangga di Kudus yang menyediakan berbagai kebutuhan dapur, alat kebersihan, dan perlengkapan harian dengan harga terjangkau.",
    about:
      "<strong>Toko ADIB AZKA</strong> adalah toko perlengkapan rumah tangga yang menyediakan berbagai produk kebutuhan sehari-hari, mulai dari peralatan dapur, alat kebersihan, hingga perlengkapan mandi dan laundry. Dengan pelayanan ramah dan harga bersahabat, toko ini menjadi pilihan warga sekitar untuk memenuhi kebutuhan rumah tangga mereka.",
    description:
      "Toko perlengkapan rumah tangga di Kudus dengan berbagai produk kebutuhan harian berkualitas dan harga terjangkau.",
    rating: "4.1 / 5",
    location: {
      address: "Jl. Dawe Puyoh, Madu, Cendono, Kudus",
      fullAddress:
        "7V86+MH3, Jl. Dawe Puyoh, Madu, Cendono, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/EHiDEoXxq29Cif5F9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7333625,110.8614316&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081390381670",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
    name: "Peralatan Dapur",
    description: "Beragam perlengkapan dapur seperti panci, wajan, spatula, dan tempat bumbu dengan kualitas bagus dan harga terjangkau.",
    price: "Mulai dari Rp 10.000",
    image: "/images/adibazka_menu1.webp",
  },
  {
    name: "Peralatan Mandi",
    description: "Tersedia ember, gayung, sikat, dan rak sabun berbagai ukuran dan warna untuk kebutuhan rumah tangga Anda.",
    price: "Mulai dari Rp 5.000",
    image: "/images/adibazka_menu2.webp",
  },
  {
    name: "Tempat Penyimpanan",
    description: "Koleksi toples, kotak makan, dan wadah plastik serbaguna untuk menyimpan makanan atau perlengkapan rumah.",
    price: "Mulai dari Rp 8.000",
    image: "/images/adibazka_menu3.webp",
  },
  {
    name: "Peralatan Kebersihan",
    description: "Sapu, pel, lap microfiber, dan perlengkapan kebersihan lain untuk menjaga rumah tetap bersih dan rapi.",
    price: "Mulai dari Rp 7.000",
    image: "/images/adibazka_menu4.webp",
  },
    ],
    galleryImages: [
      "/images/tokoadib_galerifoto1.webp",
      "/images/tokoadib_galerifoto2.webp",
      "/images/tokoadib_galerifoto3.webp", 
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 20.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 20.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 20.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 20.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 20.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 20.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 20.00", isOpen: true },
    ],
  },
  {
    id: 18,
    name: "Toko Sri Dawe",
    slug: "toko-sri-dawe",
    heroImage: "/images/tokosridawe_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Sri Dawe"',
    heroSubtitle:
  "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan dapur seperti beras, minyak, gula, dan bahan pokok lainnya dengan harga terjangkau.",
about:
  "<strong>Toko ADIB AZKA</strong> merupakan toko bahan makanan yang melayani kebutuhan pokok sehari-hari masyarakat Kudus. Tersedia beragam bahan dapur seperti beras, minyak goreng, telur, tepung, hingga bumbu dapur lengkap. Dengan pelayanan cepat dan harga bersahabat, toko ini menjadi pilihan utama warga sekitar untuk berbelanja kebutuhan rumah tangga.",
description:
  "Toko bahan makanan di Kudus yang menyediakan kebutuhan pokok dan bumbu dapur lengkap dengan harga terjangkau dan kualitas terjamin.",
    rating: "4.8 / 5",
    location: {
      address: " Jl. Dawe - Gebog, Madu, Cendono, Kudus",
      fullAddress:
        "7V77+H5G, Jl. Dawe - Gebog, Madu, Cendono, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/L5VbDsE3YSreAL5E7",
      embedUrl:
        "https://www.google.com/maps?q=-6.7360598,110.8629559&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085641978008",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
    name: "Bahan Pokok & Sembako Lengkap",
    description:
      "Toko Sri Dawe menyediakan berbagai kebutuhan dapur dan bahan pokok sehari-hari seperti beras, gula pasir, minyak goreng, telur ayam, tepung terigu, garam, mie instan, dan aneka bumbu dapur. Semua tersedia dalam berbagai merek dan ukuran, dijamin segar dan berkualitas.",
    price: "Harga mulai dari Rp 2.000 – Rp 150.000 tergantung jenis produk",
    image: "/images/sridawe_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/sridawe_galerifoto1.webp",
      "/images/sridawe_galerifoto2.webp",
      "/images/sridawe_galerifoto3.webp", 
    ],
    openingHours: [
      { day: "Senin", hours: "06.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "06.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "06.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "06.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "06.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "06.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 19,
    name: "Arfan Outfit Kudus",
    slug: "arfan-outfit-kudus",
    heroImage: "/images/arfanoutfitkudus_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Arfan Outfit Kudus"',
    heroSubtitle:
  "Toko pakaian di Kudus yang menyediakan berbagai outfit pria, wanita, dan anak dengan model kekinian dan harga terjangkau.",
about:
  "<strong>Arfan Outfit Kudus</strong> adalah toko pakaian yang menghadirkan beragam busana modern dan nyaman untuk seluruh keluarga. Tersedia pakaian pria, wanita, dan anak-anak, mulai dari kaos, kemeja, celana, gamis, hingga jilbab. Dengan koleksi fashion terkini dan pelayanan ramah, Arfan Outfit Kudus menjadi destinasi favorit warga Kudus untuk berbelanja pakaian.",
description:
  "Toko pakaian di Kudus yang menjual berbagai outfit trendi dan berkualitas untuk segala usia, cocok untuk gaya kasual maupun formal.",
    rating: "4.7 / 5",
    location: {
      address: "Cendono Wetan, Cendono, Kudus",
      fullAddress:
        "Dukuh Kawaan No.RT.02/RW.8, Cendono Wetan, Cendono, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/8wK9Z1e5Vr4A4sFL8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7455582,110.8593985&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085815271237",
      email: "-",
      instagram: "arfanoutfit",
    },
    menus: [
     {
    name: "Gamis Muslimah Modern",
    description: "Gamis polos dan motif elegan berbahan adem cocok untuk acara formal maupun harian.",
    price: "Mulai dari Rp 120.000",
    image: "/images/arfanoutfit_menu1.webp",
  },
  {
    name: "Tunik Wanita",
    description: "Tunik panjang dengan desain kekinian dan potongan longgar, nyaman dipakai seharian.",
    price: "Mulai dari Rp 85.000",
    image: "/images/arfanoutfit_menu1.webp",
  },
  {
    name: "Dress Casual",
    description: "Dress santai berbahan katun dan rayon, cocok untuk hangout atau acara keluarga.",
    price: "Mulai dari Rp 95.000",
    image: "/images/arfanoutfit_menu1.webp",
  },
  {
    name: "Celana Kulot",
    description: "Celana kulot wanita dengan bahan lembut dan potongan lebar, ideal untuk tampilan stylish dan sopan.",
    price: "Mulai dari Rp 75.000",
    image: "/images/arfanoutfit_menu1.webp",
  },
  {
    name: "Hijab Segi Empat & Pashmina",
    description: "Berbagai pilihan hijab segi empat dan pashmina dengan bahan voal dan diamond crepe premium.",
    price: "Mulai dari Rp 35.000",
    image: "/images/arfanoutfit_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/arfanoutfit_galerifoto1.webp",
      "/images/arfanoutfit_galerifoto2.webp",
      "/images/arfanoutfit_galerifoto3.webp", 
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 21.00", isOpen: true },
    ],
  },
  {
    id: 20,
    name: "Dinda Store DS",
    slug: "dinda-store-ds",
    heroImage: "/images/dindastore_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Dinda Store DS"',
    heroSubtitle:
  "Toko pakaian pria di Kudus yang menyediakan berbagai outfit trendi seperti kaos, kemeja, celana jeans, dan tas dengan harga terjangkau.",
about:
  "<strong>Dinda Store DS</strong> merupakan toko pakaian pria di Kudus yang menawarkan berbagai koleksi fashion modern, mulai dari kaos kasual, kemeja formal, hingga celana jeans berkualitas. Selain itu, tersedia juga berbagai tas dan aksesoris pria yang stylish. Dengan harga bersahabat dan pelayanan ramah, toko ini menjadi pilihan favorit pria muda untuk tampil keren setiap hari.",
description:
  "Toko pakaian pria di Kudus yang menyediakan berbagai model kaos, kemeja, jeans, dan tas dengan gaya kekinian dan harga ramah di kantong.",
    rating: "4.4 / 5",
    location: {
      address: "Madu, Cendono, Kudus",
      fullAddress:
        "7V57+HQP, Madu, Cendono, Kec. Dawe, Kabupaten Kudus, Jawa Tengah 59353",
      mapsUrl: "https://maps.app.goo.gl/W6KEczhYtsvqniU7A",
      embedUrl:
        "https://www.google.com/maps?q=-6.7410438,110.8644447&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085878702301",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
    name: "Kaos Pria Kasual",
    description: "Kaos pria berbahan katun lembut dengan berbagai desain trendi dan nyaman dipakai harian.",
    price: "Mulai dari Rp 60.000",
    image: "/images/dindastore_menu1.webp",
  },
  {
    name: "Kemeja Pria",
    description: "Kemeja polos dan motif dengan potongan slim fit, cocok untuk acara santai maupun formal.",
    price: "Mulai dari Rp 95.000",
    image: "/images/dindastore_menu2.webp",
  },
  {
    name: "Celana Jeans Pria",
    description: "Jeans pria dengan bahan tebal dan fleksibel, tersedia berbagai warna dan ukuran.",
    price: "Mulai dari Rp 130.000",
    image: "/images/dindastore_menu3.webp",
  },
  {
    name: "Tas Selempang Pria",
    description: "Tas selempang kecil untuk gaya kasual, cocok untuk kegiatan sehari-hari.",
    price: "Mulai dari Rp 85.000",
    image: "/images/dindastore_menu4.webp",
  },
    ],
    galleryImages: [
      "/images/dindastore_galerifoto1.webp",
      "/images/dindastore_galerifoto2.webp",
      "/images/dindastore_galerifoto3.webp", 
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 21.00", isOpen: true },
    ],
  },
  // GEBOG
  {
    id: 21,
    name: "Warung Makan Mbah Sapar",
    slug: "warung-makan-mbah-sapar",
    heroImage: "/images/mbahsapar_hero.webp",
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
        image: "/images/mbahsapar_menu1.webp",
      },
      {
        name: "Nasi Pecel",
        description: "Nasi dengan sayur pecel dan lauk pilihan.",
        price: "Rp 7.000",
        image: "/images/mbahsapar_menu2.webp",
      },
      {
        name: "Aneka Jamu",
        description: "Berbagai minuman jamu tradisional segar.",
        price: "Mulai Rp 5.000",
        image: "/images/mbahsapar_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/mbahsapar_galerifoto1.webp",
      "/images/mbahsapar_galerifoto2.webp",
      "/images/mbahsapar_galerifoto3.webp",
      "/images/mbahsapar_galerifoto4.webp",
      "/images/mbahsapar_galerifoto5.webp",
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
    id: 22,
    name: "Nasi Uduk dan Nasi Kuning Gang Satu",
    slug: "nasi-uduk-dan-nasi-kuning-gang-satu",
    heroImage: "/images/nasiuduk_hero.webp",
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
      whatsapp: "6285866665024",
      email: "-",
      instagram: "nasi_uduk_gang_satu",
    },
    menus: [
      {
        name: "Nasi Uduk",
        description: "Nasi uduk dengan lauk pilihan dan sambal khas.",
        price: "Rp 8.000",
        image: "/images/nasiuduk_menu1.webp",
      },
      {
        name: "Nasi Kuning",
        description: "Nasi kuning dengan lauk lengkap dan sambal terasi.",
        price: "Rp 10.000",
        image: "/images/nasiuduk_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/nasiuduk_galerifoto1.webp",
      "/images/nasiuduk_galerifoto2.webp",
      "/images/nasiuduk_galerifoto3.webp",
      "/images/nasiuduk_galerifoto4.webp",
      "/images/nasiuduk_galerifoto5.webp",
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
  {
    id: 23,
    name: "Sari Rasa Bakso Malvinas",
    slug: "sari-rasa-bakso-malvinas",
    heroImage: "/images/baksomalvinas_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Sari Rasa Bakso Malvinas"',
    heroSubtitle:
      "Nikmati kelezatan bakso khas Kudus dengan kuah gurih, daging pilihan, dan cita rasa yang selalu bikin rindu.",
    about:
      "<strong>Sari Rasa Bakso Malvinas</strong> merupakan kedai bakso favorit warga Kudus yang dikenal dengan kuah kaldunya yang gurih dan bakso daging sapi yang kenyal. Disajikan dengan mie, tahu, dan pangsit, menciptakan kombinasi rasa yang pas untuk semua kalangan. Tempat nyaman dan pelayanan ramah membuat pelanggan betah untuk datang kembali.",
    description:
      "Bakso dengan kuah gurih dan daging sapi pilihan, disajikan hangat bersama mie, tahu, dan pangsit. Cocok dinikmati kapan saja, terutama saat ingin hidangan yang mengenyangkan dan lezat. Sari Rasa Bakso Malvinas siap memanjakan lidah pecinta bakso di Kudus!",
    rating: "4.5 / 5",
    location: {
      address: "Besito Kulon, Besito, Kudus",
      fullAddress:
        "6RWR+JX4, Gg. 10, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/QwkKRJxymL6xbqU38",
      embedUrl:
        "https://www.google.com/maps?q=-6.7534796,110.8424666&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Bakso Urat",
        description:
          "Bakso sapi dengan urat kenyal, kuah gurih, dan taburan bawang goreng yang menggugah selera.",
        price: "Rp 16.000",
        image: "/images/malvinas_menu1.webp",
      },
      {
        name: "Mie Bakso",
        description:
          "Perpaduan mie kenyal dengan bakso sapi dan kuah kaldu hangat yang lezat.",
        price: "Rp 15.000",
        image: "/images/malvinas_menu2.webp",
      },
      {
        name: "Es Jeruk",
        description:
          "Minuman segar dari perasan jeruk asli, cocok untuk menemani hidangan panasmu.",
        price: "Rp 5.000",
        image: "/images/malvinas_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/malvinas_galerifoto1.webp",
      "/images/malvinas_galerifoto2.webp",
      "/images/malvinas_galerifoto3.webp",
      "/images/malvinas_galerifoto4.webp",
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
  {
    id: 24,
    name: "Warung Makan Mak Ru",
    slug: "warung-makan-mak-ru",
    heroImage: "/images/warungmakanmakru_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Makan Mak Ru"',
    heroSubtitle:
      "Sajian masakan rumahan khas Kudus dengan cita rasa autentik, harga terjangkau, dan porsi yang memuaskan. Cocok untuk makan siang maupun santai bersama keluarga.Sajian masakan rumahan khas Kudus dengan cita rasa autentik, harga terjangkau, dan porsi yang memuaskan. Cocok untuk makan siang maupun santai bersama keluarga.",
    about:
      "<strong>Warung Makan Mak Ru</strong> dikenal dengan hidangan rumahan lezat seperti sayur lodeh, tempe goreng, ayam opor, dan berbagai lauk khas Jawa yang menggugah selera. Semua masakan dimasak dengan bumbu tradisional dan disajikan hangat, menciptakan rasa seperti masakan ibu di rumah. Pelayanan ramah dan suasana sederhana membuat pelanggan merasa nyaman dan betah.",
    description:
      "BakNikmati berbagai pilihan masakan rumahan khas Kudus di Warung Makan Mak Ru. Mulai dari sayur, lauk pauk, hingga sambal pedas yang selalu menggoda selera. Cocok untuk makan bersama keluarga, teman, atau sekadar menikmati hidangan hangat di suasana yang akrab dan bersahaja.",
    rating: "4.4 / 5",
    location: {
      address: "Besito Kulon, Besito, Kudus",
      fullAddress:
        "Jl. Raya PR Sukun No.3, RT.04/RW.05, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/uCznwk5qkJk1pxnZ8",
      embedUrl:
        "https://www.google.com/maps?q=-6.7548677,110.8432437&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "082135312131",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Nasi Pindang Kerbau",
        description:
          "Hidangan khas Kudus dengan kuah rempah pekat dan irisan daging kerbau empuk, disajikan bersama nasi hangat dan bawang goreng.",
        price: "Rp 18.000",
        image: "/images/makru_menu1.webp",
      },
      {
        name: "Nasi Rames Telur",
        description:
          "Nasi dengan lauk telur, sayur lodeh, sambal pedas, dan tambahan tempe goreng khas rumahan.",
        price: "Rp 15.000",
        image: "/images/makru_menu2.webp",
      },
      {
        name: "Nasi Sop",
        description:
          "Nasi putih hangat disajikan dengan sop ayam berkuah bening gurih berisi wortel, kentang, dan daun seledri segar.",
        price: "Rp 14.000",
        image: "/images/makru_menu3.webp",
      },
      {
        name: "Gorengan",
        description:
          "Aneka gorengan renyah seperti tempe, tahu isi, bakwan, dan mendoan yang digoreng hangat setiap hari.",
        price: "Rp 2.000/pcs",
        image: "/images/makru_menu4.webp",
      },
      {
        name: "Lalapan",
        description:
          "Lalapan segar berisi timun, kol, kemangi, dan sambal terasi pedas yang menambah selera makan.",
        price: "Rp 5.000",
        image: "/images/makru_menu5.webp",
      },
      {
        name: "Tempe Ayam Lele Jeroan",
        description:
          "Pilihan lauk lengkap — mulai dari ayam goreng, lele, tempe, hingga jeroan yang dibumbui dengan cita rasa khas rumahan.",
        price: "Rp 10.000 - Rp 18.000",
        image: "/images/makru_menu6.webp",
      },
    ],
    galleryImages: [
      "/images/makru_galerifoto1.webp",
      "/images/makru_galerifoto2.webp",
      "/images/makru_galerifoto3.webp",
      "/images/makru_galerifoto4.webp",
      "/images/makru_galerifoto5.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "Tutup", isOpen: close },
      { day: "Selasa", hours: "06.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "06.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "06.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "06.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "06.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 25,
    name: "Kasehito Works",
    slug: "kasehito-works",
    heroImage: "/images/kasehitoworks_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Kasehito Works"',
    heroSubtitle:
      "Membantu kamu mengubah ide menjadi video menarik dengan sentuhan kreatif dan hasil berkualitas tinggi. Cocok untuk konten bisnis, event, YouTube, hingga media sosial.",
    about:
      "<strong>Kasehito Works</strong> merupakan penyedia jasa pengeditan video yang berfokus pada hasil berkualitas dan visual storytelling yang kuat. Kami melayani berbagai kebutuhan editing, mulai dari video promosi, dokumentasi acara, konten YouTube, hingga video sinematik. Dengan teknik editing modern dan pemahaman estetika visual, kami siap membantu kamu menciptakan karya yang menarik dan berkesan.",
    description:
      "Layanan Kasehito Works mencakup pemotongan video, color grading, motion graphic, sound design, dan penyesuaian efek visual sesuai kebutuhan klien. Setiap proyek dikerjakan dengan detail dan komunikasi yang terbuka agar hasil akhir sesuai harapan. Cocok bagi bisnis, kreator, maupun individu yang ingin tampil lebih profesional melalui video berkualitas.",
    rating: "3.3 / 5",
    location: {
      address: "Besito Kulon, Besito, Kudus",
      fullAddress:
        "6RWV+X93, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/7KiT1EDEoMcAuoG8A",
      embedUrl:
        "https://www.google.com/maps?q=-6.7525493,110.8434053&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Jasa Pengeditan Video",
        description:
          "Layanan profesional untuk mengedit video promosi, konten media sosial, vlog, atau proyek kreatif dengan hasil rapi dan menarik. Menyediakan efek, transisi, color grading, serta penyesuaian musik sesuai kebutuhan klien.",
        price: "Rp 100.000",
        image: "/images/kasehito_menu1.webp",
      },
    ],
    galleryImages: ["/images/kasehito_menu1.webp"],
    openingHours: [
      { day: "Senin", hours: "09.00 - 18.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 18.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 18.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 18.00", isOpen: true },
      { day: "Jumat", hours: "13.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "Tutup", isOpen: close },
      { day: "Minggu", hours: "Tutup", isOpen: close },
    ],
  },
  {
    id: 26,
    name: "Basina Food",
    slug: "basina-food",
    heroImage: "/images/basina_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Basina Food"',
    heroSubtitle:
  "Rumah makan di Kudus yang menyajikan aneka masakan rumahan dan lauk pauk lezat dengan cita rasa khas Jawa, cocok untuk makan siang maupun acara keluarga.",
about:
  "<strong>Basina Food</strong> merupakan rumah makan yang menghadirkan berbagai menu masakan rumahan dengan cita rasa autentik dan bahan-bahan segar. Tersedia beragam lauk seperti ayam goreng, ikan bakar, sayur asem, sambal terasi, dan berbagai pilihan minuman segar. Dengan suasana nyaman dan pelayanan ramah, Basina Food menjadi pilihan favorit warga Kudus untuk menikmati hidangan sehari-hari maupun acara keluarga.",
description:
  "Rumah makan di Kudus yang menyediakan beragam menu masakan rumahan khas Jawa dengan rasa lezat dan harga bersahabat.",
    rating: "4.0 / 5",
    location: {
      address: "Besito Kulon, Besito, Kudus",
      fullAddress:
        "Jl. Bae-Besito No.82, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/yJafRVMStEDkHr2WA",
      embedUrl:
        "https://www.google.com/maps?q=-6.754658,110.8432598&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "085710221752",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
         name: "Aneka Masakan Rumahan Basina Food",
    description:
      "Nikmati berbagai pilihan menu rumahan seperti nasi goreng, ayam geprek, ayam bali, sayur lodeh, dan lauk pauk lainnya yang dimasak setiap hari dengan bahan segar dan cita rasa khas Basina Food.",
    price: "Mulai dari Rp 1.000 - Rp 25.000",
    image: "/images/basina_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/basina_galerifoto1.webp",
      "/images/basina_galerifoto2.webp",
      "/images/basina_galerifoto3.webp"
    ],
    openingHours: [
      { day: "Senin", hours: "11.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "11.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "11.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "11.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "11.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "11.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "11.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 27,
    name: "Campaign Coffee",
    slug: "campaign-coffee",
    heroImage: "/images/campaigncoffee_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Campaign Coffee"',
    heroSubtitle:
  "Kedai kopi di Kudus yang menyajikan berbagai pilihan kopi dan minuman kekinian seperti espresso, latte, dan teh dengan suasana nyaman untuk bersantai atau bekerja.",
about:
  "<strong>Campaign Coffee</strong> merupakan kedai kopi modern di Kudus yang menjadi tempat favorit bagi pecinta kopi dan penikmat suasana santai. Menyediakan berbagai jenis kopi mulai dari espresso, cappuccino, latte, hingga minuman manual brew seperti V60 dan tubruk. Selain kopi, tersedia juga aneka minuman non-kopi seperti teh, cokelat, dan minuman dingin lainnya. Dengan interior estetik dan pelayanan ramah, Campaign Coffee menjadi destinasi pas untuk nongkrong, bekerja, atau sekadar menikmati secangkir kopi hangat.",
description:
  "Kedai kopi di Kudus yang menghadirkan berbagai varian kopi dan minuman non-kopi dengan cita rasa khas dan suasana nyaman.",
    rating: "5 / 5",
    location: {
      address: "Besito Kulon, Besito, Kudus",
      fullAddress:
        "Jl. Besito - Gebog No.80-516, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/pbjVtizNTBJtTfF29",
      embedUrl:
        "https://www.google.com/maps?q=-6.7538461,110.842404&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "082225556116",
      email: "-",
      instagram: "campaigncoffee",
    },
    menus: [
      {
         name: "Kopi & Minuman Spesial Campaign Coffee",
    description:
      "Nikmati beragam pilihan kopi seperti espresso, cappuccino, latte, dan manual brew, serta minuman non-kopi seperti teh lemon, matcha latte, dan cokelat dingin yang cocok untuk menemani waktu santaimu.",
    price: "Mulai dari Rp 13.000",
    image: "/images/campaigncoffee_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/campaigncoffee_galerifoto1.webp",
      "/images/campaigncoffee_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "Tutup", isOpen: close },
      { day: "Selasa", hours: "09.00 - 23.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 23.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 23.00", isOpen: true },
      { day: "Jumat", hours: "13.00 - 23.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 23.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 23.00", isOpen: true },
    ],
  },
  {
    id: 28,
    name: "Toko TNA JAYA",
    slug: "toko-tna-jaya",
    heroImage: "/images/tokotnajaya_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko TNA JAYA"',
    heroSubtitle:
  "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan dapur, mulai dari sembako, bumbu dapur, hingga makanan ringan dengan harga terjangkau dan kualitas terjamin.",
about:
  "<strong>Toko TNA JAYA</strong> merupakan toko bahan makanan yang telah lama melayani masyarakat Kudus dengan menyediakan berbagai kebutuhan dapur dan rumah tangga. Di sini tersedia beragam produk seperti beras, minyak goreng, gula, tepung, bumbu masak, mie instan, serta aneka makanan ringan dan minuman. Dengan pelayanan yang ramah dan harga yang kompetitif, TNA JAYA menjadi pilihan utama bagi warga sekitar untuk berbelanja kebutuhan sehari-hari.",
description:
  "Toko bahan makanan lengkap di Kudus yang menawarkan sembako, bumbu dapur, makanan ringan, dan berbagai produk rumah tangga lainnya dengan harga terjangkau dan pelayanan cepat.",
    rating: "5 / 5",
    location: {
      address: "Karang Rejosari, Jurang, Gebog, Kudus",
      fullAddress:
        "Jln.Raya Pasar Pon No.8 Teloyo, Karang Rejosari, Jurang, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59534",
      mapsUrl: "https://maps.app.goo.gl/M5NYKMMuk82wp8TC6",
      embedUrl:
        "https://www.google.com/maps?q=-6.738939,110.8475491&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
          name: "Bahan Bahan Makanan",
  description:
    "Menjual berbagai bahan makanan pokok seperti beras, gula, minyak goreng, tepung, dan bumbu dapur lengkap untuk kebutuhan rumah tangga.",
  price: "Mulai dari Rp 5.000",
  image: "/images/tokotnajaya_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/tokotnajaya_menu1.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 23.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 29,
    name: "Toko Teguh Sudarsono",
    slug: "toko-teguh-sudarsono",
    heroImage: "/images/tokoteguhsudarsono_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Teguh Sudarsono"',
     heroSubtitle:
    "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan dapur, mulai dari sembako, bumbu dapur, hingga makanan ringan dengan harga terjangkau dan kualitas terjamin.",
  about:
    "<strong>Toko Teguh Sudarsono</strong> merupakan toko bahan makanan yang telah lama melayani masyarakat Kudus dengan menyediakan berbagai kebutuhan dapur dan rumah tangga. Di sini tersedia beragam produk seperti beras, minyak goreng, gula, tepung, bumbu masak, mie instan, serta aneka makanan ringan dan minuman. Dengan pelayanan yang ramah dan harga yang kompetitif, toko ini menjadi pilihan utama bagi warga sekitar untuk berbelanja kebutuhan sehari-hari.",
  description:
    "Toko bahan makanan lengkap di Kudus yang menawarkan sembako, bumbu dapur, dan berbagai kebutuhan pokok dengan harga terjangkau dan pelayanan cepat.",
    rating: "4.8 / 5",
    location: {
      address: "Sendang, Klontong, Kedungsari, Gebog, Kudus",
      fullAddress:
        "7RCQ+FHF, Unnamed Road, Sendang, Klontong, Kedungsari, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/kLNwWUCdDHjMk21h6",
      embedUrl:
        "https://www.google.com/maps?q=-6.7288052,110.838917&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085641510768",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
         name: "Kebutuhan Dapur Lengkap",
    description:
      "Menyediakan berbagai kebutuhan dapur seperti minyak goreng, tepung, garam, kecap, dan saus. Semua tersedia dalam berbagai ukuran kemasan untuk keperluan rumah tangga maupun usaha kecil.",
    price: "Mulai dari Rp 3.000",
    image: "/images/tokoteguh_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/tokoteguh_galerifoto1.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: close },
    ],
  },
  {
    id: 30,
    name: "Nilna Dion Collection",
    slug: "nilna-dion-collection",
    heroImage: "/images/nilnadioncollection_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Nilna Dion Collection"',
    heroSubtitle:
  "Butik pakaian muslim wanita di Kudus yang menyediakan berbagai busana syar’i, gamis, hijab, dan outfit elegan dengan model kekinian serta harga terjangkau.",
about:
  "<strong>Nilna Dion Collection</strong> adalah butik fashion muslim wanita di Kudus yang menghadirkan koleksi busana syar’i, gamis modern, tunik, dan hijab dengan desain yang anggun dan nyaman dikenakan. Mengutamakan kualitas bahan dan keanggunan gaya, butik ini menjadi pilihan bagi para wanita muslimah yang ingin tampil modis namun tetap sopan. Pelayanan ramah dan koleksi yang selalu up-to-date membuat Nilna Dion Collection semakin digemari pelanggan.",
description:
  "Butik pakaian muslim wanita di Kudus yang menawarkan berbagai pilihan gamis, hijab, dan busana syar’i bergaya modern dengan kualitas unggul dan harga bersahabat.",
    rating: "4.3 / 5",
    location: {
      address: "Bonalas, Besito, Kudus",
      fullAddress:
        "6RWM+FF4, Jl. Raya Tulis - Prambatan, Bonalas, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/kGpcz3gCbyVy2nvo7",
      embedUrl:
        "https://www.google.com/maps?q=-6.7538742,110.8336916&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085713223054",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
         name: "Busana Muslim & Fashion Wanita",
    description:
      "Menawarkan berbagai koleksi busana muslim modern seperti gamis, tunik, hijab, dress, dan atasan wanita dengan desain elegan dan bahan berkualitas. Cocok untuk kegiatan sehari-hari maupun acara spesial.",
    price: "Mulai dari Rp 75.000",
    image: "/images/nilnadion_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/nilnadion_galerifoto1.webp",
      "/images/nilnadion_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 20.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 20.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 20.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 20.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 20.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 20.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 20.00", isOpen: true },
    ],
  },
  {
    id: 31,
    name: "Toko Kastimah",
    slug: "toko-kastimah",
    heroImage: "/images/tokokastimah_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Kastimah"',
    heroSubtitle:
  "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan pokok, mulai dari beras, minyak, gula, hingga bumbu dapur dengan harga terjangkau dan kualitas terjamin.",
about:
  "<strong>Toko Kastimah</strong> merupakan toko bahan makanan yang melayani masyarakat Kudus dengan menyediakan berbagai kebutuhan dapur sehari-hari. Di sini tersedia beragam produk seperti beras, tepung, minyak goreng, mie instan, gula, kopi, teh, hingga makanan ringan. Dengan pelayanan ramah dan harga bersahabat, Toko Kastimah menjadi tempat belanja favorit warga sekitar untuk memenuhi kebutuhan rumah tangga.",
description:
  "Toko bahan makanan lengkap di Kudus yang menyediakan sembako, bumbu dapur, dan berbagai kebutuhan rumah tangga dengan harga terjangkau dan pelayanan cepat.",
    rating: "4.3 / 5",
    location: {
      address: " Menawan, Besito, Kudus",
      fullAddress:
        "Jln, Menawan, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333",
      mapsUrl: "https://maps.app.goo.gl/dxjAfcpW1KTwqKYD9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7067356,110.8498584&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
         name: "Sembako & Bumbu Dapur",
    description:
      "Toko Kastimah menyediakan berbagai bahan pokok seperti beras, gula pasir, minyak goreng, tepung, garam, serta aneka bumbu dapur seperti bawang merah, bawang putih, cabai, dan ketumbar. Cocok untuk kebutuhan rumah tangga maupun warung makan.",
    price: "Mulai dari Rp 2.000",
    image: "/images/tokokastimah_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/tokokastimah_galerifoto1.webp",
      "/images/tokokastimah_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "05.00 - 20.00", isOpen: true },
      { day: "Selasa", hours: "05.00 - 20.00", isOpen: true },
      { day: "Rabu", hours: "05.00 - 20.00", isOpen: true },
      { day: "Kamis", hours: "05.00 - 20.00", isOpen: true },
      { day: "Jumat", hours: "05.00 - 20.00", isOpen: true },
      { day: "Sabtu", hours: "05.00 - 20.00", isOpen: true },
      { day: "Minggu", hours: "05.00 - 20.00", isOpen: true },
    ],
  },
  // JATI
  {
    id: 32,
    name: "Cakrawala Sego Sambel",
    slug: "cakrawala-sego-sambel",
    heroImage: "/images/cakrawala_hero.webp",
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
      whatsapp: "628562765946",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Ayam Goreng",
        description: "Ayam kampung goreng dengan sambal khas Kudus.",
        price: "Rp 23.000",
        image: "/images/cakrawala_menu1.webp",
      },
      {
        name: "Lele Bakar",
        description: "Lele bakar dengan sambal khas Kudus.",
        price: "Rp 10.000",
        image: "/images/cakrawala_menu2.webp",
      },
      {
        name: "Bebek Goreng",
        description: "Bebek goreng dengan sambal khas Kudus.",
        price: "Rp 25.000",
        image: "/images/cakrawala_menu3.webp",
      },
      {
        name: "Ayam Bakar",
        description: "Ayam bakar dengan sambal khas Kudus.",
        price: "Rp 23.000",
        image: "/images/cakrawala_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/cakrawala_galerifoto1.webp",
      "/images/cakrawala_galerifoto2.webp",
      "/images/cakrawala_galerifoto3.webp",
      "/images/cakrawala_galerifoto4.webp",
      "/images/cakrawala_galerifoto5.webp",
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
  {
    id: 33,
    name: "Nasi Opor Sunggingan",
    slug: "nasi-opor-sunggingan",
    heroImage: "/images/oporsungginan_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Nasi Opor Sunggingan"',
    heroSubtitle:
      "Nikmati sajian nasi opor dengan kuah santan gurih, ayam empuk, dan cita rasa tradisional yang autentik khas Kudus.",
    about:
      "<strong>Nasi Opor Sunggingan</strong> merupakan salah satu kuliner khas Kudus yang terkenal dengan opor ayamnya yang gurih dan lembut. Disajikan bersama nasi putih hangat, sambal, dan pelengkap lainnya, menciptakan cita rasa khas yang selalu dirindukan pelanggan. Dimasak dengan bumbu tradisional turun-temurun, menjadikan setiap suapan penuh kelezatan rumahan.",
    description:
      "Nasi opor ayam dengan kuah santan gurih dan bumbu rempah pilihan, disajikan hangat bersama nasi putih, sambal, dan lauk tambahan. Cocok untuk sarapan, makan siang, maupun santapan keluarga di setiap kesempatan. Nasi Opor Sunggingan siap memanjakan lidah pecinta kuliner khas Kudus!",
    rating: "4.5 / 5",
    location: {
      address: "Plosokrajan, Ploso, Kudus",
      fullAddress:
        "Jl. Niti Semito No.9, Plosokrajan, Ploso, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59348",
      mapsUrl: "https://maps.app.goo.gl/5c1AXkGtvFzzf37e9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8141086,110.830343&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085641756023",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Nasi Opor Bakar",
        description: "Ayam kampung goreng dengan sambal khas Kudus.",
        price: "Rp 19.000",
        image: "/images/opor_menu1.webp",
      },
      {
        name: "Ceker",
        description: "Lele bakar dengan sambal khas Kudus.",
        price: "Rp 12.000",
        image: "/images/opor_menu2.webp",
      },
      {
        name: "Garang Asem",
        description: "Bebek goreng dengan sambal khas Kudus.",
        price: "Rp 35.000",
        image: "/images/opor_menu3.webp",
      },
      {
        name: "Nasi Opor Sunggingan",
        description: "Ayam bakar dengan sambal khas Kudus.",
        price: "Rp 23.000",
        image: "/images/opor_menu4.webp",
      },
      {
        name: "Nasi Opor Ayam Panggang",
        description: "Ayam bakar dengan sambal khas Kudus.",
        price: "Rp 29.000",
        image: "/images/opor_menu5.webp",
      },
      {
        name: "Opor Ayam Sunggingan",
        description: "Ayam bakar dengan sambal khas Kudus.",
        price: "Rp 25.000",
        image: "/images/opor_menu6.webp",
      },
      {
        name: "Kerupuk Udang",
        description: "Ayam bakar dengan sambal khas Kudus.",
        price: "Rp 7.000",
        image: "/images/opor_menu7.webp",
      },
    ],
    galleryImages: [
      "/images/opor_galerifoto1.webp",
      "/images/opor_galerifoto2.webp",
      "/images/opor_galerifoto3.webp",
      "/images/opor_galerifoto4.webp",
      "/images/opor_galerifoto5.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "06.00 - 14.00", isOpen: true },
      { day: "Selasa", hours: "06.00 - 14.00", isOpen: true },
      { day: "Rabu", hours: "06.00 - 14.00", isOpen: true },
      { day: "Kamis", hours: "06.00 - 14.00", isOpen: true },
      { day: "Jumat", hours: "06.00 - 14.00", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 14.00", isOpen: true },
      { day: "Minggu", hours: "06.00 - 14.00", isOpen: true },
    ],
  },
  {
    id: 34,
    name: "Warung Enthog Pak Badi",
    slug: "warung-enthog-pak-badi",
    heroImage: "/images/enthogpakbadi_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Enthog Pak Badi"',
    heroSubtitle:
      "Rasakan kelezatan daging enthog empuk dengan bumbu rempah khas Jawa, disajikan dengan nasi hangat dan sambal pedas yang menggugah selera.",
    about:
      "<strong>Warung Enthog Pak Badi</strong> merupakan kuliner legendaris di Kudus yang terkenal dengan olahan enthog (entok) berbumbu rempah kuat dan cita rasa khas rumahan. Daging enthog yang empuk dimasak perlahan dengan santan gurih dan bumbu tradisional, menghasilkan rasa kaya dan lezat di setiap suapan. Suasana warung yang sederhana serta pelayanan ramah membuat pelanggan selalu ingin kembali.",
    description:
      "Nikmati kelezatan daging enthog yang dimasak dengan santan gurih dan rempah pilihan di Warung Enthog Pak Badi. Disajikan dengan nasi hangat, sambal, dan lalapan segar, cocok untuk pecinta kuliner pedas dan tradisional. Warung Enthog Pak Badi menjadi pilihan tepat untuk menikmati cita rasa khas Kudus yang otentik dan memanjakan lidah.",
    rating: "4.6 / 5",
    location: {
      address: "Murai, Pasuruhan Lor, Kudus",
      fullAddress:
        "5RMF+7CR, Jl. Ganesa Gg. Murai, Pasuruhan Lor, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59349",
      mapsUrl: "https://maps.app.goo.gl/F1kR2vsyPVpCNh9j9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8167599,110.8235253&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "08562707781",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Tongseng Entog",
        description:
          "Potongan daging entog empuk dimasak dengan bumbu rempah khas Jawa dan kuah tongseng gurih pedas yang menggugah selera.",
        price: "Rp 25.000",
        image: "/images/pakbadi_menu1.webp",
      },
      {
        name: "Entog Goreng",
        description:
          "Daging entog digoreng hingga renyah di luar namun tetap lembut di dalam, disajikan dengan sambal terasi dan nasi hangat.",
        price: "Rp 23.000",
        image: "/images/pakbadi_menu2.webp",
      },
      {
        name: "Entog Bumbu Sate",
        description:
          "Olahan entog dengan bumbu sate manis gurih, dibakar perlahan hingga meresap sempurna dan beraroma sedap.",
        price: "Rp 30.000",
        image: "/images/pakbadi_menu3.webp",
      },
      {
        name: "Tongseng Enthok Pak Badi",
        description:
          "Menu andalan Pak Badi! Daging entog dimasak dengan kuah tongseng kental penuh rempah dan sedikit pedas, bikin nagih di setiap suapan.",
        price: "Rp 27.000",
        image: "/images/pakbadi_menu4.webp",
      },
      {
        name: "Tong Seng Kepala Entok",
        description:
          "Kepala entog dimasak dengan kuah tongseng berbumbu pekat, cocok untuk pecinta rasa gurih dan kuat khas masakan tradisional Kudus.",
        price: "Rp 28.000",
        image: "/images/pakbadi_menu5.webp",
      },
    ],
    galleryImages: [
      "/images/pakbadi_galerifoto1.webp",
      "/images/pakbadi_galerifoto2.webp",
      "/images/pakbadi_galerifoto3.webp",
      "/images/pakbadi_galerifoto4.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 14.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 14.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 14.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 14.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 14.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 14.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: close },
    ],
  },
  {
    id: 35,
    name: "Jasa Powder Coating & Platting Kudus",
    slug: "jasa-powder-coating-dan-platting-kudus",
    heroImage: "/images/powdercoating_hero.webp",
    heroTitle:
      'Informasi Lengkap tentang UMKM "Jasa Powder Coating & Platting Kudus"',
    heroSubtitle:
      "Layanan pengecatan dan pelapisan logam dengan hasil rapi, kuat, dan tahan karat. Cocok untuk komponen otomotif, furniture, hingga industri.",
    about:
      "<strong>Jasa Powder Coating & Platting Kudus</strong> adalah solusi lengkap untuk kebutuhan finishing logam berkualitas premium di Kudus dan sekitarnya. Kami mengkhususkan diri dalam <em>powder coating</em> dan <em>chrome plating</em> menggunakan teknologi modern serta bahan baku impor yang ramah lingkungan. Proses pelapisan dilakukan di fasilitas berstandar industri dengan kontrol kualitas ketat pada setiap tahap — mulai dari pembersihan permukaan (sandblasting), aplikasi cat bubuk elektrostatis, hingga pengeringan di oven suhu tinggi (180–200°C) untuk hasil lapisan yang sempurna, merata, dan tahan lama. Kami melayani berbagai jenis material logam seperti besi, aluminium, stainless steel, hingga kuningan, untuk beragam aplikasi: spare part motor & mobil, rangka mebel, komponen mesin, pagar, aksesoris interior, hingga barang custom sesuai desain Anda. Dengan pengalaman lebih dari 10 tahun, tim teknisi tersertifikasi, dan jaminan ketahanan terhadap karat, panas, serta benturan, kami siap memberikan hasil akhir yang tidak hanya estetis, tetapi juga fungsional dan bernilai investasi jangka panjang. Hubungi kami sekarang untuk konsultasi gratis dan penawaran khusus!",
    description:
      "Percayakan finishing logam Anda pada Jasa Powder Coating & Platting Kudus. Spesialis powder coating & chrome plating dengan hasil halus, tahan karat, dan warna custom. Cocok untuk otomotif, industri, dan rumah tangga.",
    rating: "5 / 5",
    location: {
      address: "Plosokrajan, Ploso, Kudus",
      fullAddress:
        "Jl. Kulon Asem No.RT.003, RT.04/RW.002, Plosokrajan, Ploso, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59348",
      mapsUrl: "https://maps.app.goo.gl/t4doYbNsLBKf1mWA8",
      embedUrl:
        "https://www.google.com/maps?q=-6.81532,110.8273077&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "082133222004",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Jasa Powder Coating",
        description:
          "Layanan pengecatan logam dengan teknologi powder coating berkualitas tinggi yang tahan lama, halus, dan anti karat. Cocok untuk velg, rangka motor, pagar, dan komponen industri.",
        price: "Rp 100.000",
        image: "/images/coating_menu1.webp",
      },
      {
        name: "Jasa Chrome Platting",
        description:
          "Proses pelapisan logam dengan efek chrome mengkilap yang elegan. Ideal untuk aksesoris motor, mobil, dan peralatan logam agar tampak baru dan mewah.",
        price: "Rp 150.000",
        image: "/images/coating_menu2.webp",
      },
      {
        name: "Repaint & Refinishing",
        description:
          "Perbaikan warna dan finishing ulang pada permukaan logam yang kusam atau terkelupas agar kembali mulus dan tampak seperti baru.",
        price: "Rp 80.000",
        image: "/images/coating_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/coating_galerifoto1.webp",
      "/images/coating_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 16.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 16.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 16.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 16.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: close },
    ],
  },
  {
    id: 36,
    name: "Kedai Es Bang Maman",
    slug: "kedai-es-bang-maman",
    heroImage: "/images/esbangmaman_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Kedai Es Bang Maman"',
    heroSubtitle:
      "Nikmati kesegaran berbagai varian es buatan Bang Maman, dari es campur, es teler, hingga es buah segar yang manis dan menyegarkan di setiap tegukan.",
    about:
      "<strong>Kedai Es Bang Maman</strong> merupakan tempat favorit warga Kudus untuk menikmati minuman dingin segar di siang hari. Dikenal dengan bahan-bahan alami dan racikan sirup khas buatan sendiri, setiap sajian es di sini menghadirkan kesejukan dan rasa manis yang pas di lidah. Suasana kedai yang santai membuat tempat ini cocok untuk nongkrong bersama teman maupun keluarga.",
    description:
      "Kedai Es Bang Maman menyajikan berbagai pilihan minuman segar seperti es campur, es teler, es buah, dan es dawet. Dengan bahan segar dan sirup racikan khas, setiap minuman dijamin menyegarkan dan bikin ketagihan. Cocok dinikmati kapan pun, terutama saat cuaca panas di Kudus!",
    rating: "4.9 / 5",
    location: {
      address: "Plosokrajan, Ploso, Kudus",
      fullAddress:
        "Jl. Mayor Basuno No.24, Plosokrajan, Ploso, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59348",
      mapsUrl: "https://maps.app.goo.gl/drHHWKjDZUX93v8x9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8143004,110.8310655&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Jus Buah Naga",
        description:
          "Perpaduan segar buah naga merah dengan susu kental manis dan es serut, menghasilkan rasa manis alami yang menyegarkan di setiap tegukan.",
        price: "Rp 10.000",
        image: "/images/maman_menu1.webp",
      },
      {
        name: "Jus Jambu Merah",
        description:
          "Minuman jambu merah yang diblender halus dengan sedikit gula dan es batu, cocok dinikmati siang hari untuk menghilangkan dahaga.",
        price: "Rp 9.000",
        image: "/images/maman_menu2.webp",
      },
      {
        name: "Jus Alpukat",
        description:
          "Alpukat segar dikocok dengan susu dan cokelat kental, menghadirkan sensasi lembut, manis, dan nikmat khas Kedai Es Bang Maman.",
        price: "Rp 12.000",
        image: "/images/maman_menu3.webp",
      },
      {
        name: "Ocean Blue",
        description:
          "Minuman dingin berwarna biru laut dengan rasa soda manis dan jeruk nipis yang segar — pilihan pas untuk penyegar suasana.",
        price: "Rp 11.000",
        image: "/images/maman_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/maman_galerifoto1.webp",
      "/images/maman_galerifoto2.webp",
      "/images/maman_galerifoto3.webp",
      "/images/maman_galerifoto4.webp",
      "/images/maman_galerifoto5.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 17.00", isOpen: true },
    ],
  },
  {
    id: 37,
    name: "Gravitasi Teras Muria",
    slug: "gravitasi-teras-muria",
    heroImage: "/images/gravitasiterasmuria_hero.webp",
     heroTitle: 'Informasi Lengkap tentang UMKM "Gravitasi Teras Muria"',
    heroSubtitle:
  "Tempat makan nyaman di Kudus yang menyajikan beragam menu khas nusantara dengan cita rasa rumahan dan suasana santai di bawah rindangnya Teras Muria.",
about:
  "<strong>Gravitasi Teras Muria</strong> adalah restoran keluarga yang menghadirkan suasana hangat dan alami khas pegunungan Muria. Menyajikan berbagai hidangan tradisional seperti ayam bakar, nasi goreng, sop iga, dan menu minuman segar, restoran ini menjadi tempat favorit untuk bersantai dan menikmati kelezatan kuliner lokal. Dengan pelayanan ramah dan pemandangan yang asri, setiap kunjungan ke Gravitasi Teras Muria selalu meninggalkan kesan hangat.",
description:
  "Restoran keluarga di Kudus dengan konsep alam terbuka, menyuguhkan makanan khas nusantara dan minuman segar dalam suasana nyaman dan tenang. Cocok untuk makan bersama keluarga, teman, atau acara kecil di akhir pekan.",
    rating: "4.5 / 5",
    location: {
      address: "Pasuruhan Lor, Kudus",
      fullAddress:
        "Jl. Pasuruhan Lor No.568, Pasuruhan Lor, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59349",
      mapsUrl: "https://maps.app.goo.gl/xjzQ1LrjRg2s3qgw6",
      embedUrl:
        "https://www.google.com/maps?q=-6.8163308,110.8236264&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "gravitasiterasmuria_id",
    },
    menus: [
      {
    name: "Nasi Goreng Gravitasi",
    description:
      "Nasi goreng spesial dengan bumbu rempah pilihan, potongan ayam, telur, dan sayuran segar. Disajikan dengan kerupuk dan acar khas Gravitasi yang menggugah selera.",
    price: "Rp 22.000",
    image: "/images/gravitasi_menu1.webp",
  },
  {
    name: "Mie Atjeh",
    description:
      "Mie khas Aceh dengan cita rasa pedas gurih yang menggoda, disajikan dengan potongan daging sapi empuk dan taburan bawang goreng yang renyah.",
    price: "Rp 25.000",
    image: "/images/gravitasi_menu2.webp",
  },
  {
    name: "Chicken Katsu",
    description:
      "Daging ayam fillet dibalut tepung roti renyah dan digoreng hingga keemasan, disajikan dengan nasi hangat, saus katsu, dan salad segar.",
    price: "Rp 25.000",
    image: "/images/gravitasi_menu3.webp",
  },
    ],
    galleryImages: [
      "/images/gravitasi_galerifoto1.webp",
      "/images/gravitasi_galerifoto2.webp",
      "/images/gravitasi_galerifoto3.webp",
      "/images/gravitasi_galerifoto4.webp",
      "/images/gravitasi_galerifoto5.webp",
      "/images/gravitasi_galerifoto6.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "Tutup", isOpen: close },
      { day: "Rabu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "10.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "10.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "10.00 - 22.00", isOpen: true },
    ],
  },
   {
    id: 38,
    name: "Toko Kliwon",
    slug: "toko-kliwon",
    heroImage: "/images/tokokliwon_hero.webp",
     heroTitle: 'Informasi Lengkap tentang UMKM "Toko Kliwon"',
   heroSubtitle:
  "Toko perlengkapan rumah tangga di Kudus yang menyediakan berbagai kebutuhan sehari-hari seperti peralatan dapur, kebersihan, hingga perlengkapan rumah dengan harga terjangkau.",
about:
  "<strong>Toko Kliwon</strong> merupakan toko perlengkapan rumah tangga yang sudah dikenal masyarakat Kudus karena menyediakan berbagai kebutuhan rumah tangga lengkap di satu tempat. Di sini tersedia berbagai produk seperti ember, sapu, alat masak, piring, gelas, rak plastik, hingga perlengkapan kebersihan rumah. Dengan kualitas produk yang baik dan harga yang ramah di kantong, Toko Kliwon menjadi solusi praktis untuk melengkapi kebutuhan rumah Anda.",
description:
  "Toko perlengkapan rumah tangga di Kudus yang menawarkan berbagai produk seperti alat dapur, peralatan kebersihan, dan kebutuhan rumah tangga lainnya dengan harga terjangkau dan pelayanan ramah.",
    rating: "4.6 / 5",
    location: {
      address: "Pasuruhan Lor, Kudus",
      fullAddress:
        "5RJG+7C8, Jl. Kebunsawah, Pasuruhan Lor, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59349",
      mapsUrl: "https://maps.app.goo.gl/QEQoBGhkSZ7Jq1Z56",
      embedUrl:
        "https://www.google.com/maps?q=-6.8193385,110.8260639&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
    name: "Peralatan Dapur",
    description:
      "Beragam peralatan dapur seperti wajan, panci, spatula, pisau, dan perlengkapan masak lainnya dengan kualitas awet dan harga terjangkau.",
    price: "Mulai dari Rp 15.000",
    image: "/images/tokokliwon_menu1.webp",
  },
  {
    name: "Peralatan Kebersihan",
    description:
      "Menyediakan sapu, pel, ember, kain pel, dan perlengkapan kebersihan lainnya untuk menjaga rumah tetap bersih dan nyaman.",
    price: "Mulai dari Rp 10.000",
    image: "/images/tokokliwon_menu2.webp",
  },
  {
    name: "Perlengkapan Rumah Tangga",
    description:
      "Lengkap dengan berbagai kebutuhan rumah seperti rak, gantungan, tempat sampah, hingga perlengkapan kamar mandi.",
    price: "Mulai dari Rp 12.000",
    image: "/images/tokokliwon_menu3.webp",
  },
    ],
    galleryImages: [
      "/images/tokokliwon_galerifoto1.webp",
      "/images/tokokliwon_galerifoto2.webp",
      "/images/tokokliwon_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.30 - 17.00", isOpen: true },
      { day: "Rabu", hours: "08.30 - 17.00", isOpen: true },
      { day: "Kamis", hours: "08.30 - 17.00", isOpen: true },
      { day: "Jumat", hours: "08.30 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "08.30 - 17.00", isOpen: true },
      { day: "Minggu", hours: "08.30 - 17.00", isOpen: true },
    ],
  },
  {
    id: 39,
    name: "Toko Happy Kids",
    slug: "toko-happy-kids",
    heroImage: "/images/tokohappykids_hero.webp",
     heroTitle: 'Informasi Lengkap tentang UMKM "Toko Happy Kids"',
   heroSubtitle:
  "Toko pakaian anak di Kudus yang menyediakan berbagai busana lucu, nyaman, dan berkualitas untuk anak laki-laki maupun perempuan.",
about:
  "<strong>Toko Happy Kids</strong> merupakan toko pakaian anak yang berlokasi di Kudus. Menawarkan berbagai pilihan busana anak mulai dari pakaian harian, baju pesta, hingga perlengkapan bayi dengan desain menarik dan bahan yang lembut di kulit. Dengan koleksi terbaru dan harga bersahabat, Toko Happy Kids menjadi pilihan tepat bagi orang tua yang ingin anaknya tampil modis dan nyaman.",
description:
  "Toko Happy Kids menyediakan pakaian anak dengan beragam model dan ukuran, cocok untuk kebutuhan sekolah, bermain, atau acara spesial. Mengutamakan kenyamanan, kualitas bahan, dan desain yang ceria.",
    rating: "4.5 / 5",
    location: {
      address: "Plosokrajan, Ploso, Kudus",
      fullAddress:
        "Jl. Mayor H. Basuno No.38, Plosokrajan, Ploso, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59348",
      mapsUrl: "https://maps.app.goo.gl/q6NQVBFhBiAcidXz6",
      embedUrl:
        "https://www.google.com/maps?q=-6.8158025,110.8301664&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081325081064",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
    name: "Pakaian Anak Laki-Laki",
    description:
      "Beragam pilihan baju anak laki-laki mulai dari kaos, kemeja, hingga celana jeans dengan desain lucu dan nyaman dipakai.",
    price: "Mulai dari Rp 30.000",
    image: "/images/tokohappy_menu1.webp",
  },
  {
    name: "Pakaian Anak Perempuan",
    description:
      "Koleksi dress, rok, dan blus cantik dengan motif menarik dan bahan lembut yang nyaman untuk anak-anak.",
    price: "Mulai dari Rp 35.000",
    image: "/images/tokohappy_menu2.webp",
  },
    ],
    galleryImages: [
      "/images/tokohappy_galerifoto1.webp",
      "/images/tokohappy_galerifoto2.webp",
      "/images/tokohappy_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 14.00", isOpen: true },
    ],
  },
   {
    id: 40,
    name: "Nobby Kudus Extension Mall",
    slug: "nobby-kudus-extension",
    heroImage: "/images/nobbykudusextension_hero.webp",
     heroTitle: 'Informasi Lengkap tentang UMKM "Nobby Kudus Extension Mall"',
   heroSubtitle:
  "Butik busana muslim wanita modern yang menyediakan berbagai koleksi hijab, gamis, dan pakaian modest fashion berkualitas di Kudus.",
about:
  "<strong>Nobby Kudus Extension Mall</strong> merupakan butik busana muslim wanita yang berlokasi di Kudus. Menawarkan berbagai koleksi pakaian seperti gamis, tunik, hijab, dan dress modern dengan desain elegan dan bahan nyaman. Toko ini menjadi destinasi belanja favorit bagi wanita yang ingin tampil anggun dan modis sesuai syariat.",
description:
  "Nobby Kudus Extension Mall menghadirkan busana muslim wanita dengan berbagai pilihan gaya — mulai dari kasual hingga formal — yang memadukan desain modern dengan sentuhan syar’i, cocok untuk berbagai aktivitas dan acara spesial.",
    rating: "5 / 5",
    location: {
      address: "Getas, Getas Pejaten, Kudus",
      fullAddress:
        "Getas, Getas Pejaten, Kec. Jati, Kabupaten Kudus, Jawa Tengah",
      mapsUrl: "https://maps.app.goo.gl/p2xWRsTNQBxQrFnm6",
      embedUrl:
        "https://www.google.com/maps?q=-6.8176431,110.8377241&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081944210395",
      email: "-",
      instagram: "nobby_kudus",
    },
    menus: [
      {
    name: "Gamis & Dress",
    description: "Pilihan gamis dan dress muslimah yang anggun dan nyaman untuk berbagai kesempatan.",
    price: "Mulai dari Rp 150.000",
    image: "/images/nobby_menu1.webp",
  },
  {
    name: "Hijab & Pashmina",
    description: "Beragam hijab dan pashmina dari bahan lembut dengan warna serta motif terbaru.",
    price: "Mulai dari Rp 45.000",
    image: "/images/nobby_menu2.webp",
  },
  {
    name: "Tunik & Atasan",
    description: "Tunik dan atasan muslim modern yang tetap syar’i dan stylish.",
    price: "Mulai dari Rp 90.000",
    image: "/images/nobby_menu3.webp",
  },
    ],
    galleryImages: [
      "/images/nobby_galerifoto1.webp",
      "/images/nobby_galerifoto2.webp",
      "/images/nobby_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "10.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "10.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "10.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "10.00 - 22.00", isOpen: true },
    ],
  },

  // JEKULO
  {
    id: 41,
    name: "Jus Pojokan",
    slug: "jus-pojokan",
    heroImage: "/images/juspojokan_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Jus Pojokan"',
    heroSubtitle:
      "Nikmati beragam jus buah segar, kopi susu kekinian, dan camilan ringan dalam suasana santai di pojokan favorit warga Kudus.",
    about:
      "<strong>Jus Pojokan</strong> merupakan kedai minuman dan tempat nongkrong populer di Kudus yang menyajikan aneka jus segar, kopi susu, serta minuman dingin kekinian. Dengan bahan buah pilihan dan racikan rasa yang pas, setiap sajian di Jus Pojokan menghadirkan kesejukan alami dan suasana hangat untuk bersantai bersama teman atau keluarga.",
    description:
      "Jus Pojokan menawarkan berbagai minuman segar mulai dari jus buah alami seperti alpukat, jeruk, dan mangga, hingga minuman kekinian seperti kopi susu dan matcha latte. Cocok untuk melepas penat di sore hari atau menemani obrolan ringan. Tempat nyaman, rasa enak, dan harga bersahabat membuat Jus Pojokan jadi pilihan pas di Kudus!",
    rating: "5 / 5",
    location: {
      address: " Tambak, Jekulo, Kudus",
      fullAddress:
        "Jl. Sewonegoro No.15, Tambak, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/s3tULecskCybBNYx7",
      embedUrl:
        "https://www.google.com/maps?q=-6.8042478,110.9188871&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Aneka Buah Jus dan Minuman",
        description:
          "Tersedia berbagai pilihan jus buah segar seperti jeruk, alpukat, mangga, jambu, dan semangka. Dibuat dari buah pilihan dengan rasa manis alami dan kesegaran maksimal.",
        price: "Rp 5.000 - Rp 25.000",
        image: "/images/pojokan_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/pojokan_galerifoto1.webp",
      "/images/pojokan_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 17.00", isOpen: true },
    ],
  },
  {
    id: 42,
    name: "Kedai Twins Seblak Bandung n Juice Jekulo",
    slug: "kedai-twins-seblak-bandung-juice-jekulo",
    heroImage: "/images/kedaytwins_hero.webp",
    heroTitle:
      'Informasi Lengkap tentang UMKM "Kedai Twins Seblak Bandung & Juice Jekulo"',
    heroSubtitle:
      "Nikmati perpaduan pedas gurih khas Seblak Bandung dan kesegaran jus buah alami dalam satu tempat yang nyaman dan ramah di Jekulo, Kudus.",
    about:
      "<strong>Kedai Twins Seblak Bandung n Juice Jekulo</strong> menyajikan cita rasa khas Seblak Bandung yang pedas, gurih, dan menggugah selera, dipadukan dengan aneka jus segar pilihan. Dimasak dengan bumbu Bandung asli dan topping beragam seperti kerupuk, sosis, ceker, dan makaroni, setiap porsi menghadirkan sensasi nikmat yang pas di lidah. Kedai ini juga menyediakan berbagai minuman segar sebagai pelengkap, cocok untuk nongkrong santai bersama teman.",
    description:
      "Kedai Twins menghadirkan menu spesial Seblak Bandung dengan cita rasa pedas nikmat serta pilihan jus buah segar yang menyegarkan. Tersedia berbagai level pedas dan topping sesuai selera. Cocok dinikmati kapan saja, baik untuk makan siang, malam, maupun sekadar bersantai. Suasana santai dan harga bersahabat menjadikan Kedai Twins Seblak Bandung n Juice Jekulo pilihan pas bagi pecinta kuliner pedas di Kudus.",
    rating: "4.1 / 5",
    location: {
      address: " Karang, Jekulo, Kudus",
      fullAddress:
        "Karang, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/1Qha1LYnCBrb68Bv7",
      embedUrl:
        "https://www.google.com/maps?q=-6.8099173,110.9227112&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "085600878980",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Seblak Mix",
        description:
          "Seblak khas Bandung dengan topping lengkap seperti ceker, sosis, kerupuk, dan bakso. Disajikan dengan kuah pedas gurih yang bisa disesuaikan tingkat kepedasannya.",
        price: "Rp 12.000",
        image: "/images/twins_menu1.webp",
      },
      {
        name: "Jus Alpukat",
        description:
          "Jus alpukat segar dengan campuran susu kental manis dan cokelat, cocok diminum saat santai. Teksturnya lembut dan rasanya manis pas di lidah.",
        price: "Rp 5.000",
        image: "/images/twins_menu2.webp",
      },
      {
        name: "Mie Ayam Goreng",
        description:
          "Mie ayam dengan bumbu khas yang digoreng kering, disajikan bersama potongan ayam gurih dan sayuran segar. Cita rasa unik yang bikin nagih.",
        price: "Rp 10.000",
        image: "/images/twins_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/twins_galerifoto1.webp",
      "/images/twins_galerifoto2.webp",
      "/images/twins_galerifoto3.webp",
      "/images/twins_galerifoto4.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.15 - 20.00", isOpen: true },
      { day: "Selasa", hours: "09.15 - 20.00", isOpen: true },
      { day: "Rabu", hours: "09.15 - 20.00", isOpen: true },
      { day: "Kamis", hours: "09.15 - 20.00", isOpen: true },
      { day: "Jumat", hours: "09.15 - 20.00", isOpen: true },
      { day: "Sabtu", hours: "09.15 - 20.00", isOpen: true },
      { day: "Minggu", hours: "09.15 - 20.00", isOpen: true },
    ],
  },
  {
    id: 43,
    name: "Lentog Tanjung Bang Saiful",
    slug: "lentog-tanjung-bang-saiful",
    heroImage: "/images/lentogbangsyaiful_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Lentog Tanjung Bang Saiful"',
    heroSubtitle:
      "Nikmati perpaduan lontong lembut, sayur lodeh gurih, dan sambal khas Kudus yang melegenda. Cita rasa tradisional yang tetap autentik sejak dulu.",
    about:
      "<strong>Lentog Tanjung Bang Saiful</strong> merupakan salah satu kuliner khas Kudus yang terkenal dengan kelezatan lentognya. Terbuat dari potongan lontong lembut, disiram dengan sayur lodeh gurih dan sambal pedas manis yang khas, menciptakan rasa yang nikmat di setiap suapan. Dimasak dengan resep turun-temurun, Lentog Tanjung Bang Saiful menjadi favorit warga lokal maupun wisatawan yang ingin menikmati cita rasa Kudus asli.",
    description:
      "Lentog Tanjung Bang Saiful menyajikan perpaduan sempurna antara lontong, sayur lodeh, dan sambal khas Kudus. Dengan kuah santan gurih dan bumbu tradisional, setiap porsi menghadirkan kehangatan rasa rumahan. Cocok dinikmati untuk sarapan atau makan siang, terutama bagi pencinta kuliner khas Jawa Tengah.",
    rating: "4.6 / 5",
    location: {
      address: " Karang, Jekulo, Kudus",
      fullAddress:
        "Jl. Raya Siliwangi No.275, Karang, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/E9vd1bSfHm9fJEKZA",
      embedUrl:
        "https://www.google.com/maps?q=-6.8132827,110.9230951&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "085747474714",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Lentog Tanjung",
        description:
          "Hidangan tradisional khas Kudus berisi lontong lembut, sayur lodeh nangka, dan tahu tempe bacem yang disiram kuah gurih santan. Cocok untuk sarapan dengan cita rasa sederhana namun nikmat.",
        price: "Rp 8.000",
        image: "/images/saiful_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/saiful_galerifoto1.webp",
      "/images/saiful_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "05.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "05.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "05.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "05.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "05.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "05.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "05.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 44,
    name: "Berkah Es Buah",
    slug: "berkah-es-buah",
    heroImage: "/images/berkahesbuah_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Berkah Es Buah"',
    heroSubtitle:
      "Nikmati kesegaran potongan buah segar dengan sirup manis, susu kental, dan es serut yang menyegarkan. Cocok dinikmati di siang hari atau saat cuaca panas.",
    about:
      "<strong>Berkah Es Buah</strong> adalah tempat favorit untuk menikmati es buah segar di Kudus. Menggunakan berbagai buah pilihan seperti melon, semangka, nanas, pepaya, dan kolang-kaling, disajikan dengan campuran sirup manis dan susu yang pas di lidah. Selain rasanya yang segar, porsi melimpah dan harga terjangkau menjadikannya pilihan tepat untuk semua kalangan.",
    description:
      "Segelas penuh kesegaran buah-buahan tropis dengan sirup dan susu yang manis dan lembut. Berkah Es Buah cocok untuk menemani waktu istirahat, melepas dahaga, atau sekadar menikmati manisnya kesegaran alami di tengah hari yang panas.",
    rating: "5 / 5",
    location: {
      address: " Kalidoro Lor, Bulungcangkring, Kudus",
      fullAddress:
        "5WV9+4H7, Jl. Ps. Puri, Kalidoro Lor, Bulungcangkring, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/TmtJsgZEGhUvJ68s6",
      embedUrl:
        "https://www.google.com/maps?q=-6.8072038,110.918911&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085888445959",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Makanan Buah",
        description:
          "Segarnya campuran buah pilihan dengan sirup manis dan sedikit es serut, cocok untuk menyegarkan hari Anda.",
        price: "Rp 15.000",
        image: "/images/berkah_menu1.webp",
      },
      {
        name: "Minuman Buah",
        description:
          "Minuman buah segar yang menyehatkan, dipadukan dengan topping jelly dan sirup favorit. Nikmat diminum kapan saja.",
        price: "Rp 12.000",
        image: "/images/berkah_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/berkah_galerifoto1.webp",
      "/images/berkah_galerifoto2.webp",
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
    id: 45,
    name: "Warnet Jaya Sentosa",
    slug: "warnet-jaya-sentosa",
    heroImage: "/images/warnetjayasentosa_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warnet Jaya Sentosa"',
    heroSubtitle:
      "Nikmati pengalaman gaming terbaik dengan koneksi cepat, PC gaming lengkap, dan suasana nyaman untuk teman atau kerja sekolah.",
    about:
      "<strong>Warnet Jaya Sentosa</strong> adalah pilihan utama bagi gamer dan pelajar di Kudus. Dilengkapi PC gaming terbaru, koneksi internet cepat, dan ruang nyaman, cocok untuk bermain game, browsing, atau belajar. Harga terjangkau membuat semua kalangan bisa menikmati layanan terbaik tanpa khawatir kantong jebol.",
    description:
      "Warnet Jaya Sentosa menyediakan fasilitas lengkap mulai dari PC gaming high-end, koneksi internet cepat, printer, hingga minuman dan snack ringan. Cocok untuk sesi gaming panjang, belajar kelompok, atau sekadar nongkrong sambil online. Staf ramah siap membantu agar pengalaman Anda selalu menyenangkan.",
    rating: "4.8 / 5",
    location: {
      address: " Karang, Jekulo,, Kudus",
      fullAddress:
        "5WRC+7XP, Desa Jekulo Dukuh Jekulo, Karang, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/s2JV7E3gaEUHFxsy5",
      embedUrl:
        "https://www.google.com/maps?q=-6.8092817,110.92246&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085640256542",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Rental",
        description:
          "Sewa PC gaming atau workstation lengkap dengan koneksi internet cepat. Cocok untuk main game, belajar, atau browsing nyaman sepanjang hari.",
        price: "Rp 3.000 - Rp 20.000",
        image: "/images/warnet_menu1.webp",
      },
    ],
    galleryImages: ["/images/warnet_menu1.webp"],
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
    id: 46,
    name: "Warung Mie Dadat Pak Karnan",
    slug: "warung-mie-dadat",
    heroImage: "/images/warungmiedadat_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Mie Dadat Pak Karnan"',
    heroSubtitle:
  "Warung mie populer di Kudus yang menyajikan berbagai olahan mie lezat dengan cita rasa khas dan harga bersahabat.",
about:
  "<strong>Warung Mie Dadat Pak Karnan</strong> merupakan tempat makan yang terkenal di Kudus karena menyajikan aneka mie dengan rasa gurih dan bumbu khas rumahan. Warung ini menjadi favorit banyak pelanggan karena porsinya pas, rasanya konsisten, dan suasananya nyaman untuk makan santai bersama keluarga maupun teman.",
description:
  "Warung ini menawarkan beragam menu mie, mulai dari mie goreng, mie rebus, hingga mie pedas spesial. Semua dibuat dari bahan segar dan racikan bumbu pilihan yang menggugah selera. Dengan harga terjangkau, Warung Mie Dadat Pak Karnan menjadi destinasi kuliner yang wajib dicoba di Kudus.",
    rating: "4.7 / 5",
    location: {
      address: "Tambak, Jekulo,, Kudus",
      fullAddress:
        "Tambak, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/2LthFjXMqxyzKfM48",
      embedUrl:
        "https://www.google.com/maps?q=-6.8055015,110.9159331&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
       {
    name: "Mie Dadat",
    description:
      "Mie gurih khas Warung Mie Dadat tanpa tambahan saus dan sambal, cocok untuk yang suka rasa original dan tidak terlalu pedas.",
    price: "Rp 15.000",
    image: "/images/miedadat_menu1.webp",
  },
  {
    name: "Mie Dadatan",
    description:
      "Mie khas Warung Mie Dadat dengan tambahan saus dan sambal pedas yang menggugah selera. Favorit bagi pecinta rasa pedas.",
    price: "Rp 17.000",
    image: "/images/miedadat_menu2.webp",
  },
    ],
    galleryImages: [
      "/images/miedadat_galerifoto1.webp",
      "/images/miedadat_galerifoto2.webp"
    ],
    openingHours: [
      { day: "Senin", hours: "03.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "03.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "03.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "03.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "03.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "03.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "Tutup", isOpen: close },
    ],
  },
  {
    id: 47,
    name: "Toko Risfan Snack - Pusat Grosir Snack Lengkap di Kudus",
    slug: "toko-risfan-snack",
    heroImage: "/images/tokorisfan_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Risfan Snack"',
    heroSubtitle:
  "Toko bahan makanan dan camilan di Kudus yang menyediakan berbagai kebutuhan dapur, jajanan, serta bahan kue dengan harga terjangkau.",
about:
  "<strong>Toko Risfan Snack</strong> merupakan toko bahan makanan yang berlokasi di Kudus. Menyediakan berbagai bahan pokok, bumbu dapur, bahan kue, hingga aneka snack kemasan. Toko ini dikenal dengan produknya yang lengkap, berkualitas, dan harga yang bersahabat, cocok untuk kebutuhan rumah tangga maupun usaha kecil.",
description:
  "Toko Risfan Snack menjadi pilihan praktis bagi masyarakat Kudus yang ingin belanja bahan makanan, bumbu dapur, dan camilan dalam satu tempat. Pelayanan ramah dan stok barang yang selalu tersedia menjadikan toko ini salah satu destinasi belanja favorit di daerahnya.",
    rating: "4.3 / 5",
    location: {
      address: "Jekulo, Klaling,, Kudus",
      fullAddress:
        "Jekulo, Klaling, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/UP4AuScYCa4M6dK29",
      embedUrl:
        "https://www.google.com/maps?q=-6.8070603,110.9248429&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "085641315977",
      email: "-",
      instagram: "-",
    },
    menus: [
       {
    name: "Aneka Snack dan Camilan",
    description:
      "Menjual berbagai macam makanan ringan seperti keripik, kue kering, wafer, biskuit, permen, dan minuman kemasan. Cocok untuk kebutuhan pribadi, acara, maupun grosir.",
    price: "Mulai dari Rp 30.000",
    image: "/images/tokorisfan_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/tokorisfan_galerifoto1.webp",
      "/images/tokorisfan_galerifoto2.webp"
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 20.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 20.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 20.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 20.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 20.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 20.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 20.00", isOpen: true },
    ],
  },
  {
    id: 48,
    name: "Js Muslim Collection Kudus",
    slug: "js-muslim-collection",
    heroImage: "/images/jsmuslim_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Js Muslim Collection Kudus"',
    heroSubtitle:
  "Toko busana muslim di Kudus yang menyediakan berbagai pilihan pakaian syar’i, gamis, hijab, dan aksesori muslimah dengan desain modern dan harga terjangkau.",
about:
  "<strong>JS Muslim Collection Kudus</strong> merupakan toko pakaian muslim yang berlokasi di Kudus. Menyediakan berbagai koleksi busana muslim seperti gamis, tunik, hijab, dan koko dengan bahan nyaman serta model kekinian. Cocok untuk kebutuhan harian maupun acara spesial.",
description:
  "JS Muslim Collection Kudus menghadirkan busana muslim berkualitas dengan harga bersahabat, menjadikannya destinasi belanja favorit bagi masyarakat yang ingin tampil modis dan tetap syar’i.",
    rating: "4.9 / 5",
    location: {
      address: "Pulutan, Jekulo, Kudus",
      fullAddress:
        "Jl. Hastrodirono No.50, RT.04/RW.06, Pulutan, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/m8jvwbDuvw4zVJhb9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8145268,110.9181404&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "08156577137",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
    name: "Gamis Wanita",
    description:
      "Koleksi gamis wanita dengan desain elegan dan bahan nyaman, cocok untuk acara formal maupun santai.",
    price: "Mulai dari Rp 120.000",
    image: "/images/jsmuslim_menu1.webp",
  },
  {
    name: "Hijab & Aksesori",
    description:
      "Beragam model hijab dan aksesori pelengkap seperti ciput, bros, dan pin hijab dengan bahan berkualitas.",
    price: "Mulai dari Rp 25.000",
    image: "/images/jsmuslim_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/jsmuslim_galerifoto1.webp",
      "/images/jsmuslim_galerifoto2.webp",
      "/images/jsmuslim_galerifoto3.webp"
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
    id: 49,
    name: "Kios Hjh Zaroah",
    slug: "kios-hjh",
    heroImage: "/images/kioshjh_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Kios Hjh Zaroah"',
    heroSubtitle:
  "Toko busana muslim di Kudus yang menyediakan berbagai pilihan pakaian syar’i, gamis, hijab, dan aksesori muslimah dengan desain modern dan harga terjangkau.",
about:
  "<strong>Kios Hjh Zaroah</strong> merupakan toko pakaian muslim yang berlokasi di Kudus. Menawarkan beragam koleksi busana muslim seperti gamis, tunik, hijab, dan koko dengan bahan nyaman serta model yang mengikuti tren. Tempat ini menjadi pilihan tepat bagi keluarga yang ingin tampil sopan namun tetap stylish.",
description:
  "Kios Hjh Zaroah menghadirkan busana muslim berkualitas dengan harga bersahabat, cocok untuk kegiatan sehari-hari, ibadah, maupun acara spesial.",
    rating: "4.2 / 5",
    location: {
      address: "Karang, Jekulo, Kudus",
      fullAddress:
        "Jl. Kudus - Pati No.145, Karang, Jekulo, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah 59382",
      mapsUrl: "https://maps.app.goo.gl/m8jvwbDuvw4zVJhb9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8077521,110.9200351&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "089671210252",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
    name: "Gamis dan Hijab Syar’i",
    description:
      "Koleksi busana muslim berkualitas seperti gamis dan hijab syar’i dengan desain modern, bahan nyaman, serta harga terjangkau.",
    price: "Mulai dari Rp 85.000",
    image: "/images/kioshjh_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/kioshjh_galerifoto1.webp",
      "/images/kioshjh_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 13.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 13.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 13.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 13.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 13.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 13.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 13.00", isOpen: true },
    ],
  },
  
  // KALIWUNGU
  {
    id: 50,
    name: "Jahe Rempah Leggit",
    slug: "jahe-rempah-leggit",
    heroImage: "/images/jaherempahreggit_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Jahe Rempah Leggit"',
    heroSubtitle:
      "Nikmati sensasi hangat dan sehat dari perpaduan jahe segar, rempah pilihan, dan madu asli. Cocok dinikmati kapan saja untuk tubuh yang lebih bugar.",
    about:
      "<strong>Jahe Rempah Leggit</strong> menghadirkan minuman tradisional berbasis jahe dan rempah pilihan. Menggunakan bahan-bahan alami seperti jahe, kayu manis, cengkeh, dan madu, setiap tegukan memberikan kehangatan sekaligus kesegaran. Cocok untuk dinikmati saat cuaca dingin atau sebagai minuman sehat harian.",
    description:
      "Minuman Jahe Rempah Leggit dibuat dengan jahe segar dan rempah alami yang direbus untuk menghasilkan rasa hangat dan aromatik. Setiap gelas memberikan sensasi pedas manis yang menenangkan, cocok untuk menjaga stamina dan kesehatan tubuh.",
    rating: "5 / 5",
    location: {
      address: " Madaran, Mijen, Kudus",
      fullAddress:
        "Jl. Pemuda, Madaran, Mijen, kaliwungu kudus, Kabupaten Kudus, Jawa Tengah 59361",
      mapsUrl: "https://maps.app.goo.gl/ChsXrMhvDRimhTT57",
      embedUrl:
        "https://www.google.com/maps?q=-6.7931315,110.7985926&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081939666657  ",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Wedank Batuk ",
        description:
          "Minuman jahe hangat dengan rempah pilihan yang menenangkan tenggorokan dan membantu meredakan batuk ringan.",
        price: "Rp 10.000",
        image: "/images/leggit_menu1.webp",
      },
      {
        name: "Wedank Paseja",
        description:
          "Perpaduan jahe dan rempah tradisional yang hangat, cocok untuk menjaga stamina dan meningkatkan daya tahan tubuh.",
        price: "Rp 10.000",
        image: "/images/leggit_menu2.webp",
      },
      {
        name: "Wedank Jaselang",
        description:
          "Jahe rempah hangat dicampur madu dan gula merah, memberikan rasa manis alami dan sensasi hangat yang menenangkan.",
        price: "Rp 10.000",
        image: "/images/leggit_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/leggit_galerifoto1.webp",
      "/images/leggit_galerifoto2.webp",
      "/images/leggit_galerifoto3.webp",
      "/images/leggit_galerifoto4.webp",
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
    id: 51,
    name: "Warung Makan Bu Carik",
    slug: "warung-makan-bu-carik",
    heroImage: "/images/warungmakanbucarik_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Makan Bu Carik"',
    heroSubtitle:
      "Nikmati hidangan tradisional dengan cita rasa autentik, porsi melimpah, dan harga terjangkau. Cocok untuk sarapan, makan siang, atau makan malam.",
    about:
      "<strong>Warung Makan Bu Carik</strong> menyajikan berbagai masakan tradisional khas Kudus, mulai dari lontong sayur, nasi pecel, hingga lauk pauk rumah yang segar dan lezat. Setiap menu dibuat dengan resep turun-temurun, menjadikan cita rasa tetap autentik dan memuaskan.",
    description:
      "Warung Makan Bu Carik menyediakan hidangan berkualitas dengan porsi yang pas dan harga terjangkau. Suasana warung yang nyaman dan pelayanan ramah membuat pengalaman makan Anda menyenangkan setiap kali berkunjung.",
    rating: "4.1 / 5",
    location: {
      address: " Area Sawah, Sidorekso, Kudus",
      fullAddress:
        "6QCQ+4QM, Area Sawah, Sidorekso, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
      mapsUrl: "https://maps.app.goo.gl/7TKJfvASN63JsKhn9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7796631,110.7894353&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Ikan Panggang ",
        description:
          "Ikan segar dipanggang dengan bumbu khas Bu Carik, gurih dan lezat, cocok dinikmati dengan nasi hangat.",
        price: "Rp 18.000",
        image: "/images/bucarik_menu1.webp",
      },
      {
        name: "Ayam",
        description:
          "Ayam goreng renyah dengan bumbu tradisional, disajikan hangat untuk menemani makan siang atau malam.",
        price: "Rp 15.000",
        image: "/images/bucarik_menu2.webp",
      },
      {
        name: "IkanLalapan",
        description:
          "Ikan segar disajikan dengan lalapan dan sambal pedas khas Bu Carik, cocok untuk pecinta rasa segar dan pedas.",
        price: "Rp 17.000",
        image: "/images/bucarik_menu3.webp",
      },
      {
        name: "Sayur Labu",
        description:
          "Sayur labu segar dimasak dengan bumbu rumahan, lembut dan gurih, pas sebagai lauk pendamping nasi.",
        price: "Rp 8.000",
        image: "/images/bucarik_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/bucarik_galerifoto1.webp",
      "/images/bucarik_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 17.00", isOpen: true },
    ],
  },
  {
    id: 52,
    name: "Tehatea Indonesia",
    slug: "tehatea-indonesia",
    heroImage: "/images/tehatea_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Tehatea Indonesia"',
    heroSubtitle:
      "Nikmati berbagai minuman teh hangat maupun dingin dengan rasa autentik, paduan rempah dan bahan alami. Cocok untuk dinikmati kapan saja sebagai teman santai atau melepas dahaga.",
    about:
      "<strong>Tehatea Indonesia</strong> adalah gerai minuman teh kekinian yang menggabungkan tradisi rasa Indonesia dengan sentuhan modern dalam setiap tegukan. Kami menghadirkan lebih dari 30 varian minuman berbasis teh premium, mulai dari <em>classic milk tea</em>, <em>teh tarik khas Melayu</em>, hingga inovasi lokal seperti <em>teh rempah jahe sereh</em>, <em>teh hijau pandan</em>, dan <em>fruit tea tropis</em> dengan potongan buah segar. Semua bahan dipilih langsung: daun teh asli dari perkebunan Jawa dan Sumatera, rempah organik, susu segar, serta gula aren murni tanpa pemanis buatan. Proses pembuatan dilakukan secara higienis dengan takaran presisi untuk menjaga konsistensi rasa — apakah Anda memilih versi hangat yang menenangkan di pagi hari atau es blend yang menyegarkan saat siang terik. Selain minuman, kami juga menyediakan <em>topping premium</em> seperti black boba, crystal jelly, aloe vera, dan cheese foam yang creamy. Cocok untuk nongkrong santai, meeting ringan, atau oleh-oleh khas Kudus. Dengan konsep gerai yang instagramable, pelayanan ramah, dan harga terjangkau, <strong>Tehatea Indonesia</strong> hadir untuk menjadi teman setia dalam setiap momen Anda. Kunjungi kami di Kaliwungu dan rasakan bedanya secangkir teh yang dibuat dengan hati!",
    description:
      "Tehatea Indonesia Minuman teh premium dengan varian hangat & dingin, rempah alami, dan topping kekinian. Segar, sehat, dan penuh cita rasa Indonesia.",
    rating: "5 / 5",
    location: {
      address: " Kedungdowo, Kabupaten Kudus",
      fullAddress:
        "Jl. Jetak Kedungdowo, Kedungdowo, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59322",
      mapsUrl: "https://maps.app.goo.gl/WYGXnmXPhEr47n1W9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7942619,110.7888683&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Teh Original",
        description:
          "Teh klasik yang segar, nikmat diminum kapan saja untuk melepas dahaga dan menyegarkan pikiran.",
        price: "Rp 10.000",
        image: "/images/tehatea_menu1.webp",
      },
      {
        name: "TehSusu",
        description:
          "Teh dicampur susu segar, creamy dan manis pas, cocok untuk menemani santai atau bekerja.",
        price: "Rp 12.000",
        image: "/images/tehatea_menu2.webp",
      },
    ],
    galleryImages: ["/images/tehatea_galerifoto1.webp"],
    openingHours: [
      { day: "Senin", hours: "10.00 - 20.00", isOpen: true },
      { day: "Selasa", hours: "10.00 - 20.00", isOpen: true },
      { day: "Rabu", hours: "10.00 - 20.00", isOpen: true },
      { day: "Kamis", hours: "10.00 - 20.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 20.00", isOpen: true },
      { day: "Sabtu", hours: "10.00 - 20.00", isOpen: true },
      { day: "Minggu", hours: "10.00 - 20.00", isOpen: true },
    ],
  },
  {
    id: 53,
    name: "Warung Makan 2 Putra",
    slug: "warung-makan-2-putra",
    heroImage: "/images/warungmakan2putra_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Makan 2 Putra"',
    heroSubtitle:
      "Nikmati hidangan rumahan dengan cita rasa autentik, porsi melimpah, dan harga terjangkau. Cocok untuk sarapan, makan siang, atau makan malam.",
    about:
      "<strong>Warung Makan 2 Putra</strong> menyajikan berbagai masakan khas Kudus dengan resep rumahan. Mulai dari nasi rames, lauk pauk segar, hingga sayur dan sambal rumah, semua disiapkan dengan bahan berkualitas untuk rasa yang lezat dan memuaskan.",
    description:
      "Warung Makan 2 Putra menawarkan hidangan rumah yang lezat, porsi pas, dan harga terjangkau. Suasana warung nyaman dengan pelayanan ramah menjadikan setiap kunjungan menyenangkan.",
    rating: "4.6 / 5",
    location: {
      address: " Kedungdowo, Kudus",
      fullAddress:
        "Jalan Raya Kudus-Jepara KM.5, Desa No.RT 04/06, Kedungdowo, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
      mapsUrl: "https://maps.app.goo.gl/m8LT9romynGkHVSu6",
      embedUrl:
        "https://www.google.com/maps?q=-6.7966961,110.8019642&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "0895383599877",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Nasi Sop",
        description:
          "Sup hangat dengan potongan ayam dan sayuran segar, cocok dinikmati bersama nasi hangat.",
        price: "Rp 18.000",
        image: "/images/putra_menu1.webp",
      },
      {
        name: "Tempe Sambal Goreng",
        description:
          "Tempe goreng renyah disiram sambal khas Bu 2 Putra, gurih dan pedas pas untuk lauk harian.",
        price: "Rp 10.000",
        image: "/images/putra_menu2.webp",
      },
      {
        name: "Pecel Teh Hangat",
        description:
          "Sayuran segar dengan bumbu kacang tradisional, pas sebagai pendamping nasi atau lauk lainnya.",
        price: "Rp 12.000",
        image: "/images/putra_menu3.webp",
      },
      {
        name: "Lele Bumbu Kecap Spesial",
        description:
          "Lele goreng renyah disajikan dengan bumbu kecap manis pedas, nikmat dinikmati bersama nasi hangat.",
        price: "Rp 20.000",
        image: "/images/putra_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/putra_galerifoto1.webp",
      "/images/putra_galerifoto2.webp",
      "/images/putra_galerifoto3.webp",
      "/images/putra_galerifoto4.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 10.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 10.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 10.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 10.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 10.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 10.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 10.00", isOpen: true },
    ],
  },
  {
    id: 54,
    name: "Jasa Angkut Barang",
    slug: "jasa-angkut-barang",
    heroImage: "/images/jasaangkutbarang_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Jasa Angkut Barang"',
    heroSubtitle:
      "Melayani pengangkutan barang untuk kebutuhan rumah tangga, kantor, atau usaha dengan aman dan tepat waktu.",
    about:
      "<strong>Jasa Angkut Barang</strong> menyediakan layanan angkut barang dengan tenaga profesional, kendaraan sesuai kebutuhan, dan harga transparan. Cocok untuk pindahan rumah, pengiriman barang dagangan, atau kebutuhan logistik lainnya.",
    description:
      "Layanan Jasa Angkut Barang kami menjamin pengiriman barang aman, cepat, dan efisien. Dengan armada kendaraan lengkap dan tenaga ahli, setiap pengangkutan dilakukan dengan hati-hati dan sesuai jadwal.",
    rating: "5 / 5",
    location: {
      address: " Setro, Setrokalangan, Kudus",
      fullAddress:
        "Jl. Serang Lusi, Setro, Setrokalangan, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
      mapsUrl: "https://maps.app.goo.gl/CazxwmS7Ez2C5G4z8",
      embedUrl:
        "https://www.google.com/maps?q=-6.8066691,110.7843391&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085691006788",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Jasa Angkut Apapun",
        description:
          "Sup hangat dengan potongan ayam dan sayuran segar, cocok dinikmati bersama nasi hangat.",
        price: "Rp 100.000 - Rp 300.000",
        image: "/images/angkut_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/angkut_galerifoto1.webp",
      "/images/angkut_galerifoto2.webp",
      "/images/angkut_galerifoto3.webp",
      "/images/angkut_galerifoto4.webp",
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
    id: 55,
    name: "Sego Sambel Lek Kas 2",
    slug: "sego-sambel-lek-kas2",
    heroImage: "/images/segosambel_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Sego Sambel Lek Kas 2"',
    heroSubtitle:
  "Rumah makan khas Nusantara yang menyajikan hidangan sambel pedas dan lauk goreng favorit dengan cita rasa autentik.",
about:
  "<strong>Sego Sambel Lek Kas 2</strong> menghadirkan masakan rumahan dengan rasa pedas khas sambel tradisional. Tersedia beragam paket lauk goreng seperti entok, bebek, dan lele, cocok untuk makan siang maupun malam.",
description:
  "Nikmati sensasi pedas gurih dari sambel racikan khas kami, dipadukan dengan lauk goreng pilihan dan nasi hangat. Semua menu disajikan dengan bumbu rempah asli Indonesia, halal, dan selalu segar.",
    rating: "4.4 / 5",
    location: {
      address: "Kedungdowo, Kudus",
      fullAddress:
        "6R32+987, Kedungdowo, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
      mapsUrl: "https://maps.app.goo.gl/ngz4L8VUNk6AJW6A9",
      embedUrl:
        "https://www.google.com/maps?q=-6.796607,110.8009774&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081466712358",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
    name: "Paket Entok Goreng",
    description:
      "Entok goreng gurih disajikan dengan sambel pedas khas rumah makan dan nasi hangat.",
    price: "Rp 25.000",
    image: "/images/segosambael_menu1.webp",
  },
  {
    name: "Paket Bebek Goreng",
    description:
      "Bebek goreng renyah dengan sambel bawang pedas dan lalapan segar.",
    price: "Rp 27.000",
    image: "/images/segosambael_menu2.webp",
  },
  {
    name: "Paket Lele Goreng",
    description:
      "Lele goreng krispi berpadu dengan sambel tomat pedas dan nasi putih hangat.",
    price: "Rp 20.000",
    image: "/images/segosambael_menu3.webp",
  },
    ],
    galleryImages: [
      "/images/segosambel_galerifoto1.webp",
      "/images/segosambel_galerifoto2.webp",
      "/images/segosambel_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "Tutup", isOpen: close },
      { day: "Selasa", hours: "10.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "10.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "10.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "10.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "10.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 56,
    name: "Toko Jamaah",
    slug: "toko-jamaah",
    heroImage: "/images/tokojamaah_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Jamaah"',
    heroSubtitle:
  "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan dapur, bumbu masak, dan bahan kue dengan harga terjangkau.",
about:
  "<strong>Toko Jamaah</strong> merupakan toko bahan makanan yang berlokasi di Kudus. Menyediakan aneka bahan pokok, bumbu dapur, tepung, minyak, hingga cemilan ringan. Cocok untuk kebutuhan rumah tangga maupun usaha kuliner.",
description:
  "Toko Jamaah dikenal dengan produknya yang lengkap, harga bersahabat, dan pelayanan ramah. Menjadi pilihan praktis bagi warga Kudus untuk memenuhi kebutuhan dapur sehari-hari.",
    rating: "4.0 / 5",
    location: {
      address: "Jalan, Winong, Kudus",
      fullAddress:
        "6QCR+G39, Jalan, Winong, Kaliwungu, Kudus Regency, Central Java 59332",
      mapsUrl: "https://maps.app.goo.gl/EQWarx4Kj8qRdgGq9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7787026,110.7902339&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
     name: "Paket Bahan Makanan Lengkap",
    description:
      "Tersedia berbagai bahan makanan seperti tepung, gula, merica, dan garam untuk kebutuhan rumahan maupun usaha.",
    price: "Mulai Rp 10.000",
    image: "/images/tokojamaah_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/tokojemaah_galerifoto1.webp",
      "/images/tokojemaah_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 17.00", isOpen: true },
    ],
  },
  {
    id: 56,
    name: "Toko Jamaah",
    slug: "toko-jamaah",
    heroImage: "/images/tokojamaah_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Toko Jamaah"',
    heroSubtitle:
  "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan dapur, bumbu masak, dan bahan kue dengan harga terjangkau.",
about:
  "<strong>Toko Jamaah</strong> merupakan toko bahan makanan yang berlokasi di Kudus. Menyediakan aneka bahan pokok, bumbu dapur, tepung, minyak, hingga cemilan ringan. Cocok untuk kebutuhan rumah tangga maupun usaha kuliner.",
description:
  "Toko Jamaah dikenal dengan produknya yang lengkap, harga bersahabat, dan pelayanan ramah. Menjadi pilihan praktis bagi warga Kudus untuk memenuhi kebutuhan dapur sehari-hari.",
    rating: "4.0 / 5",
    location: {
      address: "Jalan, Winong, Kudus",
      fullAddress:
        "6QCR+G39, Jalan, Winong, Kaliwungu, Kudus Regency, Central Java 59332",
      mapsUrl: "https://maps.app.goo.gl/EQWarx4Kj8qRdgGq9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7787026,110.7902339&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
     name: "Paket Bahan Makanan Lengkap",
    description:
      "Tersedia berbagai bahan makanan seperti tepung, gula, merica, dan garam untuk kebutuhan rumahan maupun usaha.",
    price: "Mulai Rp 10.000",
    image: "/images/tokojamaah_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/tokojemaah_galerifoto1.webp",
      "/images/tokojemaah_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 17.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 17.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 17.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 17.00", isOpen: true },
      { day: "Jumat", hours: "08.00 - 17.00", isOpen: true },
      { day: "Sabtu", hours: "08.00 - 17.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 17.00", isOpen: true },
    ],
  },
  {
    id: 57,
    name: "MM Amanah",
    slug: "mm-amanah",
    heroImage: "/images/mmamanah_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "MM Amanah"',
    heroSubtitle:
  "Minimarket di Kudus yang menyediakan berbagai kebutuhan harian, bahan makanan, dan perlengkapan rumah tangga dengan harga terjangkau.",
about:
  "<strong>MM Amanah</strong> merupakan minimarket yang berlokasi di Kudus. Menyediakan berbagai kebutuhan sehari-hari seperti sembako, bahan dapur, makanan ringan, minuman, serta produk kebersihan rumah tangga. Dengan pelayanan ramah dan harga bersahabat, MM Amanah menjadi pilihan belanja praktis untuk keluarga.",
description:
  "MM Amanah menawarkan pengalaman belanja yang nyaman dengan produk lengkap dan harga kompetitif. Cocok untuk memenuhi kebutuhan rumah tangga maupun usaha kecil.",
    rating: "4.4 / 5",
    location: {
      address: "Mijen, Kudus",
      fullAddress:
        "Dukuh Demangan, Jl. Raya Kudus - Jepara No.KM-6, RT.09/RW.06, Mijen, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
      mapsUrl: "https://maps.app.goo.gl/5S4gkDihkRGTiZLz9",
      embedUrl:
        "https://www.google.com/maps?q=-6.7892015,110.7941047&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "082322911886",
      email: "-",
      instagram: "-",
    },
    menus: [
     {
      name: "Snack & Minuman Dingin",
    description:
      "Tersedia berbagai camilan ringan seperti keripik, wafer, dan minuman dingin dalam kemasan — favorit pelanggan untuk teman santai.",
    price: "Mulai Rp 5.000",
    image: "/images/mmamanah_menu1.webp",
  },
    ],
    galleryImages: [
      "/images/mmamanah_galerifoto1.webp",
      "/images/mmamanah_galerifoto2.webp",
      "/images/mmamanah_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "06.00 - 22.30", isOpen: true },
      { day: "Selasa", hours: "06.00 - 22.30", isOpen: true },
      { day: "Rabu", hours: "06.00 - 22.30", isOpen: true },
      { day: "Kamis", hours: "06.00 - 22.30", isOpen: true },
      { day: "Jumat", hours: "06.00 - 22.30", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 22.30", isOpen: true },
      { day: "Minggu", hours: "06.00 - 22.30", isOpen: true },
    ],
  },
  {
  id: 58,
  name: "Toko Van Helen Serba 35000",
  slug: "toko-van-helen",
  heroImage: "/images/tokovanhelen_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Toko Van Helen Serba 35000"',
  heroSubtitle:
    "Toko pakaian di Kudus yang menawarkan busana trendi dan aksesori gaya dengan harga terjangkau hanya Rp 35.000-an.",
  about:
    "<strong>Toko Van Helen Serba 35000</strong> merupakan toko pakaian yang berlokasi di Kudus. Menyediakan berbagai pilihan busana kasual, fashion pria dan wanita, serta aksesori dengan harga satu harga Rp 35.000-an. Cocok untuk Anda yang ingin tampil stylish tanpa merogoh kocek dalam-dalam.",
  description:
    "Toko Van Helen Serba 35000 menghadirkan koleksi fashion terbaru dengan harga tetap Rp 35.000-an — pilihan ideal untuk belanja cepat, hemat, dan modis.",
  rating: "4.1 / 5",
  location: {
    address: "Kedungdowo, Kaliwungu, Kudus",
    fullAddress:
      "6R32+6P2, Kedungdowo, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
    mapsUrl: "https://maps.app.goo.gl/KicYoZSUDVdqBBBDA", 
    embedUrl:
      "https://www.google.com/maps?q=-6.7969869,110.801753&hl=id&z=17&output=embed",
  },
  contact: {
    whatsapp: "-",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Busana Kasual & Aksesori",
      description:
        "Pilihan kaos, blouse, kemeja, dan aksesori seperti tas dan topi — semua dengan harga tetap Rp 35.000-an.",
      price: "Rp 35.000",
      image: "/images/tokovanhelen_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/tokovanhelen_galerifoto1.webp",
    "/images/tokovanhelen_galerifoto2.webp",
    "/images/tokovanhelen_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "08.00 - 21.30", isOpen: true },
    { day: "Selasa", hours: "08.00 - 21.30", isOpen: true },
    { day: "Rabu", hours: "08.00 - 21.30", isOpen: true },
    { day: "Kamis", hours: "08.00 - 21.30", isOpen: true },
    { day: "Jumat", hours: "08.00 - 21.30", isOpen: true },
    { day: "Sabtu", hours: "08.00 - 21.30", isOpen: true },
    { day: "Minggu", hours: "08.00 - 21.30", isOpen: true },
  ],
},
{
  id: 59,
  name: "Lina Family",
  slug: "lina-family",
  heroImage: "/images/linafamily_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Lina Family"',
  heroSubtitle:
    "Toko pakaian keluarga di Kudus yang menyediakan busana trendi untuk pria, wanita, dan anak-anak dengan harga bersahabat.",
  about:
    "<strong>Lina Family</strong> merupakan toko pakaian yang berlokasi di Kudus, Jl. Kudus-Jepara Km. 5, Mijen, Kec. Kaliwungu. Menawarkan koleksi lengkap untuk seluruh keluarga — mulai busana harian hingga acara khusus. Fokus pada kenyamanan, gaya, dan harga kompetitif. :contentReference[oaicite:0]{index=0}",
  description:
    "Lina Family menghadirkan pilihan fashion lengkap untuk keluarga dengan model modern dan harga yang bersahabat. Cocok untuk belanja seluruh anggota keluarga dalam satu kunjungan.",
  rating: "4.3 / 5",
  location: {
    address: "Madaran, Mijen, Kudus",
    fullAddress:
      "Jl. Raya Kudus - Jepara No.Km. 5, Madaran, Mijen, Kec. Kaliwungu, Kabupaten Kudus, Jawa Tengah 59332",
    mapsUrl: "https://maps.app.goo.gl/piTqSMQqSr23UbLQ9", 
    embedUrl:
      "https://www.google.com/maps?q=-6.7921879,110.7955317&hl=id&z=17&output=embed", 
  },
  contact: {
    whatsapp: "087746212705",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Pakaian Keluarga",
      description:
        "Busana pria, wanita & anak dari casual hingga formal dengan desain kekinian dan kenyamanan tinggi.",
      price: "Mulai dari Rp 50.000",
      image: "/images/linafamily_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/linafamily_galerifoto1.webp",
    "/images/linafamily_galerifoto2.webp",
    "/images/linafamily_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "07.00 - 20.30", isOpen: true },
    { day: "Selasa", hours: "07.00 - 20.30", isOpen: true },
    { day: "Rabu", hours: "07.00 - 20.30", isOpen: true },
    { day: "Kamis", hours: "07.00 - 20.30", isOpen: true },
    { day: "Jumat", hours: "07.00 - 20.30", isOpen: true },
    { day: "Sabtu", hours: "07.00 - 20.30", isOpen: true },
    { day: "Minggu", hours: "07.00 - 20.30", isOpen: true },
  ],
},
  // KOTA KUDUS
  {
    id: 60,
    name: "Susu Moeria",
    slug: "susu-moeria",
    heroImage: "/images/susumoeria_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Susu Moeria"',
    heroSubtitle:
      "Nikmati kesegaran susu murni 0pilihan yang diolah higienis dan tersedia dalam berbagai varian rasa. Cocok untuk semua usia dan waktu.",
    about:
      "<strong>Susu Moeria</strong> merupakan produsen sekaligus penjual susu murni segar yang berlokasi di Kudus. Produk susu ini dibuat dari bahan alami tanpa pengawet, menjaga rasa dan kualitas terbaik. Tersedia dalam berbagai varian seperti original, cokelat, stroberi, dan vanila. Dengan cita rasa lembut dan kemasan praktis, Susu Moeria menjadi pilihan favorit bagi pencinta minuman sehat dan bergizi.",
    rating: "4.4 / 5",
    description:
      "Susu Moeria menyajikan susu murni segar dengan rasa khas yang alami dan menyehatkan. Setiap botol diproses dengan standar kebersihan tinggi untuk menjaga kualitas gizi dan kesegarannya. Cocok diminum kapan saja untuk menambah energi dan menjaga kesehatan tubuh.",
    location: {
      address: "Jl. Pemuda No.64, Magersari, Panjunan, Kudus",
      fullAddress:
        "Jl. Pemuda No.64, Magersari, Panjunan, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59312",
      mapsUrl: "https://maps.app.goo.gl/seh4uPGo99XUB6mx7",
      embedUrl:
        "https://www.google.com/maps?q=-6.8095844,110.8442737&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "087825368484",
      email: "-",
      instagram: "susumoeriacafe",
    },
    menus: [
      {
        name: "Susu Coklat",
        description:
          "Susu segar dengan rasa coklat manis dan creamy, cocok diminum dingin maupun hangat.",
        price: "Rp 9.000",
        image: "/images/moeria_menu1.webp",
      },
      {
        name: "Tteokbokki",
        description:
          "Camilan khas Korea berbahan kue beras kenyal dengan saus pedas manis yang menggugah selera.",
        price: "Rp 37.000",
        image: "/images/moeria_menu2.webp",
      },
      {
        name: "Blackpepper Chicken",
        description:
          "Ayam lembut dengan saus lada hitam khas Moeria yang gurih pedas dan nikmat.",
        price: "Rp 22.000",
        image: "/images/moeria_menu3.webp",
      },
      {
        name: "Tteokbokki Mozarella",
        description:
          "Tteokbokki pedas manis disajikan dengan lelehan keju mozarella lembut di atasnya.",
        price: "Rp 31.000",
        image: "/images/moeria_menu4.webp",
      },
      {
        name: "Susu Strawberry",
        description:
          "Perpaduan susu segar dan sirup strawberry alami yang menyegarkan.",
        price: "Rp 9.000",
        image: "/images/moeria_menu5.webp",
      },
      {
        name: "Budae Jigae",
        description:
          "Sup khas Korea berisi sosis, mie, dan tahu dalam kuah pedas gurih yang hangat.",
        price: "Rp 72.000",
        image: "/images/moeria_menu6.webp",
      },
      {
        name: "Sundubu Jigae",
        description:
          "Sup tahu lembut ala Korea dengan kuah pedas gurih dan isian seafood atau daging pilihan.",
        price: "Rp 48.000",
        image: "/images/moeria_menu7.webp",
      },
      {
        name: "Nasi Goreng Kimchi",
        description:
          "Nasi goreng dengan cita rasa khas kimchi Korea yang asam, pedas, dan menggugah selera.",
        price: "Rp 48.000",
        image: "/images/moeria_menu8.webp",
      },
    ],
    galleryImages: [
      "/images/moeria_galerifoto1.webp",
      "/images/moeria_galerifoto2.webp",
      "/images/moeria_galerifoto3.webp",
      "/images/moeria_galerifoto4.webp",
      "/images/moeria_galerifoto5.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "06.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "06.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "06.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "06.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "06.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "06.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 61,
    name: "Ramboo Chicken",
    slug: "ramboo-chicken",
    heroImage: "/images/ramboo_hero.webp",
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
      whatsapp: "085800008696",
      email: "-",
      instagram: "ramboochicken",
    },
    menus: [
      {
        name: "Dada Ramboo Fighter",
        description: "Ayam goreng tepung dengan sambal pedas khas Kudus.",
        price: "Rp 23.000",
        image: "/images/ramboo_menu1.webp",
      },
      {
        name: "Basic Breash",
        description: "Ayam bakar dengan olesan madu manis gurih.",
        price: "Rp 20.000",
        image: "/images/ramboo_menu2.webp",
      },
      {
        name: "Double Chicken",
        description: "Pedasnya nampol dengan sambal korek khas Ramboo Chicken.",
        price: "Rp 25.000",
        image: "/images/ramboo_menu3.webp",
      },
      {
        name: "Kentang Goreng",
        description: "Ayam renyah gurih cocok untuk semua kalangan.",
        price: "Rp 11.000",
        image: "/images/ramboo_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/ramboo_galerifoto1.webp",
      "/images/ramboo_galerifoto2.webp",
      "/images/ramboo_galerifoto3.webp",
      "/images/ramboo_galerifoto4.webp",
      "/images/ramboo_galerifoto5.webp",
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
    id: 62,
    name: "Es Gempol Pak Masykur",
    slug: "es-gempol-pak-masykur",
    heroImage: "/images/gempol_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Es Gempol Pak Masykur"',
    heroSubtitle:
      "Rasakan kesegaran es gempol dengan santan gurih, gula merah manis, dan aroma pandan yang khas. Minuman tradisional yang menyegarkan di setiap tegukan.",
    about:
      "<strong>Es Gempol Pak Masykur</strong> merupakan salah satu minuman tradisional khas Kudus yang telah melegenda. Terbuat dari gempol (bola-bola tepung beras) lembut, disajikan dengan kuah santan gurih dan sirup gula merah alami yang harum pandan. Kesegarannya menjadikan Es Gempol Pak Masykur selalu diburu pelanggan, terutama di hari yang panas.",
    rating: "4.7 / 5",
    description:
      "Es Gempol Pak Masykur menawarkan cita rasa klasik yang memadukan manisnya gula merah dan gurihnya santan. Cocok dinikmati kapan pun untuk melepas dahaga. Racikan tradisionalnya yang autentik menjadikan minuman ini tetap menjadi favorit lintas generasi di Kudus.",
    location: {
      address: " Magersari, Panjunan, Kudus",
      fullAddress:
        "5RQQ+G56, Jl. Kyai H. Wahid Hasyim, Magersari, Panjunan, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59317",
      mapsUrl: "https://maps.app.goo.gl/DDqdZESaGe87D5ev7",
      embedUrl:
        "https://www.google.com/maps?q=-6.8112212,110.8378874&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085640087033",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Putu Mayang",
        description:
          "Kue tradisional bertekstur kenyal dengan saus gula merah dan santan gurih, cocok dinikmati sebagai camilan manis yang menyegarkan.",
        price: "Rp 8.000",
        image: "/images/masykur_menu1.webp",
      },
      {
        name: "Nasi Kering",
        description:
          "Nasi lengkap dengan lauk tradisional khas rumahan, praktis untuk sarapan atau makan siang cepat dengan rasa autentik.",
        price: "Rp 12.000",
        image: "/images/masykur_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/masyur_galerifoto1.webp",
      "/images/masyur_galerifoto2.webp",
      "/images/masyur_galerifoto3.webp",
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
    id: 63,
    name: "Sultan Barber Top",
    slug: "sultan-barber-top",
    heroImage: "/images/sultanbarbertop_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Sultan Barber Top"',
    heroSubtitle:
      "Barbershop modern di Kudus yang menawarkan potongan rambut bergaya, layanan premium, dan suasana nyaman untuk semua kalangan.",
    description:
      "Sultan Barber Top adalah barbershop modern yang menjadi salah satu destinasi perawatan rambut pria terpopuler di Kudus. Dengan tim barber berpengalaman, tempat ini menghadirkan berbagai gaya potongan rambut terkini, pelayanan ramah, serta suasana santai dan bersih yang membuat pelanggan merasa nyaman.",
    about:
      "<strong>Sultan Barber Top</strong> adalah barbershop profesional yang mengutamakan kualitas layanan dan kenyamanan pelanggan. Berlokasi strategis di pusat kota Kudus, Sultan Barber Top menyediakan layanan potong rambut modern, shaving, hair wash, hingga styling dengan produk perawatan rambut terbaik. Mengusung konsep tempat yang cozy dan bergaya urban, barbershop ini menjadi pilihan utama bagi pria yang ingin tampil rapi dan stylish setiap hari.",
    rating: "5 / 5",
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
        image: "/images/sultanbarbertop_menu1.webp",
      },
      {
        name: "Haircut + Wash",
        description:
          "Potong rambut dilengkapi dengan cuci rambut agar hasil lebih maksimal dan segar.",
        price: "Rp 35.000",
        image: "/images/sultanbarbertop_menu1.webp",
      },
      {
        name: "Shaving / Beard Trim",
        description:
          "Cukur kumis atau janggut dengan hasil rapi dan aman menggunakan alat steril.",
        price: "Rp 20.000",
        image: "/images/sultanbarbertop_menu1.webp",
      },
      {
        name: "Hair Styling",
        description:
          "Penataan rambut menggunakan pomade atau wax premium agar tampil stylish setiap saat.",
        price: "Rp 15.000",
        image: "/images/sultanbarbertop_menu1.webp",
      },
    ],
    galleryImages: [
      "/images/sultanbarbertop_galerifoto1.webp",
      "/images/sultanbarbertop_galerifoto2.webp",
      "/images/sultanbarbertop_galerifoto3.webp",
      "/images/sultanbarbertop_galerifoto4.webp",
      "/images/sultanbarbertop_galerifoto5.webp",
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
  {
    id: 64,
    name: "Soto Kudus Bu Jatmi",
    slug: "soto-kudus-bu-jatmi",
    heroImage: "/images/sotokudusbujatmi_hero.webp",
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
        image: "/images/sotokudusbujatmi_menu1.webp",
      },
      {
        name: "Soto Ayam",
        description:
          "Soto ayam khas Kudus dengan suwiran ayam kampung dan taburan bawang goreng melimpah.",
        price: "Rp 15.000",
        image: "/images/sotokudusbujatmi_menu2.webp",
      },
      {
        name: "Perkedel Kentang",
        description:
          "Perkedel gurih renyah pelengkap soto yang dibuat dari kentang pilihan.",
        price: "Rp 4.000",
        image: "/images/sotokudusbujatmi_menu3.webp",
      },
      {
        name: "Es Kopyor",
        description:
          "Minuman segar dari kelapa kopyor asli yang cocok dinikmati setelah menyantap soto.",
        price: "Rp 25.000",
        image: "/images/sotokudusbujatmi_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/sotokudusbujatmi_galerifoto1.webp",
      "/images/sotokudusbujatmi_galerifoto2.webp",
      "/images/sotokudusbujatmi_galerifoto3.webp",
      "/images/sotokudusbujatmi_galerifoto4.webp",
      "/images/sotokudusbujatmi_galerifoto5.webp",
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
  id: 65,
  name: "Treend Steak Kudus",
  slug: "treend-steak-kudus",
  heroImage: "/images/treendsteak_hero.webp",
  heroTitle: 'Informasi Lengkap tentang Restoran "Treend Steak Kudus"',
  heroSubtitle:
    "Restoran steak di Kudus yang menyajikan berbagai pilihan steak lezat dengan cita rasa khas dan harga terjangkau.",
  about:
    "<strong>Treend Steak Kudus</strong> adalah restoran yang menyajikan aneka steak premium dengan suasana santai dan nyaman, cocok untuk makan bersama keluarga atau teman. Menggunakan bahan berkualitas dan saus khas yang menggugah selera.",
  description:
    "Nikmati pengalaman kuliner terbaik di Treend Steak Kudus dengan menu steak daging sapi, ayam, dan seafood dengan saus istimewa buatan sendiri.",
  rating: "4.3 / 5",
  location: {
    address: "Jl. Ganesha Raya No.2, Purwosari, Kudus",
    fullAddress:
      "Jl. Ganesha Raya No.2, Purwosari, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59316",
    mapsUrl: "https://maps.app.goo.gl/uT2SPtZR9objQjEn7",
    embedUrl:
      "https://www.google.com/maps?q=-6.803329,110.8261252&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "081227140405",
    email: "-",
    instagram: "treendsteakkudus",
  },
  menus: [
    {
      name: "Chicken Crispy Steak",
      description:
        "Potongan daging ayam crispy disajikan dengan saus lada hitam dan kentang goreng.",
      price: "Mulai dari Rp 15.000",
      image: "/images/treendsteak_menu1.webp",
    },
    {
      name: "Treend Steak",
      description:
        "Potongan daging sapi premium disajikan dengan saus spesial dan telur goreng.",
      price: "Mulai dari Rp 30.000",
      image: "/images/treendsteak_menu2.webp",
    },
  ],
  galleryImages: [
    "/images/treendsteak_galerifoto1.webp",
    "/images/treendsteak_galerifoto2.webp",
    "/images/treendsteak_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "10.00 - 21.00", isOpen: true },
    { day: "Selasa", hours: "10.00 - 21.00", isOpen: true },
    { day: "Rabu", hours: "10.00 - 21.00", isOpen: true },
    { day: "Kamis", hours: "10.00 - 21.00", isOpen: true },
    { day: "Jumat", hours: "10.00 - 21.00", isOpen: true },
    { day: "Sabtu", hours: "10.00 - 21.00", isOpen: true },
    { day: "Minggu", hours: "10.00 - 21.00", isOpen: true },
  ],
},
{
  id: 66,
  name: "Larees Jaya Electronics",
  slug: "larees-jaya-electronics",
  heroImage: "/images/lareesjaya_hero.webp",
  heroTitle: 'Informasi Lengkap tentang Toko "Larees Jaya Electronics"',
  heroSubtitle:
    "Toko elektronik terpercaya di Kudus yang menyediakan berbagai kebutuhan rumah tangga dan peralatan elektronik modern.",
  about:
    "<strong>Larees Jaya Electronics</strong> merupakan toko yang menjual beragam produk elektronik seperti TV, kulkas, mesin cuci, kipas angin, dan perlengkapan rumah tangga lainnya dengan harga bersaing.",
  description:
    "Tempat terpercaya untuk mendapatkan produk elektronik berkualitas di Kudus. Menyediakan layanan ramah dan garansi resmi.",
  rating: "4.9 / 5",
  location: {
    address: "Jl. Sunan Kudus, Kudus, Demaan, Kudus",
    fullAddress:
      "Jl. Sunan Kudus, Kudus, Demaan, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59313",
    mapsUrl: "https://maps.app.goo.gl/NJvA9WyUJWy2BfRdA",
    embedUrl:
      "https://www.google.com/maps?q=-6.8077597,110.8395403&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "0291438130",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Elektronik Rumah Tangga",
      description:
        "Beragam produk elektronik seperti TV, kulkas, mesin cuci, dan kipas angin dari berbagai merek ternama.",
      price: "Mulai dari Rp 300.000",
      image: "/images/lareesjaya_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/lareesjaya_galerifoto1.webp",
    "/images/lareesjaya_galerifoto2.webp",
    "/images/lareesjaya_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "08.00 - 20.00", isOpen: true },
    { day: "Selasa", hours: "08.00 - 20.00", isOpen: true },
    { day: "Rabu", hours: "08.00 - 20.00", isOpen: true },
    { day: "Kamis", hours: "08.00 - 20.00", isOpen: true },
    { day: "Jumat", hours: "08.00 - 20.00", isOpen: true },
    { day: "Sabtu", hours: "08.00 - 20.00", isOpen: true },
    { day: "Minggu", hours: "08.30 - 14.00", isOpen: true },
  ],
},
{
  id: 67,
  name: "Es Coklat Cokot Kudus",
  slug: "es-coklat-cokot-kudus",
  heroImage: "/images/escoklatcokotkudus_hero.webp",
  heroTitle: 'Informasi Lengkap tentang "Es Coklat Cokot Kudus"',
  heroSubtitle:
    "Kafe cokelat di Kudus dengan minuman cokelat dingin dan varian topping kekinian.",
  about:
    "<strong>Es Coklat Cokot Kudus</strong> menghadirkan minuman cokelat dengan rasa autentik dan topping beragam seperti keju, oreo, dan boba. Cocok untuk penggemar cokelat sejati.",
  description:
    "Tempat nongkrong favorit anak muda Kudus dengan harga terjangkau dan suasana santai.",
  rating: "4.1 / 5",
  location: {
    address: "Pejaten, Langgardalem, Kudus",
    fullAddress:
      "Jl. Kyai Noorbadri Syahid, Pejaten, Langgardalem, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah",
    mapsUrl: "https://maps.app.goo.gl/SSaBMBhcWiy7Fddw5",
    embedUrl:
      "https://www.google.com/maps?q=-6.8056922,110.8357389&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "-",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Es Coklat Cokot",
      description:
        "Cokelat kental dingin dengan campuran bubuk oreo dan susu segar.",
      price: "Rp 15.000",
      image: "/images/escoklat_menu1.webp",
    },
    {
      name: "Roti slice",
      description:
        "Roti yang enak dipotong.",
      price: "Rp 2.000",
      image: "/images/escoklat_menu2.webp",
    },
  ],
  galleryImages: [
    "/images/escoklat_galerifoto1.webp",
    "/images/escoklat_galerifoto2.webp",
    "/images/escoklat_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
    { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
    { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
    { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
    { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
    { day: "Sabtu", hours: "09.00 - 21.00", isOpen: true },
    { day: "Minggu", hours: "09.00 - 21.00", isOpen: true },
  ],
},
{
  id: 68,
  name: "Richie Store Kudus",
  slug: "richie-store-kudus",
  heroImage: "/images/richiestore_hero.webp",
  heroTitle: 'Informasi Lengkap tentang Toko "Richie Store Kudus"',
  heroSubtitle:
    "Toko pakaian muslim dan fashion modern di Kudus dengan koleksi trendi dan harga bersahabat.",
  about:
    "<strong>Richie Store Kudus</strong> menyediakan busana muslim dan kasual untuk pria dan wanita. Koleksinya mencakup gamis, kemeja, dan kaus dengan desain simpel namun elegan.",
  description:
    "Toko fashion pilihan masyarakat Kudus untuk pakaian bergaya modern namun tetap sopan.",
  rating: "4.9 / 5",
  location: {
    address: "Jl. Sunan Muria No.4, Barongan, Kudus",
    fullAddress:
      "Jl. Sunan Muria No.4, Barongan, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59313",
    mapsUrl: "https://maps.app.goo.gl/qqkTf71a1vBUvoYq6",
    embedUrl:
      "https://www.google.com/maps?q=-6.8062037,110.8431931&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "-",
    email: "-",
    instagram: "richiestorepati",
  },
  menus: [
    {
      name: "Busana Pria & Wanita",
      description:
        "Koleksi pakaian modern dan modest wear dengan bahan berkualitas dan desain kekinian.",
      price: "Mulai dari Rp 75.000",
      image: "/images/richie_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/richie_galerifoto1.webp",
    "/images/richie_galerifoto2.webp",
    "/images/richie_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "09.00 - 21.30", isOpen: true },
    { day: "Selasa", hours: "09.00 - 21.30", isOpen: true },
    { day: "Rabu", hours: "09.00 - 21.30", isOpen: true },
    { day: "Kamis", hours: "09.00 - 21.30", isOpen: true },
    { day: "Jumat", hours: "09.00 - 21.30", isOpen: true },
    { day: "Sabtu", hours: "09.00 - 21.30", isOpen: true },
    { day: "Minggu", hours: "09.00 - 21.30", isOpen: true },
  ],
},
  // MEJOBO
  {
    id: 69,
    name: "XGAM_Tech",
    slug: "xgam-tech",
    heroImage: "/images/xgamtech_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "XGAM Tech"',
    heroSubtitle:
      "Layanan profesional untuk perbaikan, upgrade, dan perawatan komputer maupun laptop dengan harga bersahabat.",
    description:
      "XGAM_Tech melayani servis komputer dan laptop, instal ulang sistem, upgrade RAM atau SSD, pembersihan kipas, serta perbaikan software dan hardware. Mengutamakan kejujuran, ketelitian, dan kepuasan pelanggan, menjadikan XGAM_Tech sebagai mitra terpercaya untuk menjaga performa perangkat Anda tetap optimal.",
    about:
      "<strong>XGAM_Tech</strong> adalah penyedia jasa servis komputer dan laptop yang berlokasi di Kudus. Menawarkan layanan seperti instalasi sistem operasi, perbaikan hardware, pembersihan perangkat, hingga upgrade komponen. Dengan tenaga teknisi berpengalaman dan pelayanan cepat, XGAM_Tech menjadi pilihan tepat untuk kebutuhan perangkat kerja maupun gaming Anda.",
    rating: "5 / 5",
    location: {
      address: " Pendem Kulon, Jepang, Kudus",
      fullAddress:
        "5V9C+QFC, Pendem Kulon, Jepang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah",
      mapsUrl: "https://maps.app.goo.gl/47uCsbQB5qGVC1BJ6",
      embedUrl:
        "https://www.google.com/maps?q=-6.8305573,110.8711491&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081229484129",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Servis Laptop Mati Total",
        description:
          "Perbaikan laptop yang tidak bisa menyala akibat kerusakan hardware, power supply, atau motherboard.",
        price: "Mulai Rp 250.000",
        image: "/images/xgam_menu1.webp",
      },
      {
        name: "Pembersihan & Ganti Pasta Thermal",
        description:
          "Membersihkan debu dan mengganti pasta thermal agar performa dan suhu laptop tetap optimal.",
        price: "Rp 100.000",
        image: "/images/xgam_menu2.webp",
      },
      {
        name: "Rakit PC Custom",
        description:
          "Layanan konsultasi dan perakitan PC sesuai kebutuhan Anda — untuk gaming, editing, atau kantor.",
        price: "Mulai Rp 200.000",
        image: "/images/xgam_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/xgam_galerifoto1.webp",
      "/images/xgam_galerifoto2.webp",
      "/images/xgam_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "07.00 - 23.00", isOpen: true },
      { day: "Selasa", hours: "07.00 - 23.00", isOpen: true },
      { day: "Rabu", hours: "07.00 - 23.00", isOpen: true },
      { day: "Kamis", hours: "07.00 - 23.00", isOpen: true },
      { day: "Jumat", hours: "07.00 - 23.00", isOpen: true },
      { day: "Sabtu", hours: "07.00 - 23.00", isOpen: true },
      { day: "Minggu", hours: "07.00 - 23.00", isOpen: true },
    ],
  },
  {
    id: 70,
    name: "Jasa Las dan Bubut Mulyo Rejo",
    slug: "jasa-las-dan-bubut-mulyo-rejo",
    heroImage: "/images/jasalas_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Jasa Las dan Bubut Mulyo Rejo"',
    heroSubtitle:
      "Melayani berbagai pekerjaan las, bubut, dan perakitan logam dengan hasil kuat, rapi, dan presisi.",
    description:
      "Layanan las dan bubut untuk kebutuhan industri dan rumah tangga.",
    about:
      "<strong>Jasa Las dan Bubut Mulyo Rejo</strong> merupakan bengkel logam profesional di Kudus yang melayani berbagai kebutuhan pengerjaan logam, mulai dari las besi, stainless, hingga bubut komponen mesin. Dengan tenaga ahli berpengalaman dan peralatan lengkap, Mulyo Rejo siap memberikan hasil pengerjaan yang kuat, rapi, dan sesuai permintaan pelanggan.",
    rating: "5 / 5",
    location: {
      address: " Jln.Raya 7km Rau, Kalangan, Tenggeles, Kudus",
      fullAddress:
        "Jln.Raya 7km Rau, Kalangan, Tenggeles, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
      mapsUrl: "https://maps.app.goo.gl/uju4fb2GhkvGQ3Wy8",
      embedUrl:
        "https://www.google.com/maps?q=-6.8063972,110.8913509&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085740789456",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Jasa Las Besi & Konstruksi",
        description:
          "Melayani pembuatan dan perbaikan pagar, kanopi, tralis, serta rangka besi untuk berbagai kebutuhan industri maupun rumah tangga.",
        price: "Mulai Rp 150.000",
        image: "/images/mulyorejo_menu1.webp",
      },
      {
        name: "Pembuatan Mainan Anak dari Besi",
        description:
          "Menerima pesanan ayunan, jungkat-jungkit, dan perosotan dari bahan besi berkualitas — aman, kuat, dan berwarna menarik.",
        price: "Mulai Rp 300.000",
        image: "/images/mulyorejo_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/mulyorejo_galerifoto1.webp",
      "/images/mulyorejo_galerifoto2.webp",
      "/images/mulyorejo_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 16.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 16.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 16.00", isOpen: true },
      { day: "Jumat", hours: "Tutup", isOpen: close },
      { day: "Sabtu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 16.00", isOpen: true },
    ],
  },

  {
    id: 71,
    name: "Putra Kalimosodo",
    slug: "putra-kalimosodo",
    heroImage: "/images/kalimosodo_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Putra Kalimosodo"',
    heroSubtitle:
      "Menyediakan berbagai bahan bangunan serta layanan angkut material dengan armada lengkap dan tepat waktu.",
    description:
      "Putra Kalimosodo melayani penjualan berbagai jenis material seperti pasir, batu, semen, dan sirtu. Selain itu juga menyediakan jasa transportasi material ke berbagai wilayah Kudus dan sekitarnya dengan pelayanan cepat, aman, dan profesional.",
    about:
      "<strong>Putra Kalimosodo</strong> merupakan penyedia material bangunan dan jasa transportasi yang berpengalaman di wilayah Kudus. Dengan armada kendaraan yang terawat dan tenaga kerja berpengalaman, kami berkomitmen memberikan layanan terbaik dalam pengiriman bahan bangunan, baik untuk proyek kecil maupun besar.",
    rating: "5 / 5",
    location: {
      address: " Gg. Bhakti No.1, Gulang Kulon, Kudus",
      fullAddress:
        "Gg. Bhakti No.1, Gulang Kulon, Gulang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
      mapsUrl: "https://maps.app.goo.gl/o4u4BmfXfeTPDT5P6",
      embedUrl:
        "https://www.google.com/maps?q=-6.8405634,110.8598776&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "085899447002",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Pasokan Material Bangunan Dan Mengantarkan",
        description:
          "Menyediakan berbagai material seperti pasir, batu kali, semen, dan sirtu, lengkap dengan layanan angkut untuk kebutuhan proyek konstruksi.",
        price: "Harga bervariasi sesuai jenis material dan jarak pengiriman",
        image: "/images/kalimosodo_menu1.webp",
      },
      {
        name: "Jasa Transportasi",
        description:
          " Melayani jasa transportasi umum maupun travel antar kota dengan armada nyaman, bersih, dan pengemudi berpengalaman.",
        price: "Mulai Rp 150.000 per trip",
        image: "/images/kalimosodo_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/kalimosodo_galerifoto1.webp",
      "/images/kalimosodo_galerifoto2.webp",
      "/images/kalimosodo_galerifoto3.webp",
      "/images/kalimosodo_galerifoto4.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 16.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 16.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 16.00", isOpen: true },
      { day: "Jumat", hours: "Tutup", isOpen: close },
      { day: "Sabtu", hours: "08.00 - 16.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 16.00", isOpen: true },
    ],
  },
  {
    id: 72,
    name: "Ikan Bakar Nasuky Mubarok Jepang",
    slug: "ikan-bakar-nasuky-mubarok-jepang",
    heroImage: "/images/ikanbakar_hero.webp",
    heroTitle:
      'Informasi Lengkap tentang UMKM "Ikan Bakar Nasuky Mubarok Jepang"',
    heroSubtitle:
      "Nikmati ikan bakar lezat dengan bumbu rempah khas dan suasana makan nyaman di daerah Jepang, Kudus.",
    description:
      "Ikan Bakar Nasuky Mubarok Jepang dikenal dengan sajian ikan bakar segar yang dimasak menggunakan bumbu rempah tradisional khas Nusantara. Selain ikan bakar, tersedia pula berbagai pilihan menu laut lainnya dengan cita rasa gurih dan pedas yang menggugah selera.",
    about:
      "<strong>Ikan Bakar Nasuky Mubarok Jepang</strong> adalah tempat makan populer di kawasan Jepang, Kudus, yang menyajikan ikan bakar segar dengan bumbu khas. Setiap hidangan disajikan dengan sambal dan lalapan segar, menjadikannya favorit bagi keluarga maupun rombongan yang ingin menikmati hidangan laut dengan cita rasa autentik.",
    rating: "4.1 / 5",
    location: {
      address: " Jepang, Kudus",
      fullAddress:
        "5VGC+95R, Jepang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
      mapsUrl: "https://maps.app.goo.gl/9VqKA9v83eoFPnGF9",
      embedUrl:
        "https://www.google.com/maps?q=-6.8240079,110.8703812&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081232281179",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Ikan Gurame Bakar",
        description:
          "Gurame segar dibakar dengan bumbu kecap manis dan rempah pilihan, menghasilkan cita rasa gurih dan sedikit smokey khas Nusantara.",
        price: "Rp 85.000",
        image: "/images/nasuky_menu1.webp",
      },
      {
        name: "Gurame Goreng",
        description:
          " Ikan segar digoreng garing hingga keemasan, disajikan dengan sambal terasi pedas dan lalapan segar.",
        price: "Rp 85.000",
        image: "/images/nasuky_menu2.webp",
      },
      {
        name: "Ikan Bakar Ca Kangkung",
        description:
          " Perpaduan sempurna antara ikan bakar berbumbu khas dan tumis kangkung pedas gurih yang menggugah selera.",
        price: "Rp 93.000",
        image: "/images/nasuky_menu3.webp",
      },
      {
        name: "Nila Bakar Manis",
        description:
          " Ikan nila dibakar dengan olesan bumbu manis gurih khas Mubarok, cocok dinikmati bersama nasi hangat dan sambal bawang.",
        price: "Rp 70.000",
        image: "/images/nasuky_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/nasuky_galerifoto1.webp",
      "/images/nasuky_galerifoto2.webp",
      "/images/nasuky_galerifoto3.webp",
      "/images/nasuky_galerifoto4.webp",
      "/images/nasuky_galerifoto5.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 21.00", isOpen: true },
    ],
  },
  {
    id: 73,
    name: "RM Bu Sarah",
    slug: "rm-bu-sarah",
    heroImage: "/images/rmbusarah_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "RM Bu Sarah"',
    heroSubtitle:
      "Nikmati berbagai hidangan rumahan khas Jawa dengan cita rasa autentik dan suasana nyaman seperti di rumah sendiri.",
    description:
      "Rumah Makan Bu Sarah dikenal sebagai tempat makan yang menyajikan aneka masakan rumahan khas Jawa dengan rasa lezat, porsi pas, dan harga terjangkau. Menu favorit seperti ayam goreng, sayur lodeh, tempe bacem, dan sambal terasi selalu menjadi pilihan pelanggan setia.",
    about:
      "<strong>Rumah Makan Bu Sarah</strong> merupakan salah satu rumah makan populer di Kudus yang menyajikan menu masakan rumahan khas Jawa. Dengan cita rasa yang otentik dan suasana santai, tempat ini menjadi pilihan tepat untuk makan siang bersama keluarga atau rekan kerja.",
    rating: "4.3 / 5",
    location: {
      address: " Jl. Lingkar Timur, Jepang, Kudus",
      fullAddress:
        "5VGG+772, Jl. Lingkar Timur, Jepang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
      mapsUrl: "https://maps.app.goo.gl/ebhzkyxwckhUqQUm7",
      embedUrl:
        "https://www.google.com/maps?q=-6.8243528,110.8756417&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "089647857231",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Kepala Manyung",
        description:
          "Menu andalan RM Bu Sarah yang terkenal dengan kepala manyung empuk dan kuah rica pedas gurih khas pesisir. Cocok untuk pecinta makanan berkuah rempah.",
        price: "Rp 28.000",
        image: "/images/sarah_menu1.webp",
      },
      {
        name: "Mendoan Cinta",
        description:
          " Tempe tipis dibalut tepung berbumbu lalu digoreng setengah matang, disajikan hangat dengan sambal kecap dan cabai rawit segar.",
        price: "Rp 8.000",
        image: "/images/sarah_menu2.webp",
      },
      {
        name: "Kakap Godog",
        description:
          " Ikan kakap segar dimasak dengan bumbu godog khas Jawa Tengah — gurih, sedikit pedas, dan beraroma rempah kuat.",
        price: "Rp 25.000",
        image: "/images/sarah_menu3.webp",
      },
      {
        name: "Pecel Lele",
        description:
          " Lele goreng garing disajikan bersama sambal tomat pedas dan lalapan segar. Menu sederhana yang selalu jadi favorit pengunjung.",
        price: "Rp 20.000",
        image: "/images/sarah_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/sarah_galerifoto1.webp",
      "/images/sarah_galerifoto2.webp",
      "/images/sarah_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "06.00 - 19.30", isOpen: true },
      { day: "Selasa", hours: "06.00 - 19.30", isOpen: true },
      { day: "Rabu", hours: "06.00 - 19.30", isOpen: true },
      { day: "Kamis", hours: "06.00 - 19.30", isOpen: true },
      { day: "Jumat", hours: "06.00 - 19.30", isOpen: true },
      { day: "Sabtu", hours: "06.00 - 19.30", isOpen: true },
      { day: "Minggu", hours: "06.00 - 19.30", isOpen: true },
    ],
  },
  {
  id: 74,
  name: "Sate Kambing Pak Brewok Pekeng",
  slug: "sate-kambing-pak-brewok",
  heroImage: "/images/satekambing_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Sate Kambing Pak Brewok Pekeng"',
  heroSubtitle:
    "Warung sate kambing di Kudus yang menyajikan sate kambing empuk dengan bumbu lezat dan cita rasa khas lokal.",
  about:
    "<strong>Sate Kambing Pak Brewok Pekeng</strong> merupakan rumah makan yang berlokasi di Jl. Budi Utomo No.158, Pekeng, Gulang, Kec. Mejobo, Kabupaten Kudus. Menyajikan sate kambing dan gule kambing dengan resep tradisional dan pelayanan hangat. :contentReference[oaicite:0]{index=0}",
  description:
    "Nikmati sate kambing empuk dan gule kambing gurih di Sate Kambing Pak Brewok Pekeng — cocok untuk makan bersama keluarga maupun teman.",
  rating: "4.3 / 5",
  location: {
    address: "Jl. Budi Utomo No.158, Pekeng, Gulang",
    fullAddress:
      "Jl. Budi Utomo No.158, Pekeng, Gulang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
    mapsUrl: "https://maps.app.goo.gl/Zigj7mhWSbVb673W8",
    embedUrl:
      "https://www.google.com/maps?q=-6.832874,110.8652271&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "081390443331",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
  name: "Sate Kambing",
  description:
    "Sate kambing muda yang dibakar dengan bumbu kecap, irisan bawang, dan sambal, disajikan bersama nasi atau lontong.",
  price: "Mulai dari Rp 30.000",
  image: "/images/satekambing_menu1.webp",
},
{
  name: "Gule Kambing",
  description:
    "Kuah gule kambing beraroma rempah dengan daging yang lembut, cocok dinikmati selagi panas.",
  price: "Mulai dari Rp 25.000",
  image: "/images/satekambing_menu2.webp",
},
{
  name: "Tongseng Kepala Kambing",
  description:
    "Tongseng kepala kambing dengan kuah kental manis-gurih khas pekeng, isi daging dan tulang lunak yang kaya rasa.",
  price: "Mulai dari Rp 28.000",
  image: "/images/satekambing_menu3.webp",
},
  ],
  galleryImages: [
    "/images/pakbrewok_galerifoto1.webp",
    "/images/pakbrewok_galerifoto2.webp",
    "/images/pakbrewok_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "10.30 - 21.00", isOpen: true },
    { day: "Selasa", hours: "10.30 - 21.00", isOpen: true },
    { day: "Rabu", hours: "10.30 - 21.00", isOpen: true },
    { day: "Kamis", hours: "10.30 - 21.00", isOpen: true },
    { day: "Jumat", hours: "10.30 - 21.00", isOpen: true },
    { day: "Sabtu", hours: "10.30 - 21.00", isOpen: true },
    { day: "Minggu", hours: "10.30 - 21.00", isOpen: true },
  ],
},
{
  id: 75,
  name: "Loh Jinawi Olshop (Lapak Gelang Tasbih)",
  slug: "loh-jinawi",
  heroImage: "/images/lohjinawi_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Loh Jinawi Olshop (Lapak Gelang Tasbih)"',
  heroSubtitle:
    "Toko barang antik dan aksesoris tradisional di Kudus yang menawarkan gelang tasbih dan koleksi unik lainnya.",
  about:
    "<strong>Loh Jinawi Olshop (Lapak Gelang Tasbih)</strong> merupakan toko yang berlokasi di Bancak, Payaman, Mejobo, Kabupaten Kudus. Menyediakan gelang tasbih, barang antik, dan aksesoris tradisional dengan harga bersahabat dan koleksi eksklusif. :contentReference[oaicite:2]{index=2}",
  description:
    "Menjelajahi koleksi unik barang antik dan aksesoris tradisional di Loh Jinawi Olshop — cocok bagi kolektor maupun penggemar item tradisional.",
  rating: "5 / 5",
  location: {
    address: "Bancak, Payaman Kudus",
    fullAddress:
      "5V6F+W2X, Bancak, Payaman, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
    mapsUrl: "https://maps.app.goo.gl/f7UHSCHhTrWC2Kjx5",
    embedUrl:
      "https://www.google.com/maps?q=-6.8376295,110.8726151&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "081390784335",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Gelang Tasbih & Antik",
      description:
        "Koleksi gelang tasbih kayu, batu, dan aksesoris tradisional serta barang antik pilihan.",
      price: "Mulai dari Rp 40.000",
      image: "/images/lohjinawi_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/lohjinawi_galerifoto1.webp",
    "/images/lohjinawi_galerifoto2.webp",
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
  id: 76,
  name: "Toko Auralia Jaya",
  slug: "toko-auralia",
  heroImage: "/images/tokoauralia_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Toko Auralia Jaya"',
  heroSubtitle:
    "Toko swalayan di Kudus yang menyediakan berbagai kebutuhan sehari-hari mulai dari sembako hingga perlengkapan rumah tangga.",
  about:
    "<strong>Toko Auralia Jaya</strong> merupakan swalayan yang berlokasi di Mejobo, Kudus. Menyediakan berbagai bahan pokok, alat rumah tangga, minuman, dan kebutuhan harian lengkap dalam satu tempat.",
  description:
    "Toko Auralia Jaya menawarkan belanja praktis dan cepat dengan produk lengkap untuk kebutuhan keluarga, mulai dari bahan makanan hingga alat kebersihan rumah.",
  rating: "4.3 / 5",
  location: {
    address: "Pendem Kulon, Jepang, Kudus",
    fullAddress:
      "Pendem Kulon, Jepang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
    mapsUrl: "https://maps.app.goo.gl/U5pSxKWHwwZKqAfk7",
    embedUrl:
      "https://www.google.com/maps?q=-6.82967,110.86641&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "087805412326",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Paket Sembako & Rumah Tangga",
      description:
        "Gabungan bahan makanan pokok serta perlengkapan rumah tangga seperti sabun, deterjen, dan alat kebersihan.",
      price: "Mulai dari Rp 20.000",
      image: "/images/tokoaurelia_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/tokoauralia_galerifoto1.webp",
    "/images/tokoauralia_galerifoto2.webp",
    "/images/tokoauralia_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "08.00 - 21.30", isOpen: true },
    { day: "Selasa", hours: "08.00 - 21.30", isOpen: true },
    { day: "Rabu", hours: "08.00 - 21.30", isOpen: true },
    { day: "Kamis", hours: "08.00 - 21.30", isOpen: true },
    { day: "Jumat", hours: "08.00 - 21.30", isOpen: true },
    { day: "Sabtu", hours: "08.00 - 21.30", isOpen: true },
    { day: "Minggu", hours: "08.00 - 21.30", isOpen: true },
  ],
},
{
  id: 77,
  name: "Sekar Modiste",
  slug: "sekar-modiste",
  heroImage: "/images/sekar_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Sekar Modiste"',
  heroSubtitle:
    "Toko pakaian wanita di Kudus yang menyediakan berbagai busana dan layanan jahit/modifikasi dengan desain elegan.",
  about:
    "<strong>Sekar Modiste</strong> merupakan butik dan jasa jahit yang berlokasi di Mejobo, Kudus. Menyediakan busana wanita siap pakai, serta layanan jahit dan modifikasi sesuai permintaan pelanggan.",
  description:
    "Sekar Modiste membantu Anda tampil percaya diri dengan model pakaian wanita yang disesuaikan, mulai dari casual hingga formal, lengkap dengan layanan jahit profesional.",
  rating: "4.8 / 5",
  location: {
    address: "Jepang, Kudus",
    fullAddress:
      "Unnamed Road, Jepang, Kec. Mejobo, Kabupaten Kudus, Jawa Tengah 59381",
    mapsUrl: "https://maps.app.goo.gl/bfh9QtPPVyCbt5zx9",
    embedUrl:
      "https://www.google.com/maps?q=-6.8245474,110.8704026&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "-",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Busana & Jasa Jahit",
      description:
        "Pilihan dress, blouse, tunik, dan layanan jahit/ubah sesuai ukuran dan permintaan.",
      price: "Mulai dari Rp 80.000",
      image: "/images/sekar_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/sekar_galerifoto1.webp",
    "/images/sekar_galerifoto2.webp",
    "/images/sekar_galerifoto3.webp",
    "/images/sekar_galerifoto4.webp",
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
  id: 78,
  name: "Hasna Fashion 01",
  slug: "hasna-fashion",
  heroImage: "/images/hasna_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Hasna Fashion 01"',
  heroSubtitle:
    "Toko pakaian muslim dan modern di Kudus yang menyediakan koleksi busana wanita dengan harga terjangkau.",
  about:
    "<strong>Hasna Fashion 01</strong> merupakan toko pakaian muslim yang berlokasi di Mejobo, Kudus. Menyediakan gamis, tunik, dan hijab dengan desain modern serta bahan nyaman untuk wanita muda hingga dewasa.",
  description:
    "Hasna Fashion 01 hadir untuk melengkapi gaya wanita muslimah dengan pilihan busana syar’i dan kasual dalam satu tempat belanja yang nyaman.",
  rating: "4.5 / 5",
  location: {
    address: "Jalan Suryo Kusumo Gang 12, Jepang, Kudus",
    fullAddress:
      "Jalan Suryo Kusumo Gang 12, Jepang, RT.01/RW.10, Mejobo, Kabupaten Kudus",
    mapsUrl: "https://maps.app.goo.gl/ZSPbCmwMSsy1sy6G8",
    embedUrl:
      "https://www.google.com/maps?q=-6.8268955,110.8739949&hl=id&z=17&output=embed",
  },
  contact: {
    whatsapp: "087828396335",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Busana Muslim Wanita",
      description:
        "Koleksi gamis, tunik, hijab & aksesori wanita dengan desain kekinian dan bahan nyaman.",
      price: "Mulai dari Rp 65.000",
      image: "/images/hasnafashion_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/hasnafashion_galerifoto1.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "07.30 - 21.00", isOpen: true },
    { day: "Selasa", hours: "07.30 - 21.00", isOpen: true },
    { day: "Rabu", hours: "07.30 - 21.00", isOpen: true },
    { day: "Kamis", hours: "07.30 - 21.00", isOpen: true },
    { day: "Jumat", hours: "07.30 - 21.00", isOpen: true },
    { day: "Sabtu", hours: "07.30 - 21.00", isOpen: true },
    { day: "Minggu", hours: "07.30 - 21.00", isOpen: true },
  ],
},
  // UNDAAN
  {
    id: 79,
    name: "Queen Seblak Prasmanan",
    slug: "queen-seblak-prasmanan",
    heroImage: "/images/queenseblak_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Queen Seblak Prasmanan"',
    heroSubtitle:
      "Rasakan sensasi seblak pedas gurih dengan berbagai pilihan topping yang bisa kamu ambil sesuka hati.",
    description:
      "Queen Seblak Prasmanan menawarkan konsep seblak prasmanan pertama di Kudus, di mana pelanggan bisa memilih sendiri bahan dan tingkat kepedasannya. Dengan kuah gurih pedas khas Bandung dan topping melimpah seperti bakso, sosis, ceker, siomay, hingga kerupuk, tempat ini jadi favorit anak muda dan pencinta pedas.",
    about:
      "<strong>Queen Seblak Prasmanan</strong> hadir untuk pecinta seblak dengan konsep unik dan modern. Setiap pengunjung bisa meracik seblak sesuai selera, mulai dari tingkat pedas, jenis kuah, hingga topping. Dengan suasana tempat yang santai dan harga bersahabat, Queen Seblak jadi pilihan tepat untuk nongkrong sambil menikmati seblak pedas nikmat.",
    rating: "4.4 / 5",
    location: {
      address: " Kampek Lor, Kalirejo, Kudus",
      fullAddress:
        "3QCR+R9R, Kampek Lor, Kalirejo, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
      mapsUrl: "https://maps.app.goo.gl/MLtSm3m9YzNcH6xdA",
      embedUrl:
        "https://www.google.com/maps?q=-6.9278993,110.7909045&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "085278090870",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Seblak Original",
        description:
          "Seblak khas Bandung dengan kuah pedas gurih, isi kerupuk, telur, dan bumbu kencur yang menggugah selera.",
        price: "Rp 12.000",
        image: "/images/queenseblak_menu1.webp",
      },
      {
        name: "Seblak Aci",
        description:
          "Perpaduan kenyalnya aci, kerupuk, dan topping sederhana dengan kuah pedas creamy yang bikin nagih.",
        price: "Rp 15.000",
        image: "/images/queenseblak_menu2.webp",
      },
      {
        name: "Seblak Bakso",
        description:
          "Kuah seblak pedas gurih dengan tambahan bakso sapi empuk dan topping khas Queen Seblak Prasmanan.",
        price: "Rp 18.000",
        image: "/images/queenseblak_menu3.webp",
      },
      {
        name: "Seblak Sayur",
        description:
          "Seblak sehat dengan isian sayur segar, telur, dan kerupuk dalam kuah pedas gurih yang hangat di perut.",
        price: "Rp 16.000",
        image: "/images/queenseblak_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/queenseblak_galerifoto1.webp",
      "/images/queenseblak_galerifoto2.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 21.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 21.00", isOpen: true },
    ],
  },
  {
    id: 80,
    name: "Ayam Geprek Mak Ginting",
    slug: "ayam-geprek-mak-ginting",
    heroImage: "/images/geprekmakginting_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Ayam Geprek Mak Ginting"',
    heroSubtitle:
      "Ayam goreng renyah yang digeprek dengan sambal super pedas khas Mak Ginting. Cocok buat pecinta pedas sejati!",
    description:
      "Ayam Geprek Mak Ginting dikenal dengan sambalnya yang meledak di lidah tapi tetap nikmat. Dengan pilihan level pedas, lauk tambahan seperti tahu tempe, dan harga yang ramah di kantong, tempat ini jadi favorit anak muda Kudus untuk makan siang maupun malam.",
    about:
      "<strong>Ayam Geprek Mak Ginting</strong> menyajikan ayam goreng tepung yang digeprek bersama sambal ulek khas yang pedasnya bisa disesuaikan selera. Selain ayam, tersedia juga berbagai lauk pelengkap seperti tempe, tahu, dan terong goreng yang makin lezat jika disantap dengan nasi hangat.",
    rating: "4.9 / 5",
    location: {
      address: " Gg. Manggis, Kampek Lor, Kalirejo, Kudus",
      fullAddress:
        "3QCR+H6H, Gg. Manggis, Kampek Lor, Kalirejo, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
      mapsUrl: "https://maps.app.goo.gl/qFtBBS2GG2uW28Bt5",
      embedUrl:
        "https://www.google.com/maps?q=-6.9285735,110.7906047&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "-",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Ayam Geprek Pedas Manis",
        description:
          "Ayam goreng krispi disiram sambal pedas manis khas Mak Ginting, perpaduan rasa gurih, pedas, dan sedikit manis yang pas di lidah.",
        price: "Rp 10.000",
        image: "/images/makginting_menu1.webp",
      },
      {
        name: "Mie Geprek Komplit",
        description:
          "Mie gurih disajikan dengan ayam geprek, telur mata sapi, dan sambal pilihan — cocok untuk pecinta pedas dan porsi kenyang.",
        price: "Rp 12.000",
        image: "/images/makginting_menu2.webp",
      },
      {
        name: "Seblak Biasa",
        description:
          "Seblak khas Mak Ginting dengan kuah pedas gurih, isi kerupuk, telur, dan topping sederhana yang menggugah selera.",
        price: "Rp 8.000",
        image: "/images/makginting_menu3.webp",
      },
      {
        name: "Ayam Geprek",
        description:
          "Menu andalan Mak Ginting — ayam goreng tepung yang digeprek dengan sambal bawang pedas, disajikan bersama nasi hangat.",
        price: "Rp 8.000",
        image: "/images/makginting_menu4.webp",
      },
    ],
    galleryImages: [
      "/images/makginting_galerifoto1.webp",
      "/images/makginting_galerifoto2.webp",
      "/images/makginting_galerifoto3.webp",
      "/images/makginting_galerifoto4.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "09.00 - 22.00", isOpen: true },
      { day: "Selasa", hours: "09.00 - 22.00", isOpen: true },
      { day: "Rabu", hours: "09.00 - 22.00", isOpen: true },
      { day: "Kamis", hours: "09.00 - 22.00", isOpen: true },
      { day: "Jumat", hours: "09.00 - 22.00", isOpen: true },
      { day: "Sabtu", hours: "09.00 - 22.00", isOpen: true },
      { day: "Minggu", hours: "09.00 - 22.00", isOpen: true },
    ],
  },
  {
    id: 81,
    name: "Warung Sate & Gule Pak Sugiyo",
    slug: "warung-sate-dan-gule-pak-sugiyo",
    heroImage: "/images/warungsatedangule_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Warung Sate & Gule Pak Sugiyo"',
    heroSubtitle:
      "Nikmati sate kambing empuk dan gule gurih beraroma rempah yang selalu bikin pelanggan datang lagi.",
    description:
      "Warung Sate & Gule Pak Sugiyo sudah dikenal luas di Kudus sebagai tempat legendaris untuk menikmati sate kambing dan gule yang kaya rasa. Dagingnya empuk, bumbu kacangnya gurih manis, dan kuah gulenya kental beraroma rempah. Cocok untuk makan siang maupun malam bersama keluarga.",
    about:
      "<strong>Warung Sate & Gule Pak Sugiyo</strong> adalah destinasi kuliner legendaris di Undaan, Kudus, yang telah bertahan selama puluhan tahun berkat resep turun-temurun dan komitmen pada kualitas. Kami hanya menggunakan daging kambing muda pilihan — segar, tanpa bau, dan dipotong langsung setiap pagi — untuk menghasilkan sate yang empuk dan beraroma khas saat dibakar di atas arang. Bumbu kacangnya diracik secara tradisional dengan campuran kacang tanah sangrai, bawang, cabe, dan rempah rahasia, menghasilkan rasa gurih manis yang pas di lidah. Sedangkan gule kambing kami dimasak perlahan selama berjam-jam dengan santan kental, kapulaga, cengkeh, dan kayu manis, sehingga kuahnya kaya rempah, hangat, dan sangat cocok disantap dengan nasi putih atau lontong. Setiap porsi disajikan dengan acar mentimun, bawang merah, dan sambal kecap yang menambah kesegaran. Warung kami buka dari pagi hingga malam, selalu ramai dikunjungi keluarga, pekerja kantor, hingga wisatawan yang ingin merasakan kuliner asli Kudus. Datanglah dan nikmati tradisi rasa yang terjaga — karena di sini, setiap tusuk sate dan sendok gule adalah cerita tentang rumah dan kebersamaan.",
    rating: "4.9 / 5",
    location: {
      address: " Jl. Babalan - Prawoto, Kampek Lor, Kudus",
      fullAddress:
        "3QCR+95C, Jl. Babalan - Prawoto, Kampek Lor, Kalirejo, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
      mapsUrl: "https://maps.app.goo.gl/WkJAj3Ka8ZGoC7Wu5",
      embedUrl:
        "https://www.google.com/maps?q=-6.9290637,110.790406&hl=id&z=15&output=embed",
    },
    contact: {
      whatsapp: "081215470578",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Sate",
        description:
          "Sate kambing empuk dibakar dengan bumbu kecap manis, bawang, dan sedikit sambal, menghasilkan cita rasa gurih manis khas Kudus.",
        price: "Rp 25.000",
        image: "/images/sugiyo_menu1.webp",
      },
      {
        name: "Gule",
        description:
          "Gule kambing berkuah santan kental dengan rempah khas Jawa, disajikan hangat bersama nasi putih atau lontong.",
        price: "Rp 20.000",
        image: "/images/sugiyo_menu2.webp",
      },
    ],
    galleryImages: [
      "/images/sugiyo_galerifoto1.webp",
      "/images/msugiyo_galerifoto2.webp",
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
    id: 82,
    name: "MJ Teknik",
    slug: "mj-teknik",
    heroImage: "/images/mjteknik_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "MJ Teknik"',
    heroSubtitle:
      "Melayani instalasi listrik, servis pompa air, dan perbaikan berbagai peralatan rumah tangga dengan tenaga ahli berpengalaman.",
    description:
      "MJ Teknik menyediakan layanan profesional untuk instalasi listrik, perbaikan pompa air, servis sible, serta perbaikan peralatan rumah tangga dan tukang. Dengan tenaga teknisi berpengalaman dan pelayanan cepat, MJ Teknik menjadi mitra andalan untuk kebutuhan servis harian Anda di Kudus.",
    about:
      "<strong>MJ Teknik</strong> melayani berbagai kebutuhan teknis rumah tangga, mulai dari instalasi listrik baru, perbaikan pompa air dan sible, hingga servis peralatan rumah dan alat tukang. Didukung oleh teknisi yang ahli dan berpengalaman, MJ Teknik selalu mengutamakan ketepatan, keamanan, dan kepuasan pelanggan.",
    rating: "5 / 5",
    location: {
      address: " Kampek Lor, Kalirejo, Kudus",
      fullAddress:
        "3QFP+5R4, Kampek Lor, Kalirejo, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
      mapsUrl: "https://maps.app.goo.gl/58ZPsi3C7xu8rRTv8",
      embedUrl:
        "https://www.google.com/maps?q=-6.924919,110.7998945&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "081215504068",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Instalasi Listrik Rumah & Gedung",
        description:
          "Pemasangan instalasi listrik baru maupun perbaikan sistem kelistrikan lama, dilakukan oleh teknisi berpengalaman dengan standar keamanan tinggi.",
        price: "Mulai Rp 250.000",
        image: "/images/mjteknik_menu1.webp",
      },
      {
        name: "Servis Pompa Air & Sibel",
        description:
          "Menangani kerusakan pompa air, penggantian sparepart, hingga pembuatan sumur sibel dengan hasil kuat dan aliran air lancar.",
        price: "Mulai Rp 300.000",
        image: "/images/mjteknik_menu2.webp",
      },
      {
        name: "Perbaikan Peralatan Rumah Tangga",
        description:
          "Jasa servis kipas angin, blender, mesin cuci, dan peralatan rumah tangga lainnya dengan biaya terjangkau dan hasil memuaskan.",
        price: "Mulai Rp 100.000",
        image: "/images/mjteknik_menu3.webp",
      },
    ],
    galleryImages: [
      "/images/mjteknik_galerifoto1.webp",
      "/images/mjteknik_galerifoto2.webp",
      "/images/mjteknik_galerifoto3.webp",
    ],
    openingHours: [
      { day: "Senin", hours: "08.00 - 21.00", isOpen: true },
      { day: "Selasa", hours: "08.00 - 21.00", isOpen: true },
      { day: "Rabu", hours: "08.00 - 21.00", isOpen: true },
      { day: "Kamis", hours: "08.00 - 21.00", isOpen: true },
      { day: "Jumat", hours: "Tutup", isOpen: close },
      { day: "Sabtu", hours: "08.00 - 21.00", isOpen: true },
      { day: "Minggu", hours: "08.00 - 21.00", isOpen: true },
    ],
  },
  {
    id: 83,
    name: "Fotocopy & Jasa Travel",
    slug: "fotocopy-dan-jasa-travel",
    heroImage: "/images/fotocopy_hero.webp",
    heroTitle: 'Informasi Lengkap tentang UMKM "Fotocopy & Jasa Travel"',
    heroSubtitle:
      "Melayani jasa fotokopi, print, scan, serta layanan travel antar kota dengan pelayanan ramah dan harga terjangkau.",
    description:
      "Fotocopy & Jasa Travel menyediakan berbagai layanan harian seperti fotokopi dokumen, cetak berwarna, penjilidan, hingga layanan travel cepat dan aman ke berbagai kota tujuan. Dengan peralatan modern dan layanan profesional, pelanggan dapat menikmati kemudahan dalam satu tempat.",
    about:
      "<strong>Fotocopy & Jasa Travel</strong> hadir untuk memenuhi kebutuhan masyarakat akan layanan percetakan dokumen dan transportasi. Menyediakan jasa fotokopi cepat, print warna, scan dokumen, hingga layanan travel dengan armada nyaman dan jadwal fleksibel. Tempat ini cocok bagi pelajar, pekerja, dan masyarakat umum yang butuh solusi praktis dan efisien setiap hari.",
    rating: "5 / 5",
    location: {
      address: " Lambangan Rt.2 Rw.1 Gg 02, Lambangan, Kudus",
      fullAddress:
        "Lambangan Rt.2 Rw.1 Gg 02 undaan kudus, Lambangan, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
      mapsUrl: "https://maps.app.goo.gl/58ZPsi3C7xu8rRTv8",
      embedUrl:
        "https://www.google.com/maps?q=-6.924919,110.7998945&hl=id&z=17&output=embed",
    },
    contact: {
      whatsapp: "085866575305",
      email: "-",
      instagram: "-",
    },
    menus: [
      {
        name: "Layanan Fotocopy & Travel",
        description:
          "Melayani fotokopi dokumen hitam putih maupun berwarna, print, scan, serta jasa travel antar kota dengan pelayanan cepat, ramah, dan harga terjangkau.",
        price: "Mulai Rp 2.000 per lembar / Rp 150.000 per trip",
        image: "/images/jasatravel_menu1.webp",
      },
    ],
    galleryImages: ["/images/jasatravel_galerifoto1.webp"],
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
  id: 84,
  name: "Ngabus Rejo",
  slug: "ngabus-rejo",
  heroImage: "/images/ngabusrejo_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Ngabus Rejo"',
  heroSubtitle:
    "Toko bahan makanan di Kudus yang menyediakan berbagai kebutuhan harian dengan harga bersahabat.",
  about:
    "<strong>Ngabus Rejo</strong> adalah toko bahan makanan yang berlokasi di Kudus. Menyediakan kebutuhan pokok harian, bumbu, dan produk segar dengan kualitas baik dan harga kompetitif.",
  description:
    "Ngabus Rejo menawarkan berbagai bahan makanan dari sembako, sayur, hingga kebutuhan dapur lainnya. Cocok untuk belanja kebutuhan rumah tangga sehari-hari.",
  rating: "3.7 / 5",
  location: {
    address: " Gabus, Medini, Kudus",
    fullAddress:
      "Medini, gg17, Gabus, Medini, Kec. Undaan, Kabupaten Demak, Jawa Tengah 59372",
    mapsUrl: "https://maps.app.goo.gl/CbDihLmNiQoVPENg7",
    embedUrl:
      "https://www.google.com/maps?q=-6.9201487,110.7887834&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "085757718417",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Bahan Makanan",
      description:
        "Sembako, bumbu dapur, sayuran segar, dan kebutuhan harian lainnya.",
      price: "Mulai dari Rp 5.000",
      image: "/images/ngabusrejo_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/ngabusrejo_galerifoto1.webp",
    "/images/ngabusrejo_galerifoto2.webp",
    "/images/ngabusrejo_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "08.00 - 21.15", isOpen: true },
    { day: "Selasa", hours: "08.00 - 21.15", isOpen: true },
    { day: "Rabu", hours: "08.00 - 21.15", isOpen: true },
    { day: "Kamis", hours: "08.00 - 21.15", isOpen: true },
    { day: "Jumat", hours: "08.00 - 21.15", isOpen: true },
    { day: "Sabtu", hours: "08.00 - 21.15", isOpen: true },
    { day: "Minggu", hours: "08.00 - 21.15", isOpen: true },
  ],
},
{
  id: 85,
  name: "Nano Distro",
  slug: "nano-distro",
  heroImage: "/images/nanodistro_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Nano Distro"',
  heroSubtitle:
    "Toko pakaian pria di Kudus yang menyediakan fashion casual dan trendi untuk anak muda.",
  about:
    "<strong>Nano Distro</strong> merupakan toko pakaian pria yang berlokasi di Kudus. Menyediakan pakaian casual, kaos, kemeja, dan aksesoris untuk gaya modern.",
  description:
    "Nano Distro menghadirkan koleksi pakaian pria dengan desain kekinian, nyaman dipakai, dan harga bersahabat.",
  rating: "4.3 / 5",
  location: {
    address: " Ngemplak Kidul, Kalirejo, Kudus",
    fullAddress:
      "Jalan Kudus - Purwodadi RT.01/RW.01, Ngemplak Kidul, Kalirejo, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
    mapsUrl: "https://maps.app.goo.gl/YekBYVtWroV66iUt6",
    embedUrl:
      "https://www.google.com/maps?q=-6.9240339,110.7927053&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "085641349300",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Pakaian Pria",
      description:
        "Kaos, kemeja, jaket, dan aksesoris pria dengan desain modern.",
      price: "Mulai dari Rp 50.000",
      image: "/images/nanodistro_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/nanodistro_galerifoto1.webp",
    "/images/nanodistro_galerifoto2.webp",
    "/images/nanodistro_galerifoto3.webp",
  ],
  openingHours: [
    { day: "Senin", hours: "08.00 - 22.00", isOpen: true },
    { day: "Selasa", hours: "08.00 - 22.00", isOpen: true },
    { day: "Rabu", hours: "08.00 - 22.00", isOpen: true },
    { day: "Kamis", hours: "08.00 - 22.00", isOpen: true },
    { day: "Jumat", hours: "08.00 - 22.00", isOpen: true },
    { day: "Sabtu", hours: "08.00 - 22.00", isOpen: true },
    { day: "Minggu", hours: "08.00 - 22.00", isOpen: true },
  ],
},
{
  id: 86,
  name: "Ilbabalanos Store",
  slug: "ilbabalanos",
  heroImage: "/images/ilbabalanos_hero.webp",
  heroTitle: 'Informasi Lengkap tentang UMKM "Ilbabalanos Store"',
  heroSubtitle:
    "Toko pakaian di Kudus yang menyediakan berbagai model fashion untuk pria dan wanita.",
  about:
    "<strong>Ilbabalanos Store</strong> adalah toko pakaian di Kudus. Menyediakan pakaian pria dan wanita dengan kualitas baik dan desain kekinian.",
  description:
    "Ilbabalanos Store menghadirkan busana stylish untuk pria dan wanita dengan harga yang kompetitif.",
  rating: "4.9 / 5",
  location: {
    address: "Ngemplak Lor Satu, Kalirejo, Kudus",
    fullAddress:
      "belakang Bank BRI kalirejo, Jl. Purwodadi - Kudus No.km15, RT.1/RW.3, Ngemplak Lor Satu, Kalirejo, Kec. Undaan, Kabupaten Kudus, Jawa Tengah 59372",
    mapsUrl: "https://maps.app.goo.gl/4CYJUDiPPLuqimZq7",
    embedUrl:
      "https://www.google.com/maps?q=-6.9268485,110.791146&hl=id&z=15&output=embed",
  },
  contact: {
    whatsapp: "085747807706",
    email: "-",
    instagram: "-",
  },
  menus: [
    {
      name: "Pakaian Pria & Wanita",
      description:
        "Beragam model pakaian casual dan formal untuk pria & wanita dengan kualitas nyaman.",
      price: "Mulai dari Rp 60.000",
      image: "/images/ilbabalanos_menu1.webp",
    },
  ],
  galleryImages: [
    "/images/ilbabalanos_galerifoto1.webp",
    "/images/ilbabalanos_galerifoto2.webp",
    "/images/ilbabalanos_galerifoto3.webp",
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
];

export default dataDetailUMKM;
