"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const gridContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export default function Packages() {
  const t = useTranslations("packages");

  const packages = [
    {
      name: t("core.name"),
      features: [
        t("core.features.stationSales"),
        t("core.features.stationInventory"),
        t("core.features.stationTanks"),
        t("core.features.pumpsDisplays"),
        t("core.features.purchases"),
        t("core.features.energyPrices"),
        t("core.features.shifts"),
        t("core.features.facilityRentals"),
        t("core.features.posApp"),
        t("core.features.reports"),
      ],
      notIncluded: [
        t("core.notIncluded.generalAccounting"),
        t("core.notIncluded.humanResources"),
        t("core.notIncluded.transport"),
        t("core.notIncluded.maintenance"),
      ],
    },
    {
      name: t("plus.name"),
      popular: true,
      features: [
        t("plus.features.allCoreFeatures"),
        t("plus.features.generalAccounting"),
        t("plus.features.humanResources"),
        t("plus.features.maintenanceContract"),
      ],
      notIncluded: [
        t("plus.notIncluded.transport"),
        t("plus.notIncluded.maintenance"),
        t("plus.notIncluded.thirdPartyIntegration"),
      ],
    },
    {
      name: t("extra.name"),
      features: [
        t("extra.features.allPreviousFeatures"),
        t("extra.features.transport"),
        t("extra.features.maintenance"),
        t("extra.features.thirdPartyIntegration"),
        t("extra.features.maintenanceContract"),
      ],
      notIncluded: [],
    },
  ];

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>
        </div>

        {/* NOTE: added items-stretch */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 items-stretch"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {packages?.map((pkg, index) => (
            // NOTE: added h-full
            <motion.div
              key={index}
              variants={cardItem}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="h-full"
            >
              {/* NOTE: added h-full */}
              <Card
                className={`card-hover relative flex flex-col h-full ${
                  pkg.popular ? "border-blue-500 border-2" : ""
                }`}
              >
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="absolute -top-3 right-4"
                  >
                    <Badge className="bg-blue-600">{t("popularBadge")}</Badge>
                  </motion.div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    {pkg.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <div className="space-y-3 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {pkg.notIncluded.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 opacity-50"
                      >
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400">
                          ✗
                        </div>
                        <span className="text-sm line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      className="w-full mt-6"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={scrollToContact}
                    >
                      {t("requestPackage")}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
