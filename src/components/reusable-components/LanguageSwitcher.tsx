"use client";
import { useEffect, useRef, useState } from "react";
import { RxReset } from "react-icons/rx";

// types ...
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: {
          new(options: GoogleTranslateOptions, element: string): unknown;
          InlineLayout: { SIMPLE: unknown };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

interface GoogleTranslateOptions {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
  layout: unknown;
}

const LANGS = [
  { code: "af", label: "Afrikaans" },
  { code: "am", label: "Amharic" },
  { code: "ar", label: "Arabic" },
  { code: "as", label: "Assamese" },
  { code: "az", label: "Azerbaijani" },
  { code: "bg", label: "Bulgarian" },
  { code: "bn", label: "Bengali" },
  { code: "bo", label: "Tibetan" },
  { code: "br", label: "Breton" },
  { code: "ca", label: "Catalan" },
  { code: "ceb", label: "Cebuano" },
  { code: "cs", label: "Czech" },
  { code: "cy", label: "Welsh" },
  { code: "da", label: "Danish" },
  { code: "de", label: "German" },
  { code: "dz", label: "Dzongkha" },
  { code: "el", label: "Greek" },
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "et", label: "Estonian" },
  { code: "eu", label: "Basque" },
  { code: "fa", label: "Persian" },
  { code: "ff", label: "Fulah" },
  { code: "fi", label: "Finnish" },
  { code: "fil", label: "Filipino" },
  { code: "fj", label: "Fijian" },
  { code: "fr", label: "French" },
  { code: "fy", label: "Frisian" },
  { code: "ga", label: "Irish" },
  { code: "gd", label: "Scottish Gaelic" },
  { code: "gl", label: "Galician" },
  { code: "gu", label: "Gujarati" },
  { code: "ha", label: "Hausa" },
  { code: "haw", label: "Hawaiian" },
  { code: "he", label: "Hebrew" },
  { code: "hi", label: "Hindi" },
  { code: "hr", label: "Croatian" },
  { code: "hu", label: "Hungarian" },
  { code: "hy", label: "Armenian" },
  { code: "id", label: "Indonesian" },
  { code: "ig", label: "Igbo" },
  { code: "is", label: "Icelandic" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "jv", label: "Javanese" },
  { code: "ka", label: "Georgian" },
  { code: "kk", label: "Kazakh" },
  { code: "km", label: "Khmer" },
  { code: "kn", label: "Kannada" },
  { code: "ko", label: "Korean" },
  { code: "ku", label: "Kurdish" },
  { code: "ky", label: "Kyrgyz" },
  { code: "lb", label: "Luxembourgish" },
  { code: "lo", label: "Lao" },
  { code: "lt", label: "Lithuanian" },
  { code: "lv", label: "Latvian" },
  { code: "mg", label: "Malagasy" },
  { code: "mi", label: "Māori" },
  { code: "ml", label: "Malayalam" },
  { code: "mn", label: "Mongolian" },
  { code: "mr", label: "Marathi" },
  { code: "ms", label: "Malay" },
  { code: "mt", label: "Maltese" },
  { code: "my", label: "Burmese" },
  { code: "ne", label: "Nepali" },
  { code: "nl", label: "Dutch" },
  { code: "no", label: "Norwegian" },
  { code: "ny", label: "Chichewa" },
  { code: "om", label: "Oromo" },
  { code: "or", label: "Odia" },
  { code: "pa", label: "Punjabi" },
  { code: "pl", label: "Polish" },
  { code: "ps", label: "Pashto" },
  { code: "pt", label: "Portuguese" },
  { code: "ro", label: "Romanian" },
  { code: "ru", label: "Russian" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "sa", label: "Sanskrit" },
  { code: "sd", label: "Sindhi" },
  { code: "si", label: "Sinhala" },
  { code: "sk", label: "Slovak" },
  { code: "sl", label: "Slovenian" },
  { code: "sm", label: "Samoan" },
  { code: "sn", label: "Shona" },
  { code: "so", label: "Somali" },
  { code: "sq", label: "Albanian" },
  { code: "sr", label: "Serbian" },
  { code: "ss", label: "Swati" },
  { code: "st", label: "Southern Sotho" },
  { code: "su", label: "Sundanese" },
  { code: "sv", label: "Swedish" },
  { code: "sw", label: "Swahili" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "tg", label: "Tajik" },
  { code: "th", label: "Thai" },
  { code: "ti", label: "Tigrinya" },
  { code: "tk", label: "Turkmen" },
  { code: "tl", label: "Tagalog" },
  { code: "tn", label: "Tswana" },
  { code: "to", label: "Tongan" },
  { code: "tr", label: "Turkish" },
  { code: "ts", label: "Tsonga" },
  { code: "uk", label: "Ukrainian" },
  { code: "ur", label: "Urdu" },
  { code: "uz", label: "Uzbek" },
  { code: "ve", label: "Venda" },
  { code: "vi", label: "Vietnamese" },
  { code: "xh", label: "Xhosa" },
  { code: "yo", label: "Yoruba" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "zh-TW", label: "Chinese (Traditional)" },
  { code: "zu", label: "Zulu" }
];

