import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import InfoSection from "./InfoSection";
import InfoItem from "./InfoItem";

export default function ViewUmkmModal({ isOpen, onClose, umkm, isLoading }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
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
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                    <p className="mt-3 text-gray-600">Memuat detail UMKM...</p>
                  </div>
                )}
                {umkm && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold text-gray-900"
                      >
                        {umkm.name}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icon icon="mdi:close" className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2">
                      {umkm.hero_image && (
                        <img
                          src={umkm.hero_image}
                          alt="Hero"
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                          <InfoSection title="Data Dasar">
                            <InfoItem
                              label="Kategori"
                              value={umkm.category?.name || "-"}
                            />
                            <InfoItem
                              label="Kecamatan"
                              value={umkm.kecamatan}
                            />
                            <InfoItem
                              label="Rating"
                              value={umkm.rating}
                              icon="mdi:star"
                              iconClass="text-yellow-500"
                            />
                            <InfoItem label="Status" value={umkm.status} />
                          </InfoSection>

                          <InfoSection title="Tentang & Deskripsi">
                            <p className="text-sm text-gray-600">
                              {umkm.about}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              {umkm.description}
                            </p>
                          </InfoSection>

                          {umkm.location && (
                            <InfoSection title="Lokasi">
                              <InfoItem
                                label="Alamat"
                                value={umkm.location.address}
                              />
                              <InfoItem
                                label="Full"
                                value={umkm.location.full_address}
                              />
                              <InfoItem
                                label="Maps"
                                value={
                                  <a
                                    href={umkm.location.maps_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    Lihat Peta
                                  </a>
                                }
                              />
                            </InfoSection>
                          )}
                        </div>

                        <div className="space-y-4">
                          {umkm.contact && (
                            <InfoSection title="Kontak">
                              <InfoItem
                                label="WhatsApp"
                                value={umkm.contact.whatsapp}
                                icon="mdi:whatsapp"
                                iconClass="text-green-500"
                              />
                              <InfoItem
                                label="Email"
                                value={umkm.contact.email || "-"}
                                icon="mdi:email"
                              />
                              <InfoItem
                                label="Instagram"
                                value={umkm.contact.instagram || "-"}
                                icon="mdi:instagram"
                                iconClass="text-pink-500"
                              />
                            </InfoSection>
                          )}

                          {umkm.opening_hours &&
                            umkm.opening_hours.length > 0 && (
                              <InfoSection title="Jam Operasional">
                                <div className="text-sm space-y-1">
                                  {umkm.opening_hours.map((h) => (
                                    <div
                                      key={h.id}
                                      className="flex justify-between"
                                    >
                                      <span className="font-medium text-gray-700">
                                        {h.day}
                                      </span>
                                      <span
                                        className={
                                          h.is_open
                                            ? "text-gray-600"
                                            : "text-red-500"
                                        }
                                      >
                                        {h.hours}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </InfoSection>
                            )}
                        </div>
                      </div>

                      {umkm.gallery && umkm.gallery.length > 0 && (
                        <InfoSection title="Galeri" className="mt-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {umkm.gallery.map((g) => (
                              <img
                                key={g.id}
                                src={g.image}
                                alt="Gallery"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                            ))}
                          </div>
                        </InfoSection>
                      )}

                      {umkm.menu && umkm.menu.length > 0 && (
                        <InfoSection title="Menu" className="mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {umkm.menu.map((m) => (
                              <div
                                key={m.id}
                                className="border p-4 rounded-lg bg-gray-50 flex gap-4"
                              >
                                {m.image && (
                                  <img
                                    src={m.image}
                                    alt={m.name}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                  />
                                )}
                                <div className="flex-1">
                                  <h5 className="font-bold text-orange-600">
                                    {m.name}
                                  </h5>
                                  {m.description && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      {m.description}
                                    </p>
                                  )}
                                  <p className="font-semibold text-green-600 mt-1">
                                    Rp {m.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </InfoSection>
                      )}
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
