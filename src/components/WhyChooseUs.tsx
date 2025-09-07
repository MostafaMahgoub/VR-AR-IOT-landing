"use client";

import { useState } from "react";
import {
  Shield,
  Wifi,
  CheckCircle,
  BarChart3,
  Database,
  TrendingUp,
  Smartphone,
  Cloud,
  Clock,
  Users,
  Activity,
  Bell,
  Thermometer,
  Ruler,
  Link2,
  Fuel,
  Truck,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";

type Feature = {
  title: string;
  desc: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const headerBlock: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut, staggerChildren: 0.08 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const gridContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const [showAll, setShowAll] = useState(false);

  const features: Feature[] = [
    {
      title: t("features.zatca.title"),
      desc: t("features.zatca.desc"),
      icon: Shield,
    },
    {
      title: t("features.centralIntegration.title"),
      desc: t("features.centralIntegration.desc"),
      icon: Wifi,
    },
    {
      title: t("features.energyStandards.title"),
      desc: t("features.energyStandards.desc"),
      icon: CheckCircle,
    },
    {
      title: t("features.posIntegration.title"),
      desc: t("features.posIntegration.desc"),
      icon: BarChart3,
    },
    {
      title: t("features.tankMeasurement.title"),
      desc: t("features.tankMeasurement.desc"),
      icon: Database,
    },
    {
      title: t("features.priceUpdate.title"),
      desc: t("features.priceUpdate.desc"),
      icon: TrendingUp,
    },
    {
      title: t("features.selfService.title"),
      desc: t("features.selfService.desc"),
      icon: Smartphone,
    },
    {
      title: t("features.dataStorage.title"),
      desc: t("features.dataStorage.desc"),
      icon: Cloud,
    },
    {
      title: t("features.shiftClosure.title"),
      desc: t("features.shiftClosure.desc"),
      icon: Clock,
    },
    {
      title: t("features.customerLoyalty.title"),
      desc: t("features.customerLoyalty.desc"),
      icon: Users,
    },
    {
      title: t("features.erpSystem.title"),
      desc: t("features.erpSystem.desc"),
      icon: Activity,
    },
    {
      title: t("features.digitalTransformation.title"),
      desc: t("features.digitalTransformation.desc"),
      icon: CheckCircle,
    },
    {
      title: t("features.maintenanceAlerts.title"),
      desc: t("features.maintenanceAlerts.desc"),
      icon: Bell,
    },
    {
      title: t("features.waterTemperature.title"),
      desc: t("features.waterTemperature.desc"),
      icon: Thermometer,
    },
    {
      title: t("features.tankCalculation.title"),
      desc: t("features.tankCalculation.desc"),
      icon: Ruler,
    },
    {
      title: t("features.systemIntegration.title"),
      desc: t("features.systemIntegration.desc"),
      icon: Link2,
    },
    {
      title: t("features.driverFuelMonitoring.title"),
      desc: t("features.driverFuelMonitoring.desc"),
      icon: Fuel,
    },
    {
      title: t("features.transportManagement.title"),
      desc: t("features.transportManagement.desc"),
      icon: Truck,
    },
  ];

  const firstSix = features.slice(0, 6);
  const rest = features.slice(6);

  return (
    <section id="why-us" className="py-16">
      <div className="container mx-auto px-4 flex flex-col gap-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={headerBlock}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={headerItem}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p variants={headerItem} className="text-xl text-gray-600">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* First 6 features */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {firstSix.map((item, index) => (
            <FeatureCard item={item} key={index} />
          ))}
        </motion.div>

        {/* Expandable grid */}
        <motion.div
          initial={false}
          animate={{ height: showAll ? "auto" : 0, opacity: showAll ? 1 : 0 }}
          transition={{
            height: { duration: 0.45, ease: easeOut },
            opacity: { duration: 0.3, ease: easeOut },
          }}
          className="overflow-hidden"
        >
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {rest.map((item, index) => (
              <FeatureCard item={item} key={index + 6} />
            ))}
          </motion.div>
        </motion.div>

        {/* Toggle */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center justify-center mx-auto text-base font-semibold"
            style={{ color: "#2A4D8A" }}
          >
            {showAll ? t("toggle.hide") : t("toggle.show")}
            {showAll ? (
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
        </div>
      </div>
    </section>
  );
}

/** Card with motion */
function FeatureCard({ item }: { item: Feature }) {
  return (
    <motion.div
      variants={cardItem}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 border-b-2 border-gray-200 bg-gray-100 hover:bg-gray-200 transition-all duration-200 min-h-[120px]"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <item.icon className="w-6 h-6 text-blue-600 mt-1" />
        </div>
        <div className="text-start">
          <h3 className="font-bold text-lg mb-1 text-gray-800">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
