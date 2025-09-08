"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpenCheck,
  Building2,
  Hammer,
  HeartPulse,
  Plane,
  Presentation,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import vr2 from "/public/vr2.jpg";
import vr5 from "/public/vr5.jpg";
import vr6 from "/public/vr6.jpg";
import vr8 from "/public/vr8.jpg";
import vr11 from "/public/vr11.jpg";
import vr12 from "/public/vr12.jpg";

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Sectors() {
  const t = useTranslations("sectors");

  const features = [
    {
      icon: Hammer,
      title: t("Contracting"),
      href: "https://drive.google.com/file/d/1DMvIp59auOuzUQj6X7U8UFk3ieVfPzOq/view?usp=sharing",
      imgSrc: vr8,
    },
    {
      icon: Building2,
      title: t("Real Estate"),
      href: "https://drive.google.com/file/d/1G-hLGQnMEsSKtTe6XSqmOCZt4cOhLEAe/view?usp=sharing",
      imgSrc: vr2,
    },
    {
      icon: Plane,
      title: t("Tourism"),
      href: "https://drive.google.com/file/d/1M67ty2OdbsqwKM131LiiUnq8N8ZtVG2P/view?usp=sharing",
      imgSrc: vr11,
    },
    {
      icon: BookOpenCheck,
      title: t("Education Sponsorship"),
      href: "https://drive.google.com/file/d/1-v8DVvnSiv04dc-oo-Rg1St7F5pJhUFJ/view?usp=sharing",
      imgSrc: vr12,
    },
    {
      icon: Presentation,
      title: t("Training"),
      href: "https://drive.google.com/file/d/1qvB3Rv1yOUxdIJ1VwzwIsVWQn_ZtYDSA/view?usp=sharing",
      imgSrc: vr5,
    },
    {
      icon: HeartPulse,
      title: t("Healthcare"),
      href: "https://drive.google.com/file/d/1_1g0ESyrtkFX6FdT4pH8TZavWTIM-2aG/view?usp=sharing",
      imgSrc: vr6,
    },
  ];

  return (
    <section className="py-16" id="units">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{t("title")}</h2>
          {/* <p className="text-xl text-white">{t("subtitle")}</p> */}
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Link
                href={feature.href}
                target="_blank"
                className="hover:cursor-pointer"
              >
                <Card
                  className={cn(
                    "transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border-0 shadow-md hover:bg-white group"
                  )}
                >
                  <CardContent className="p-6 flex flex-col justify-center items-center gap-4">
                    <div className="relative w-[300px] h-[200px]">
                      <Image
                        src={feature.imgSrc}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-md"
                      />
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-[#0d0d0d]">
                      {feature.title}
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
