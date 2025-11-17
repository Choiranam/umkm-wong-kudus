/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../services/api.js";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const abortRef = useRef(null);

  const placeholders = [
    "Cari produk unggulan UMKM Kudus...",
    "Temukan inspirasi dari pelaku usaha lokal...",
    "Jelajahi potensi ekonomi kreatif daerah...",
    "Dukung bisnis kecil di sekitarmu...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!isInputFocused) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isInputFocused]);

  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    api
      .get("/umkm", {
        params: { search: debouncedTerm },
        signal: controller.signal,
      })
      .then((res) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];

        const filtered = data.filter((item) =>
          item.name.toLowerCase().includes(debouncedTerm.toLowerCase())
        );

        setSuggestions(filtered.slice(0, 8));
      })
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedTerm]);

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

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        e.preventDefault();
        handleSuggestionClick(suggestions[highlightIndex].slug);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grow relative"
      id="searchForm"
      ref={containerRef}
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value.slice(0, 50));
            setHighlightIndex(-1);
          }}
          onFocus={() => setIsInputFocused(true)}
          onKeyDown={handleKeyDown}
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
        {isInputFocused && (suggestions.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 w-full bg-light rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
          >
            {loading && (
              <div className="px-4 py-2 text-dark/50 text-sm">Mencari...</div>
            )}
            {suggestions.map((sug, i) => (
              <div
                key={sug.slug + i}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  highlightIndex === i ? "bg-orange/20" : "hover:bg-orange/10"
                }`}
                onMouseEnter={() => setHighlightIndex(i)}
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
