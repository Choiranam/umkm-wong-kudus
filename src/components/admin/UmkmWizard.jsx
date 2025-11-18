import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import FormInput from "./FormInput";

const API_UMKM = "/umkm";
const API_HOURS = "/umkm-hours";
const API_LISTING = "/umkm-listings";
const API_CONTACT = "/umkm-contact";
const API_LOCATION = "/umkm-locations";
const API_GALLERY = "/galeri-umkm";
const API_MENU = "/umkm-menu";

const KECAMATAN_OPTIONS = [
  "Kudus Kota",
  "Jati",
  "Bae",
  "Mejobo",
  "Undaan",
  "Gebog",
  "Dawe",
  "Jekulo",
  "Kaliwungu",
];

const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
      options.push(time);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

const INITIAL_HOURS = [
  { day: "Senin", open: "08:00", close: "17:00", is_open: 1 },
  { day: "Selasa", open: "08:00", close: "17:00", is_open: 1 },
  { day: "Rabu", open: "08:00", close: "17:00", is_open: 1 },
  { day: "Kamis", open: "08:00", close: "17:00", is_open: 1 },
  { day: "Jumat", open: "08:00", close: "17:00", is_open: 1 },
  { day: "Sabtu", open: "08:00", close: "17:00", is_open: 1 },
  { day: "Minggu", open: "00:00", close: "00:00", is_open: 0 },
];

const INITIAL_MENU_ITEM = {
  name: "",
  price: "",
  description: "",
  image: null,
  imagePreview: "",
};

