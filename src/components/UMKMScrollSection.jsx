import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UMKMCard from "./UMKMCard";
import AnimatedIconBackground from "./AnimatedIconBackground";
import api from "../services/api";

const UMKMScrollSection = () => {
  const [umkmData, setUmkmData] = useState([]);
  const umkmScrollRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const userInteractingRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const SPEED = 2.0;

  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        const response = await api.get("/umkm");
        if (response.data.status && Array.isArray(response.data.data)) {
          setUmkmData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching UMKM:", error);
      }
    };
    fetchUMKM();
  }, []);

  useEffect(() => {
    const el = umkmScrollRef.current;
    if (!el) return;

    const half = () => el.scrollWidth / 2;

    const animate = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!userInteractingRef.current && el.scrollWidth > el.clientWidth) {
        posRef.current += SPEED * (delta / 16);
        const loop = half();
        if (posRef.current >= loop) posRef.current -= loop;
        el.scrollLeft = posRef.current;
      } else {
        posRef.current = el.scrollLeft % half();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [umkmData]);

  const startInteraction = () => {
    userInteractingRef.current = true;
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const endInteraction = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      userInteractingRef.current = false;
      const el = umkmScrollRef.current;
      if (!el) return;
      const loop = el.scrollWidth / 2;
      posRef.current = el.scrollLeft % loop;
    }, 300);
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const loop = el.scrollWidth / 2;
    if (userInteractingRef.current) {
      if (el.scrollLeft >= loop) el.scrollLeft -= loop;
      if (el.scrollLeft <= 0) el.scrollLeft = (el.scrollLeft + loop) % loop;
      posRef.current = el.scrollLeft;
    } else {
      posRef.current = el.scrollLeft % loop;
    }
  };

  if (umkmData.length === 0) return null;

  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative"
    >
      <AnimatedIconBackground iconCount={15} color="text-orange" />
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative">
        <div className="absolute top-0 left-0 w-4 sm:w-16 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />
        <div
          className="relative w-full overflow-x-auto no-scrollbar"
          ref={umkmScrollRef}
          onPointerDown={startInteraction}
          onPointerUp={endInteraction}
          onPointerCancel={endInteraction}
          onMouseEnter={startInteraction}
          onMouseLeave={endInteraction}
          onTouchStart={startInteraction}
          onTouchEnd={endInteraction}
          onScroll={handleScroll}
        >
          <motion.div
            style={{ width: "max-content" }}
            className="flex gap-4 py-3"
          >
            {[...umkmData, ...umkmData].map((item, i) => (
              <div key={i} className="snap-start">
                <Link to={`/detail-umkm/${item.slug}`} className="block">
                  <UMKMCard data={item} />
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-4 sm:w-16 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default UMKMScrollSection;
