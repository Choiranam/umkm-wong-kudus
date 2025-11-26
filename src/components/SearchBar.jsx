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
        const rawData = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data].filter(Boolean);

        const termLower = debouncedTerm.toLowerCase();
        const results = [];

        rawData.forEach((umkm) => {
          const name = (umkm.name || "").toLowerCase();
          const slug = umkm.slug;
          const heroImage = umkm.hero_image || umkm.listing?.image;
          const rating = umkm.rating || "0";
          const menus = umkm.menus || [];

          const searchTexts = [
            umkm.name || "",
            umkm.hero_subtitle || "",
            umkm.description || "",
            umkm.about ? umkm.about.replace(/<[^>]*>/g, "") : "",
            umkm.listing?.subtitle || "",
            umkm.category?.name || "",
            umkm.category?.desc || "",
            umkm.kecamatan || "",
          ]
            .join(" ")
            .toLowerCase();

          let hasMenuMatch = false;

          menus.forEach((menu) => {
            const menuNameLower = (menu.name || "").toLowerCase();
            if (menuNameLower.includes(termLower)) {
              hasMenuMatch = true;
              const score = menuNameLower.startsWith(termLower) ? 1000 : 500;
              results.push({
                type: "menu",
                displayName: `${menu.name} - ${umkm.name}`,
                image: menu.image || heroImage,
                rating,
                slug,
                score,
              });
            }
          });

          if (name.includes(termLower)) {
            const score = name.startsWith(termLower) ? 900 : 400;
            results.push({
              type: "umkm",
              displayName: umkm.name,
              image: heroImage,
              rating,
              slug,
              score: hasMenuMatch ? score - 50 : score,
            });
          } else if (
            searchTexts.includes(termLower) &&
            results.every((r) => r.slug !== slug)
          ) {
            results.push({
              type: "umkm",
              displayName: umkm.name,
              image: heroImage,
              rating,
              slug,
              score: 100,
            });
          }
        });

        results.sort((a, b) => b.score - a.score);
        setSuggestions(results.slice(0, 8));
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

    if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightIndex].slug);
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
            className="absolute z-100 inset-x-0 top-full mt-1 shadow-lg"
          >
            <div className="bg-light rounded-lg shadow-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-orange/30 scrollbar-track-transparent px-2 py-2">
                {loading && (
                  <div className="px-4 py-3 text-dark/50 text-sm flex items-center gap-3">
                    <Icon icon="eos-icons:loading" className="text-lg" />
                    Mencari...
                  </div>
                )}

                {suggestions.map((item, i) => (
                  <div
                    key={`${item.type}-${item.slug}-${i}`}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mx-2 ${
                      highlightIndex === i
                        ? "bg-orange/20"
                        : "hover:bg-orange/10"
                    }`}
                    onMouseEnter={() => setHighlightIndex(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSuggestionClick(item.slug)}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.displayName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <Icon
                            icon="mingcute:image-line"
                            className="text-2xl text-gray-500"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-dark font-medium truncate">
                        {item.displayName}
                      </p>
                      <p className="text-xs text-dark/60">
                        {item.type === "menu" ? "Menu" : "UMKM"}
                      </p>
                    </div>

                    {item.rating && parseFloat(item.rating) > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <Icon
                          icon="mingcute:star-fill"
                          className="text-yellow-500"
                        />
                        <span className="text-dark font-medium">
                          {item.rating}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default SearchBar;
