import React, { useState } from "react";

const CalendarComponent = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const resetToday = () => setCurrentDate(today);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-full hover:bg-orange-200 transition"
          >
            <span className="text-xl text-gray-700">‹</span>
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {months[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-full hover:bg-orange-200 transition"
          >
            <span className="text-xl text-gray-700">›</span>
          </button>
        </div>

        <button
          onClick={resetToday}
          className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
        >
          Hari Ini
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 w-full bg-white rounded-xl shadow p-4">
        {/* Header hari */}
        {days.map((d) => (
          <div
            key={d}
            className="text-center font-semibold text-gray-600 py-1 border-b border-gray-100 text-sm"
          >
            {d}
          </div>
        ))}

        {/* Tanggal */}
        {calendarDays.map((day, i) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={i}
              className={`flex items-center justify-center h-12 rounded-lg text-sm font-medium transition-all ${
                !day
                  ? "bg-transparent"
                  : isToday
                  ? "bg-orange-500 text-white shadow-md"
                  : "hover:bg-orange-100 text-gray-700"
              }`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarComponent;
