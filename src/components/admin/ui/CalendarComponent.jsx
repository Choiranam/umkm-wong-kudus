import React, { useState, useEffect, useMemo, useRef } from "react";
import { Icon } from "@iconify/react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Local Storage Error:", error);
    }
  };
  return [storedValue, setValue];
};

const TaskCategories = {
  Work: { icon: "mdi:briefcase", color: "text-blue-500", label: "Kerja" },
  Personal: { icon: "mdi:home", color: "text-green-500", label: "Pribadi" },
  Study: {
    icon: "mdi:book-open-page-variant",
    color: "text-purple-500",
    label: "Belajar",
  },
  Urgent: { icon: "mdi:fire", color: "text-red-500", label: "Mendesak" },
};

const INDONESIAN_HOLIDAYS_2025 = [
  "2025-01-01",
  "2025-01-27",
  "2025-03-30",
  "2025-03-31",
  "2025-04-18",
  "2025-05-01",
  "2025-05-12",
  "2025-05-29",
  "2025-06-01",
  "2025-06-09",
  "2025-08-17",
  "2025-12-25",
];

const CalendarComponent = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [taskInput, setTaskInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Work");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskReminder, setTaskReminder] = useState("");
  const [activeTab, setActiveTab] = useState("ongoing");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const [tasks, setTasks] = useLocalStorage("calendarTasks", {});

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

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const jumpToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

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
      category: selectedCategory,
      deadline: taskDeadline || null,
      reminder: taskReminder || null,
    };

    setTasks((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newTask],
    }));

    setTaskInput("");
    setTaskReminder("");
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    const key = formatDateKey(selectedDate);
    setTasks((prev) => ({
      ...prev,
      [key]: prev[key].map((t) =>
        t.id === editingTaskId ? { ...t, text: editText } : t
      ),
    }));
    setEditingTaskId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditText("");
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

  const isOverdue = (task) => {
    if (!task.deadline || task.completed) return false;
    const deadlineDate = new Date(task.deadline);
    if (task.reminder) {
      const [h, m] = task.reminder.split(":");
      deadlineDate.setHours(parseInt(h), parseInt(m), 0, 0);
    }
    return deadlineDate < new Date();
  };

  useEffect(() => {
    setTaskDeadline(formatDateKey(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      Object.keys(tasks).forEach((dateKey) => {
        tasks[dateKey]?.forEach((task) => {
          if (task.reminder && !task.notified) {
            const [h, m] = task.reminder.split(":");
            const reminderTime = new Date(dateKey);
            reminderTime.setHours(parseInt(h), parseInt(m), 0, 0);
            if (now >= reminderTime && now < reminderTime.getTime() + 60000) {
              if (Notification.permission === "granted") {
                new Notification("Pengingat Tugas!", {
                  body: task.text,
                  icon: "/favicon.ico",
                });
              }
              const audio = new Audio(
                "https://assets.mixkit.co/sfx/preview/mixkit-alarm-tone-1077.mp3"
              );
              audio.play().catch(() => {});
              setTasks((prev) => ({
                ...prev,
                [dateKey]: prev[dateKey].map((t) =>
                  t.id === task.id ? { ...t, notified: true } : t
                ),
              }));
            }
          }
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [tasks]);

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
      const isToday = dateToCheck.toDateString() === today.toDateString();
      const isSelected =
        selectedDate &&
        dateToCheck.toDateString() === selectedDate.toDateString();
      const isHoliday = INDONESIAN_HOLIDAYS_2025.includes(dateKey);

      const tasksOnDay = tasks[dateKey] || [];
      const hasTasks = tasksOnDay.length > 0;
      const hasUrgent = tasksOnDay.some(
        (t) => t.category === "Urgent" && !t.completed
      );

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
                : isHoliday
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          {i}
          {hasTasks && !isSelected && (
            <span
              className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                hasUrgent ? "bg-red-500" : "bg-orange-400"
              }`}
            ></span>
          )}
        </button>
      );
    }
    return daysArray;
  };

  const selectedKey = formatDateKey(selectedDate);
  const allTasksToday = tasks[selectedKey] || [];
  const currentTasks =
    activeTab === "ongoing"
      ? allTasksToday.filter((t) => !t.completed)
      : allTasksToday.filter((t) => t.completed);

  const completedCount = allTasksToday.filter((t) => t.completed).length;

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
            {allTasksToday.length} Tugas • {completedCount} Selesai
          </p>
        </div>

        <div className="flex gap-4 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "ongoing"
                ? "text-orange-600 border-orange-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            Berlangsung
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "completed"
                ? "text-orange-600 border-orange-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            Selesai
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-4 custom-scrollbar">
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => {
              const category =
                TaskCategories[task.category] || TaskCategories.Work;
              const overdue = isOverdue(task);

              return (
                <div
                  key={task.id}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`shrink-0 mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300 hover:border-orange-500"
                    }`}
                  >
                    {task.completed && (
                      <Icon
                        icon="mdi:check"
                        className="w-3.5 h-3.5 text-white"
                      />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        icon={category.icon}
                        className={`w-4 h-4 ${category.color} ${
                          task.completed ? "opacity-50" : ""
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold ${category.color} ${
                          task.completed ? "opacity-50 line-through" : ""
                        }`}
                      >
                        {category.label}
                      </span>
                    </div>

                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        on
                        cChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        onBlur={saveEdit}
                        autoFocus
                        className="w-full px-2 py-1 border border-orange-400 rounded text-sm"
                      />
                    ) : (
                      <span
                        onClick={() => !task.completed && startEdit(task)}
                        className={`block text-sm cursor-pointer hover:underline ${
                          task.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-700"
                        }`}
                      >
                        {task.text}
                      </span>
                    )}

                    {(task.deadline || task.reminder) && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                        {task.deadline && (
                          <div
                            className={`flex items-center gap-1 ${
                              overdue ? "text-red-500 font-medium" : ""
                            }`}
                          >
                            <Icon
                              icon="mdi:calendar-check"
                              className="w-3 h-3"
                            />
                            <span>Deadline: {task.deadline}</span>
                          </div>
                        )}
                        {task.reminder && (
                          <div className="flex items-center gap-1">
                            <Icon icon="mdi:bell" className="w-3 h-3" />
                            <span>Pengingat: {task.reminder}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {overdue && (
                      <span className="mt-1 inline-block text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                        TERLAMBAT
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1"
                  >
                    <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
              <Icon
                icon="mdi:calendar-blank-outline"
                className="w-12 h-12 mb-2 opacity-20"
              />
              <p className="text-sm">
                {activeTab === "ongoing"
                  ? "Tidak ada agenda."
                  : "Belum ada tugas selesai."}
              </p>
              <p className="text-xs">Nikmati hari santaimu!</p>
            </div>
          )}
        </div>

        {activeTab === "ongoing" && (
          <form
            onSubmit={handleAddTask}
            className="mt-auto relative p-4 border border-gray-200 rounded-xl bg-gray-50"
          >
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Tambah tugas baru..."
              className="w-full pl-3 pr-10 py-2 mb-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            <div className="flex gap-2 mb-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 w-full p-2 bg-white border border-gray-300 rounded-lg text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              >
                {Object.keys(TaskCategories).map((cat) => (
                  <option key={cat} value={cat}>
                    {TaskCategories[cat].label}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
                className="flex-1 w-full p-2 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <input
                type="time"
                value={taskReminder}
                onChange={(e) => setTaskReminder(e.target.value)}
                className="flex-1 w-full p-2 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!taskInput.trim()}
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition-colors text-sm font-semibold"
            >
              Tambah Tugas
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
