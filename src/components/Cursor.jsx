import React, { useEffect, useRef } from "react";
import "./Cursor.css";

const Cursor = () => {
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorOutline || window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      cursorOutline.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    };

    const checkHover = (e) => {
      const target = e.target;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("[onclick]") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) {
        cursorOutline.classList.add("cursor-hover");
      } else {
        cursorOutline.classList.remove("cursor-hover");
      }
    };

    const handleMouseBoundary = (e) => {
      if (e.type === "mouseleave") {
        cursorOutline.style.opacity = "0";
      } else if (e.type === "mouseenter") {
        cursorOutline.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkHover);
    document.body.addEventListener("mouseleave", handleMouseBoundary);
    document.body.addEventListener("mouseenter", handleMouseBoundary);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHover);
      document.body.removeEventListener("mouseleave", handleMouseBoundary);
      document.body.removeEventListener("mouseenter", handleMouseBoundary);
    };
  }, []);

  return <div className="cursor-outline" ref={cursorOutlineRef}></div>;
};

export default Cursor;
