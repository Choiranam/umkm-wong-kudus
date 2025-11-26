import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import UMKMCard from "../components/UMKMCard";
import NotFoundPage from "./NotFoundPage";
import api from "../services/api";
import { getBaseUrl } from "../utils/getBaseUrl";

const StickyInfo = ({ data, onClose, isMobile }) => {
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const { contact, location, rating, openingHours, name, description } = data;

  const normalizeHours = (hours) => hours?.trim().replace(/[–—]/g, "-") || "";

  const isOpenNow = (hoursStr) => {
    const text = normalizeHours(hoursStr).toLowerCase();
    if (text === "buka 24 jam") return true;
    if (text === "tutup") return false;

    const parts = text.split("-").map((s) => s.trim());
    if (parts.length !== 2) return false;

    const [openStr, closeStr] = parts;
    const [openH, openM] = openStr.split(".").map(Number);
    const [closeH, closeM] = closeStr.split(".").map(Number);

    if (isNaN(openH) || isNaN(openM) || isNaN(closeH) || isNaN(closeM))
      return false;

    const now = new Date();
    const today = now.getDate();

    const openTime = new Date(now);
    openTime.setHours(openH, openM, 0, 0);

    const closeTime = new Date(now);
    closeTime.setHours(closeH, closeM, 0, 0);

    if (closeH < openH || (closeH === openH && closeM < openM)) {
      closeTime.setDate(today + 1);
    }

    return now >= openTime && now <= closeTime;
  };

  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const daysIndo = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const todayName = daysIndo[new Date().getDay()];
  const today = openingHours.find((d) => d.day === todayName) || {
    isOpen: false,
    hours: "Tutup",
  };

  const currentlyOpen = today.isOpen && isOpenNow(today.hours);
  const displayText = currentlyOpen
    ? normalizeHours(today.hours).toLowerCase() === "buka 24 jam"
      ? "Buka 24 Jam"
      : today.hours
    : "Tutup";

  const contactItems = [
    {
      icon: "ic:sharp-whatsapp",
      label: "WhatsApp",
      value: `wa.me/${contact.whatsapp}`,
      href: `https://wa.me/${contact.whatsapp}`,
      target: "_blank",
    },
    {
      icon: "mdi:instagram",
      label: "Instagram",
      value: `@${contact.instagram}`,
      href: `https://instagram.com/${contact.instagram}`,
      target: "_blank",
    },
    {
      icon: "ic:outline-email",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      target: undefined,
    },
  ];

  const handleOpenMaps = () => {
    const destination = encodeURIComponent(
      location.fullAddress || location.address
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${destination}&travelmode=driving`;
          window.open(directionsUrl, "_blank");
        },
        (error) => {
          console.error("Geolocation error:", error);
          const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
          window.open(fallbackUrl, "_blank");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
      window.open(fallbackUrl, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-t-[5px] p-5 md:p-6 shadow-2xl relative max-h-full">
      {isMobile && (
        <>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-dark/60 hover:text-dark text-2xl z-10"
            aria-label="Tutup"
          >
            <Icon icon="tabler:x" />
          </button>
          <div className="w-12 h-1.5 bg-dark/20 rounded-full mx-auto mb-4" />
        </>
      )}
      <h3 className="text-2xl font-bold text-dark mb-3 pr-8">{name}</h3>
      <p className="text-dark/70 text-sm leading-relaxed mb-4">{description}</p>
      <ul className="text-sm text-dark/70 space-y-3 mb-4">
        <li className="flex items-center gap-2.5">
          <Icon icon="si:pin-fill" className="text-orange text-lg" />
          {location.address}
        </li>
        <li className="flex items-center gap-2.5">
          <Icon icon="iconoir:star-solid" className="text-yellow-500 text-lg" />
          {rating} (Ulasan Google)
        </li>
      </ul>
      <div className="border-t border-dark/10 pt-4 mt-4">
        <button
          onClick={() => setIsHoursOpen(!isHoursOpen)}
          className="flex justify-between items-center w-full text-left"
        >
          <div className="flex items-center gap-2">
            <Icon
              icon="tabler:clock"
              className={`text-lg ${
                currentlyOpen ? "text-green-600" : "text-red-500"
              }`}
            />
            <span
              className={`font-semibold ${
                currentlyOpen ? "text-green-600" : "text-red-500"
              }`}
            >
              {currentlyOpen ? "Buka" : "Tutup"}
            </span>
            <span
              className={`text-sm ${
                currentlyOpen ? "font-semibold text-dark" : "text-dark/50"
              }`}
            >
              {displayText}
            </span>
          </div>
          <Icon
            icon="tabler:chevron-down"
            className={`text-xl text-dark/50 transition-transform duration-300 ${
              isHoursOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isHoursOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: "12px" }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="text-sm text-dark/70 space-y-2.5 pt-2">
                {openingHours.map((day) => {
                  const isToday = day.day === todayName;
                  return (
                    <li
                      key={day.day}
                      className={`flex justify-between items-center ${
                        isToday ? "font-bold text-dark" : "text-dark/70"
                      }`}
                    >
                      <span>{day.day}</span>
                      <span className="text-dark/50">{day.hours}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="border-t border-dark/10 pt-5 mt-5">
        <h3 className="text-lg font-bold text-dark mb-3">Kontak Kami</h3>
        <ul className="text-sm text-dark/70 space-y-3 mb-4">
          {contactItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <Icon icon={item.icon} className="text-orange text-lg" />
              <a
                href={item.href}
                className="text-dark/80 underline hover:text-orange transition-colors"
                target={item.target || "_self"}
                rel={item.target === "_blank" ? "noopener noreferrer" : ""}
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleOpenMaps}
        className="w-full bg-orange text-white font-semibold py-3 rounded-xl hover:bg-[#d96230] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange/30"
      >
        <Icon icon="mdi:map-search-outline" className="text-lg" />
        Lihat Lokasi di Maps
      </button>
    </div>
  );
};

const DetailUMKMPage = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [umkmData, setUmkmData] = useState(null);
  const [relatedUMKM, setRelatedUMKM] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const listResponse = await api.get("/umkm");

        if (listResponse.data.status && Array.isArray(listResponse.data.data)) {
          const allUMKM = listResponse.data.data;
          const targetUMKM = allUMKM.find((item) => item.slug === slug);

          if (targetUMKM) {
            const detailResponse = await api.get(`/umkm/${targetUMKM.id}`);

            if (detailResponse.data.status && detailResponse.data.data) {
              const apiData = detailResponse.data.data;

              const formattedData = {
                name: apiData.name,
                description: apiData.description,
                heroTitle: apiData.hero_title,
                heroSubtitle: apiData.hero_subtitle,
                heroImage: apiData.hero_image,
                about: apiData.about,
                rating: apiData.rating,
                location: {
                  address: apiData.location?.address,
                  fullAddress: apiData.location?.full_address,
                  embedUrl: apiData.location?.embed_url,
                  mapsUrl: apiData.location?.maps_url,
                },
                contact: apiData.contact,
                openingHours: apiData.opening_hours.map((oh) => ({
                  day: oh.day,
                  hours: oh.hours,
                  isOpen: oh.is_open,
                })),
                menus: apiData.menus.map((menu) => ({
                  ...menu,
                  image: menu.image
                    ? menu.image.startsWith("http")
                      ? menu.image
                      : `https://api-umkmwongkudus.rplrus.com/storage/${menu.image}`
                    : null,
                  alt: menu.name || "Menu",
                })),
                galleryImages: apiData.gallery.map((g) => g.image),
              };
              setUmkmData(formattedData);

              const otherUMKM = allUMKM.filter((item) => item.slug !== slug);
              const shuffled = [...otherUMKM].sort(() => Math.random() - 0.5);
              const count = isMobile ? 4 : 5;
              setRelatedUMKM(shuffled.slice(0, count));
            } else {
              setUmkmData(null);
            }
          } else {
            setUmkmData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUmkmData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug, isMobile]);

  useEffect(() => {
    if (showMobilePopup || selectedImage) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showMobilePopup, selectedImage]);

  if (isLoading)
    return (
      <div className="bg-light min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );

  if (!umkmData) return <NotFoundPage />;

  const {
    heroImage,
    heroTitle,
    heroSubtitle,
    about,
    menus,
    galleryImages,
    location,
  } = umkmData;

  return (
    <div className="w-full min-h-screen bg-light overflow-hidden md:overflow-visible">
      <Navbar />
      <HeroContent
        image={heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
      />
      <PageContainer variant="default">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-8 md:mt-10 md:items-start">
          <div className="flex-1 space-y-12 md:space-y-16">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4 text-center md:text-left">
                Tentang <span className="font-normal text-dark-600">UMKM</span>
              </h2>
              <div
                className="text-dark/80 leading-relaxed text-justify prose"
                dangerouslySetInnerHTML={{ __html: about }}
              />
            </section>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 text-center md:text-left">
                Menu{" "}
                <span className="font-normal text-dark-600">
                  / Produk Unggulan
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {menus.map((menu, index) => (
                  <motion.div
                    key={index}
                    className="bg-transparent rounded-[5px] overflow-hidden cursor-pointer group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative w-full aspect-4/3 overflow-hidden">
                      <img
                        src={menu.image || ""}
                        alt={menu.alt}
                        className="w-full h-full object-cover rounded-[5px] transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                    <div className="pt-2 sm:pt-3">
                      <h3 className="text-base sm:text-lg font-bold text-dark line-clamp-1 group-hover:text-orange transition-colors duration-300">
                        {menu.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-dark/60 mt-1 mb-2 line-clamp-2">
                        {menu.description}
                      </p>
                      <p className="text-orange font-semibold text-sm sm:text-base">
                        {menu.price}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 text-center md:text-left">
                Galeri <span className="font-normal text-dark">Foto</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-[5px] overflow-hidden shadow-lg cursor-pointer group"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Galeri ${idx + 1}`}
                      className="w-full h-full object-cover aspect-4/3 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 text-center md:text-left">
                Temukan <span className="font-normal text-dark">Kami</span>
              </h2>
              <div className="w-full h-80 rounded-[5px] overflow-hidden shadow-lg">
                <iframe
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="border-0"
                  title={`Lokasi ${umkmData.name}`}
                ></iframe>
              </div>
              <p className="mt-4 text-base text-dark/80 leading-relaxed font-normal text-center md:text-left">
                {location.fullAddress}
              </p>
            </section>
          </div>
          <div className="hidden md:block md:w-96 lg:w-[400px] shrink-0 sticky top-24">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <StickyInfo data={umkmData} onClose={() => {}} isMobile={false} />
            </div>
          </div>
        </div>
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 text-center md:text-left">
            UMKM <span className="font-normal text-dark">Lainnya</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
            {relatedUMKM.map((item) => (
              <Link
                key={item.id}
                to={`/detail-umkm/${item.slug}`}
                className="block w-full"
              >
                <UMKMCard data={item} />
              </Link>
            ))}
          </div>
        </section>
      </PageContainer>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 -right-2 text-white text-4xl"
                aria-label="Tutup"
              >
                <Icon icon="tabler:x" />
              </button>
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-[85vh] rounded-xl md:rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
        <button
          onClick={() => setShowMobilePopup(true)}
          className="bg-orange text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          aria-label="Buka info UMKM"
        >
          <Icon icon="mdi:storefront-outline" className="text-2xl" />
        </button>
      </div>
      <AnimatePresence>
        {showMobilePopup && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end"
            onClick={() => setShowMobilePopup(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setShowMobilePopup(false);
              }}
              className="bg-white w-full rounded-t-3xl overflow-hidden"
              style={{ maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto" style={{ maxHeight: "85vh" }}>
                <StickyInfo
                  data={umkmData}
                  onClose={() => setShowMobilePopup(false)}
                  isMobile={true}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="mt-16 md:mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default DetailUMKMPage;
