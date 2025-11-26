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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 p-6 text-left align-middle transition-all">
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                    <p className="mt-3 text-gray-600">Memuat detail UMKM...</p>
                  </div>
                )}

                {umkm && (
                  <>
                    <div className="flex justify-between items-center mb-5 pb-3 border-b">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold text-gray-900"
                      >
                        {umkm.name}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <Icon icon="mdi:close" className="w-7 h-7" />
                      </button>
                    </div>

                    <div className="max-h-[75vh] overflow-y-auto pr-2 -mr-2 space-y-6">
                      {umkm.hero_image && (
                        <div className="rounded-xl overflow-hidden shadow bg-gray-100">
                          <img
                            src={umkm.hero_image}
                            alt="Hero"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                            <InfoSection title="Data Dasar">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                              </div>
                            </InfoSection>
                          </div>

                          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                            <InfoSection title="Tentang & Deskripsi">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {umkm.about}
                              </p>
                              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                                {umkm.description}
                              </p>
                            </InfoSection>
                          </div>

                          {umkm.location && (
                            <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
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
                            </div>
                          )}
                        </div>

                        <div className="space-y-6">
                          {umkm.contact && (
                            <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                              <InfoSection title="Kontak">
                                <div className="space-y-2">
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
                                </div>
                              </InfoSection>
                            </div>
                          )}

                          {umkm.opening_hours &&
                            umkm.opening_hours.length > 0 && (
                              <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                                <InfoSection title="Jam Operasional">
                                  <div className="text-sm space-y-2">
                                    {umkm.opening_hours.map((h) => (
                                      <div
                                        key={h.id}
                                        className="flex justify-between border-b pb-1 last:border-none"
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
                              </div>
                            )}
                        </div>
                      </div>

                      {umkm.gallery && umkm.gallery.length > 0 && (
                        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                          <InfoSection title="Galeri">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {umkm.gallery.map((g) => (
                                <img
                                  key={g.id}
                                  src={g.image}
                                  alt="Gallery"
                                  className="w-full h-32 object-cover rounded-lg border shadow-sm"
                                />
                              ))}
                            </div>
                          </InfoSection>
                        </div>
                      )}

                      {umkm.menu && umkm.menu.length > 0 && (
                        <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                          <InfoSection title="Menu">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {umkm.menu.map((m) => (
                                <div
                                  key={m.id}
                                  className="border p-4 rounded-xl bg-gray-50 shadow-sm flex gap-4"
                                >
                                  {m.image && (
                                    <img
                                      src={m.image}
                                      alt={m.name}
                                      className="w-20 h-20 object-cover rounded-lg border shadow"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <h5 className="font-bold text-orange-600 text-lg">
                                      {m.name}
                                    </h5>
                                    {m.description && (
                                      <p className="text-sm text-gray-600 mt-1">
                                        {m.description}
                                      </p>
                                    )}
                                    <p className="font-semibold text-green-600 mt-2">
                                      Rp {m.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </InfoSection>
                        </div>
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
