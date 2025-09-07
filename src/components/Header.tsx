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
      "units",
      "about",
      "standards",
      "why-us",
      "packages",
      "why-company",
      "partners",
      "contact",
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

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsAutoScrolling(false);
      }, 800);
    }
  };

  const handleLanguageSwitch = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    { id: "units", label: t("nav.units") },
    { id: "about", label: t("nav.about") },
    // { id: "standards", label: t("nav.standards") },
    // { id: "why-us", label: t("nav.whyUs") },
    // { id: "packages", label: t("nav.packages") },
    { id: "why-company", label: t("nav.whyCompany") },
    // { id: "partners", label: t("nav.partners") },
    { id: "footer", label: t("nav.contact") },
  ];

  return (
    <header className="bg-[#0d0d0d] shadow-sm sticky top-0 z-50 w-full">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
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
              src="/Be-Tech.svg"
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
                className={`font-semibold transition-colors duration-200 capitalize ${locale === "en" && "desktop-en"} ${
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

          <div className="hidden lg:flex items-center gap-3">
            <Button
              className={`bg-[#f3822c] hover:bg-[#d66f25] text-[#0d0d0d] px-6 py-2 rounded-md font-medium desktop ${
                locale === "en" ? "text-xs xl:text-sm" : "text-sm xl:text-base"
              }`}
              onClick={() => scrollToSection("contact")}
            >
              {t("cta.requestConsultation")}
            </Button>

            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLanguageSwitch}
              className={`flex items-center gap-2 border-[#f3822c] text-[#f3822c] hover:bg-[#d66f25] hover:text-[#0d0d0d] transition-colors duration-200 h-9 ${
                locale === "en" ? "text-xs" : "text-sm"
              }`}
            >
              <span className="font-medium">
                {locale === "en" ? "AR" : "EN"}
              </span>
              <Globe size={16} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Menu size={24} color="#2A4D8A" className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col mt-8 gap-2">
                  {navItems.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`h-10 flex items-center px-4 rounded-md font-medium transition-colors duration-200 text-lg ${
                        activeSection === id
                          ? "text-[#2A4D8A] bg-blue-100 font-semibold"
                          : "text-gray-700 hover:text-[#2A4D8A] hover:bg-gray-100"
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

                  {/* Mobile Language Switcher */}
                  <Button
                    variant="outline"
                    onClick={handleLanguageSwitch}
                    className={`flex items-center justify-center gap-2 h-9 border-[#2A4D8A] text-[#2A4D8A] hover:bg-[#2A4D8A] hover:text-white transition-colors duration-200 text-base`}
                  >
                    <Globe size={18} />
                    <span className="font-medium">{locale.toUpperCase()}</span>
                  </Button>

                  <Button
                    className={`bg-[#2A4D8A] hover:bg-blue-900 text-white px-6 py-2 rounded-md font-medium ${
                      locale === "en"
                        ? "text-xs xl:text-sm"
                        : "text-sm xl:text-base"
                    }`}
                    onClick={() => scrollToSection("contact")}
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
