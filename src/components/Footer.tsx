"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVar: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const gridVar: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const colVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function Footer() {
  const t = useTranslations("footer");

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0d0d0d] text-white py-12" id="footer">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={colVar}>
            <Image
              src="/Be-Tech.svg"
              alt={t("logo.alt")}
              width={120}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-[#f3822c] mb-4">{t("description")}</p>
          </motion.div>

          <motion.div variants={colVar}>
            <h4 className="font-bold text-lg mb-4">{t("quickLinks.title")}</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { id: "about", label: t("quickLinks.about") },
                // { id: "standards", label: t("quickLinks.standards") },
                { id: "why-us", label: t("quickLinks.whyUs") },
                { id: "why-company", label: t("quickLinks.whyCompany") },
                // { id: "packages", label: t("quickLinks.packages") },
                // { id: "partners", label: t("quickLinks.partners") },
              ].map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="hover:text-[#f3822c]"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={colVar}>
            <h4 className="font-bold text-lg mb-4">{t("services.title")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t("services.deviceSupply")}</li>
              <li>{t("services.training")}</li>
              <li>{t("services.systemCreation")}</li>
              <li>{t("services.softwareDevelopment")}</li>
              <li>{t("services.technicalConsultation")}</li>
            </ul>
          </motion.div>

          <motion.div variants={colVar}>
            <h4 className="font-bold text-lg mb-4">{t("contact.title")}</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0" />
                <div className="flex gap-2" dir="rtl">
                  <a
                    href="tel:966562704007"
                    className="hover:underline cursor-pointer"
                    dir="ltr"
                  >
                    966 56 270 4007
                  </a>
                  <span className="font-semibold">-</span>
                  <a
                    href="tel:966569765744"
                    className="hover:underline cursor-pointer"
                    dir="ltr"
                  >
                    966 569 765 744
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0" />
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:support@gastech.com.sa"
                    className="hover:underline cursor-pointer"
                  >
                    support@gastech.com.sa
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="text-sm leading-relaxed">
                  {t("contact.address")}
                </span>
              </div>
            </div>

            <div className="flex items-center xl:items-end flex-col xl:flex-row justify-between gap-4">
              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/966547726194"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-[#f3822c] hover:bg-[#d66f25] transition-all text-[#0d0d0d] px-3 py-2 rounded-md font-medium capitalize"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/whatsapp.svg"
                    alt="WhatsApp"
                    width={18}
                    height={18}
                  />
                  <h5 className="text-xs">{t("contact.whatsapp")}</h5>
                </div>
              </motion.a>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://www.linkedin.com/company/gastechai/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded bg-gray-400 hover:bg-slate-400 transition-all"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/linkedin.svg"
                    alt="Linkedin"
                    width={21}
                    height={21}
                  />
                </motion.a>
                <motion.a
                  href="https://x.com/GastechAj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-gray-400 hover:bg-slate-400 transition-all"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/x.svg"
                    alt="X (Twitter)"
                    width={15}
                    height={15}
                  />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61572542068792"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded bg-gray-400 hover:bg-slate-400 transition-all"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/facebook.svg"
                    alt="Facebook"
                    width={22}
                    height={22}
                  />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/qastechai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded bg-gray-400 hover:bg-slate-400 transition-all"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/instagram.svg"
                    alt="Instagram"
                    width={22}
                    height={22}
                  />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-white"
          variants={sectionVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm text-center text-muted-foreground">
            {t("copyright.text")}{" "}
            <Link
              target="_blank"
              href="https://betech.com.sa"
              className="mx-1 text-[#f3822c] hover:text-[#d66f25]"
              rel="noopener noreferrer"
            >
              BeTech
            </Link>
            &copy; 2025
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
