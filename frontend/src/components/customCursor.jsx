// CustomCursor.jsx
import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile-sized
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const cursor = document.getElementById("custom-cursor");
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      id="custom-cursor"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(168,139,250,0.3)",
        border: "2px solid #a78bfa",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        transition: "background 0.2s, border 0.2s",
      }}
    />
  );
};

export default CustomCursor;