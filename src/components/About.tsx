"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Clock,
  Zap,
  Wifi,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";

const textContainer: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardsContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const t = useTranslations("about");
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={textItem}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={textItem}
              className="text-lg text-gray-700 mb-6 leading-relaxed"
            >
              <span className="font-semibold">{t("paragraph1.brand")}</span>{" "}
              {t("paragraph1.content")}
            </motion.p>

            <motion.p
              variants={textItem}
              className="text-lg text-gray-700 mb-6 leading-relaxed"
            >
              {t("paragraph2.prefix")}{" "}
              <span className="font-semibold">{t("paragraph2.brand")}</span>{" "}
              {t("paragraph2.content")}
            </motion.p>

            {/* Expandable content */}
            <motion.div
              initial={false}
              animate={{
                height: showMore ? "auto" : 0,
                opacity: showMore ? 1 : 0,
              }}
              transition={{
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
              className="overflow-hidden"
            >
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("paragraph3.prefix")}{" "}
                  <span className="font-semibold">{t("paragraph3.brand")}</span>{" "}
                  {t("paragraph3.content")}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-semibold">{t("paragraph4.brand")}</span>{" "}
                  {t("paragraph4.content")}
                </p>
              </div>
            </motion.div>

            {/* Toggle */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowMore((v) => !v)}
              className={`flex items-center text-base font-semibold ${showMore && "mt-4"}`}
              style={{ color: "#2A4D8A" }}
            >
              {showMore ? t("toggle.hide") : t("toggle.show")}
              {showMore ? (
                <ChevronsUp
                  className="w-5 h-5 mr-2 rtl:ml-2"
                  style={{ color: "#2A4D8A" }}
                />
              ) : (
                <ChevronsDown
                  className="w-5 h-5 mr-2 rtl:ml-2"
                  style={{ color: "#2A4D8A" }}
                />
              )}
            </motion.button>

            <motion.div
              variants={textItem}
              className="mt-6 flex items-center gap-4 flex-wrap"
            >
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {t("badges.energyStandards")}
              </Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                {t("badges.aiSupported")}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Right: Feature Cards */}
          <motion.div
            className="relative"
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Zap,
                    title: t("features.comprehensiveAutomation"),
                    color: "text-blue-600",
                  },
                  {
                    icon: Wifi,
                    title: t("features.directIntegration"),
                    color: "text-green-600",
                  },
                  {
                    icon: Shield,
                    title: t("features.highSecurity"),
                    color: "text-purple-600",
                  },
                  {
                    icon: Clock,
                    title: t("features.timeSaving"),
                    color: "text-orange-600",
                  },
                ].map(({ icon: Icon, title, color }, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItem}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg p-4 text-center shadow-sm"
                  >
                    <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                    <h4 className="font-bold text-sm sm:text-base md:text-lg">
                      {title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
