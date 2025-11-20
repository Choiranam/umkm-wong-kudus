import React, { useState } from "react";
import { Icon } from "@iconify/react";

const CalendarComponent = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState({
    "2023-10-25": [
      { id: 1, text: "Meeting Tim Amethyst", completed: true },
      { id: 2, text: "Revisi UI UMKM", completed: false },
    ],
  });

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

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const jumpToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleDateClick = (day) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const key = formatDateKey(selectedDate);
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newTask],
    }));
    setTaskInput("");
  };

  const toggleTask = (taskId) => {
    const key = formatDateKey(selectedDate);
    setTasks((prev) => ({
      ...prev,
      [key]: prev[key].map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const deleteTask = (taskId) => {
    const key = formatDateKey(selectedDate);
    setTasks((prev) => ({
      ...prev,
      [key]: prev[key].filter((t) => t.id !== taskId),
    }));
  };

  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dateToCheck = new Date(year, month, i);
      const dateKey = formatDateKey(dateToCheck);

      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isSelected =
        selectedDate &&
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      const hasTasks = tasks[dateKey] && tasks[dateKey].length > 0;

      daysArray.push(
        <button
          key={i}
          onClick={() => handleDateClick(i)}
          className={`relative h-10 w-10 flex flex-col items-center justify-center rounded-full transition-all text-sm font-medium
            ${
              isSelected
                ? "bg-orange-500 text-white shadow-md scale-110 z-10"
                : isToday
                ? "bg-orange-100 text-orange-600 font-bold border border-orange-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {i}
          {hasTasks && !isSelected && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-orange-400"></span>
          )}
          {hasTasks && isSelected && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></span>
          )}
        </button>
      );
    }
    return daysArray;
  };

  const selectedKey = formatDateKey(selectedDate);
  const currentTasks = tasks[selectedKey] || [];
  const completedCount = currentTasks.filter((t) => t.completed).length;

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800">
              {months[month]} <span className="text-orange-500">{year}</span>
            </h2>
            <div className="flex gap-1 ml-2">
              <button
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <Icon icon="mdi:chevron-left" className="w-6 h-6" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <Icon icon="mdi:chevron-right" className="w-6 h-6" />
              </button>
            </div>
          </div>
          <button
            onClick={jumpToToday}
            className="text-xs font-semibold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition"
          >
            Hari Ini
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-4 justify-items-center">
          {days.map((d) => (
            <span key={d} className="text-xs font-bold text-gray-400 uppercase">
              {d}
            </span>
          ))}
          {renderCalendarDays()}
        </div>
      </div>

      <div className="hidden lg:block w-px bg-gray-100"></div>

      <div className="flex-1 flex flex-col min-h-[350px]">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {selectedDate.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h3>
          <p className="text-sm text-gray-500">
            {currentTasks.length} Tugas &bull; {completedCount} Selesai
          </p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-4 custom-scrollbar">
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-300 hover:border-orange-500"
                  }`}
                >
                  {task.completed && (
                    <Icon icon="mdi:check" className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                >
                  <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
              <Icon
                icon="mdi:calendar-blank-outline"
                className="w-12 h-12 mb-2 opacity-20"
              />
              <p className="text-sm">Tidak ada agenda.</p>
              <p className="text-xs">Nikmati hari santaimu!</p>
            </div>
          )}
        </div>

        <form onSubmit={handleAddTask} className="mt-auto relative">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Tambah tugas baru..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
          <button
            type="submit"
            disabled={!taskInput.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition-colors"
          >
            <Icon icon="mdi:plus" className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CalendarComponent;
