"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const LANGUAGES = [
  { code: "en", label: "English", flag: "https://flagcdn.com/h40/us.png" },
  { code: "ar", label: "Arabic", flag: "https://flagcdn.com/h40/kw.png" },
  { code: "fr", label: "French", flag: "https://flagcdn.com/h40/fr.png" },
  { code: "de", label: "German", flag: "https://flagcdn.com/h40/de.png" },
  { code: "nl", label: "Dutch", flag: "https://flagcdn.com/h40/nl.png" },  // Added Dutch
];



export default function LanguageSelector() {
  const [selected, setSelected] = useState("en");

  useEffect(() => {
    const cookie = Cookies.get("googtrans");
    if (cookie) {
      const parts = cookie.split("/");
      setSelected(parts[2] || "en");
    }
  }, []);

  const changeLang = (code: string) => {
    setSelected(code);

    // Set cookie so Google Translate forces language
    Cookies.set("googtrans", `/auto/${code}`, { path: "/" });

    const applyLang = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        setTimeout(applyLang, 200);
      }
    };

    applyLang();
  };

  return (
<div className="relative group w-40" translate="no">
    <button className="flex items-center gap-2 px-3 py-1.5 border rounded bg-white shadow-sm w-40">
      <Image src={LANGUAGES.find(l => l.code === selected)?.flag || ""} width={20} height={20} alt="" />
      <span className="text-sm">
        {LANGUAGES.find(l => l.code === selected)?.label}
      </span>
    </button>

    <div className="absolute hidden group-hover:block w-full bg-white shadow-md border rounded mt-1 z-50">
      {LANGUAGES.map(lang => (
        <div
          key={lang.code}
          onClick={() => changeLang(lang.code)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <Image src={lang.flag} width={20} height={20} alt="" />
          {lang.label}
        </div>
      ))}
    </div>
  </div>
  );
}
