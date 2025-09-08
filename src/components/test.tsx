"use client";

import { Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
// import dynamic from "next/dynamic";
import { useState } from "react";
import SplineVR from "./SplineVR";
import StarBorder from "./StarBorder";

export default function HeroWithFloatingImage() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);

      const response = await fetch("/Betech Company Profile .pdf");
      if (!response.ok) {
        throw new Error("Failed to download the file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Betech Company Profile .pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError(t("download.error"));
      console.error("Download error:", error);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative flex min-h-[calc(100svh-72px)] items-center justify-center overflow-hidden py-4 sm:py-0"
      style={{
        background: "linear-gradient(45deg, #f3822c 0%, #2a2a2a 100%)",
      }}
      id="hero"
    >
      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Curved Lines */}

        <SplineVR />

        {/* Straight Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "100%", opacity: 0 }}
              animate={{
                x: "-100%",
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="absolute right-0"
              style={{
                top: `${15 + i * 10}%`,
                height: "1px",
                width: "100%",
                background: `linear-gradient(90deg, transparent, ${
                  i % 2 === 0 ? "#FDE68A" : "#064E3B"
                }60, transparent)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 z-[1]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-red-100 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-red-100 blur-3xl"
        />
      </div>

      {/* Content with floating image */}
      <div className="container relative z-[3] px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-5xl w-full flex items-center justify-center"
        >
          {/* Text content right */}
          <div className="text-white py-6 xl:py-0 xl:w-[70%]">
            <div className="flex flex-col gap-6">
              <h1 className={`font-bold text-5xl text-center`}>{t("title")}</h1>

              <h2
                className={`text-yellow-300 font-bold text-center ${
                  locale === "en" ? "text-4xl" : "text-4xl md:text-5xl"
                }`}
              >
                {t("subtitle")}
              </h2>

              <p
                className={`opacity-90 mb-8 text-center ${
                  locale === "en"
                    ? "text-base xl:text-lg"
                    : "text-lg md:text-xl"
                }`}
              >
                {t("description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-start">
              {/* <Button
                size="lg"
                className={`bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-sm`}
                onClick={() => scrollToSection("contact")}
              >
                {t("cta.requestConsultation")}
              </Button> */}
              <StarBorder
                // variant="solid"
                radius={9999}
                size="lg"
                thickness={1}
                disableGlow
                speed="2s"
                onClick={() => scrollToSection("contact")}
              >
                {t("cta.requestConsultation")}
              </StarBorder>
              <StarBorder
                variant="outline"
                radius={9999}
                size="lg"
                thickness={1}
                disableGlow
                speed="2s"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isDownloading ? t("download.loading") : t("download.button")}
              </StarBorder>
              {/* <Button
                size="lg"
                className={`bg-[#0d0d0d]  text-[#f3822c] px-6 py-2 rounded-md font-semibold relative text-sm`}
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isDownloading ? t("download.loading") : t("download.button")}
              </Button> */}

              {downloadError && (
                <p className="text-red-500 text-sm mt-2">{downloadError}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {/* <div
        className="absolute bottom-[1.8rem] right-[1.5rem] w-[8.5rem] h-5  z-[5] rounded-md"
        style={{
          background: "linear-gradient(45deg, #12131d 70%, #786d72 100%)",
        }}
      /> */}
    </section>
  );
}
