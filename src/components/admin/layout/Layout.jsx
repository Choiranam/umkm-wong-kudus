import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FilesComponent from "../../admin/ui/FilesComponent";
import CalendarComponent from "../../admin/ui/CalendarComponent";
import AktivitasComponent from "../../admin/ui/AktivitasComponent";

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState(null);

  const renderContent = () => {
    if (activeTab === "Files") return <FilesComponent />;
    if (activeTab === "Calendar") return <CalendarComponent />;
    if (activeTab === "Aktivities") return <AktivitasComponent />;

    // Kalau belum pilih tab, tampilkan children atau teks default
    return (
      <div className="text-gray-400 text-center text-sm">
        {children || "Pilih tab di atas untuk melihat konten"}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
