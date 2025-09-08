"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpenCheck,
  Hammer,
  Plane,
  Presentation,
  Wrench,
  Shield,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import contracting from "/public/contracting.jpeg";
import education from "/public/education.jpeg";
import safety from "/public/safety.jpeg";
import tourism from "/public/tourism.jpeg";
import engineering from "/public/engineering.jpeg";
import training from "/public/training.jpeg";

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
      href: "https://drive.google.com/drive/u/0/folders/1hIWtPO485figms7tniK0eDEb_BLfb18m",
      imgSrc: contracting,
    },
    {
      icon: BookOpenCheck,
      title: t("Education"),
      href: "https://drive.google.com/drive/u/0/folders/1kuVR3yqKAtWCT2eQmp8YiT2SYR8f8CZQ",
      imgSrc: education,
    },
    {
      icon: Shield,
      title: t("Safety"),
      href: "https://drive.google.com/drive/u/0/folders/1PhGMrIoqgqT7HDDDFf2cP4_3wHU5G2jZ",
      imgSrc: safety,
    },
    {
      icon: Plane,
      title: t("Tourism"),
      href: "https://drive.google.com/drive/u/0/folders/1sWNR_CoXlvauwOPy1er_In2YgXe7M7-q",
      imgSrc: tourism,
    },
    {
      icon: Wrench,
      title: t("Engineering"),
      href: "https://drive.google.com/drive/u/0/folders/1um6ICDWwELYMko7MtbWe2joLjOKK50uQ",
      imgSrc: engineering,
    },
    {
      icon: Presentation,
      title: t("Training"),
      href: "https://drive.google.com/drive/u/0/folders/1aGgAyLW1GsLpc8KKXrAWUvBRrJ5U8E6Q",
      imgSrc: training,
    },
  ];

  return (
    <section className="py-16" id="sectors">
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
