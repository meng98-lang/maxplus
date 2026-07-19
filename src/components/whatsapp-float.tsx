"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        setNumber(data.whatsappNumber || "");
        setMessage(data.whatsappMessage || "");
      })
      .catch(() => {});
  }, []);

  if (!number) return null;

  const handleClick = () => {
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
