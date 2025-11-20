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
    const [isWizardStarted, setIsWizardStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
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

    const onlyNumbers = (val) => {
        if (!val) return "";
        // Bersihkan karakter '-' juga dari input WA jika ada sisa seeder
        return String(val).replace(/[^0-9]/g, "");
    };

    // PENTING: Fungsi ini membersihkan data '-' dari seeder agar tidak dianggap value valid
    const cleanValue = (val) => {
        if (!val) return "";
        const strVal = String(val).trim();
        // Hapus value sampah seperti "null", "undefined", atau tanda strip "-"
        if (strVal === "null" || strVal === "undefined" || strVal === "NULL" || strVal === "-") return "";
        return strVal;
    };

    const resetWizard = () => {
        setWizardStep(1);
        setIsWizardStarted(false);
        setIsDirty(false);
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
                    api.get(`${API_HOURS}/umkm/${umkmToEdit.id}`).catch(() => ({ data: { status: false } })),
                    api.get(API_LISTING).catch(() => ({ data: { status: false } })),
                    api.get(`/umkm/${umkmToEdit.id}/contact`).catch(() => ({ data: { status: false } })),
                    api.get(`/umkm/${umkmToEdit.id}/location`).catch(() => ({ data: { status: false } })),
                    api.get(`${API_MENU}/umkm/${umkmToEdit.id}`).catch(() => ({ data: { status: false } })),
                ]);

            if (hoursRes.data && hoursRes.data.status) {
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

            if (listingRes.data && listingRes.data.data) {
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
            }

            // PENTING: Bersihkan data kontak saat load
            if (contactRes.data && contactRes.data.status && contactRes.data.data) {
                const c = contactRes.data.data;

                // Bersihkan WA: hapus strip "-", ambil angka saja. Jika kosong/strip jadikan "62"
                let cleanWA = onlyNumbers(c.whatsapp);
                if (!cleanWA) cleanWA = "62";

                setContactData({
                    whatsapp: cleanWA,
                    email: cleanValue(c.email), // Ubah "-" jadi ""
                    instagram: cleanValue(c.instagram), // Ubah "-" jadi ""
                });
            }

            if (locationRes.data && locationRes.data.status && locationRes.data.data) {
                setLocationData(locationRes.data.data);
            }

            if (menuRes.data && menuRes.data.status && Array.isArray(menuRes.data.data)) {
                const menus = menuRes.data.data.map((m) => ({
                    id: m.id,
                    name: m.name,
                    price: m.price,
                    description: m.description || "",
                    imagePreview: m.image,
                    image: null,
                }));
                if (menus.length > 0) setMenuItems(menus);
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
                loadEditData();
            } else {
                resetWizard();
            }
        }
    }, [isOpen, umkmToEdit]);

    const handleClose = () => {
        if (!isEditMode && isWizardStarted && wizardStep > 1) {
            if (!window.confirm("Data belum disimpan. Yakin ingin keluar?")) {
                return;
            }
        }
        resetWizard();
        onClose(false);
    };

    const handleBack = () => {
        if (wizardStep > 1) {
            setWizardStep((prev) => prev - 1);
        } else {
            handleClose();
        }
    };

    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setBasicData((prev) => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleBasicImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBasicData((prev) => ({
                ...prev,
                hero_image: file,
                hero_image_preview: URL.createObjectURL(file),
            }));
            setIsDirty(true);
        }
    };

    const handleOpeningHoursChange = (index, field, value) => {
        const updated = [...openingHours];
        updated[index][field] = value;
        setOpeningHours(updated);
        setIsDirty(true);
    };

    const handleListingSubtitleChange = (e) => {
        setListingData(prev => ({ ...prev, subtitle: e.target.value }));
        setIsDirty(true);
    };

    const handleListingImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setListingData(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
            setIsDirty(true);
        }
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setLocationData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const validateBasicData = () => {
        const required = [
            "category_id", "kecamatan", "name", "hero_title",
            "hero_subtitle", "description", "about", "rating",
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
                    setIsDirty(false);
                    setLoading(false);
                    return true;
                }
            } catch (err) {
                showToast(err.response?.data?.message || "Gagal memperbarui data dasar", "error");
            }
            setLoading(false);
            return false;
        } else {
            const kec = basicData.kecamatan;
            const slug = kec === "Kudus Kota"
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
            showToast("Jam buka dan tutup tidak boleh sama untuk hari yang buka", "error");
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
                        await api.post(`${API_HOURS}/${h.id}`, fd);
                    } else {
                        await api.post(API_HOURS, fd);
                    }
                }
                showToast("Jam operasional disimpan!");
                if (advanceOnSuccess) setWizardStep(3);
                setIsDirty(false);
                return true;
            } catch (err) {
                showToast("Gagal simpan jam operasional", "error");
            } finally {
                setLoading(false);
            }
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
                    setIsDirty(false);
                    return true;
                }
            } catch (err) {
                showToast(err.response?.data?.message || "Gagal simpan listing", "error");
            } finally {
                setLoading(false);
            }
            return false;
        } else {
            if (advanceOnSuccess) setWizardStep(4);
            return true;
        }
    };

    const validateContact = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cleanEmail = cleanValue(contactData.email);

        // Jika email bersih tidak kosong, baru validasi regex
        if (cleanEmail !== "") {
            if (!emailRegex.test(cleanEmail)) {
                showToast("Format email tidak valid. Contoh: nama@domain.com", "error");
                return false;
            }
        }
        return true;
    };

    const handleContactSubmit = async (advanceOnSuccess = false) => {
        if (!validateContact()) return false;

        if (isEditMode) {
            setLoading(true);
            const fd = new FormData();
            fd.append("umkm_id", umkmToEdit.id);

            const waRaw = onlyNumbers(contactData.whatsapp);
            const waFinal = (waRaw && waRaw !== "62") ? waRaw : "";
            fd.append("whatsapp", waFinal);

            // Gunakan cleanValue saat kirim untuk mengubah "-" jadi ""
            fd.append("email", cleanValue(contactData.email));
            fd.append("instagram", cleanValue(contactData.instagram));

            try {
                const url = `/umkm/${umkmToEdit.id}/contact`;
                fd.append("_method", "PUT");

                const res = await api.post(url, fd);

                if (res.data.status) {
                    showToast("Kontak disimpan!");
                    if (advanceOnSuccess) setWizardStep(5);
                    setIsDirty(false);
                    return true;
                }
            } catch (err) {
                console.error("Error Submit Contact:", err.response);
                if (err.response?.status === 422) {
                    const errors = err.response.data.data || {};
                    const firstKey = Object.keys(errors)[0];
                    const firstMsg = errors[firstKey]?.[0] || "Validasi gagal";
                    showToast(`Gagal: ${firstMsg}`, "error");
                } else {
                    showToast(err.response?.data?.message || "Gagal simpan kontak", "error");
                }
            } finally {
                setLoading(false);
            }
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
            fd.append("full_address", locationData.full_address || locationData.address);
            if (locationData.maps_url) fd.append("maps_url", locationData.maps_url);
            const embedUrl = locationData.embed_url.trim() || locationData.maps_url;
            if (embedUrl) fd.append("embed_url", embedUrl);

            try {
                const url = `/umkm/${umkmToEdit.id}/location`;
                fd.append("_method", "PUT");

                await api.post(url, fd);

                showToast("Lokasi berhasil disimpan!");
                if (advanceOnSuccess) setWizardStep(6);
                setIsDirty(false);
                return true;
            } catch (err) {
                showToast(err.response?.data?.message || "Gagal simpan lokasi", "error");
            } finally {
                setLoading(false);
            }
            return false;
        } else {
            if (advanceOnSuccess) setWizardStep(6);
            return true;
        }
    };

    const validateGallery = () => {
        if (galleryFiles.length === 0 && !isEditMode) {
            showToast("Upload minimal 1 foto galeri", "error");
            return false;
        }
        return true;
    };

    const handleGallerySubmit = async (advanceOnSuccess = false) => {
        if (!validateGallery()) return false;

        if (isEditMode) {
            if (galleryFiles.length > 0) {
                setLoading(true);
                let successCount = 0, errorCount = 0;
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
                showToast(`Sukses: ${successCount}, Gagal: ${errorCount}`, errorCount > 0 ? "error" : "success");
                setGalleryFiles([]);
                setGalleryPreviews([]);
                if (advanceOnSuccess) setWizardStep(7);
                setIsDirty(false);
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
            let successCount = 0, errorCount = 0;
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
            showToast(`Sukses: ${successCount}, Gagal: ${errorCount}`, errorCount > 0 ? "error" : "success");

            if (successCount > 0) {
                showGlobalToast("UMKM berhasil diperbarui!", "success");
                setIsDirty(false);
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
                    promises.push(api.post(API_HOURS, fd));
                });

                const listingFd = new FormData();
                listingFd.append("umkm_id", newUmkmId);
                listingFd.append("category", listingData.category);
                if (listingData.subtitle) listingFd.append("subtitle", listingData.subtitle);
                listingFd.append("location", listingData.location);
                listingFd.append("kecamatan_slug", listingData.kecamatan_slug);
                if (listingData.image instanceof File) {
                    listingFd.append("image", listingData.image);
                }
                promises.push(api.post(API_LISTING, listingFd, {
                    headers: { "Content-Type": "multipart/form-data" },
                }));

                const contactFd = new FormData();
                contactFd.append("umkm_id", newUmkmId);

                const waValue = onlyNumbers(contactData.whatsapp);
                if (waValue && waValue !== "62") {
                    contactFd.append("whatsapp", waValue);
                }

                if (contactData.email && contactData.email.trim() !== "") {
                    contactFd.append("email", contactData.email.trim());
                }
                if (contactData.instagram && contactData.instagram.trim() !== "") {
                    contactFd.append("instagram", contactData.instagram.trim());
                }

                promises.push(api.post(API_CONTACT, contactFd));

                const locationFd = new FormData();
                locationFd.append("umkm_id", newUmkmId);
                locationFd.append("address", locationData.address);
                locationFd.append("full_address", locationData.full_address || locationData.address);
                if (locationData.maps_url) locationFd.append("maps_url", locationData.maps_url);
                const embedUrl = locationData.embed_url.trim() || locationData.maps_url;
                if (embedUrl) locationFd.append("embed_url", embedUrl);
                promises.push(api.post(API_LOCATION, locationFd));

                galleryFiles.forEach((file) => {
                    const fd = new FormData();
                    fd.append("umkm_id", newUmkmId);
                    fd.append("image", file);
                    promises.push(api.post(API_GALLERY, fd, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }));
                });

                const validMenus = menuItems.filter((m) => m.name.trim() && m.price.trim());
                validMenus.forEach((m) => {
                    const fd = new FormData();
                    fd.append("umkm_id", newUmkmId);
                    fd.append("name", m.name);
                    fd.append("description", m.description || "");
                    fd.append("price", m.price);
                    if (m.image instanceof File) fd.append("image", m.image);
                    promises.push(api.post(API_MENU, fd, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }));
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
                    errMsg = `Gagal menyimpan relasi. Rollback ID: ${newUmkmId}.`;
                    try {
                        await api.delete(`${API_UMKM}/${newUmkmId}`);
                    } catch (e) {
                        console.error("Rollback failed", e);
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
        const validFiles = [], invalidFiles = [];

        files.forEach((file) => {
            if (!allowedTypes.includes(file.type)) invalidFiles.push(`${file.name} (format)`);
            else if (file.size > maxSize) invalidFiles.push(`${file.name} (>2MB)`);
            else validFiles.push(file);
        });

        if (invalidFiles.length > 0) showToast(`File tidak valid: ${invalidFiles.join(", ")}`, "error");
        if (validFiles.length + galleryFiles.length > 5) {
            showToast("Maksimal 5 gambar!", "error");
            return;
        }

        setGalleryFiles([...galleryFiles, ...validFiles]);
        const previews = validFiles.map((f) => URL.createObjectURL(f));
        setGalleryPreviews([...galleryPreviews, ...previews]);
        setIsDirty(true);
    };

    const removeGalleryImage = (index) => {
        setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
        setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
        setIsDirty(true);
    };

    const handleMenuChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...menuItems];
        updated[index][name] = name === "price" ? value.replace(/[^0-9]/g, "") : value;
        setMenuItems(updated);
        setIsDirty(true);
    };

    const handleMenuImage = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const updated = [...menuItems];
            updated[index].image = file;
            updated[index].imagePreview = URL.createObjectURL(file);
            setMenuItems(updated);
            setIsDirty(true);
        }
    };

    const addMenu = () => setMenuItems([...menuItems, { ...INITIAL_MENU_ITEM }]);
    const removeMenu = (index) => setMenuItems(menuItems.filter((_, i) => i !== index));

    const handleWhatsAppChange = (e) => {
        let value = onlyNumbers(e.target.value);
        if (!value.startsWith("62")) {
            value = "62" + value.replace(/^62/, "");
        }
        if (value.length > 15) value = value.slice(0, 15);
        setContactData({ ...contactData, whatsapp: value });
        setIsDirty(true);
    };

    const runCurrentStepSubmit = async () => {
        switch (wizardStep) {
            case 1: return await handleBasicSubmit(false);
            case 2: return await handleHoursSubmit(false);
            case 3: return await handleListingSubmit(false);
            case 4: return await handleContactSubmit(false);
            case 5: return await handleLocationSubmit(false);
            case 6: return await handleGallerySubmit(false);
            case 7: return await handleFinalSubmit(false);
            default: return false;
        }
    };

    const handleSaveAndClose = async () => {
        const success = await runCurrentStepSubmit();
        if (success) onClose(true);
    };

    const handleSaveAndNext = async () => {
        let success = false;
        switch (wizardStep) {
            case 1: success = await handleBasicSubmit(true); break;
            case 2: success = await handleHoursSubmit(true); break;
            case 3: success = await handleListingSubmit(true); break;
            case 4: success = await handleContactSubmit(true); break;
            case 5: success = await handleLocationSubmit(true); break;
            case 6: success = await handleGallerySubmit(true); break;
            case 7: success = await handleFinalSubmit(true); break;
            default: return;
        }
    };

    const handleAddModeNext = () => {
        let isValid = false;
        switch (wizardStep) {
            case 1: isValid = validateBasicData(); break;
            case 2: isValid = validateHours(); break;
            case 3: isValid = validateListing(); break;
            case 4: isValid = validateContact(); break;
            case 5: isValid = validateLocation(); break;
            case 6: isValid = validateGallery(); break;
            case 7: handleFinalSubmit(true); return;
            default: return;
        }
        if (isValid) {
            setIsWizardStarted(true);
            setWizardStep((s) => s + 1);
        }
    };

    return {
        wizardStep,
        setWizardStep,
        isWizardStarted,
        loading,
        toast,
        isDirty,
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
        runCurrentStepSubmit,
        timeOptions,
        KECAMATAN_OPTIONS,
    };
};