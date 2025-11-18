import React, { useState, useEffect, Fragment } from "react";
import { Icon } from "@iconify/react";
import Layout from "../../components/admin/layout/Layout";
import api from "../../services/api.js";
import UmkmWizard from "../../components/admin/UmkmWizard";
import ViewUmkmModal from "../../components/admin/ViewUmkmModal";
import DeleteUmkmModal from "../../components/admin/DeleteUmkmModal";
import Toast from "../../components/admin/Toast";
import Pagination from "../../components/admin/Pagination";

const API_UMKM = "/umkm";
const API_CATEGORIES = "/categories";

export default function UMKMPage() {
  const [umkms, setUmkms] = useState([]);
  const [filteredUmkms, setFilteredUmkms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [umkmDetail, setUmkmDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get(API_CATEGORIES);
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat kategori", "error");
    }
  };

  const fetchUmkms = async () => {
    setLoading(true);
    try {
      const res = await api.get(API_UMKM);
      if (res.data.status) {
        setUmkms(res.data.data);
        setFilteredUmkms(res.data.data);
      }
    } catch (err) {
      showToast("Gagal memuat UMKM", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUmkmDetail = async (id) => {
    setLoadingDetail(true);
    try {
      const res = await api.get(`${API_UMKM}/${id}`);
      if (res.data.status) {
        setUmkmDetail(res.data.data);
      }
    } catch (err) {
      showToast("Gagal memuat detail UMKM", "error");
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchUmkms();
  }, []);

  useEffect(() => {
    let result = umkms;
    if (selectedCategoryFilter) {
      result = umkms.filter(
        (u) => u.category_id === parseInt(selectedCategoryFilter)
      );
    }
    setFilteredUmkms(result);
    setCurrentPage(1);
  }, [selectedCategoryFilter, umkms]);

  const totalPages = Math.ceil(filteredUmkms.length / itemsPerPage);
  const currentUmkms = filteredUmkms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenAdd = () => {
    setSelectedUmkm(null);
    setIsWizardOpen(true);
  };

  const handleOpenEdit = (umkm) => {
    setSelectedUmkm(umkm);
    setIsWizardOpen(true);
  };

  const handleOpenView = (umkm) => {
    setSelectedUmkm(umkm);
    setUmkmDetail(null);
    setIsViewModalOpen(true);
    fetchUmkmDetail(umkm.id);
  };

  const handleOpenDelete = (umkm) => {
    setSelectedUmkm(umkm);
    setIsDeleteModalOpen(true);
  };

  const handleWizardClose = (needsRefetch) => {
    setIsWizardOpen(false);
    setSelectedUmkm(null);
    if (needsRefetch) {
      fetchUmkms();
    }
  };

  const handleDelete = async () => {
    if (!selectedUmkm) return;
    try {
      await api.delete(`${API_UMKM}/${selectedUmkm.id}`);
      showToast("UMKM berhasil dinonaktifkan", "success");
      setIsDeleteModalOpen(false);
      setSelectedUmkm(null);
      fetchUmkms();
    } catch (err) {
      showToast("Gagal menonaktifkan UMKM", "error");
    }
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {toast.show && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
              />
            )}

            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  Manajemen UMKM
                </h1>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleOpenAdd}
                    className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
                  >
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                    Tambah UMKM
                  </button>
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              </div>
            )}

            {!loading && (
              <>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hidden md:block">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kategori
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kecamatan
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentUmkms.length > 0 ? (
                        currentUmkms.map((u, i) => (
                          <tr
                            key={u.id}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="px-5 py-3 text-gray-700">
                              {(currentPage - 1) * itemsPerPage + i + 1}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {u.name}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {u.category?.name || "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {u.kecamatan}
                            </td>
                            <td className="px-4 py-3 text-center text-yellow-500 flex items-center justify-center gap-1">
                              <Icon icon="mdi:star" /> {u.rating}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  u.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {u.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={() => handleOpenView(u)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Lihat Detail"
                                >
                                  <Icon icon="mdi:eye" className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleOpenEdit(u)}
                                  className="text-green-600 hover:text-green-800"
                                  title="Edit"
                                >
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleOpenDelete(u)}
                                  className="text-red-600 hover:text-red-800"
                                  title="Nonaktifkan"
                                >
                                  <Icon
                                    icon="mdi:trash-can-outline"
                                    className="w-5 h-5"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-4 py-8 text-center text-gray-500"
                          >
                            Belum ada UMKM.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {currentUmkms.length > 0 ? (
                    currentUmkms.map((u, i) => (
                      <div
                        key={u.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">
                              {u.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {u.category?.name || "-"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {u.kecamatan}
                            </div>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              u.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {u.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-yellow-500 flex items-center gap-1 text-sm">
                            <Icon icon="mdi:star" /> {u.rating}
                          </div>
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleOpenView(u)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Lihat Detail"
                            >
                              <Icon icon="mdi:eye" className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(u)}
                              className="text-green-600 hover:text-green-800"
                              title="Edit"
                            >
                              <Icon icon="mdi:pencil" className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(u)}
                              className="text-red-600 hover:text-red-800"
                              title="Nonaktifkan"
                            >
                              <Icon
                                icon="mdi:trash-can-outline"
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                      Belum ada UMKM.
                    </div>
                  )}
                </div>

                {filteredUmkms.length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </main>

        <UmkmWizard
          isOpen={isWizardOpen}
          onClose={handleWizardClose}
          categories={categories}
          umkmToEdit={selectedUmkm}
          showGlobalToast={showToast}
        />

        <ViewUmkmModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          umkm={umkmDetail}
          isLoading={loadingDetail}
        />

        <DeleteUmkmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          umkmName={selectedUmkm?.name}
        />
      </div>
    </Layout>
  );
}
