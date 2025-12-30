/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

export default function GoogleTranslateLoader() {

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ position: "absolute", top: 0, left: "-9999px" }}
    ></div>
  );
}
