// components/SearchBar.jsx
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { dataUMKM } from "../data/dataUMKM";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();

  const placeholders = [
    "Cari produk unggulan UMKM Kudus...",
    "Temukan inspirasi dari pelaku usaha lokal...",
    "Jelajahi potensi ekonomi kreatif daerah...",
    "Dukung bisnis kecil di sekitarmu...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtering dengan useMemo
  const suggestions = useMemo(() => {
    if (!debouncedTerm.trim()) return [];
    const lower = debouncedTerm.toLowerCase();
    return dataUMKM
      .filter((umkm) => umkm.name.toLowerCase().includes(lower))
      .slice(0, 8);
  }, [debouncedTerm]);

  // Animasi placeholder hanya saat tidak fokus & kosong
  useEffect(() => {
    if (isInputFocused || searchTerm) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInputFocused, searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pencarian?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSuggestionClick = (slug) => {
    setSearchTerm("");
    setIsInputFocused(false);
    navigate(`/detail-umkm/${slug}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grow relative" id="searchForm">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value.slice(0, 50);
            setSearchTerm(value);
          }}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="w-full py-3 md:py-3 px-4 rounded-lg border-none focus:ring-2 focus:ring-orange focus:outline-none text-dark placeholder:text-dark/50 shadow-lg bg-light text-sm sm:text-base truncate"
          placeholder=""
          autoComplete="off"
          maxLength={50}
          pattern=".{0,50}"
        />

        {searchTerm === "" && !isInputFocused && (
          <div className="pointer-events-none absolute inset-0 flex items-center px-4 whitespace-nowrap overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-dark/50 select-none truncate"
              >
                {placeholders[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 w-full max-w-full md:max-w-none bg-light rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
          >
            {suggestions.map((sug, i) => (
              <div
                key={sug.slug + i}
                className="px-4 py-2 hover:bg-orange/10 cursor-pointer transition-colors"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSuggestionClick(sug.slug)}
              >
                {sug.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default SearchBar;
