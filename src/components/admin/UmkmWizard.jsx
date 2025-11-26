import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import FormInput from "./FormInput";
import { useUmkmWizard } from "../../services/useUmkmWizard";

const INPUT_CLASSES =
  "block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm py-2 px-3 transition duration-200 bg-white";
const DISABLED_CLASSES =
  "bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200";
const FILE_CLASSES =
  "block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition cursor-pointer border border-gray-300 rounded-lg bg-white";

export default function UmkmWizard({
  isOpen,
  onClose,
  categories,
  umkmToEdit,
  showGlobalToast,
}) {
  const {
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
  } = useUmkmWizard({
    isOpen,
    onClose,
    categories,
    umkmToEdit,
    showGlobalToast,
  });

  const steps = [
    { id: 1, title: "Data Dasar" },
    { id: 2, title: "Jam" },
    { id: 3, title: "Listing" },
    { id: 4, title: "Kontak" },
    { id: 5, title: "Lokasi" },
    { id: 6, title: "Galeri" },
    { id: 7, title: "Menu" },
  ];

  const goToStep = (stepId) => {
    if (isEditMode) {
      setWizardStep(stepId);
    }
  };

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
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div className="flex h-full flex-col bg-gray-50 shadow-2xl overflow-hidden">
                    <div className="bg-white border-b border-gray-200 z-20 relative shadow-sm">
                      {toast.show && (
                        <div
                          className={`absolute top-0 inset-x-0 p-2 text-center text-xs font-semibold text-white tracking-wide shadow-md transition-colors ${
                            toast.type === "success"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {toast.message}
                        </div>
                      )}

                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>
                          <Dialog.Title className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="p-1.5 bg-orange-50 rounded-lg text-orange-600 border border-orange-100">
                              <Icon
                                icon={
                                  isEditMode
                                    ? "mdi:store-edit-outline"
                                    : "mdi:store-plus-outline"
                                }
                                width="20"
                              />
                            </span>
                            {isEditMode
                              ? "Edit Informasi UMKM"
                              : "Registrasi UMKM Baru"}
                          </Dialog.Title>
                        </div>
                        <button
                          type="button"
                          className="rounded-full p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition duration-200"
                          onClick={handleClose}
                        >
                          <Icon icon="mdi:close" className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="px-6 pb-3 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center justify-between min-w-max">
                          {steps.map((step, idx) => {
                            const isCompleted = wizardStep > step.id;
                            const isCurrent = wizardStep === step.id;
                            const clickable = isEditMode;
                            return (
                              <React.Fragment key={step.id}>
                                <div
                                  className={`flex flex-col items-center relative group mx-1 ${
                                    clickable
                                      ? "cursor-pointer"
                                      : "cursor-default"
                                  }`}
                                  onClick={() => clickable && goToStep(step.id)}
                                >
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                                      isCompleted
                                        ? "bg-orange-500 text-white border-orange-500"
                                        : isCurrent
                                        ? "bg-white text-orange-600 border-orange-500 ring-2 ring-orange-100"
                                        : "bg-gray-50 text-gray-400 border-gray-200"
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <Icon
                                        icon="mdi:check"
                                        className="w-4 h-4"
                                      />
                                    ) : (
                                      step.id
                                    )}
                                  </div>
                                  <span
                                    className={`text-[10px] font-semibold mt-1 uppercase tracking-wide ${
                                      isCurrent
                                        ? "text-orange-700"
                                        : isCompleted
                                        ? "text-gray-700"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {step.title}
                                  </span>
                                </div>
                                {idx < steps.length - 1 && (
                                  <div className="flex-1 h-0.5 w-8 mx-2 rounded-full bg-gray-200 relative -top-2">
                                    <div
                                      className={`absolute inset-y-0 left-0 bg-orange-500 transition-all duration-500 rounded-full ${
                                        wizardStep > step.id ? "w-full" : "w-0"
                                      }`}
                                    />
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-white/50">
                      {loading && wizardStep === 1 && (
                        <div className="flex flex-col items-center justify-center h-60">
                          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-orange-500"></div>
                          <p className="mt-4 text-gray-500 font-medium text-sm">
                            Sedang memuat data...
                          </p>
                        </div>
                      )}

                      {!loading && (
                        <div className="max-w-4xl mx-auto">
                          {wizardStep === 1 && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                isEditMode
                                  ? handleSaveAndNext()
                                  : handleAddModeNext();
                              }}
                              className="animate-fade-in-up"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput label="Kategori Bisnis" required>
                                  <select
                                    name="category_id"
                                    value={basicData.category_id}
                                    onChange={handleBasicChange}
                                    className={INPUT_CLASSES}
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
                                    className={INPUT_CLASSES}
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
                                    className={INPUT_CLASSES}
                                    placeholder="Contoh: Kopi Janji Jiwa Kudus"
                                    required
                                  />
                                </FormInput>
                                <FormInput label="Judul Hero" required>
                                  <input
                                    type="text"
                                    name="hero_title"
                                    value={basicData.hero_title}
                                    onChange={handleBasicChange}
                                    className={INPUT_CLASSES}
                                    required
                                  />
                                </FormInput>
                                <FormInput label="Sub-Judul Hero" required>
                                  <input
                                    type="text"
                                    name="hero_subtitle"
                                    value={basicData.hero_subtitle}
                                    onChange={handleBasicChange}
                                    className={INPUT_CLASSES}
                                    required
                                  />
                                </FormInput>
                                <FormInput
                                  label="Deskripsi Singkat"
                                  required
                                  fullWidth
                                >
                                  <textarea
                                    name="description"
                                    rows="3"
                                    value={basicData.description}
                                    onChange={handleBasicChange}
                                    className={INPUT_CLASSES}
                                    required
                                  ></textarea>
                                </FormInput>
                                <FormInput
                                  label="Tentang (About)"
                                  required
                                  fullWidth
                                >
                                  <textarea
                                    name="about"
                                    rows="4"
                                    value={basicData.about}
                                    onChange={handleBasicChange}
                                    className={INPUT_CLASSES}
                                    required
                                  ></textarea>
                                </FormInput>
                                <FormInput label="Rating (1.0-5.0)" required>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      step="0.1"
                                      min="1"
                                      max="5"
                                      name="rating"
                                      value={basicData.rating}
                                      onChange={handleBasicChange}
                                      className={`${INPUT_CLASSES} pl-9`}
                                      required
                                    />
                                    <Icon
                                      icon="mdi:star"
                                      className="absolute left-3 top-2.5 text-yellow-400 text-lg pointer-events-none"
                                    />
                                  </div>
                                </FormInput>
                                <FormInput label="Foto Sampul" fullWidth>
                                  <div className="flex flex-col sm:flex-row gap-4 items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="flex-1 w-full">
                                      <input
                                        type="file"
                                        name="hero_image"
                                        accept="image/*"
                                        onChange={handleBasicImage}
                                        className={FILE_CLASSES}
                                      />
                                      <p className="text-xs text-gray-500 mt-2">
                                        JPG/PNG, Max 2MB.
                                      </p>
                                    </div>
                                    {basicData.hero_image_preview && (
                                      <div className="w-32 h-20 shrink-0 rounded-lg border border-gray-200 overflow-hidden">
                                        <img
                                          src={basicData.hero_image_preview}
                                          alt="Preview"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </FormInput>
                              </div>
                              <button type="submit" className="hidden" />
                            </form>
                          )}

                          {wizardStep === 2 && (
                            <div className="space-y-5 animate-fade-in-up">
                              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
                                <Icon
                                  icon="mdi:information-outline"
                                  className="text-blue-600 text-xl shrink-0"
                                />
                                <p className="text-sm text-blue-700">
                                  Atur jam operasional. Set status{" "}
                                  <strong>Tutup</strong> jika libur.
                                </p>
                              </div>
                              <div className="grid gap-3">
                                {openingHours.map((h, i) => (
                                  <div
                                    key={h.day}
                                    className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${
                                      h.is_open
                                        ? "bg-white border-gray-200"
                                        : "bg-gray-50 border-gray-100"
                                    }`}
                                  >
                                    <div className="w-28 font-semibold text-gray-800 text-sm flex items-center gap-2">
                                      <div
                                        className={`w-2.5 h-2.5 rounded-full ${
                                          h.is_open
                                            ? "bg-green-500"
                                            : "bg-red-400"
                                        }`}
                                      />
                                      {h.day}
                                    </div>

                                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                      <div>
                                        <select
                                          value={h.open}
                                          onChange={(e) =>
                                            handleOpeningHoursChange(
                                              i,
                                              "open",
                                              e.target.value
                                            )
                                          }
                                          disabled={!h.is_open}
                                          className={`${INPUT_CLASSES} py-1.5 text-sm ${
                                            !h.is_open && DISABLED_CLASSES
                                          }`}
                                        >
                                          {timeOptions.map((time) => (
                                            <option key={time} value={time}>
                                              {time}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div>
                                        <select
                                          value={h.close}
                                          onChange={(e) =>
                                            handleOpeningHoursChange(
                                              i,
                                              "close",
                                              e.target.value
                                            )
                                          }
                                          disabled={!h.is_open}
                                          className={`${INPUT_CLASSES} py-1.5 text-sm ${
                                            !h.is_open && DISABLED_CLASSES
                                          }`}
                                        >
                                          {timeOptions.map((time) => (
                                            <option key={time} value={time}>
                                              {time}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="col-span-2 sm:col-span-1">
                                        <select
                                          value={h.is_open}
                                          onChange={(e) =>
                                            handleOpeningHoursChange(
                                              i,
                                              "is_open",
                                              parseInt(e.target.value)
                                            )
                                          }
                                          className={`${INPUT_CLASSES} py-1.5 text-sm ${
                                            h.is_open
                                              ? "text-green-700 bg-green-50 border-green-200"
                                              : "text-red-700 bg-red-50 border-red-200"
                                          }`}
                                        >
                                          <option value={1}>Buka</option>
                                          <option value={0}>Tutup</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {wizardStep === 3 && (
                            <div className="space-y-5 animate-fade-in-up">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput label="Kategori Listing">
                                  <input
                                    type="text"
                                    value={listingData.category}
                                    readOnly
                                    className={`${INPUT_CLASSES} ${DISABLED_CLASSES}`}
                                  />
                                </FormInput>
                                <FormInput label="Subtitle Listing">
                                  <input
                                    type="text"
                                    value={listingData.subtitle}
                                    onChange={handleListingSubtitleChange}
                                    className={INPUT_CLASSES}
                                    placeholder="Contoh: Spesialis Kopi Susu"
                                  />
                                </FormInput>
                                <FormInput label="Lokasi Listing">
                                  <input
                                    type="text"
                                    value={listingData.location}
                                    readOnly
                                    className={`${INPUT_CLASSES} ${DISABLED_CLASSES}`}
                                  />
                                </FormInput>
                                <FormInput label="Kecamatan Slug">
                                  <input
                                    type="text"
                                    value={listingData.kecamatan_slug}
                                    readOnly
                                    className={`${INPUT_CLASSES} ${DISABLED_CLASSES}`}
                                  />
                                </FormInput>
                                <FormInput label="Thumbnail Listing" fullWidth>
                                  <div className="p-5 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-center hover:border-orange-400 transition-colors">
                                    {listingData.imagePreview ? (
                                      <div className="relative w-full max-w-xs aspect-video group rounded-lg overflow-hidden shadow-sm">
                                        <img
                                          src={listingData.imagePreview}
                                          alt="Preview Listing"
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
                                            Ganti
                                          </span>
                                        </div>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleListingImageChange}
                                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <Icon
                                          icon="mdi:image-plus"
                                          className="text-orange-400 text-3xl mb-2"
                                        />
                                        <p className="text-xs text-gray-500 mb-3">
                                          Format PNG/JPG maks 2MB.
                                        </p>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleListingImageChange}
                                          className={FILE_CLASSES}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </FormInput>
                              </div>
                            </div>
                          )}

                          {wizardStep === 4 && (
                            <div className="max-w-2xl mx-auto animate-fade-in-up">
                              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                                <FormInput label="WhatsApp (62...)" required>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Icon
                                        icon="mdi:whatsapp"
                                        className="text-green-500 text-lg"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      value={contactData.whatsapp}
                                      onChange={handleWhatsAppChange}
                                      className={`${INPUT_CLASSES} pl-10`}
                                      placeholder="6281234567890"
                                      required
                                    />
                                  </div>
                                </FormInput>
                                <FormInput label="Email">
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Icon
                                        icon="mdi:email-outline"
                                        className="text-gray-400 text-lg"
                                      />
                                    </div>
                                    <input
                                      type="email"
                                      name="email"
                                      value={contactData.email}
                                      onChange={handleContactChange}
                                      className={`${INPUT_CLASSES} pl-10`}
                                      placeholder="umkm@example.com"
                                    />
                                  </div>
                                </FormInput>
                                <FormInput label="Instagram">
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Icon
                                        icon="mdi:instagram"
                                        className="text-pink-500 text-lg"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      name="instagram"
                                      value={contactData.instagram}
                                      onChange={handleContactChange}
                                      className={`${INPUT_CLASSES} pl-10`}
                                      placeholder="username_umkm"
                                    />
                                  </div>
                                </FormInput>
                              </div>
                            </div>
                          )}

                          {wizardStep === 5 && (
                            <div className="space-y-5 animate-fade-in-up">
                              <FormInput label="Alamat Singkat" required>
                                <textarea
                                  rows="2"
                                  name="address"
                                  value={locationData.address}
                                  onChange={handleLocationChange}
                                  className={INPUT_CLASSES}
                                  placeholder="Contoh: Jl. Pemuda No. 45"
                                  required
                                ></textarea>
                              </FormInput>
                              <FormInput label="Alamat Lengkap">
                                <textarea
                                  rows="3"
                                  name="full_address"
                                  value={locationData.full_address}
                                  onChange={handleLocationChange}
                                  className={INPUT_CLASSES}
                                  placeholder="Detail RT/RW, Kelurahan, Patokan..."
                                ></textarea>
                              </FormInput>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput label="Google Maps Link">
                                  <input
                                    type="url"
                                    name="maps_url"
                                    value={locationData.maps_url}
                                    onChange={handleLocationChange}
                                    className={INPUT_CLASSES}
                                    placeholder="https://maps.google.com/..."
                                  />
                                </FormInput>
                                <FormInput label="Embed URL">
                                  <input
                                    type="url"
                                    name="embed_url"
                                    value={locationData.embed_url}
                                    onChange={handleLocationChange}
                                    className={INPUT_CLASSES}
                                    placeholder='<iframe src="..."></iframe>'
                                  />
                                </FormInput>
                              </div>
                            </div>
                          )}

                          {wizardStep === 6 && (
                            <div className="space-y-6 animate-fade-in-up">
                              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <FormInput label="Galeri Foto (Max 5)">
                                  <div className="mt-2 flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-gray-50">
                                    <input
                                      type="file"
                                      multiple
                                      accept="image/jpeg,image/jpg,image/png"
                                      onChange={handleGalleryPreview}
                                      className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
                                    />
                                    <span className="text-xs text-gray-400">
                                      {galleryPreviews.length}/5
                                    </span>
                                  </div>
                                </FormInput>
                              </div>

                              {galleryPreviews.length > 0 && (
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                  {galleryPreviews.map((src, i) => (
                                    <div
                                      key={i}
                                      className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white"
                                    >
                                      <img
                                        src={src}
                                        alt={`Gallery ${i}`}
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        onClick={() => removeGalleryImage(i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Icon
                                          icon="mdi:close"
                                          className="w-3 h-3"
                                        />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {wizardStep === 7 && (
                            <div className="space-y-5 animate-fade-in-up">
                              {menuItems.map((m, i) => (
                                <div
                                  key={i}
                                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative"
                                >
                                  {menuItems.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeMenu(i)}
                                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                      <Icon
                                        icon="mdi:trash-can-outline"
                                        className="w-5 h-5"
                                      />
                                    </button>
                                  )}

                                  <div className="flex flex-col md:flex-row gap-5 items-start">
                                    <div className="w-full md:w-32 shrink-0">
                                      <div className="aspect-square rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative group/img">
                                        {m.imagePreview ? (
                                          <img
                                            src={m.imagePreview}
                                            alt="Menu"
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Icon
                                              icon="mdi:food"
                                              className="text-2xl"
                                            />
                                          </div>
                                        )}

                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleMenuImage(i, e)
                                          }
                                          className="absolute inset-0 z-50 opacity-0 cursor-pointer"
                                        />

                                        <div className="absolute inset-0 z-40 bg-black/40 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-white text-xs pointer-events-none">
                                          Ubah
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex-1 w-full space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <FormInput label="Nama Menu" small>
                                          <input
                                            type="text"
                                            name="name"
                                            value={m.name}
                                            onChange={(e) =>
                                              handleMenuChange(i, e)
                                            }
                                            className={INPUT_CLASSES}
                                          />
                                        </FormInput>
                                        <FormInput label="Harga" small>
                                          <input
                                            type="text"
                                            name="price"
                                            value={formatRupiah(m.price)}
                                            onChange={(e) =>
                                              handleMenuChange(i, e)
                                            }
                                            className={INPUT_CLASSES}
                                            placeholder="Rp 0"
                                          />
                                        </FormInput>
                                        <FormInput label="Deskripsi" small>
                                          <input
                                            type="text"
                                            name="description"
                                            value={m.description}
                                            onChange={(e) =>
                                              handleMenuChange(i, e)
                                            }
                                            className={INPUT_CLASSES}
                                          />
                                        </FormInput>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              <button
                                type="button"
                                onClick={addMenu}
                                className="w-full py-3 border border-dashed border-orange-300 rounded-xl text-orange-600 font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-sm"
                              >
                                <Icon icon="mdi:plus" className="w-4 h-4" />
                                Tambah Menu
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="bg-white border-t border-gray-200 p-4 z-20">
                      <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition disabled:opacity-50"
                          disabled={loading}
                        >
                          {wizardStep === 1 ? "Batal" : "Kembali"}
                        </button>

                        <div className="flex gap-3">
                          {isEditMode ? (
                            <>
                              <button
                                type="button"
                                onClick={handleSaveAndClose}
                                className="px-4 py-2 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg text-sm hover:bg-blue-50 transition disabled:opacity-50"
                                disabled={loading}
                              >
                                {loading ? "..." : "Simpan & Tutup"}
                              </button>
                              <button
                                type="button"
                                onClick={handleSaveAndNext}
                                className="px-5 py-2 bg-orange-600 text-white font-medium rounded-lg text-sm hover:bg-orange-700 transition disabled:opacity-50 flex items-center gap-2"
                                disabled={loading}
                              >
                                {loading && (
                                  <Icon
                                    icon="mdi:loading"
                                    className="animate-spin"
                                  />
                                )}
                                {wizardStep === 7 ? "Selesai" : "Lanjut"}
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={handleAddModeNext}
                              className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg text-sm hover:bg-orange-700 transition disabled:opacity-50 flex items-center gap-2"
                              disabled={loading}
                            >
                              {loading && (
                                <Icon
                                  icon="mdi:loading"
                                  className="animate-spin"
                                />
                              )}
                              {wizardStep === 7 ? "Simpan" : "Lanjut"}
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
