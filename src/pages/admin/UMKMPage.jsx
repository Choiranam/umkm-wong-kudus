import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { FaEye, FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import api from "../../services/api.js";

export default function UMKMPage() {
  // === MODAL & TOAST ===
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // === DATA & FILTER ===
  const [umkms, setUmkms] = useState([]);
  const [filteredUmkms, setFilteredUmkms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // === WIZARD STATE ===
  const [wizardStep, setWizardStep] = useState(1);
  const [tempUmkmId, setTempUmkmId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]); // Max 5
  const [isWizardStarted, setIsWizardStarted] = useState(false);

  // === OPENING HOURS ===
  const [openingHours, setOpeningHours] = useState([
    { day: "Senin", hours: "08:00 - 17:00", is_open: 1 },
    { day: "Selasa", hours: "08:00 - 17:00", is_open: 1 },
    { day: "Rabu", hours: "08:00 - 17:00", is_open: 1 },
    { day: "Kamis", hours: "08:00 - 17:00", is_open: 1 },
    { day: "Jumat", hours: "08:00 - 17:00", is_open: 1 },
    { day: "Sabtu", hours: "08:00 - 17:00", is_open: 1 },
    { day: "Minggu", hours: "Tutup", is_open: 0 },
  ]);

  // === LISTING ===
  const [listingData, setListingData] = useState({
    category: "",
    subtitle: "",
    location: "",
    kecamatan_slug: "",
    image: null,
    imagePreview: ""
  });
  const [listingId, setListingId] = useState(null);

  // === CONTACT ===
  const [contactData, setContactData] = useState({
    whatsapp: "62",
    email: "",
    instagram: ""
  });

  // === LOCATION ===
  const [locationData, setLocationData] = useState({
    address: "",
    full_address: "",
    maps_url: "",
    embed_url: ""
  });

  // === MENU ===
  const [menuItems, setMenuItems] = useState([
    { name: "", price: "", description: "", image: null, imagePreview: "" }
  ]);

  // === PAGINATION ===
  const totalPages = Math.ceil(filteredUmkms.length / itemsPerPage);
  const currentUmkms = filteredUmkms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // === API ENDPOINTS ===
  const API_URL = "https://api-umkmwongkudus.rplrus.com/api/umkm";
  const CATEGORIES_URL = "https://api-umkmwongkudus.rplrus.com/api/categories";
  const HOURS_URL = "https://api-umkmwongkudus.rplrus.com/api/umkm-hours";
  const LISTING_URL = "https://api-umkmwongkudus.rplrus.com/api/umkm-listings";
  const CONTACT_URL = "https://api-umkmwongkudus.rplrus.com/api/umkm-contact";
  const LOCATION_URL = "https://api-umkmwongkudus.rplrus.com/api/umkm-locations";
  const GALLERY_URL = "https://api-umkmwongkudus.rplrus.com/api/galeri-umkm";
  const MENU_URL = "https://api-umkmwongkudus.rplrus.com/api/umkm-menu";
  const KECAMATAN_OPTIONS = ["Kudus Kota", "Jati", "Bae", "Mejobo", "Undaan", "Gebog", "Dawe", "Jekulo", "Kaliwungu"];

  // === TOAST FUNCTION ===
  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // === FETCH DATA ===
  const fetchCategories = async () => {
    try {
      const res = await api.get(CATEGORIES_URL);
      if (res.data.status) setCategories(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchUmkms = async () => {
    setLoading(true);
    try {
      const res = await api.get(API_URL);
      if (res.data.status) {
        setUmkms(res.data.data);
        setFilteredUmkms(res.data.data);
      }
    } catch (err) {
      showToastMessage("Gagal memuat UMKM", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOpeningHours = async (id) => {
    try {
      const res = await api.get(`${HOURS_URL}/umkm/${id}`);
      if (res.data.status) {
        const data = res.data.data;
        const updated = openingHours.map(h => {
          const found = data.find(d => d.day === h.day);
          return found ? { ...h, hours: found.hours, is_open: found.is_open, id: found.id } : h;
        });
        setOpeningHours(updated);
      }
    } catch (err) { }
  };

  const fetchListing = async (umkmId) => {
    try {
      const res = await api.get(LISTING_URL);
      const listing = res.data.data.find(l => l.umkm_id === umkmId);
      if (listing) {
        setListingId(listing.id);
        setListingData({
          category: listing.category || "",
          subtitle: listing.subtitle || "",
          location: listing.location || "",
          kecamatan_slug: listing.kecamatan_slug || "",
          image: null,
          imagePreview: listing.image || ""
        });
      } else {
        setListingId(null);
        setListingData(prev => ({
          ...prev,
          category: "", subtitle: "", location: "", kecamatan_slug: "", image: null, imagePreview: ""
        }));
      }
    } catch (err) {
      console.error("Gagal fetch listing:", err);
    }
  };

  const fetchMenuForView = async (umkmId) => {
    try {
      const res = await api.get(`${MENU_URL}/umkm/${umkmId}`);
      if (res.data.status) {
        const menus = res.data.data.map(m => ({
          id: m.id,
          name: m.name,
          description: m.description || "",
          price: m.price,
          image: m.image
        }));
        setSelectedUmkm(prev => ({ ...prev, menu: menus }));
      }
    } catch (err) {
      console.error("Gagal fetch menu untuk view:", err);
    }
  };

  const fetchUmkmDetail = async (id) => {
    try {
      const res = await api.get(`${API_URL}/${id}`);
      if (res.data.status) {
        const umkmData = res.data.data;
        setSelectedUmkm({ ...umkmData, menu: [] });
        await fetchMenuForView(id);
      }
    } catch (err) {
      showToastMessage("Gagal memuat detail UMKM", "error");
    }
  };

  const fetchMenu = async (umkmId) => {
    try {
      const res = await api.get(`${MENU_URL}/umkm/${umkmId}`);
      if (res.data.status) {
        const menus = res.data.data.map(m => ({
          name: m.name,
          price: m.price,
          description: m.description || "",
          imagePreview: m.image,
          image: null
        }));
        setMenuItems(menus.length > 0 ? menus : [{ name: "", price: "", description: "", image: null, imagePreview: "" }]);
      }
    } catch (err) {
      console.error("Gagal fetch menu untuk edit:", err);
    }
  };

  // === FILTER ===
  useEffect(() => {
    if (selectedCategoryFilter === "") setFilteredUmkms(umkms);
    else setFilteredUmkms(umkms.filter(u => u.category_id === parseInt(selectedCategoryFilter)));
    setCurrentPage(1);
  }, [selectedCategoryFilter, umkms]);

  // === IMAGE PREVIEW ===
  const handleImagePreview = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else if (!isEdit) setPreviewImage("");
  };

  const handleListingImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setListingData({ ...listingData, image: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // === GALLERY PREVIEW - MAX 5 FILES, 2MB, JPG/PNG/JPEG ===
  const handleGalleryPreview = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    const validFiles = [];
    const invalidFiles = [];

    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(`${file.name} (format tidak didukung)`);
      } else if (file.size > maxSize) {
        invalidFiles.push(`${file.name} (>2MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      showToastMessage(`File tidak valid: ${invalidFiles.join(', ')}`, "error");
    }

    if (validFiles.length + galleryFiles.length > 5) {
      showToastMessage("Maksimal 5 gambar!", "error");
      return;
    }

    setGalleryFiles([...galleryFiles, ...validFiles]);
    const previews = validFiles.map(f => URL.createObjectURL(f));
    setGalleryPreviews([...galleryPreviews, ...previews]);
  };

  // === MENU IMAGE ===
  const handleMenuImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedMenu = [...menuItems];
        updatedMenu[index].imagePreview = reader.result;
        updatedMenu[index].image = file;
        setMenuItems(updatedMenu);
      };
      reader.readAsDataURL(file);
    }
  };

  // === INPUT VALIDATION ===
  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const onlyLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  };

  // === WHATSAPP AUTO 62 ===
  const handleWhatsAppChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (!value.startsWith('62')) {
      value = '62' + value.replace(/^62/, '');
    }
    if (value.length > 15) value = value.slice(0, 15);
    setContactData({ ...contactData, whatsapp: value });
  };

  // === MENU PRICE INCREMENT/DECREMENT ===
  const adjustPrice = (index, delta) => {
    const updated = [...menuItems];
    let price = parseInt(updated[index].price.replace(/[^0-9]/g, '')) || 0;
    price = Math.max(0, price + delta);
    updated[index].price = price.toString();
    setMenuItems(updated);
  };

  // === BASIC UMKM SUBMIT ===
  const handleBasicSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const required = ["category_id", "kecamatan", "name", "hero_title", "hero_subtitle", "description", "about", "rating"];
    for (const f of required) {
      const val = formData.get(f)?.toString().trim();
      if (!val) {
        showToastMessage(`${f.replace("_", " ")} wajib diisi`, "error");
        return;
      }
    }

    if (isEdit) formData.append("_method", "PUT");

    try {
      const url = isEdit ? `${API_URL}/${selectedUmkm.id}` : API_URL;
      const res = await api.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.status) {
        const id = isEdit ? selectedUmkm.id : res.data.data.id;
        setTempUmkmId(id);
        setIsWizardStarted(true);

        const kec = formData.get("kecamatan");
        const slug = kec === "Kudus Kota" ? "kota-kudus" : kec.toLowerCase().replace(/\s+/g, "-");
        const selectedCat = categories.find(c => c.id === parseInt(formData.get("category_id")));
        setListingData(prev => ({ 
          ...prev, 
          location: kec, 
          kecamatan_slug: slug, 
          category: selectedCat.name 
        }));

        if (isEdit) {
          await fetchOpeningHours(id);
          await fetchListing(id);
          await fetchMenu(id);
        }
        setWizardStep(2);
        showToastMessage(isEdit ? "Data dasar diperbarui!" : "Data dasar berhasil dibuat!");
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Gagal menyimpan data dasar", "error");
    }
  };

  // === OPENING HOURS SUBMIT ===
  const handleHoursSubmit = async (isEdit = false) => {
    if (openingHours.some(h => !h.hours.trim() && h.is_open === 1)) {
      showToastMessage("Isi jam operasional untuk hari yang buka!", "error");
      return;
    }
    try {
      for (const h of openingHours) {
        const fd = new FormData();
        fd.append("umkm_id", tempUmkmId);
        fd.append("day", h.day);
        fd.append("hours", h.hours || "Tutup");
        fd.append("is_open", h.is_open);
        if (isEdit && h.id) {
          fd.append("_method", "PUT");
          await api.post(`${HOURS_URL}/${h.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        } else {
          await api.post(HOURS_URL, fd, { headers: { "Content-Type": "multipart/form-data" } });
        }
      }
      showToastMessage("Jam operasional disimpan!");
      setWizardStep(3);
    } catch (err) {
      showToastMessage("Gagal simpan jam operasional", "error");
    }
  };

  // === LISTING SUBMIT ===
  const handleListingSubmit = async () => {
    if (!listingData.category) {
      showToastMessage("Pilih kategori listing!", "error");
      return;
    }
    const fd = new FormData();
    fd.append("umkm_id", tempUmkmId);
    fd.append("category", listingData.category);
    if (listingData.subtitle) fd.append("subtitle", listingData.subtitle);
    fd.append("location", listingData.location);
    fd.append("kecamatan_slug", listingData.kecamatan_slug);
    if (listingData.image) fd.append("image", listingData.image);
    try {
      let res;
      if (listingId) {
        fd.append("_method", "PUT");
        res = await api.post(`${LISTING_URL}/${listingId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        res = await api.post(LISTING_URL, fd, { headers: { "Content-Type": "multipart/form-data" } });
      }
      if (res.data.status) {
        showToastMessage(listingId ? "Listing diperbarui!" : "Listing dibuat!");
        setWizardStep(4);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Gagal simpan listing", "error");
    }
  };

  // === CONTACT SUBMIT ===
  const handleContactSubmit = async () => {
    if (!contactData.whatsapp.trim() || contactData.whatsapp === "62") {
      showToastMessage("WhatsApp wajib diisi dan valid", "error");
      return;
    }
    const fd = new FormData();
    fd.append("umkm_id", tempUmkmId);
    fd.append("whatsapp", contactData.whatsapp);
    if (contactData.email) fd.append("email", contactData.email);
    if (contactData.instagram) fd.append("instagram", contactData.instagram);
    try {
      await api.post(CONTACT_URL, fd, { headers: { "Content-Type": "multipart/form-data" } });
      showToastMessage("Kontak disimpan!");
      setWizardStep(5);
    } catch (err) {
      showToastMessage("Gagal simpan kontak", "error");
    }
  };

  // === LOCATION SUBMIT ===
  const handleLocationSubmit = async () => {
    if (!locationData.address.trim()) {
      showToastMessage("Alamat wajib diisi", "error");
      return;
    }
    const fd = new FormData();
    fd.append("umkm_id", tempUmkmId);
    fd.append("address", locationData.address);
    fd.append("full_address", locationData.full_address || locationData.address);
    if (locationData.maps_url) fd.append("maps_url", locationData.maps_url);
    const embedUrl = locationData.embed_url.trim() || locationData.maps_url;
    if (embedUrl) fd.append("embed_url", embedUrl);
    try {
      await api.post(LOCATION_URL, fd, { headers: { "Content-Type": "multipart/form-data" } });
      showToastMessage("Lokasi berhasil disimpan!");
      setWizardStep(6);
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Gagal simpan lokasi", "error");
    }
  };

  // === GALLERY SUBMIT ===
  const handleGallerySubmit = async () => {
    if (galleryFiles.length === 0) {
      showToastMessage("Upload minimal 1 foto galeri", "error");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i];
      const fd = new FormData();
      fd.append("umkm_id", tempUmkmId);
      fd.append("image", file);

      try {
        await api.post(GALLERY_URL, fd, { headers: { "Content-Type": "multipart/form-data" } });
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    showToastMessage(
      successCount === galleryFiles.length
        ? `Berhasil upload ${successCount} gambar galeri!`
        : `Sukses: ${successCount}, Gagal: ${errorCount}`,
      successCount === galleryFiles.length ? "success" : "error"
    );

    setWizardStep(7);
  };

  // === MENU SUBMIT ===
  const handleMenuSubmit = async () => {
    const validMenus = menuItems.filter(m => m.name.trim() && m.price.trim());
    if (validMenus.length === 0) {
      showToastMessage("Tambahkan minimal 1 menu!", "error");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < validMenus.length; i++) {
      const m = validMenus[i];
      const fd = new FormData();
      fd.append("umkm_id", tempUmkmId);
      fd.append("name", m.name);
      fd.append("description", m.description || "");
      fd.append("price", m.price);
      if (m.image) fd.append("image", m.image);

      try {
        await api.post(MENU_URL, fd, { headers: { "Content-Type": "multipart/form-data" } });
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    showToastMessage(
      successCount === validMenus.length
        ? `Berhasil upload ${successCount} menu!`
        : `Sukses: ${successCount}, Gagal: ${errorCount}`,
      successCount === validMenus.length ? "success" : "error"
    );

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    resetWizard();
    fetchUmkms();
  };

  // === ADD / REMOVE MENU ===
  const addMenu = () => {
    setMenuItems([...menuItems, { name: "", price: "", description: "", image: null, imagePreview: "" }]);
  };

  const removeMenu = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  // === DELETE UMKM ===
  const handleDelete = async () => {
    try {
      await api.delete(`${API_URL}/${selectedUmkm.id}`);
      showToastMessage("UMKM dinonaktifkan!", "success");
      setIsConfirmDeleteOpen(false);
      fetchUmkms();
    } catch (err) {
      showToastMessage("Gagal menghapus", "error");
    }
  };

  // === RESET WIZARD ===
  const resetWizard = () => {
    setWizardStep(1);
    setTempUmkmId(null);
    setPreviewImage("");
    setGalleryPreviews([]);
    setGalleryFiles([]);
    setListingData({ category: "", subtitle: "", location: "", kecamatan_slug: "", image: null, imagePreview: "" });
    setListingId(null);
    setContactData({ whatsapp: "62", email: "", instagram: "" });
    setLocationData({ address: "", full_address: "", maps_url: "", embed_url: "" });
    setOpeningHours([
      { day: "Senin", hours: "08:00 - 17:00", is_open: 1 },
      { day: "Selasa", hours: "08:00 - 17:00", is_open: 1 },
      { day: "Rabu", hours: "08:00 - 17:00", is_open: 1 },
      { day: "Kamis", hours: "08:00 - 17:00", is_open: 1 },
      { day: "Jumat", hours: "08:00 - 17:00", is_open: 1 },
      { day: "Sabtu", hours: "08:00 - 17:00", is_open: 1 },
      { day: "Minggu", hours: "Tutup", is_open: 0 },
    ]);
    setMenuItems([{ name: "", price: "", description: "", image: null, imagePreview: "" }]);
    setIsWizardStarted(false);
  };

  // === INITIAL FETCH ===
  useEffect(() => {
    fetchCategories();
    fetchUmkms();
  }, []);

  // === RENDER ===
  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* TOAST */}
            {showToast && (
              <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out z-50 ${toastType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${toastType === "success" ? "bg-green-600" : "bg-red-600"}`}>
                  {toastType === "success" ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                  )}
                </div>
                <span className="text-sm font-medium">{toastMessage}</span>
              </div>
            )}

            {/* HEADER + FILTER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold text-gray-800">Manajemen UMKM</h1>
              <div className="flex gap-2 items-center w-full md:w-auto">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => { resetWizard(); setIsAddModalOpen(true); }}
                  className="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-600 transition whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah UMKM
                </button>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
              </div>
            )}

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-1">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kecamatan</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUmkms.length > 0 ? currentUmkms.map((u, i) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-700">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="px-4 py-3 text-gray-600">{u.category?.name || "-"}</td>
                      <td className="px-4 py-3 text-gray-600">{u.kecamatan}</td>
                      <td className="px-4 py-3 text-center">{u.rating}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${u.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={async () => { 
                              setSelectedUmkm(null);
                              setIsViewModalOpen(true); 
                              await fetchUmkmDetail(u.id); 
                            }} 
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUmkm(u);
                              setPreviewImage(u.hero_image || "");
                              fetchOpeningHours(u.id);
                              fetchListing(u.id);
                              setLocationData({
                                address: u.location?.address || "",
                                full_address: u.location?.full_address || "",
                                maps_url: u.location?.maps_url || "",
                                embed_url: u.location?.embed_url || u.location?.maps_url || ""
                              });
                              fetchMenu(u.id);
                              setIsEditModalOpen(true);
                              setIsWizardStarted(true);
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setSelectedUmkm(u); setIsConfirmDeleteOpen(true); }} className="text-red-600 hover:text-red-800">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">Belum ada UMKM.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {filteredUmkms.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredUmkms.length)} dari {filteredUmkms.length}</span>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-orange text-white" : "hover:bg-gray-100"}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* WIZARD MODAL */}
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl animate-scale-in overflow-y-auto max-h-screen">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {isEditModalOpen ? "Edit" : "Tambah"} UMKM - Step {wizardStep}/7
                </h3>
                <button
                  onClick={() => {
                    if (isWizardStarted && wizardStep > 1) {
                      showToastMessage("Harus selesaikan semua langkah!", "error");
                      return;
                    }
                    isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false);
                    resetWizard();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isWizardStarted && wizardStep > 1}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* STEP 1: DATA DASAR */}
              {wizardStep === 1 && (
                <form onSubmit={(e) => handleBasicSubmit(e, isEditModalOpen)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <select
                        name="category_id"
                        defaultValue={isEditModalOpen ? selectedUmkm?.category_id : ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                      <select
                        name="kecamatan"
                        defaultValue={isEditModalOpen ? selectedUmkm?.kecamatan : ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                        required
                      >
                        <option value="">Pilih Kecamatan</option>
                        {KECAMATAN_OPTIONS.map(k => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama UMKM</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={isEditModalOpen ? selectedUmkm?.name : ""}
                        onInput={onlyLetters}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                      <input
                        type="file"
                        name="hero_image"
                        accept="image/*"
                        onChange={handleImagePreview}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                      />
                      {(previewImage || (isEditModalOpen && selectedUmkm?.hero_image)) && (
                        <img
                          src={previewImage || selectedUmkm?.hero_image}
                          alt="Preview"
                          className="mt-2 w-full h-48 object-cover rounded-lg border"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                      <input
                        type="text"
                        name="hero_title"
                        defaultValue={isEditModalOpen ? selectedUmkm?.hero_title : ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                      <input
                        type="text"
                        name="hero_subtitle"
                        defaultValue={isEditModalOpen ? selectedUmkm?.hero_subtitle : ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                      <textarea
                        name="description"
                        rows="3"
                        defaultValue={isEditModalOpen ? selectedUmkm?.description : ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none resize-none"
                        required
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                      <textarea
                        name="about"
                        rows="3"
                        defaultValue={isEditModalOpen ? selectedUmkm?.about : ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none resize-none"
                        required
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                      <input
                        type="text"
                        name="rating"
                        defaultValue={isEditModalOpen ? selectedUmkm?.rating : ""}
                        onInput={onlyNumbers}
                        maxLength="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => { isAddModalOpen ? setIsAddModalOpen(false) : setIsEditModalOpen(false); resetWizard(); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Batal
                    </button>
                    <button type="submit" className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Next
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: OPENING HOURS */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Jam Operasional</h4>
                  {openingHours.map((h, i) => (
                    <div key={h.day} className="grid grid-cols-3 gap-4 items-center">
                      <label className="font-medium">{h.day}</label>
                      <input
                        type="text"
                        value={h.hours}
                        onChange={(e) => {
                          const arr = [...openingHours];
                          arr[i].hours = e.target.value;
                          setOpeningHours(arr);
                        }}
                        placeholder="08:00 - 17:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        required
                      />
                      <select
                        value={h.is_open}
                        onChange={(e) => {
                          const arr = [...openingHours];
                          arr[i].is_open = parseInt(e.target.value);
                          if (arr[i].is_open === 0) arr[i].hours = "Tutup";
                          else if (arr[i].hours === "Tutup") arr[i].hours = "08:00 - 17:00";
                          setOpeningHours(arr);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                      >
                        <option value={1}>Buka</option>
                        <option value={0}>Tutup</option>
                      </select>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setWizardStep(1)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Back
                    </button>
                    <button onClick={() => handleHoursSubmit(isEditModalOpen)} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: LISTING */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Listing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={listingData.category}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={listingData.subtitle}
                        onChange={(e) => setListingData({ ...listingData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                      <input
                        type="text"
                        value={listingData.location}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan Slug</label>
                      <input
                        type="text"
                        value={listingData.kecamatan_slug}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Listing</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleListingImage}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                      />
                      {listingData.imagePreview && (
                        <img
                          src={listingData.imagePreview}
                          alt="Preview Listing"
                          className="mt-2 w-full h-48 object-cover rounded-lg border"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setWizardStep(2)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Back
                    </button>
                    <button onClick={handleListingSubmit} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT */}
              {wizardStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Kontak</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (otomatis 62)</label>
                      <input
                        type="text"
                        value={contactData.whatsapp}
                        onChange={handleWhatsAppChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        placeholder="6281234567890"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        placeholder="example@domain.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                      <input
                        type="text"
                        value={contactData.instagram}
                        onChange={(e) => setContactData({ ...contactData, instagram: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        placeholder="username"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setWizardStep(3)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Back
                    </button>
                    <button onClick={handleContactSubmit} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: LOCATION */}
              {wizardStep === 5 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Lokasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alamat *</label>
                      <textarea
                        rows="3"
                        value={locationData.address}
                        onChange={(e) => setLocationData({ ...locationData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none resize-none"
                        placeholder="Ngemplik Rt04/02, Sukoharjo, Gribig, Kec. Gebog..."
                        required
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                      <textarea
                        rows="3"
                        value={locationData.full_address}
                        onChange={(e) => setLocationData({ ...locationData, full_address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none resize-none"
                        placeholder="Ngemplik Rt04/02, Sukoharjo, Gribig, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maps URL</label>
                      <input
                        type="url"
                        value={locationData.maps_url}
                        onChange={(e) => setLocationData({ ...locationData, maps_url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        placeholder="https://maps.app.goo.gl/..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Embed URL</label>
                      <input
                        type="url"
                        value={locationData.embed_url}
                        onChange={(e) => setLocationData({ ...locationData, embed_url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        placeholder="https://maps.app.goo.gl/... (bisa sama dengan Maps URL)"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setWizardStep(4)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Back
                    </button>
                    <button onClick={handleLocationSubmit} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: GALLERY */}
              {wizardStep === 6 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Galeri (Maksimal 5 Gambar, 2MB, JPG/PNG)</h4>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleGalleryPreview}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  />
                  <p className="text-xs text-orange-600">Maksimal 5 gambar, masing-masing ≤ 2MB, hanya JPG/PNG</p>
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {galleryPreviews.map((src, i) => (
                        <div key={i} className="relative group">
                          <img src={src} alt={`Preview ${i}`} className="w-full h-32 object-cover rounded-lg border" />
                          <button
                            onClick={() => {
                              const newFiles = galleryFiles.filter((_, idx) => idx !== i);
                              const newPreviews = galleryPreviews.filter((_, idx) => idx !== i);
                              setGalleryFiles(newFiles);
                              setGalleryPreviews(newPreviews);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setWizardStep(5)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Back
                    </button>
                    <button onClick={handleGallerySubmit} disabled={galleryFiles.length === 0} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">
                      Next ({galleryFiles.length}/5)
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 7: MENU */}
              {wizardStep === 7 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Menu</h4>
                  {menuItems.map((m, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-lg">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => {
                            const arr = [...menuItems];
                            arr[i].name = e.target.value;
                            setMenuItems(arr);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                          required
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => adjustPrice(i, -10000)} className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <input
                            type="text"
                            value={m.price}
                            onChange={(e) => {
                              const arr = [...menuItems];
                              arr[i].price = e.target.value.replace(/[^0-9]/g, '');
                              setMenuItems(arr);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none text-center"
                            placeholder="10000"
                            required
                          />
                          <button type="button" onClick={() => adjustPrice(i, 10000)} className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <input
                          type="text"
                          value={m.description}
                          onChange={(e) => {
                            const arr = [...menuItems];
                            arr[i].description = e.target.value;
                            setMenuItems(arr);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMenuImage(e, i)}
                          className="w-full text-xs"
                        />
                      </div>
                      <div className="md:col-span-1 text-right">
                        <button type="button" onClick={() => removeMenu(i)} className="text-red-600 hover:text-red-800">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                      {m.imagePreview && (
                        <div className="md:col-span-12">
                          <img src={m.imagePreview} alt="Menu" className="w-full h-32 object-cover rounded-lg border mt-2" />
                        </div>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addMenu} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <FaPlus /> Tambah Menu
                  </button>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setWizardStep(6)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                      Back
                    </button>
                    <button onClick={handleMenuSubmit} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Simpan Semua
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW MODAL */}
        {isViewModalOpen && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-2xl animate-scale-in overflow-y-auto max-h-screen">
              {!selectedUmkm ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange"></div>
                  <p className="mt-3 text-gray-600">Memuat detail UMKM...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Detail UMKM: {selectedUmkm.name}</h3>
                    <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {selectedUmkm.hero_image && (
                    <img src={selectedUmkm.hero_image} alt="Hero" className="w-full h-64 object-cover rounded-lg mb-4" />
                  )}

                  <section className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Data Dasar</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <p><strong>Kategori:</strong> {selectedUmkm.category?.name || "-"}</p>
                      <p><strong>Kecamatan:</strong> {selectedUmkm.kecamatan}</p>
                      <p><strong>Slug:</strong> {selectedUmkm.slug}</p>
                      <p><strong>Title:</strong> {selectedUmkm.hero_title}</p>
                      <p><strong>Subtitle:</strong> {selectedUmkm.hero_subtitle}</p>
                      <p><strong>Deskripsi:</strong> {selectedUmkm.description}</p>
                      <p><strong>About:</strong> {selectedUmkm.about}</p>
                      <p><strong>Rating:</strong> {selectedUmkm.rating}</p>
                      <p><strong>Status:</strong> {selectedUmkm.status}</p>
                    </div>
                  </section>

                  {selectedUmkm.gallery && selectedUmkm.gallery.length > 0 && (
                    <section className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Galeri</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedUmkm.gallery.map(g => (
                          <img key={g.id} src={g.image} alt="Gallery" className="w-full h-32 object-cover rounded-lg border" />
                        ))}
                      </div>
                    </section>
                  )}

                  {selectedUmkm.opening_hours && selectedUmkm.opening_hours.length > 0 && (
                    <section className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Jam Operasional</h4>
                      <table className="w-full text-sm border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-2">Hari</th>
                            <th className="border p-2">Jam</th>
                            <th className="border p-2">Buka</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedUmkm.opening_hours.map(h => (
                            <tr key={h.id}>
                              <td className="border p-2">{h.day}</td>
                              <td className="border p-2">{h.hours}</td>
                              <td className="border p-2">{h.is_open ? "Ya" : "Tidak"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                  )}

                  {selectedUmkm.listing && (
                    <section className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Listing</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <p><strong>Kategori:</strong> {selectedUmkm.listing.category || "-"}</p>
                        <p><strong>Subtitle:</strong> {selectedUmkm.listing.subtitle || "-"}</p>
                        <p><strong>Lokasi:</strong> {selectedUmkm.listing.location || "-"}</p>
                        <p><strong>Kecamatan Slug:</strong> {selectedUmkm.listing.kecamatan_slug || "-"}</p>
                      </div>
                      {selectedUmkm.listing.image ? (
                        <img src={selectedUmkm.listing.image} alt="Gambar Listing" className="w-full h-48 object-cover rounded-lg mt-2 border" />
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">Tidak ada gambar listing</p>
                      )}
                    </section>
                  )}

                  {selectedUmkm.location && (
                    <section className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Lokasi</h4>
                      <div className="text-sm space-y-2">
                        <p><strong>Alamat:</strong> {selectedUmkm.location.address}</p>
                        <p><strong>Full Address:</strong> {selectedUmkm.location.full_address}</p>
                        <p><strong>Maps URL:</strong> <a href={selectedUmkm.location.maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedUmkm.location.maps_url}</a></p>
                        <p><strong>Embed URL:</strong> <a href={selectedUmkm.location.embed_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedUmkm.location.embed_url}</a></p>
                      </div>
                    </section>
                  )}

                  {selectedUmkm.contact && (
                    <section className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Kontak</h4>
                      <div className="text-sm space-y-2">
                        <p><strong>WhatsApp:</strong> {selectedUmkm.contact.whatsapp}</p>
                        <p><strong>Email:</strong> {selectedUmkm.contact.email || "Tidak ada"}</p>
                        <p><strong>Instagram:</strong> {selectedUmkm.contact.instagram || "Tidak ada"}</p>
                      </div>
                    </section>
                  )}

                  {selectedUmkm.menu && selectedUmkm.menu.length > 0 && (
                    <section className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Menu</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedUmkm.menu.map(m => (
                          <div key={m.id} className="border p-4 rounded-lg bg-gray-50">
                            <h5 className="font-bold text-orange">{m.name}</h5>
                            {m.description && <p className="text-sm text-gray-600 mt-1">{m.description}</p>}
                            <p className="font-semibold text-green-600 mt-1">Rp {m.price}</p>
                            {m.image && (
                              <img 
                                src={m.image} 
                                alt={m.name} 
                                className="w-full h-32 object-cover rounded-lg mt-2 border"
                                onError={(e) => e.target.style.display = 'none'}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="flex justify-end mt-6">
                    <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                      Tutup
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* DELETE CONFIRM */}
        {isConfirmDeleteOpen && selectedUmkm && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
              <h3 className="text-lg font-bold mb-2">Nonaktifkan UMKM?</h3>
              <p className="text-sm text-gray-600 mb-4">Yakin ingin menonaktifkan <strong>{selectedUmkm.name}</strong>?</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsConfirmDeleteOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Batal
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Nonaktifkan
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-scale-in { animation: scaleIn 0.2s ease-out; }
          @keyframes fadeInOut { 0%, 100% { opacity: 0; } 10%, 90% { opacity: 1; } }
          .animate-fade-in-out { animation: fadeInOut 3s ease-in-out; }
        `}</style>
      </div>
    </Layout>
  );
}