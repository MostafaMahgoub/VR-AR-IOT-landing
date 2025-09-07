"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const partners = [
  { src: "/logo1.png", alt: "GasTech Partner 1" },
  { src: "/logo2.png", alt: "GasTech Partner 2" },
  { src: "/logo3.png", alt: "GasTech Partner 3" },
  { src: "/logo4.png", alt: "GasTech Partner 4" },
  { src: "/logo5.png", alt: "GasTech Partner 5" },
  { src: "/logo6.png", alt: "GasTech Partner 6" },
  { src: "/logo7.png", alt: "GasTech Partner 7" },
];

const items = [...partners, ...partners];

export default function ScrollingItems() {
  const t = useTranslations("partners");
  
  const getDelay = (i: number) =>
    `calc(30s / ${items.length} * (${items.length} - ${i}) * -1)`;

  return (
    <section className="flex flex-col gap-8 text-center pt-10" id="partners">
      <h2 className="text-2xl md:text-4xl font-semibold">{t("title")}</h2>
      <div className="bg-slate-100 py-10">
        <div className="wrapper reduced-mask">
          {items.map((item, i) => (
            <div
              key={`left-${i}`}
              className="itemLeft"
              style={{ animationDelay: getDelay(i) }}
            >
              <div className="card-inner">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={100}
                  height={40}
                  className="object-contain max-w-[100%] max-h-[100%]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* un comment this to have the second row */}

        {/* <div className="wrapper reduced-mask mt-4">
          {items.map((item, i) => (
            <div
              key={`right-${i}`}
              className="itemRight"
              style={{ animationDelay: getDelay(i) }}
            >
              <div className="card-inner">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={100}
                  height={40}
                  className="object-contain max-w-[100%] max-h-[100%]"
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