export default function LanguageSwitcher() {
  const initialized = useRef(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    let langFromCookie: string | null = null;
    const cookieVal = getCookie("googtrans");
    if (cookieVal && cookieVal.startsWith("/")) {
      const parts = cookieVal.split("/");
      if (parts.length === 3) langFromCookie = parts[2];
    }
    const preferredLang = savedLang || langFromCookie || "en";
    setSelectedLang(preferredLang);
    translateTo(preferredLang, true);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGS.map((l) => l.code).join(","),
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function translateTo(code: string, isInitialLoad = false) {
    const select = document.querySelector<HTMLSelectElement>(
      "#google_translate_element select.goog-te-combo"
    );

    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      // fallback with cookie
      const setCookie = (name: string, value: string, domain?: string) => {
        document.cookie =
          name + "=" + value + "; path=/; SameSite=Lax" + (domain ? "; domain=" + domain : "");
      };
      const host = window.location.hostname;
      setCookie("googtrans", `/en/${code}`);
      setCookie("googtrans", `/en/${code}`, "." + host);
      if (!isInitialLoad) window.location.reload();
    }

    if (!isInitialLoad) {
      localStorage.setItem("preferredLanguage", code);
      setSelectedLang(code);
    }

  }

  const filteredLangs = LANGS.filter(
    (lang) =>
      lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div id="google_translate_element" className="hidden" />

      <div className="relative">
        {/* WRAPPER so reset is a sibling, not nested */}
        <div className="flex items-center gap-1 bg-white dark:bg-black border border-gray-600 dark:border-gray-300 hover:border-blue-600 rounded-lg ">

          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className=" text-black dark:text-white py-1.5 pl-2 w-24 flex justify-between items-center hover:cursor-pointer"
            aria-label="Select language"
          >
            <span>
              {LANGS.find(
                (lang) => lang.code.toLowerCase() === selectedLang?.toLowerCase()
              )?.label || "Select Language"}
            </span>
            <svg
              className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => translateTo("en")}
            className="p-1 hover:bg-gray-700 border-l hover:border-blue-600 hover:cursor-pointer rounded-tr-lg rounded-br-lg text-black hover:text-white dark:text-white dark:hover:text-black"
            aria-label="Reset to English"
            title="Reset to English"
          >
            <span><RxReset size={30}></RxReset></span>
          </button>

        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-48 bg-white border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col">
            <div className="p-2 border-b border-gray-700 bg-gray-200 ">
              <input
                type="text"
                placeholder="Search languages..."
                className="w-full text-black dark:text-white bg-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="overflow-y-auto flex-1 scrollbar-hide">
              {filteredLangs.length > 0 ? (
                filteredLangs.map((l) => (
                  <button
                    type="button"
                    key={l.code}
                    onClick={() => {
                      translateTo(l.code);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`w-full text-left px-2 py-1.5 hover:cursor-pointer hover:bg-gray-200 ${selectedLang === l.code ? "bg-[#1776BB]" : ""
                      }`}
                  >
                    {l.label}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400">No languages found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
