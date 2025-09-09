"use client";

import { Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import StarBorder from "./StarBorder";
import heroImg from "/public/hero-img.svg";

export default function HeroWithFloatingImage() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);

      const response = await fetch("/Be Tech @Smart Construction Profile.pdf");
      if (!response.ok) {
        throw new Error("Failed to download the file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Be Tech Smart Construction Profile.pdf";
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
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#EAB308" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0" />
              <stop offset="50%" stopColor="#064E3B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Top Curves */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
            }}
            d="M 100 100 Q 300 0 500 100 T 900 100"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 0.5,
            }}
            d="M 0 200 Q 200 100 400 200 T 800 200"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="1"
          />
          {/* Bottom Curves */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
              delay: 1,
            }}
            d="M 100 600 Q 300 500 500 600 T 900 600"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
          />
        </svg>

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
          className="flex flex-col sm:flex-row items-center gap-0 sm:gap-[5rem]"
        >
          {/* Text content right */}
          <div className="text-white py-6 xl:py-0 xl:w-[50%]">
            <div className="flex flex-col gap-6">
              <h1 className={`font-bold text-5xl`}>{t("title")}</h1>

              <h2
                className={`text-[#f3822c] font-bold ${
                  locale === "en"
                    ? "text-4xl"
                    : "text-4xl md:text-5xl !leading-[4rem]"
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

            <div className=" flex  gap-2">
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

              {downloadError && (
                <p className="text-red-500 text-sm mt-2">{downloadError}</p>
              )}
            </div>
          </div>

          {/* Floating image left */}
          <div
            className={`flex relative w-full lg:w-[80%] xl:w-[50%] xl:-me-[165px]`}
          >
            <motion.div
              // animate={{
              //   y: [0, -20, 0],
              // }}
              // transition={{
              //   duration: 3,
              //   repeat: Infinity,
              //   ease: "easeInOut",
              // }}
              className="relative w-full h-[450px] lg:h-[700px] flex items-start justify-end"
            >
              <Image
                src={heroImg}
                alt="Hero Image"
                className="object-contain !w-[590px] "
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
