import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import FormInput from "./FormInput";
import { useUmkmWizard } from "../../services/useUmkmWizard";

export default function UmkmWizard({
  isOpen,
  onClose,
  categories,
  umkmToEdit,
  showGlobalToast,
}) {
  const {
    wizardStep,
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
    isDirty,
    isWizardStarted,
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
    runCurrentStepSubmit,
    handleSaveAndClose,
    handleSaveAndNext,
    handleAddModeNext,
    timeOptions,
    KECAMATAN_OPTIONS,
  } = useUmkmWizard({
    isOpen,
    onClose,
    categories,
    umkmToEdit,
    showGlobalToast,
  });

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
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                name="rating"
                                value={basicData.rating}
                                onChange={handleBasicChange}
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
                                  onChange={(e) =>
                                    handleOpeningHoursChange(
                                      i,
                                      "open",
                                      e.target.value
                                    )
                                  }
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
                                  onChange={(e) =>
                                    handleOpeningHoursChange(
                                      i,
                                      "close",
                                      e.target.value
                                    )
                                  }
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
                                  onChange={(e) =>
                                    handleOpeningHoursChange(
                                      i,
                                      "is_open",
                                      parseInt(e.target.value)
                                    )
                                  }
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
                                onChange={handleListingSubtitleChange}
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
                                onChange={handleListingImageChange}
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
                              name="email"
                              value={contactData.email}
                              onChange={handleContactChange}
                              className="form-input"
                              placeholder="example@domain.com"
                            />
                          </FormInput>
                          <FormInput label="Instagram">
                            <input
                              type="text"
                              name="instagram"
                              value={contactData.instagram}
                              onChange={handleContactChange}
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
                              name="address"
                              value={locationData.address}
                              onChange={handleLocationChange}
                              className="form-input"
                              placeholder="Alamat singkat"
                              required
                            ></textarea>
                          </FormInput>
                          <FormInput label="Full Address">
                            <textarea
                              rows="3"
                              name="full_address"
                              value={locationData.full_address}
                              onChange={handleLocationChange}
                              className="form-input"
                              placeholder="Alamat lengkap"
                            ></textarea>
                          </FormInput>
                          <FormInput label="Maps URL">
                            <input
                              type="url"
                              name="maps_url"
                              value={locationData.maps_url}
                              onChange={handleLocationChange}
                              className="form-input"
                              placeholder="URL Google Maps"
                            />
                          </FormInput>
                          <FormInput label="Embed URL">
                            <input
                              type="url"
                              name="embed_url"
                              value={locationData.embed_url}
                              onChange={handleLocationChange}
                              className="form-input"
                              placeholder="URL Embed Maps"
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
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          disabled={loading}
                        >
                          {wizardStep === 1 ? "Batal" : "Kembali"}
                        </button>

                        {isEditMode && isDirty && (
                          <button
                            type="button"
                            onClick={runCurrentStepSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={loading}
                          >
                            {loading && (
                              <div className="w-5 h-5 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
                            )}
                            Simpan
                          </button>
                        )}

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
