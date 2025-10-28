import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import FilesComponent from "../../components/ui/FilesComponent";
import CalendarComponent from "../../components/ui/CalendarComponent";
import AktivitasComponent from "../../components/ui/AktivitasComponent";

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState(null);

  const renderContent = () => {
    if (activeTab === "Files") return <FilesComponent />;
    if (activeTab === "Calendar") return <CalendarComponent />;
    if (activeTab === "Aktivitas") return <AktivitasComponent />;

    // Kalau belum pilih tab, tampilkan children atau teks default
    return (
      <div className="text-gray-400 text-center mt-20 text-sm">
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
