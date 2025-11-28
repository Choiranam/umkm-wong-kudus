import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FilesComponent from "../../admin/ui/FilesComponent";
import CalendarComponent from "../../admin/ui/CalendarComponent";
import AktivitasComponent from "../../admin/ui/AktivitasComponent";

export default function Layout({ children }) {
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname.includes("/files")) return "Files";
    if (location.pathname.includes("/calendar")) return "Calendar";
    if (location.pathname.includes("/activities")) return "Activities";
    return null;
  };

  const renderContent = () => {
    const tab = getActiveTab();
    if (tab === "Files") return <FilesComponent />;
    if (tab === "Calendar") return <CalendarComponent />;
    if (tab === "Activities") return <AktivitasComponent />;

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
        <Header />
        <main className="flex-1 overflow-auto p-6" data-lenis-prevent>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
