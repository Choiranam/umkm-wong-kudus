import { useState, useEffect } from "react";
import api from "./api";

const API_UMKM = "/umkm";
const API_HOURS = "/umkm-hours";
const API_LISTING = "/umkm-listings";
const API_CONTACT = "/umkm-contact";
const API_LOCATION = "/umkm-locations";
const API_GALLERY = "/galeri-umkm";
const API_MENU = "/umkm-menu";

const KECAMATAN_OPTIONS = [
    "Kudus Kota", "Jati", "Bae", "Mejobo", "Undaan",
    "Gebog", "Dawe", "Jekulo", "Kaliwungu",
];

const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
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

export const useUmkmWizard = ({
    isOpen,
    onClose,
    categories,
    umkmToEdit,
    showGlobalToast,
}) => {
    const [wizardStep, setWizardStep] = useState(1);
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
    const [existingGalleryItems, setExistingGalleryItems] = useState([]);
    const [deletedGalleryIds, setDeletedGalleryIds] = useState([]);

    const [menuItems, setMenuItems] = useState([INITIAL_MENU_ITEM]);
    const [deletedMenuIds, setDeletedMenuIds] = useState([]);

    const isEditMode = !!umkmToEdit;

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const onlyNumbers = (val) => (!val ? "" : String(val).replace(/[^0-9]/g, ""));
    const cleanValue = (val) => {
        if (!val) return "";
        const str = String(val).trim();
        return ["null", "undefined", "NULL", "-"].includes(str) ? "" : str;
    };

    const formatRupiah = (number) => {
        if (!number) return "";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const resetWizard = () => {
        setWizardStep(1);
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
        setLocationData({ address: "", full_address: "", maps_url: "", embed_url: "" });
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setExistingGalleryItems([]);
        setDeletedGalleryIds([]);
        setMenuItems([INITIAL_MENU_ITEM]);
        setDeletedMenuIds([]);
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
            const [hoursRes, listingRes, contactRes, locationRes, galleryRes, menuRes] =
                await Promise.all([
                    api.get(`${API_HOURS}/umkm/${umkmToEdit.id}`).catch(() => ({ data: { status: false } })),
                    api.get(API_LISTING).catch(() => ({ data: { status: false } })),
                    api.get(`/umkm/${umkmToEdit.id}/contact`).catch(() => ({ data: { status: false } })),
                    api.get(`/umkm/${umkmToEdit.id}/location`).catch(() => ({ data: { status: false } })),
                    api.get(`${API_GALLERY}/umkm/${umkmToEdit.id}`).catch(() => ({ data: { status: false } })),
                    api.get(`${API_MENU}/umkm/${umkmToEdit.id}`).catch(() => ({ data: { status: false } })),
                ]);

            if (hoursRes.data?.status) {
                const data = hoursRes.data.data || [];
                const updated = INITIAL_HOURS.map(h => {
                    const found = data.find(d => d.day === h.day);
                    if (found) {
                        let openTime = "08:00", closeTime = "17:00";
                        if (found.hours && found.hours !== "Tutup" && found.hours.includes("-")) {
                            const parts = found.hours.split("-");
                            openTime = parts[0].trim().replace(/\./g, ":");
                            closeTime = parts[1].trim().replace(/\./g, ":");
                        }
                        return { ...h, open: openTime, close: closeTime, is_open: parseInt(found.is_open), id: found.id };
                    }
                    return h;
                });
                setOpeningHours(updated);
            }

            if (listingRes.data?.data) {
                const listing = listingRes.data.data.find(l => l.umkm_id === umkmToEdit.id);
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
            }

            if (contactRes.data?.status && contactRes.data.data) {
                const c = contactRes.data.data;
                let cleanWA = onlyNumbers(c.whatsapp);
                if (!cleanWA) cleanWA = "62";
                setContactData({
                    whatsapp: cleanWA,
                    email: cleanValue(c.email),
                    instagram: cleanValue(c.instagram),
                });
            }

            if (locationRes.data?.status && locationRes.data.data) {
                setLocationData(locationRes.data.data);
            }

            if (galleryRes.data?.status && Array.isArray(galleryRes.data.data)) {
                const data = galleryRes.data.data;
                setExistingGalleryItems(data);
                setGalleryPreviews(data.map(item => item.image));
            }

            if (menuRes.data?.status && Array.isArray(menuRes.data.data)) {
                const menus = menuRes.data.data.map(m => ({
                    id: m.id,
                    name: m.name,
                    price: String(m.price).replace(/[^0-9]/g, ""),
                    description: m.description || "",
                    imagePreview: m.image,
                    image: null,
                }));
                if (menus.length > 0) setMenuItems(menus);
                else setMenuItems([INITIAL_MENU_ITEM]);
            }
        } catch (err) {
            showGlobalToast("Gagal memuat sebagian data edit", "error");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                resetWizard();
                loadEditData();
            } else {
                resetWizard();
            }
        }
    }, [isOpen, umkmToEdit]);

    const handleClose = () => {
        resetWizard();
        onClose(false);
    };

    const handleBack = () => {
        if (wizardStep > 1) setWizardStep(prev => prev - 1);
        else handleClose();
    };

    const handleBasicChange = e => {
        const { name, value } = e.target;
        setBasicData(prev => ({ ...prev, [name]: value }));
    };

    const handleBasicImage = e => {
        const file = e.target.files[0];
        if (file) {
            setBasicData(prev => ({
                ...prev,
                hero_image: file,
                hero_image_preview: URL.createObjectURL(file),
            }));
        }
    };

    const handleOpeningHoursChange = (index, field, value) => {
        setOpeningHours(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const handleListingSubtitleChange = e => setListingData(prev => ({ ...prev, subtitle: e.target.value }));
    const handleListingImageChange = e => {
        const file = e.target.files[0];
        if (file) setListingData(prev => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }));
    };

    const handleContactChange = e => {
        const { name, value } = e.target;
        setContactData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = e => {
        const { name, value } = e.target;
        setLocationData(prev => ({ ...prev, [name]: value }));
    };

    const validateBasicData = () => {
        const required = ["category_id", "kecamatan", "name", "hero_title", "hero_subtitle", "description", "about", "rating"];
        for (const f of required) {
            if (!basicData[f] || !String(basicData[f]).trim()) {
                showToast(`${f.replace("_", " ")} wajib diisi`, "error");
                return false;
            }
        }
        return true;
    };

    const handleBasicSubmit = async (advance = false) => {
        if (!validateBasicData()) return false;
        setLoading(true);
        if (isEditMode) {
            const formData = new FormData();
            for (const key in basicData) {
                if (key !== "hero_image_preview" && basicData[key] !== null) formData.append(key, basicData[key]);
            }
            formData.append("_method", "PUT");
            try {
                await api.post(`${API_UMKM}/${umkmToEdit.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                showToast("Data dasar diperbarui!");
                if (advance) setWizardStep(2);
                setLoading(false);
                return true;
            } catch (err) {
                showToast(err.response?.data?.message || "Gagal update data dasar", "error");
            }
        } else {
            const kec = basicData.kecamatan;
            const slug = kec === "Kudus Kota" ? "kota-kudus" : kec.toLowerCase().replace(/\s+/g, "-");
            const selectedCat = categories.find(c => c.id === parseInt(basicData.category_id));
            setListingData(prev => ({
                ...prev,
                location: kec,
                kecamatan_slug: slug,
                category: selectedCat?.name || "",
            }));
            if (advance) setWizardStep(2);
        }
        setLoading(false);
        return true;
    };

    const validateHours = () => openingHours.every(h => h.is_open === 0 || h.open !== h.close) || (showToast("Jam buka dan tutup tidak boleh sama", "error"), false);

    const handleHoursSubmit = async (advance = false) => {
        if (!validateHours()) return false;
        if (!isEditMode) { if (advance) setWizardStep(3); return true; }
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
                    await api.post(`${API_HOURS}/${h.id}`, fd);
                } else {
                    await api.post(API_HOURS, fd);
                }
            }
            showToast("Jam operasional disimpan!");
            if (advance) setWizardStep(3);
            return true;
        } catch (err) {
            showToast("Gagal simpan jam", "error");
        } finally { setLoading(false); }
        return false;
    };

    const handleListingSubmit = async (advance = false) => {
        if (!listingData.category) { showToast("Kategori listing belum ada", "error"); return false; }
        if (!isEditMode) { if (advance) setWizardStep(4); return true; }
        setLoading(true);
        const fd = new FormData();
        fd.append("umkm_id", umkmToEdit.id);
        fd.append("category", listingData.category);
        if (listingData.subtitle) fd.append("subtitle", listingData.subtitle);
        fd.append("location", listingData.location);
        fd.append("kecamatan_slug", listingData.kecamatan_slug);
        if (listingData.image instanceof File) fd.append("image", listingData.image);
        try {
            if (listingId) {
                fd.append("_method", "PUT");
                await api.post(`${API_LISTING}/${listingId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
            } else {
                await api.post(API_LISTING, fd, { headers: { "Content-Type": "multipart/form-data" } });
            }
            showToast("Listing disimpan!");
            if (advance) setWizardStep(4);
            return true;
        } catch (err) {
            showToast(err.response?.data?.message || "Gagal simpan listing", "error");
        } finally { setLoading(false); }
        return false;
    };

    const validateContact = () => {
        const email = cleanValue(contactData.email);
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast("Format email tidak valid", "error");
            return false;
        }
        return true;
    };

    const handleContactSubmit = async (advance = false) => {
        if (!validateContact()) return false;
        if (!isEditMode) { if (advance) setWizardStep(5); return true; }
        setLoading(true);
        const fd = new FormData();
        fd.append("umkm_id", umkmToEdit.id);
        const wa = onlyNumbers(contactData.whatsapp);
        if (wa && wa !== "62") fd.append("whatsapp", wa);
        fd.append("email", cleanValue(contactData.email));
        fd.append("instagram", cleanValue(contactData.instagram));
        fd.append("_method", "PUT");
        try {
            await api.post(`/umkm/${umkmToEdit.id}/contact`, fd);
            showToast("Kontak disimpan!");
            if (advance) setWizardStep(5);
            return true;
        } catch (err) {
            showToast(err.response?.data?.message || "Gagal simpan kontak", "error");
        } finally { setLoading(false); }
        return false;
    };

    const handleLocationSubmit = async (advance = false) => {
        if (!locationData.address.trim()) { showToast("Alamat wajib diisi", "error"); return false; }
        if (!isEditMode) { if (advance) setWizardStep(6); return true; }
        setLoading(true);
        const fd = new FormData();
        fd.append("umkm_id", umkmToEdit.id);
        fd.append("address", locationData.address);
        fd.append("full_address", locationData.full_address || locationData.address);
        if (locationData.maps_url) fd.append("maps_url", locationData.maps_url);
        const embed = locationData.embed_url.trim() || locationData.maps_url;
        if (embed) fd.append("embed_url", embed);
        fd.append("_method", "PUT");
        try {
            await api.post(`/umkm/${umkmToEdit.id}/location`, fd);
            showToast("Lokasi disimpan!");
            if (advance) setWizardStep(6);
            return true;
        } catch (err) {
            showToast("Gagal simpan lokasi", "error");
        } finally { setLoading(false); }
        return false;
    };

    const handleGallerySubmit = async (advance = false) => {
        if (galleryFiles.length === 0 && galleryPreviews.length === 0 && !isEditMode) {
            showToast("Upload minimal 1 foto galeri", "error");
            return false;
        }
        if (!isEditMode) { if (advance) setWizardStep(7); return true; }
        setLoading(true);
        if (deletedGalleryIds.length > 0) {
            await Promise.all(deletedGalleryIds.map(id => api.delete(`${API_GALLERY}/${id}`).catch(() => { })));
        }
        if (galleryFiles.length > 0) {
            for (const file of galleryFiles) {
                const fd = new FormData();
                fd.append("umkm_id", umkmToEdit.id);
                fd.append("image", file);
                await api.post(API_GALLERY, fd, { headers: { "Content-Type": "multipart/form-data" } }).catch(() => { });
            }
        }
        showToast("Galeri diperbarui!");
        setGalleryFiles([]);
        setDeletedGalleryIds([]);
        if (advance) setWizardStep(7);
        setLoading(false);
        return true;
    };

    const handleFinalSubmit = async () => {
        const valid = menuItems.some(m => m.name.trim() && m.price.trim());
        if (!valid) { showToast("Tambahkan minimal 1 menu!", "error"); return false; }

        if (!isEditMode) {
            let newId = null;
            try {
                const basicFd = new FormData();
                for (const key in basicData) {
                    if (key !== "hero_image_preview" && basicData[key] !== null) basicFd.append(key, basicData[key]);
                }
                const res = await api.post(API_UMKM, basicFd, { headers: { "Content-Type": "multipart/form-data" } });
                newId = res.data.data.id;

                const promises = [];
                openingHours.forEach(h => {
                    const fd = new FormData();
                    fd.append("umkm_id", newId);
                    fd.append("day", h.day);
                    fd.append("hours", h.is_open ? `${h.open} - ${h.close}` : "Tutup");
                    fd.append("is_open", h.is_open);
                    promises.push(api.post(API_HOURS, fd));
                });
                const listingFd = new FormData();
                listingFd.append("umkm_id", newId);
                listingFd.append("category", listingData.category);
                if (listingData.subtitle) listingFd.append("subtitle", listingData.subtitle);
                listingFd.append("location", listingData.location);
                listingFd.append("kecamatan_slug", listingData.kecamatan_slug);
                if (listingData.image instanceof File) listingFd.append("image", listingData.image);
                promises.push(api.post(API_LISTING, listingFd, { headers: { "Content-Type": "multipart/form-data" } }));

                const contactFd = new FormData();
                contactFd.append("umkm_id", newId);
                const wa = onlyNumbers(contactData.whatsapp);
                if (wa && wa !== "62") contactFd.append("whatsapp", wa);
                if (contactData.email?.trim()) contactFd.append("email", contactData.email.trim());
                if (contactData.instagram?.trim()) contactFd.append("instagram", contactData.instagram.trim());
                promises.push(api.post(API_CONTACT, contactFd));

                const locFd = new FormData();
                locFd.append("umkm_id", newId);
                locFd.append("address", locationData.address);
                locFd.append("full_address", locationData.full_address || locationData.address);
                if (locationData.maps_url) locFd.append("maps_url", locationData.maps_url);
                const embed = locationData.embed_url.trim() || locationData.maps_url;
                if (embed) locFd.append("embed_url", embed);
                promises.push(api.post(API_LOCATION, locFd));

                galleryFiles.forEach(f => {
                    const fd = new FormData();
                    fd.append("umkm_id", newId);
                    fd.append("image", f);
                    promises.push(api.post(API_GALLERY, fd, { headers: { "Content-Type": "multipart/form-data" } }));
                });

                menuItems.filter(m => m.name.trim() && m.price.trim()).forEach(m => {
                    const fd = new FormData();
                    fd.append("umkm_id", newId);
                    fd.append("name", m.name);
                    fd.append("description", m.description || "");
                    fd.append("price", m.price);
                    if (m.image instanceof File) fd.append("image", m.image);
                    promises.push(api.post(API_MENU, fd, { headers: { "Content-Type": "multipart/form-data" } }));
                });

                await Promise.all(promises);
                showGlobalToast("UMKM berhasil dibuat!", "success");
                onClose(true);
                return true;
            } catch (err) {
                if (newId) await api.delete(`${API_UMKM}/${newId}`).catch(() => { });
                showToast("Gagal menyimpan data UMKM", "error");
                return false;
            }
        } else {
            if (deletedMenuIds.length > 0) {
                await Promise.all(deletedMenuIds.map(id => api.delete(`${API_MENU}/${id}`).catch(() => { })));
            }
            for (const m of menuItems) {
                if (!m.name.trim() || !m.price.trim()) continue;
                const fd = new FormData();
                fd.append("umkm_id", umkmToEdit.id);
                fd.append("name", m.name);
                fd.append("description", m.description || "");
                fd.append("price", m.price);
                if (m.image instanceof File) fd.append("image", m.image);
                if (m.id) {
                    fd.append("_method", "PUT");
                    await api.post(`${API_MENU}/${m.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }).catch(() => { });
                } else {
                    await api.post(API_MENU, fd, { headers: { "Content-Type": "multipart/form-data" } }).catch(() => { });
                }
            }
            showGlobalToast("UMKM berhasil diperbarui!", "success");
            onClose(true);
            return true;
        }
    };

    const handleGalleryPreview = e => {
        const files = Array.from(e.target.files);
        const valid = files.filter(f => f.type.startsWith("image/") && f.size <= 2 * 1024 * 1024).slice(0, 5 - galleryFiles.length);
        if (valid.length + galleryFiles.length > 5) { showToast("Maksimal 5 gambar!", "error"); return; }
        setGalleryFiles(prev => [...prev, ...valid]);
        setGalleryPreviews(prev => [...prev, ...valid.map(f => URL.createObjectURL(f))]);
    };

    const removeGalleryImage = index => {
        const existingCount = existingGalleryItems.length;
        if (index < existingCount) {
            const item = existingGalleryItems[index];
            setDeletedGalleryIds(prev => [...prev, item.id]);
            setExistingGalleryItems(prev => prev.filter((_, i) => i !== index));
        } else {
            setGalleryFiles(prev => prev.filter((_, i) => i !== index - existingCount));
        }
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;

        setMenuItems(prev =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [name]:
                            name === "price"
                                ? value.replace(/[^0-9]/g, "")
                                : value,
                    }
                    : item
            )
        );
    };

    const handleMenuImage = (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMenuItems(prev =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        image: file,
                        imagePreview: URL.createObjectURL(file),
                    }
                    : item
            )
        );
    };

    const addMenu = () =>
        setMenuItems(prev => [...prev, { ...INITIAL_MENU_ITEM }]);

    const removeMenu = index => {
        const item = menuItems[index];
        if (item.id) setDeletedMenuIds(prev => [...prev, item.id]);
        setMenuItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleWhatsAppChange = e => {
        let val = onlyNumbers(e.target.value);
        if (!val.startsWith("62")) val = "62" + val.replace(/^62/, "");
        if (val.length > 15) val = val.slice(0, 15);
        setContactData(prev => ({ ...prev, whatsapp: val }));
    };

    const handleSaveAndClose = async () => {
        const steps = {
            1: () => handleBasicSubmit(),
            2: () => handleHoursSubmit(),
            3: () => handleListingSubmit(),
            4: () => handleContactSubmit(),
            5: () => handleLocationSubmit(),
            6: () => handleGallerySubmit(),
            7: () => handleFinalSubmit(),
        };
        await steps[wizardStep]();
        onClose(true);
    };

    const handleSaveAndNext = async () => {
        const steps = {
            1: () => handleBasicSubmit(true),
            2: () => handleHoursSubmit(true),
            3: () => handleListingSubmit(true),
            4: () => handleContactSubmit(true),
            5: () => handleLocationSubmit(true),
            6: () => handleGallerySubmit(true),
            7: () => handleFinalSubmit(),
        };
        await steps[wizardStep]();
    };

    const handleAddModeNext = () => {
        const validators = {
            1: validateBasicData,
            2: validateHours,
            3: () => true,
            4: validateContact,
            5: () => !!locationData.address.trim(),
            6: () => galleryFiles.length > 0 || galleryPreviews.length > 0,
            7: () => menuItems.some(m => m.name.trim() && m.price.trim()),
        };
        if (wizardStep === 7 || validators[wizardStep]()) setWizardStep(prev => prev + 1);
        if (wizardStep === 7) handleFinalSubmit();
    };

    return {
        wizardStep,
        setWizardStep,
        loading,
        toast,
        basicData,
        openingHours,
        listingData,
        contactData,
        locationData,
        galleryPreviews,
        menuItems,
        isEditMode,
        handleClose,
        handleBack,
        handleBasicChange,
        handleBasicImage,
        handleOpeningHoursChange,
        handleListingSubtitleChange,
        handleListingImageChange,
        handleContactChange,
        handleLocationChange,
        handleGalleryPreview,
        removeGalleryImage,
        handleMenuChange,
        handleMenuImage,
        addMenu,
        removeMenu,
        handleWhatsAppChange,
        handleSaveAndClose,
        handleSaveAndNext,
        handleAddModeNext,
        timeOptions,
        KECAMATAN_OPTIONS,
        formatRupiah,
    };
};