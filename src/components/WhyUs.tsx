"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Fuel, Gauge, Truck, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const headerVar: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const textContainer: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const cardsContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export default function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section id="why-company" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            variants={headerVar}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t("title")}
          </motion.h2>
        </div>

        <div className="grid gap-12 items-center">
          {/* Text block */}
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              className="text-2xl font-bold text-[#f3822c] mb-6"
              variants={textItem}
            >
              {t("paragraph1.content")}
            </motion.h3>
            <motion.p
              className="text-lg text-white mb-6 leading-relaxed"
              variants={textItem}
            >
              {t("paragraph2.content")}
            </motion.p>
            <motion.p
              className="text-lg text-white mb-4 leading-relaxed"
              variants={textItem}
            >
              {t("paragraph3")}
            </motion.p>
            <motion.ul
              className="text-lg text-white mb-6 leading-relaxed space-y-2"
              variants={textItem}
            >
              {t.raw("features").map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="text-[#f3822c] p-2">•</span>
                  {feature}
                </li>
              ))}
            </motion.ul>
            <motion.p
              className="text-lg text-white mb-8 leading-relaxed"
              variants={textItem}
            >
              {t("paragraph4")}
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <Card className="card-hover h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Fuel className="w-12 h-12 text-[#f3822c] mb-4" />
                  <h3 className="font-bold text-xl mb-3">
                    {t("cards.pumpManagement.title")}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {t("cards.pumpManagement.description")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <Card className="card-hover h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Gauge className="w-12 h-12 text-[#f3822c] mb-4" />
                  <h3 className="font-bold text-xl mb-3">
                    {t("cards.tankManagement.title")}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {t("cards.tankManagement.description")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <Card className="card-hover h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Truck className="w-12 h-12 text-[#f3822c] mb-4" />
                  <h3 className="font-bold text-xl mb-3">
                    {t("cards.vehicleManagement.title")}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {t("cards.vehicleManagement.description")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardItem}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <Card className="card-hover h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Building2 className="w-12 h-12 text-[#f3822c] mb-4" />
                  <h3 className="font-bold text-xl mb-3">
                    {t("cards.stationManagement.title")}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {t("cards.stationManagement.description")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