export default function UmkmWizard({
  isOpen,
  onClose,
  categories,
  umkmToEdit,
  showGlobalToast,
}) {
  const [wizardStep, setWizardStep] = useState(1);
  const [isWizardStarted, setIsWizardStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [basicData, setBasicData] = useState({
    category_id: "",
    kecamatan: "",
    name: "",
    hero_title: "",
    hero_subtitle: "",
    description: "",
    about: "",
    rating: "",
    hero_image: null,
    hero_image_preview: "",
  });

  const [openingHours, setOpeningHours] = useState(INITIAL_HOURS);
  const [listingData, setListingData] = useState({
    category: "",
    subtitle: "",
    location: "",
    kecamatan_slug: "",
    image: null,
    imagePreview: "",
  });
  const [listingId, setListingId] = useState(null);
  const [contactData, setContactData] = useState({
    whatsapp: "62",
    email: "",
    instagram: "",
  });
  const [locationData, setLocationData] = useState({
    address: "",
    full_address: "",
    maps_url: "",
    embed_url: "",
  });
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [menuItems, setMenuItems] = useState([INITIAL_MENU_ITEM]);

  const isEditMode = !!umkmToEdit;

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const resetWizard = () => {
    setWizardStep(1);
    setIsWizardStarted(false);
    setBasicData({
      category_id: "",
      kecamatan: "",
      name: "",
      hero_title: "",
      hero_subtitle: "",
      description: "",
      about: "",
      rating: "",
      hero_image: null,
      hero_image_preview: "",
    });
    setOpeningHours(INITIAL_HOURS);
    setListingData({
      category: "",
      subtitle: "",
      location: "",
      kecamatan_slug: "",
      image: null,
      imagePreview: "",
    });
    setListingId(null);
    setContactData({ whatsapp: "62", email: "", instagram: "" });
    setLocationData({
      address: "",
      full_address: "",
      maps_url: "",
      embed_url: "",
    });
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setMenuItems([INITIAL_MENU_ITEM]);
  };

  const loadEditData = async () => {
    if (!umkmToEdit) return;

    setLoading(true);
    setBasicData({
      category_id: umkmToEdit.category_id || "",
      kecamatan: umkmToEdit.kecamatan || "",
      name: umkmToEdit.name || "",
      hero_title: umkmToEdit.hero_title || "",
      hero_subtitle: umkmToEdit.hero_subtitle || "",
      description: umkmToEdit.description || "",
      about: umkmToEdit.about || "",
      rating: umkmToEdit.rating || "",
      hero_image: null,
      hero_image_preview: umkmToEdit.hero_image || "",
    });

    try {
      const [hoursRes, listingRes, contactRes, locationRes, menuRes] =
        await Promise.all([
          api.get(`${API_HOURS}/umkm/${umkmToEdit.id}`),
          api.get(API_LISTING),
          api.get(`/umkm/${umkmToEdit.id}/contact`),
          api.get(`/umkm/${umkmToEdit.id}/location`),
          api.get(`${API_MENU}/umkm/${umkmToEdit.id}`),
        ]);

      if (hoursRes.data.status) {
        const data = hoursRes.data.data;
        const updatedHours = INITIAL_HOURS.map((h) => {
          const found = data.find((d) => d.day === h.day);
          if (found) {
            const [open, close] = (found.hours || "00:00 - 00:00").split(" - ");
            return {
              ...h,
              open: open || "00:00",
              close: close || "00:00",
              is_open: found.is_open,
              id: found.id,
            };
          }
          return h;
        });
        setOpeningHours(updatedHours);
      }

      const listing = listingRes.data.data.find(
        (l) => l.umkm_id === umkmToEdit.id
      );
      if (listing) {
        setListingId(listing.id);
        setListingData({
          category: listing.category || "",
          subtitle: listing.subtitle || "",
          location: listing.location || "",
          kecamatan_slug: listing.kecamatan_slug || "",
          image: null,
          imagePreview: listing.image || "",
        });
      }

      if (contactRes.data.status) setContactData(contactRes.data.data);
      if (locationRes.data.status) setLocationData(locationRes.data.data);

      if (menuRes.data.status) {
        const menus = menuRes.data.data.map((m) => ({
          id: m.id,
          name: m.name,
          price: m.price,
          description: m.description || "",
          imagePreview: m.image,
          image: null,
        }));
        setMenuItems(menus.length > 0 ? menus : [INITIAL_MENU_ITEM]);
      }
    } catch (err) {
      showGlobalToast("Gagal memuat data edit", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        loadEditData();
      } else {
        resetWizard();
      }
    }
  }, [isOpen, umkmToEdit]);

  const handleClose = () => {
    if (!isEditMode && isWizardStarted && wizardStep > 1) {
      showToast(
        "Selesaikan semua langkah, atau kembali ke Step 1 untuk batal",
        "error"
      );
      return;
    }
    resetWizard();
    onClose(false);
  };

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasicImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBasicData((prev) => ({
        ...prev,
        hero_image: file,
        hero_image_preview: URL.createObjectURL(file),
      }));
    } else {
      setBasicData((prev) => ({
        ...prev,
        hero_image: null,
        hero_image_preview: isEditMode ? umkmToEdit.hero_image || "" : "",
      }));
    }
  };

  const validateBasicData = () => {
    const required = [
      "category_id",
      "kecamatan",
      "name",
      "hero_title",
      "hero_subtitle",
      "description",
      "about",
      "rating",
    ];
    for (const f of required) {
      if (!basicData[f] || !String(basicData[f]).trim()) {
        showToast(`${f.replace("_", " ")} wajib diisi`, "error");
        return false;
      }
    }
    return true;
  };

  const handleBasicSubmit = async (advanceOnSuccess = false) => {
    if (!validateBasicData()) return false;
    setLoading(true);

    if (isEditMode) {
      const formData = new FormData();
      for (const key in basicData) {
        if (key !== "hero_image_preview" && basicData[key] !== null) {
          formData.append(key, basicData[key]);
        }
      }
      formData.append("_method", "PUT");
      if (!basicData.hero_image) {
        formData.delete("hero_image");
      }

      try {
        const url = `${API_UMKM}/${umkmToEdit.id}`;
        const res = await api.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.status) {
          showToast("Data dasar diperbarui!");
          if (advanceOnSuccess) setWizardStep(2);
          setLoading(false);
          return true;
        }
      } catch (err) {
        showToast(
          err.response?.data?.message || "Gagal memperbarui data dasar",
          "error"
        );
      }
      setLoading(false);
      return false;
    } else {
      const kec = basicData.kecamatan;
      const slug =
        kec === "Kudus Kota"
          ? "kota-kudus"
          : kec.toLowerCase().replace(/\s+/g, "-");
      const selectedCat = categories.find(
        (c) => c.id === parseInt(basicData.category_id)
      );

      setListingData((prev) => ({
        ...prev,
        location: kec,
        kecamatan_slug: slug,
        category: selectedCat?.name || "",
      }));

      setIsWizardStarted(true);
      if (advanceOnSuccess) setWizardStep(2);
      setLoading(false);
      return true;
    }
  };

  const validateHours = () => {
    if (openingHours.some((h) => h.is_open === 1 && h.open === h.close)) {
      showToast(
        "Jam buka dan tutup tidak boleh sama untuk hari yang buka",
        "error"
      );
      return false;
    }
    return true;
  };

  const handleHoursSubmit = async (advanceOnSuccess = false) => {
    if (!validateHours()) return false;

    if (isEditMode) {
      setLoading(true);
      try {
        for (const h of openingHours) {
          const fd = new FormData();
          fd.append("umkm_id", umkmToEdit.id);
          fd.append("day", h.day);
          fd.append("hours", h.is_open ? `${h.open} - ${h.close}` : "Tutup");
          fd.append("is_open", h.is_open);
          if (h.id) {
            fd.append("_method", "PUT");
            await api.post(`${API_HOURS}/${h.id}`, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } else {
            await api.post(API_HOURS, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
        }
        showToast("Jam operasional disimpan!");
        if (advanceOnSuccess) setWizardStep(3);
        setLoading(false);
        return true;
      } catch (err) {
        showToast("Gagal simpan jam operasional", "error");
      }
      setLoading(false);
      return false;
    } else {
      if (advanceOnSuccess) setWizardStep(3);
      return true;
    }
  };

  const validateListing = () => {
    if (!listingData.category) {
      showToast("Kategori listing error, kembali ke step 1", "error");
      return false;
    }
    return true;
  };

  const handleListingSubmit = async (advanceOnSuccess = false) => {
    if (!validateListing()) return false;

    if (isEditMode) {
      setLoading(true);
      const fd = new FormData();
      fd.append("umkm_id", umkmToEdit.id);
      fd.append("category", listingData.category);
      if (listingData.subtitle) fd.append("subtitle", listingData.subtitle);
      fd.append("location", listingData.location);
      fd.append("kecamatan_slug", listingData.kecamatan_slug);
      if (listingData.image) fd.append("image", listingData.image);

      try {
        let res;
        if (listingId) {
          fd.append("_method", "PUT");
          res = await api.post(`${API_LISTING}/${listingId}`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          res = await api.post(API_LISTING, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
        if (res.data.status) {
          showToast(listingId ? "Listing diperbarui!" : "Listing dibuat!");
          if (advanceOnSuccess) setWizardStep(4);
          setLoading(false);
          return true;
        }
      } catch (err) {
        showToast(
          err.response?.data?.message || "Gagal simpan listing",
          "error"
        );
      }
      setLoading(false);
      return false;
    } else {
      if (advanceOnSuccess) setWizardStep(4);
      return true;
    }
  };

  const validateContact = () => {
    if (!contactData.whatsapp.trim() || contactData.whatsapp === "62") {
      showToast("WhatsApp wajib diisi dan valid", "error");
      return false;
    }
    return true;
  };

  const handleContactSubmit = async (advanceOnSuccess = false) => {
    if (!validateContact()) return false;

    if (isEditMode) {
      setLoading(true);
      const fd = new FormData();
      fd.append("umkm_id", umkmToEdit.id);
      fd.append("whatsapp", contactData.whatsapp);
      if (contactData.email) fd.append("email", contactData.email);
      if (contactData.instagram) fd.append("instagram", contactData.instagram);

      try {
        const url = isEditMode
          ? `${API_CONTACT}/umkm/${umkmToEdit.id}`
          : API_CONTACT;
        if (isEditMode) fd.append("_method", "PUT");
        await api.post(url, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Kontak disimpan!");
        if (advanceOnSuccess) setWizardStep(5);
        setLoading(false);
        return true;
      } catch (err) {
        showToast("Gagal simpan kontak", "error");
      }
      setLoading(false);
      return false;
    } else {
      if (advanceOnSuccess) setWizardStep(5);
      return true;
    }
  };

  const validateLocation = () => {
    if (!locationData.address.trim()) {
      showToast("Alamat wajib diisi", "error");
      return false;
    }
    return true;
  };

  const handleLocationSubmit = async (advanceOnSuccess = false) => {
    if (!validateLocation()) return false;

    if (isEditMode) {
      setLoading(true);
      const fd = new FormData();
      fd.append("umkm_id", umkmToEdit.id);
      fd.append("address", locationData.address);
      fd.append(
        "full_address",
        locationData.full_address || locationData.address
      );
      if (locationData.maps_url) fd.append("maps_url", locationData.maps_url);
      const embedUrl = locationData.embed_url.trim() || locationData.maps_url;
      if (embedUrl) fd.append("embed_url", embedUrl);

      try {
        const url = isEditMode
          ? `${API_LOCATION}/umkm/${umkmToEdit.id}`
          : API_LOCATION;
        if (isEditMode) fd.append("_method", "PUT");
        await api.post(url, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Lokasi berhasil disimpan!");
        if (advanceOnSuccess) setWizardStep(6);
        setLoading(false);
        return true;
      } catch (err) {
        showToast(
          err.response?.data?.message || "Gagal simpan lokasi",
          "error"
        );
      }
      setLoading(false);
      return false;
    } else {
      if (advanceOnSuccess) setWizardStep(6);
      return true;
    }
  };

  const validateGallery = () => {
    if (galleryFiles.length === 0) {
      showToast("Upload minimal 1 foto galeri", "error");
      return false;
    }
    return true;
  };

  const handleGallerySubmit = async (advanceOnSuccess = false) => {
    if (galleryFiles.length === 0 && !isEditMode) {
      showToast("Upload minimal 1 foto galeri", "error");
      return false;
    }

    if (isEditMode) {
      if (galleryFiles.length > 0) {
        setLoading(true);
        let successCount = 0,
          errorCount = 0;
        for (const file of galleryFiles) {
          const fd = new FormData();
          fd.append("umkm_id", umkmToEdit.id);
          fd.append("image", file);
          try {
            await api.post(API_GALLERY, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            successCount++;
          } catch (err) {
            errorCount++;
          }
        }
        setLoading(false);
        showToast(
          `Sukses: ${successCount}, Gagal: ${errorCount}`,
          errorCount > 0 ? "error" : "success"
        );
        setGalleryFiles([]);
        setGalleryPreviews([]);
        if (advanceOnSuccess) setWizardStep(7);
        return successCount > 0;
      } else {
        if (advanceOnSuccess) setWizardStep(7);
        return true;
      }
    } else {
      if (advanceOnSuccess) setWizardStep(7);
      return true;
    }
  };

  const validateMenus = () => {
    const validMenus = menuItems.filter((m) => m.name.trim() && m.price.trim());
    if (validMenus.length === 0) {
      showToast("Tambahkan minimal 1 menu!", "error");
      return false;
    }
    return true;
  };

  const handleFinalSubmit = async (advanceOnSuccess = false) => {
    if (!validateMenus()) return false;

    setLoading(true);

    if (isEditMode) {
      let successCount = 0,
        errorCount = 0;
      for (const m of menuItems) {
        if (!m.name.trim() || !m.price.trim()) continue;

        const fd = new FormData();
        fd.append("umkm_id", umkmToEdit.id);
        fd.append("name", m.name);
        fd.append("description", m.description || "");
        fd.append("price", m.price);
        if (m.image) fd.append("image", m.image);
        try {
          if (m.id) {
            fd.append("_method", "PUT");
            await api.post(`${API_MENU}/${m.id}`, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } else {
            await api.post(API_MENU, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
          successCount++;
        } catch (err) {
          errorCount++;
        }
      }
      setLoading(false);
      showToast(
        `Sukses: ${successCount}, Gagal: ${errorCount}`,
        errorCount > 0 ? "error" : "success"
      );
      if (successCount > 0) {
        showGlobalToast("UMKM berhasil diperbarui!", "success");
        if (advanceOnSuccess) onClose(true);
        return true;
      }
      return false;
    } else {
      let newUmkmId = null;
      try {
        const basicFormData = new FormData();
        for (const key in basicData) {
          if (key !== "hero_image_preview" && basicData[key] !== null) {
            basicFormData.append(key, basicData[key]);
          }
        }
        const umkmRes = await api.post(API_UMKM, basicFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (!umkmRes.data.status || !umkmRes.data.data.id) {
          throw new Error("Gagal membuat data dasar UMKM.");
        }
        newUmkmId = umkmRes.data.data.id;

        const promises = [];

        openingHours.forEach((h) => {
          const fd = new FormData();
          fd.append("umkm_id", newUmkmId);
          fd.append("day", h.day);
          fd.append("hours", h.is_open ? `${h.open} - ${h.close}` : "Tutup");
          fd.append("is_open", h.is_open);
          promises.push(
            api.post(API_HOURS, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            })
          );
        });

        const listingFd = new FormData();
        listingFd.append("umkm_id", newUmkmId);
        listingFd.append("category", listingData.category);
        if (listingData.subtitle)
          listingFd.append("subtitle", listingData.subtitle);
        listingFd.append("location", listingData.location);
        listingFd.append("kecamatan_slug", listingData.kecamatan_slug);
        if (listingData.image) listingFd.append("image", listingData.image);
        promises.push(
          api.post(API_LISTING, listingFd, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );

        const contactFd = new FormData();
        contactFd.append("umkm_id", newUmkmId);
        contactFd.append("whatsapp", contactData.whatsapp);
        if (contactData.email) contactFd.append("email", contactData.email);
        if (contactData.instagram)
          contactFd.append("instagram", contactData.instagram);
        promises.push(
          api.post(API_CONTACT, contactFd, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );

        const locationFd = new FormData();
        locationFd.append("umkm_id", newUmkmId);
        locationFd.append("address", locationData.address);
        locationFd.append(
          "full_address",
          locationData.full_address || locationData.address
        );
        if (locationData.maps_url)
          locationFd.append("maps_url", locationData.maps_url);
        const embedUrl = locationData.embed_url.trim() || locationData.maps_url;
        if (embedUrl) locationFd.append("embed_url", embedUrl);
        promises.push(
          api.post(API_LOCATION, locationFd, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );

        galleryFiles.forEach((file) => {
          const fd = new FormData();
          fd.append("umkm_id", newUmkmId);
          fd.append("image", file);
          promises.push(
            api.post(API_GALLERY, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            })
          );
        });

        const validMenus = menuItems.filter(
          (m) => m.name.trim() && m.price.trim()
        );
        validMenus.forEach((m) => {
          const fd = new FormData();
          fd.append("umkm_id", newUmkmId);
          fd.append("name", m.name);
          fd.append("description", m.description || "");
          fd.append("price", m.price);
          if (m.image) fd.append("image", m.image);
          promises.push(
            api.post(API_MENU, fd, {
              headers: { "Content-Type": "multipart/form-data" },
            })
          );
        });

        await Promise.all(promises);

        showGlobalToast("UMKM berhasil dibuat!", "success");
        if (advanceOnSuccess) onClose(true);
        setLoading(false);
        return true;
      } catch (err) {
        console.error("Gagal menyimpan data:", err);
        let errMsg = "Terjadi kesalahan saat menyimpan data.";
        if (err.message === "Gagal membuat data dasar UMKM.") {
          errMsg = err.message;
        } else if (newUmkmId) {
          errMsg = `Gagal menyimpan relasi data. UMKM (ID: ${newUmkmId}) mungkin terbuat sebagian.`;
          showToast("Gagal menyimpan. Melakukan rollback...", "error");
          try {
            await api.delete(`${API_UMKM}/${newUmkmId}`);
            showToast("Rollback berhasil. Data UMKM telah dihapus.", "success");
          } catch (rollbackErr) {
            showToast(
              "Gagal melakukan rollback. Harap hapus UMKM manual.",
              "error"
            );
          }
        }
        showToast(errMsg, "error");
      }
      setLoading(false);
      return false;
    }
  };

  const handleGalleryPreview = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024;
    const validFiles = [],
      invalidFiles = [];

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type))
        invalidFiles.push(`${file.name} (format salah)`);
      else if (file.size > maxSize) invalidFiles.push(`${file.name} (>2MB)`);
      else validFiles.push(file);
    });

    if (invalidFiles.length > 0)
      showToast(`File tidak valid: ${invalidFiles.join(", ")}`, "error");
    if (validFiles.length + galleryFiles.length > 5) {
      showToast("Maksimal 5 gambar!", "error");
      return;
    }

    setGalleryFiles([...galleryFiles, ...validFiles]);
    const previews = validFiles.map((f) => URL.createObjectURL(f));
    setGalleryPreviews([...galleryPreviews, ...previews]);
  };

  const removeGalleryImage = (index) => {
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...menuItems];
    updated[index][name] =
      name === "price" ? value.replace(/[^0-9]/g, "") : value;
    setMenuItems(updated);
  };

  const handleMenuImage = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...menuItems];
      updated[index].image = file;
      updated[index].imagePreview = URL.createObjectURL(file);
      setMenuItems(updated);
    }
  };

  const addMenu = () => setMenuItems([...menuItems, { ...INITIAL_MENU_ITEM }]);
  const removeMenu = (index) =>
    setMenuItems(menuItems.filter((_, i) => i !== index));

  const onlyNumbers = (val) => val.replace(/[^0-9]/g, "");

  const handleWhatsAppChange = (e) => {
    let value = onlyNumbers(e.target.value);
    if (!value.startsWith("62")) {
      value = "62" + value.replace(/^62/, "");
    }
    if (value.length > 15) value = value.slice(0, 15);
    setContactData({ ...contactData, whatsapp: value });
  };

  const runCurrentStepSubmit = async () => {
    switch (wizardStep) {
      case 1:
        return await handleBasicSubmit(false);
      case 2:
        return await handleHoursSubmit(false);
      case 3:
        return await handleListingSubmit(false);
      case 4:
        return await handleContactSubmit(false);
      case 5:
        return await handleLocationSubmit(false);
      case 6:
        return await handleGallerySubmit(false);
      case 7:
        return await handleFinalSubmit(false);
      default:
        return false;
    }
  };

  const handleSaveAndClose = async () => {
    const success = await runCurrentStepSubmit();
    if (success) {
      onClose(true);
    }
  };

  const handleSaveAndNext = async () => {
    let success = false;
    switch (wizardStep) {
      case 1:
        success = await handleBasicSubmit(true);
        break;
      case 2:
        success = await handleHoursSubmit(true);
        break;
      case 3:
        success = await handleListingSubmit(true);
        break;
      case 4:
        success = await handleContactSubmit(true);
        break;
      case 5:
        success = await handleLocationSubmit(true);
        break;
      case 6:
        success = await handleGallerySubmit(true);
        break;
      case 7:
        success = await handleFinalSubmit(true);
        break;
      default:
        return;
    }
  };

  const handleAddModeNext = () => {
    let isValid = false;
    switch (wizardStep) {
      case 1:
        isValid = validateBasicData();
        break;
      case 2:
        isValid = validateHours();
        break;
      case 3:
        isValid = validateListing();
        break;
      case 4:
        isValid = validateContact();
        break;
      case 5:
        isValid = validateLocation();
        break;
      case 6:
        isValid = validateGallery();
        break;
      case 7:
        handleFinalSubmit(true);
        return;
      default:
        return;
    }
    if (isValid) {
      setIsWizardStarted(true);
      setWizardStep((s) => s + 1);
    }
  };

  const WizardStep = ({ current, target, title }) => (
    <div
      className={`flex flex-col items-center px-1 ${
        current >= target ? "text-orange-500" : "text-gray-400"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full border-2 ${
          current >= target ? "border-orange-500" : "border-gray-400"
        } flex items-center justify-center font-bold shrink-0`}
      >
        {current > target ? <Icon icon="mdi:check" /> : target}
      </div>
      <span className="text-xs mt-1 text-center">{title}</span>
    </div>
  );

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-3xl">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {toast.show && (
                      <div
                        className={`p-3 text-white ${
                          toast.type === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {toast.message}
                      </div>
                    )}

                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-bold text-gray-900">
                          {isEditMode ? "Edit" : "Tambah"} UMKM
                        </Dialog.Title>
                        <button
                          type="button"
                          className={`rounded-md text-gray-400 hover:text-gray-500 ${
                            !isEditMode && isWizardStarted && wizardStep > 1
                              ? "hidden"
                              : ""
                          }`}
                          onClick={handleClose}
                        >
                          <Icon icon="mdi:close" className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="flex justify-between items-start mt-4">
                        <WizardStep
                          current={wizardStep}
                          target={1}
                          title="Data Dasar"
                        />
                        <div className="flex-1 h-0.5 mt-4 bg-gray-200 mx-1"></div>
                        <WizardStep
                          current={wizardStep}
                          target={2}
                          title="Jam"
                        />
                        <div className="flex-1 h-0.5 mt-4 bg-gray-200 mx-1"></div>
                        <WizardStep
                          current={wizardStep}
                          target={3}
                          title="Listing"
                        />
                        <div className="flex-1 h-0.5 mt-4 bg-gray-200 mx-1"></div>
                        <WizardStep
                          current={wizardStep}
                          target={4}
                          title="Kontak"
                        />
                        <div className="flex-1 h-0.5 mt-4 bg-gray-200 mx-1"></div>
                        <WizardStep
                          current={wizardStep}
                          target={5}
                          title="Lokasi"
                        />
                        <div className="flex-1 h-0.5 mt-4 bg-gray-200 mx-1"></div>
                        <WizardStep
                          current={wizardStep}
                          target={6}
                          title="Galeri"
                        />
                        <div className="flex-1 h-0.5 mt-4 bg-gray-200 mx-1"></div>
                        <WizardStep
                          current={wizardStep}
                          target={7}
                          title="Menu"
                        />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      {loading && wizardStep === 1 && (
                        <div className="text-center py-12">
                          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                          <p className="mt-2 text-gray-600">Memuat data...</p>
                        </div>
                      )}

                      {wizardStep === 1 && !loading && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            isEditMode
                              ? handleSaveAndNext()
                              : handleAddModeNext();
                          }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Kategori" required>
                              <select
                                name="category_id"
                                value={basicData.category_id}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              >
                                <option value="">Pilih Kategori</option>
                                {categories.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </FormInput>
                            <FormInput label="Kecamatan" required>
                              <select
                                name="kecamatan"
                                value={basicData.kecamatan}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              >
                                <option value="">Pilih Kecamatan</option>
                                {KECAMATAN_OPTIONS.map((k) => (
                                  <option key={k} value={k}>
                                    {k}
                                  </option>
                                ))}
                              </select>
                            </FormInput>
                            <FormInput label="Nama UMKM" required fullWidth>
                              <input
                                type="text"
                                name="name"
                                value={basicData.name}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              />
                            </FormInput>
                            <FormInput label="Hero Title" required>
                              <input
                                type="text"
                                name="hero_title"
                                value={basicData.hero_title}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              />
                            </FormInput>
                            <FormInput label="Hero Subtitle" required>
                              <input
                                type="text"
                                name="hero_subtitle"
                                value={basicData.hero_subtitle}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              />
                            </FormInput>
                            <FormInput label="Deskripsi" required fullWidth>
                              <textarea
                                name="description"
                                rows="3"
                                value={basicData.description}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              ></textarea>
                            </FormInput>
                            <FormInput label="About" required fullWidth>
                              <textarea
                                name="about"
                                rows="3"
                                value={basicData.about}
                                onChange={handleBasicChange}
                                className="form-input"
                                required
                              ></textarea>
                            </FormInput>
                            <FormInput label="Rating (1-5)" required>
                              <input
                                type="text"
                                name="rating"
                                value={basicData.rating}
                                onChange={(e) =>
                                  setBasicData((prev) => ({
                                    ...prev,
                                    rating: onlyNumbers(e.target.value).slice(
                                      0,
                                      1
                                    ),
                                  }))
                                }
                                maxLength="1"
                                className="form-input"
                                required
                              />
                            </FormInput>
                            <FormInput label="Hero Image" fullWidth>
                              <input
                                type="file"
                                name="hero_image"
                                accept="image/*"
                                onChange={handleBasicImage}
                                className="form-input"
                              />
                              {basicData.hero_image_preview && (
                                <img
                                  src={basicData.hero_image_preview}
                                  alt="Preview"
                                  className="mt-2 w-full h-48 object-cover rounded-lg border"
                                />
                              )}
                            </FormInput>
                          </div>
                          <button type="submit" className="hidden">
                            Submit
                          </button>
                        </form>
                      )}

                      {wizardStep === 2 && (
                        <div className="space-y-4">
                          {openingHours.map((h, i) => (
                            <div
                              key={h.day}
                              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
                            >
                              <label className="font-medium text-gray-700 sm:col-span-1">
                                {h.day}
                              </label>
                              <FormInput label="Jam Buka" small>
                                <select
                                  value={h.open}
                                  onChange={(e) => {
                                    const arr = [...openingHours];
                                    arr[i].open = e.target.value;
                                    setOpeningHours(arr);
                                  }}
                                  className="form-input"
                                  disabled={!h.is_open}
                                >
                                  {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </select>
                              </FormInput>
                              <FormInput label="Jam Tutup" small>
                                <select
                                  value={h.close}
                                  onChange={(e) => {
                                    const arr = [...openingHours];
                                    arr[i].close = e.target.value;
                                    setOpeningHours(arr);
                                  }}
                                  className="form-input"
                                  disabled={!h.is_open}
                                >
                                  {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </select>
                              </FormInput>
                              <FormInput label="Status" small>
                                <select
                                  value={h.is_open}
                                  onChange={(e) => {
                                    const arr = [...openingHours];
                                    arr[i].is_open = parseInt(e.target.value);
                                    setOpeningHours(arr);
                                  }}
                                  className="form-input"
                                >
                                  <option value={1}>Buka</option>
                                  <option value={0}>Tutup</option>
                                </select>
                              </FormInput>
                            </div>
                          ))}
                        </div>
                      )}

                      {wizardStep === 3 && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Kategori Listing" required>
                              <input
                                type="text"
                                value={listingData.category}
                                readOnly
                                className="form-input bg-gray-100 cursor-not-allowed"
                              />
                            </FormInput>
                            <FormInput label="Subtitle Listing">
                              <input
                                type="text"
                                value={listingData.subtitle}
                                onChange={(e) =>
                                  setListingData({
                                    ...listingData,
                                    subtitle: e.target.value,
                                  })
                                }
                                className="form-input"
                              />
                            </FormInput>
                            <FormInput label="Lokasi Listing" required>
                              <input
                                type="text"
                                value={listingData.location}
                                readOnly
                                className="form-input bg-gray-100 cursor-not-allowed"
                              />
                            </FormInput>
                            <FormInput label="Kecamatan Slug" required>
                              <input
                                type="text"
                                value={listingData.kecamatan_slug}
                                readOnly
                                className="form-input bg-gray-100 cursor-not-allowed"
                              />
                            </FormInput>
                            <FormInput label="Gambar Listing" fullWidth>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const f = e.target.files[0];
                                  if (f)
                                    setListingData({
                                      ...listingData,
                                      image: f,
                                      imagePreview: URL.createObjectURL(f),
                                    });
                                }}
                                className="form-input"
                              />
                              {listingData.imagePreview && (
                                <img
                                  src={listingData.imagePreview}
                                  alt="Preview Listing"
                                  className="mt-2 w-full h-48 object-cover rounded-lg border"
                                />
                              )}
                            </FormInput>
                          </div>
                        </div>
                      )}

                      {wizardStep === 4 && (
                        <div className="space-y-6">
                          <FormInput label="WhatsApp (otomatis 62)" required>
                            <input
                              type="text"
                              value={contactData.whatsapp}
                              onChange={handleWhatsAppChange}
                              className="form-input"
                              placeholder="6281234567890"
                              required
                            />
                          </FormInput>
                          <FormInput label="Email">
                            <input
                              type="email"
                              value={contactData.email}
                              onChange={(e) =>
                                setContactData({
                                  ...contactData,
                                  email: e.target.value,
                                })
                              }
                              className="form-input"
                              placeholder="example@domain.com"
                            />
                          </FormInput>
                          <FormInput label="Instagram">
                            <input
                              type="text"
                              value={contactData.instagram}
                              onChange={(e) =>
                                setContactData({
                                  ...contactData,
                                  instagram: e.target.value,
                                })
                              }
                              className="form-input"
                              placeholder="username"
                            />
                          </FormInput>
                        </div>
                      )}

                      {wizardStep === 5 && (
                        <div className="space-y-6">
                          <FormInput label="Alamat" required>
                            <textarea
                              rows="3"
                              value={locationData.address}
                              onChange={(e) =>
                                setLocationData({
                                  ...locationData,
                                  address: e.target.value,
                                })
                              }
                              className="form-input"
                              placeholder="Ngemplik Rt04/02, Sukoharjo, Gribig, Kec. Gebog..."
                              required
                            ></textarea>
                          </FormInput>
                          <FormInput label="Full Address">
                            <textarea
                              rows="3"
                              value={locationData.full_address}
                              onChange={(e) =>
                                setLocationData({
                                  ...locationData,
                                  full_address: e.target.value,
                                })
                              }
                              className="form-input"
                              placeholder="Ngemplik Rt04/02, Sukoharjo, Gribig, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333"
                            ></textarea>
                          </FormInput>
                          <FormInput label="Maps URL">
                            <input
                              type="url"
                              value={locationData.maps_url}
                              onChange={(e) =>
                                setLocationData({
                                  ...locationData,
                                  maps_url: e.target.value,
                                })
                              }
                              className="form-input"
                              placeholder="https://maps.app.goo.gl/..."
                            />
                          </FormInput>
                          <FormInput label="Embed URL">
                            <input
                              type="url"
                              value={locationData.embed_url}
                              onChange={(e) =>
                                setLocationData({
                                  ...locationData,
                                  embed_url: e.target.value,
                                })
                              }
                              className="form-input"
                              placeholder="https://www.google.com/maps/embed?pb=..."
                            />
                          </FormInput>
                        </div>
                      )}

                      {wizardStep === 6 && (
                        <div className="space-y-6">
                          <FormInput label="Upload Gambar Galeri (Maks 5)">
                            <input
                              type="file"
                              multiple
                              accept="image/jpeg,image/jpg,image/png"
                              onChange={handleGalleryPreview}
                              className="form-input"
                            />
                            <p className="text-xs text-orange-600 mt-1">
                              Maksimal 5 gambar, masing-masing ≤ 2MB, hanya
                              JPG/PNG
                            </p>
                          </FormInput>
                          {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {galleryPreviews.map((src, i) => (
                                <div key={i} className="relative group">
                                  <img
                                    src={src}
                                    alt={`Preview ${i}`}
                                    className="w-full h-32 object-cover rounded-lg border"
                                  />
                                  <button
                                    onClick={() => removeGalleryImage(i)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition"
                                  >
                                    <Icon
                                      icon="mdi:close"
                                      className="w-4 h-4"
                                    />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {wizardStep === 7 && (
                        <div className="space-y-4">
                          {menuItems.map((m, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-lg bg-gray-50"
                            >
                              <div className="md:col-span-3">
                                <FormInput label="Nama Menu" small>
                                  <input
                                    type="text"
                                    name="name"
                                    value={m.name}
                                    onChange={(e) => handleMenuChange(i, e)}
                                    className="form-input"
                                  />
                                </FormInput>
                              </div>
                              <div className="md:col-span-2">
                                <FormInput label="Harga (Rp)" small>
                                  <input
                                    type="text"
                                    name="price"
                                    value={m.price}
                                    onChange={(e) => handleMenuChange(i, e)}
                                    className="form-input"
                                    placeholder="10000"
                                  />
                                </FormInput>
                              </div>
                              <div className="md:col-span-3">
                                <FormInput label="Deskripsi" small>
                                  <input
                                    type="text"
                                    name="description"
                                    value={m.description}
                                    onChange={(e) => handleMenuChange(i, e)}
                                    className="form-input"
                                  />
                                </FormInput>
                              </div>
                              <div className="md:col-span-3">
                                <FormInput label="Gambar" small>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleMenuImage(i, e)}
                                    className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                  />
                                </FormInput>
                              </div>
                              <div className="md:col-span-1 text-right">
                                <button
                                  type="button"
                                  onClick={() => removeMenu(i)}
                                  className="text-red-600 hover:text-red-800"
                                  disabled={menuItems.length <= 1}
                                >
                                  <Icon
                                    icon="mdi:trash-can-outline"
                                    className="w-5 h-5"
                                  />
                                </button>
                              </div>
                              {m.imagePreview && (
                                <div className="md:col-span-12">
                                  <img
                                    src={m.imagePreview}
                                    alt="Menu"
                                    className="w-48 h-32 object-cover rounded-lg border mt-2"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addMenu}
                            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
                          >
                            <Icon icon="mdi:plus" /> Tambah Menu
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            if (wizardStep === 1) handleClose();
                            else setWizardStep((s) => s - 1);
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          disabled={loading}
                        >
                          {wizardStep === 1 ? "Batal" : "Kembali"}
                        </button>

                        <div className="flex gap-2">
                          {isEditMode ? (
                            <>
                              <button
                                type="button"
                                onClick={handleSaveAndClose}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
                                disabled={loading}
                              >
                                {loading && (
                                  <div className="w-5 h-5 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
                                )}
                                Simpan & Tutup
                              </button>
                              <button
                                type="button"
                                onClick={handleSaveAndNext}
                                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2 disabled:opacity-50"
                                disabled={loading}
                              >
                                {loading && (
                                  <div className="w-5 h-5 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
                                )}
                                {wizardStep === 7
                                  ? "Simpan Selesai"
                                  : "Simpan & Lanjut"}
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={handleAddModeNext}
                              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2 disabled:opacity-50"
                              disabled={loading}
                            >
                              {loading && (
                                <div className="w-5 h-5 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
                              )}
                              {wizardStep === 7 ? "Simpan & Selesai" : "Lanjut"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
