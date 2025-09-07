"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";

const SplineVR = dynamic(() => import("./SplineVR"), { ssr: false });

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
              <h1 className={`font-bold text-5xl`}>{t("title")}</h1>

              <h2
                className={`text-yellow-300 font-bold ${
                  locale === "en" ? "text-4xl" : "text-4xl md:text-5xl"
                }`}
              >
                {t("subtitle")}
              </h2>

              <p
                className={`opacity-90 mb-8 ${
                  locale === "en"
                    ? "text-base xl:text-lg"
                    : "text-lg md:text-xl"
                }`}
              >
                {t("description")}
              </p>
            </div>

            {/* <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-500 mb-8">
              <h3
                className={`font-bold mb-6 ${
                  locale === "en" ? "text-xl" : "text-2xl"
                }`}
              >
                {t("features.title")}
              </h3>
              <div className="space-y-4">
                {[
                  t("features.remoteControl"),
                  t("features.integration"),
                  t("features.energyStandards"),
                  t("features.taxCompliance"),
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 space-x-reverse"
                  >
                    <CheckCircle
                      size={24}
                      className="text-yellow-300 w-6 h-6 flex-shrink-0"
                    />
                    <span className={"text-sm lg:text-base"}>{feature}</span>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-start">
              <Button
                size="lg"
                className={`bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-sm`}
                onClick={() => scrollToSection("contact")}
              >
                {t("cta.requestConsultation")}
              </Button>

              <Button
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
              </Button>

              {downloadError && (
                <p className="text-red-500 text-sm mt-2">{downloadError}</p>
              )}
            </div>
          </div>

          {/* Floating image left */}
          {/* <div
            className={`hidden lg:flex relative w-full lg:w-[70%] xl:w-[45%] xl:-me-[165px]`}
          >
            <div className="relative w-full">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {locale === "ar" ? (
                  <Image
                    src="/en.png"
                    alt={t("image.alt")}
                    width={900}
                    height={900}
                    className={`w-[75%] 2xl:w-[85%] h-auto object-contain drop-shadow-2xl`}
                  />
                ) : (
                  <Image
                    src="/ar.png"
                    alt={t("image.alt")}
                    width={900}
                    height={900}
                    className={`w-[85%] -ms-12 2xl:-ms-0 h-auto object-contain drop-shadow-2xl`}
                  />
                )}
              </motion.div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
