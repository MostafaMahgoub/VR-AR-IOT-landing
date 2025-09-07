"use client";
import { useRef } from "react";
import ConsultationForm from "@/components/ConsultationForm";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const headerVar: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const formVar: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut, delay: 0.1 },
  },
};

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("consultationForm");

  const scrollToTop = () => {
    if (sectionRef.current) {
      const yOffset = -100;
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 md:py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:txt-4xl font-bold text-gray-900 mb-4"
            variants={headerVar}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            variants={headerVar}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          className="md:w-[80%] mx-auto"
          variants={formVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ConsultationForm onSuccess={scrollToTop} />
        </motion.div>
      </div>
    </section>
  );
}
