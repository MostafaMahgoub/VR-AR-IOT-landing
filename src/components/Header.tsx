"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigations";

export default function Header() {
  const t = useTranslations("header");
  const [activeSection, setActiveSection] = useState("");
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [open, setOpen] = useState(false);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Shared styles
  const ctaBtn = "bg-[#f3822c] hover:bg-[#d66f25] text-[#0d0d0d] font-medium";
  const outlineBtn =
    "border-[#f3822c] text-[#f3822c] hover:bg-[#d66f25] hover:text-[#0d0d0d]";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        partnersRef.current &&
        !partnersRef.current.contains(event.target as Node)
      ) {
        // no-op
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const sections = [
      "hero",
      "sectors",
      "about",
      "standards",
      "why-us",
      "packages",
      "why-company",
      "partners",
      "contact",
      "footer",
    ];

    const handleScroll = () => {
      if (isAutoScrolling) return;
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAutoScrolling]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.scrollY - 40;
      setIsAutoScrolling(true);
      setActiveSection(id);
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setTimeout(() => setIsAutoScrolling(false), 800);
    }
  };

  const handleLanguageSwitch = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    { id: "sectors", label: t("nav.sectors") },
    { id: "about", label: t("nav.about") },
    { id: "why-company", label: t("nav.whyCompany") },
    { id: "footer", label: t("nav.contact") },
  ];

  return (
    <header className="bg-[#0d0d0d] shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              setIsAutoScrolling(true);
              setActiveSection("");
              window.scrollTo({ top: 0, behavior: "smooth" });
              setTimeout(() => setIsAutoScrolling(false), 800);
            }}
            className="cursor-pointer"
          >
            <Image
              src={"/be-tech.svg"}
              alt={t("logo.alt")}
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-10 justify-center flex-1 relative desktop">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`font-semibold transition-colors duration-200 capitalize ${
                  locale === "en" && "desktop-en"
                } ${
                  activeSection === id
                    ? "text-[#f3822c]"
                    : "text-white hover:text-[#f3822c]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              className={`${ctaBtn} px-6 py-2 rounded-md ${
                locale === "en" ? "text-xs xl:text-sm" : "text-sm xl:text-base"
              }`}
              onClick={() => scrollToSection("contact")}
            >
              {t("cta.requestConsultation")}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLanguageSwitch}
              className={`flex items-center gap-2 h-9 ${outlineBtn} ${
                locale === "en" ? "text-xs" : "text-sm"
              }`}
            >
              <span className="font-medium">
                {locale === "en" ? "AR" : "EN"}
              </span>
              <Globe size={16} />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Menu size={24} color="#f3822c" className="cursor-pointer" />
              </SheetTrigger>

              {/* Make sheet look like the header */}
              <SheetContent
                side={locale === "ar" ? "left" : "right"}
                className="w-[88vw] max-w-[400px] bg-[#0d0d0d] text-white border-l border-white/10 p-0"
              >
                {/* Safe-area top spacing */}
                <div className="h-5" />

                <nav className="flex flex-col gap-2 px-4 pb-6">
                  {navItems.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`h-11 flex items-center rounded-md font-semibold transition-colors duration-200 px-4 ${
                        activeSection === id
                          ? "text-[#f3822c] bg-white/5"
                          : "text-white hover:text-[#f3822c]"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                        setOpen(false);
                      }}
                    >
                      {label}
                    </a>
                  ))}

                  {/* Language (mobile) — matches desktop outline */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLanguageSwitch();
                      setOpen(false);
                    }}
                    className={`mt-2 ${outlineBtn} h-10 w-full flex items-center justify-center gap-2`}
                  >
                    <Globe size={18} />
                    <span className="font-medium">
                      {locale === "en" ? "AR" : "EN"}
                    </span>
                  </Button>

                  {/* CTA (mobile) — matches desktop CTA */}
                  <Button
                    className={`mt-2 ${ctaBtn} h-10 w-full`}
                    onClick={() => {
                      scrollToSection("contact");
                      setOpen(false);
                    }}
                  >
                    {t("cta.requestConsultation")}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
