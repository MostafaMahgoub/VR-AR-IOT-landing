"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Box,
  Cpu,
  GraduationCap,
  Layers,
  LifeBuoy,
  PlayCircle,
  Users,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";

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

export default function FeaturesGrid() {
  const t = useTranslations("featuresGrid");

  const features = [
    {
      icon: GraduationCap,
      title: t("features.stationManagement.title"),
      desc: t("features.stationManagement.desc"),
    },
    {
      icon: Users,
      title: t("features.pumpManagement.title"),
      desc: t("features.pumpManagement.desc"),
    },
    {
      icon: Box,
      title: t("features.tankManagement.title"),
      desc: t("features.tankManagement.desc"),
    },
    {
      icon: PlayCircle,
      title: t("features.transportManagement.title"),
      desc: t("features.transportManagement.desc"),
    },
    {
      icon: BarChart3,
      title: t("features.priceManagement.title"),
      desc: t("features.priceManagement.desc"),
    },
    {
      icon: Cpu,
      title: t("features.displayManagement.title"),
      desc: t("features.displayManagement.desc"),
    },
    {
      icon: Layers,
      title: t("features.maintenanceManagement.title"),
      desc: t("features.maintenanceManagement.desc"),
    },
    {
      icon: LifeBuoy,
      title: t("features.humanResources.title"),
      desc: t("features.humanResources.desc"),
    },
    // {
    //   icon: Smartphone,
    //   title: t("features.selfService.title"),
    //   desc: t("features.selfService.desc"),
    // },
    // {
    //   icon: Shield,
    //   title: t("features.accounting.title"),
    //   desc: t("features.accounting.desc"),
    // },
    // {
    //   icon: Database,
    //   title: t("features.inventoryManagement.title"),
    //   desc: t("features.inventoryManagement.desc"),
    // },
    // {
    //   icon: BarChart3,
    //   title: t("features.salesManagement.title"),
    //   desc: t("features.salesManagement.desc"),
    // },
  ];

  return (
    <section className="py-16" id="units">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-xl text-white">{t("subtitle")}</p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={cn(
                  "transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border-0 shadow-md hover:bg-white group h-48"
                )}
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-[#f3822c] mx-auto mb-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-[#d66f25]" />
                  <h4 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-[#0d0d0d]">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
