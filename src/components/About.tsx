"use client";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

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
      {/* <AnimatedGradientBG /> */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* <motion.h2
              variants={textItem}
              className="text-4xl font-bold text-white mb-6"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={textItem}
              className="text-lg text-white mb-6 leading-relaxed"
            >
              {t("paragraph1.content")}
            </motion.p>

            <motion.p
              variants={textItem}
              className="text-lg text-white mb-6 leading-relaxed"
            >
              {t("paragraph2.content")}
            </motion.p> */}
            <h3 className="text-3xl font-bold text-white mb-6">
              {t("paragraph3.title")}
            </h3>
            <h4 className="text-xl font-semibold text-white mb-3">
              {t("paragraph3.subtitle")}
            </h4>
            <div>
              <h5 className="text-lg font-semibold text-[#f3822c] mb-2">
                {t("paragraph3.challenge")}
              </h5>
              <p className="text-white leading-relaxed">
                {t("paragraph3.challengeContent")}
              </p>
            </div>

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
                <div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold text-[#f3822c] mb-2">
                        {t("paragraph3.solution")}
                      </h5>
                      <p className="text-white leading-relaxed">
                        {t("paragraph3.solutionContent")}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-[#f3822c] mb-2">
                        {t("paragraph3.impact")}
                      </h5>
                      <ul className="space-y-2">
                        {t
                          .raw("paragraph3.impactPoints")
                          .map((point: string, index: number) => (
                            <li
                              key={index}
                              className="text-white leading-relaxed flex items-start"
                            >
                              <span className="text-[#f3822c] mr-2">•</span>
                              {point}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-[#f3822c] mb-2">
                        {t("paragraph3.valueAdded")}
                      </h5>
                      <p className="text-white leading-relaxed">
                        {t("paragraph3.valueAddedContent")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Toggle */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowMore((v) => !v)}
              className={`flex items-center text-base font-semibold ${showMore && "mt-4"}`}
              style={{ color: "#f3822c" }}
            >
              {showMore ? t("toggle.hide") : t("toggle.show")}
              {showMore ? (
                <ChevronsUp
                  className="w-5 h-5 mr-2 rtl:ml-2"
                  style={{ color: "#f3822c" }}
                />
              ) : (
                <ChevronsDown
                  className="w-5 h-5 mr-2 rtl:ml-2"
                  style={{ color: "#f3822c" }}
                />
              )}
            </motion.button>
          </motion.div>

          {/* Right: Cement Image */}
          <motion.div
            className="relative"
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={cardItem}
              className={`relative w-full rounded-lg transition-all duration-500 ${
                showMore ? "h-[550px]" : "h-[300px] lg:h-[450px]"
              }`}
            >
              <Image
                src="/cement.png"
                alt="Cement Technology"
                fill
                className="w-full h-full rounded-lg"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
