import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/navigations";
import { Phone } from "lucide-react";

const WHATSAPP_NUMBER = "966562704007";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppIconWithTooltip = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`fixed bottom-0 z-[1000] ${isArabic ? "right-5" : "left-5"} flex flex-col items-center`}
      style={{
        direction: isArabic ? "rtl" : "ltr",
        transform: "translateY(-50%)",
      }}
    >
      <Link
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <span className="size-8 flex items-center justify-center rounded-full bg-[#f3822c] shadow-lg hover:bg-[#f3822c] transition-colors cursor-pointer">
          <Image
            src="/whatsapp.svg"
            alt="WhatsApp Icon"
            width={20}
            height={20}
          />
        </span>
        <span
          className={`relative px-4 py-2 rounded-md bg-[#f3822c] text-[#0d0d0d] text-xs font-medium whitespace-nowrap flex items-center ms-3`}
        >
          {isArabic ? "التواصل مع المسؤول" : "Contact The Administrator"}
          <span
            className={`absolute top-1/2 -translate-y-1/2 ${
              isArabic
                ? "-right-2 border-l-gray-900 border-l-8 border-y-transparent border-y-8 border-r-0 border-solid"
                : "-left-2 border-r-gray-900 border-r-8 border-y-transparent border-y-8 border-l-0 border-solid"
            }`}
            style={{
              width: 0,
              height: 0,
              borderTopWidth: 8,
              borderBottomWidth: 8,
              borderLeftWidth: isArabic ? 8 : 0,
              borderRightWidth: isArabic ? 0 : 8,
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: isArabic ? "#f3822c" : "transparent",
              borderRightColor: isArabic ? "transparent" : "#f3822c",
            }}
          />
        </span>
      </Link>
      <Link
        href="tel:966562704007"
        className="size-8 flex self-start items-center justify-center rounded-full bg-[#f3822c] shadow-lg hover:bg-[#f3822c] transition-colors cursor-pointer mt-3"
        aria-label={isArabic ? "اتصل بنا" : "Call Us"}
      >
        <Phone color="#25D366" size={20} />
      </Link>
    </div>
  );
};

export default WhatsAppIconWithTooltip;
