import React, { useState, useRef, useEffect } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

const ContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowPhone(false);
        setShowEmail(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMainClick = () => {
    setIsOpen(!isOpen);
    setShowPhone(false);
    setShowEmail(false);
  };

  const handlePhoneClick = () => {
    setShowPhone(!showPhone);
    setShowEmail(false);
  };

  const handleEmailClick = () => {
    setShowEmail(!showEmail);
    setShowPhone(false);
  };

  const handleContactSelect = () => {
    setIsOpen(false);
    setShowPhone(false);
    setShowEmail(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
    >
      <button
        className="bg-[#2A4D8A] p-3 rounded-full text-white hover:bg-[#2A4D8A] transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={handleMainClick}
        aria-label="Contact options"
      >
        <MessageCircle
          size={24}
          className={`hover:text-[#FDE68A] transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-16 flex flex-col gap-2 animate-in slide-in-from-left-2 duration-200">
          <div className="relative">
            <button
              className="bg-[#2A4D8A] p-3 rounded-full text-white hover:bg-[#2A4D8A] transition-colors duration-300 shadow-lg"
              onClick={handlePhoneClick}
              aria-label="Phone options"
            >
              <Phone
                size={20}
                className="hover:text-[#FDE68A] transition-colors duration-300"
              />
            </button>

            {showPhone && (
              <div className="absolute left-full ml-2 md:left-12 md:ml-0 top-0 bg-[#2A4D8A] shadow-xl rounded-lg p-3 w-auto min-w-[10rem] border animate-in slide-in-from-left-2 duration-200">
                <h3 className="text-sm font-semibold mb-2 text-left text-[#FDE68A]">
                  Call us
                </h3>
                <ul className="flex flex-col gap-1">
                  <li>
                    <a
                      href="tel:966562704007"
                      className="text-white hover:bg-[#FDE68A] hover:text-[#2A4D8A] hover:rounded px-2 py-1 transition-colors duration-300 text-sm block text-left"
                      dir="ltr"
                      onClick={handleContactSelect}
                    >
                      966 56 270 4007
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:966569765744"
                      className="text-white hover:bg-[#FDE68A] hover:text-[#2A4D8A] hover:rounded px-2 py-1 transition-colors duration-300 text-sm block text-left"
                      dir="ltr"
                      onClick={handleContactSelect}
                    >
                      966 569 765 744
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="bg-[#2A4D8A] p-3 rounded-full text-white hover:bg-[#2A4D8A] transition-colors duration-300 shadow-lg"
              onClick={handleEmailClick}
              aria-label="Email options"
            >
              <Mail
                size={20}
                className="hover:text-[#FDE68A] transition-colors duration-300"
              />
            </button>

            {showEmail && (
              <div className="absolute left-full ml-2 md:left-12 md:ml-0 top-0 bg-[#2A4D8A] shadow-xl rounded-lg p-3 w-auto min-w-[10rem] border animate-in slide-in-from-left-2 duration-200">
                <h3 className="text-sm font-semibold mb-2 text-left text-[#FDE68A]">
                  Email us
                </h3>
                <ul className="flex flex-col gap-1">
                  <li>
                    <a
                      href="mailto:support@gastech.com.sa"
                      className="text-white hover:bg-[#FDE68A] hover:text-[#2A4D8A] hover:rounded px-2 py-1 transition-colors duration-300 text-sm block text-left"
                      dir="ltr"
                      onClick={handleContactSelect}
                    >
                      support@gastech.com.sa
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:m.badr@betech.com.sa"
                      className="text-white hover:bg-[#FDE68A] hover:text-[#2A4D8A] hover:rounded px-2 py-1 transition-colors duration-300 text-sm block text-left"
                      dir="ltr"
                      onClick={handleContactSelect}
                    >
                      m.badr@betech.com.sa
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:ahmed.mousa@betech.com.sa"
                      className="text-white hover:bg-[#FDE68A] hover:text-[#2A4D8A] hover:rounded px-2 py-1 transition-colors duration-300 text-sm block text-left"
                      dir="ltr"
                      onClick={handleContactSelect}
                    >
                      ahmed.mousa@betech.com.sa
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactButtons;
