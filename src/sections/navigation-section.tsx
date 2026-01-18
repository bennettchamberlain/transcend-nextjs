import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@shopify/hydrogen-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { clsx, NextLink, useRouter } from "@site/utilities/deps";

const mainMenuItems: { text: string; href: string }[] = [
  {
    text: "PRODUCTS",
    href: "/products",
  },
  {
    text: "COLLECTIONS",
    href: "/collections",
  },
  {
    text: "ARTISTS",
    href: "/artists",
  },
  {
    text: "ABOUT",
    href: "/about",
  },
];

const offers = [
  "30 Day Return Policy",
  "Free Shipping on Orders of $100 or more",
  "Express Delivery in 1 - 2 Business Days",
  "Pickup at Our Silver Lake Location",
];

function TypingEffect() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Cursor animation - faster blink
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 300);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    const currentOffer = offers[currentIndex];

    if (currentText.length < currentOffer.length) {
      // Typing effect
      const timeout = setTimeout(() => {
        setCurrentText(currentOffer.substring(0, currentText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // Wait before erasing - increased to 3 seconds
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentIndex, isTyping]);

  useEffect(() => {
    if (isTyping) {
      return;
    }

    if (currentText.length > 0) {
      // Erasing effect
      const timeout = setTimeout(() => {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // Move to next offer
      const timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentText, isTyping, currentIndex]);

  return (
    <span className="text-xs uppercase" style={{ color: "#dcff07", fontFamily: "AOMono" }}>
      <span className="text-gray-200">C:\</span>
      {currentText}
      <span
        className={`transition-opacity duration-150 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
        style={{ fontFamily: "AOMono" }}
      >
        |
      </span>
    </span>
  );
}

export function NavigationSection() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [showTopBar, setShowTopBar] = useState(true);
const router = useRouter();
const { totalQuantity } = useCart();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Use hysteresis to prevent rapid toggling
          // Show when scrolling up past 30px, hide when scrolling down past 60px
          if (currentScrollY < lastScrollY) {
            // Scrolling up
            if (currentScrollY < 30) {
              setShowTopBar(true);
            }
          } else {
            // Scrolling down
            if (currentScrollY > 60) {
              setShowTopBar(false);
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

function isMenuItemActive(href: string) {
    const { pathname } = new URL(`https://x${href}`);

    return router.pathname.startsWith(pathname);
  }

    return (
    <>
    {/* Top Bar - Sticky at top */}
    <div
    className={clsx(
      "sticky top-0 z-30 h-10 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-in-out",
      showTopBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
    )}
  >
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex h-10 items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-gray-300">
          <TypingEffect />
        </div>
        <div className="hidden items-center space-x-4 text-xs text-gray-300 sm:flex">
          <NextLink
            href="mailto:aaron.transcend@gmail.com"
            className="uppercase transition-colors hover:text-white"
            style={{ fontFamily: "AOMono" }}
          >
            Contact Us
          </NextLink>
          <span className="pb-2">•</span>
          <NextLink
            href="/location"
            className="uppercase transition-colors hover:text-white"
            style={{ fontFamily: "AOMono" }}
          >
            Silver Lake Location
          </NextLink>
        </div>
      </div>
    </div>
  </div>

  {/* Main Navigation - Sticky below top bar */}
  <nav
    className="sticky top-10 z-30 mx-auto flex max-w-7xl items-center justify-between bg-black/80 p-6 backdrop-blur-sm lg:px-8"
    aria-label="Global"
  >
    <div className="flex lg:flex-1">
      <NextLink href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Transcend</span>
        <div className="flex items-center space-x-2">
          <Image
            src="/images/transcend logo website.png"
            alt="Transcend Logo"
            width={300}
            height={100}
            className="h-16 w-auto"
          />
        </div>
      </NextLink>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">
      {mainMenuItems.map(({ text, href }) => (
        <NextLink
          className={clsx(
            "text-sm leading-6 font-semibold text-gray-300 transition-colors duration-200 hover:text-white",
            isMenuItemActive(href) && "text-lime-400",
          )}
          key={href}
          href={href}
        >
          {text}
        </NextLink>
      ))}
    </div>
    <div className="flex flex-1 justify-end">
      <NextLink href="/cart">
        <span className="sr-only">Cart</span>
        <span className="relative inline-block">
          <ShoppingCartIcon className="h-6 w-6" style={{ color: "#dcff07" }}></ShoppingCartIcon>
          {!!totalQuantity && (
            <span
              className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full px-2 py-1 text-xs leading-none font-bold text-black"
              style={{ backgroundColor: "#dcff07" }}
            >
              {totalQuantity}
            </span>
          )}
        </span>
      </NextLink>

      <button
        type="button"
        className="ml-5 inline-flex items-center justify-center rounded-md text-gray-300 transition-colors duration-200 hover:text-white lg:hidden"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <span className="relative inline-block">
          <Bars3Icon className="-mt-1 h-6 w-6" aria-hidden="true" />
        </span>
      </button>
    </div>
  </nav>
  <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
    <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" />
    <DialogPanel className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] fixed top-0 right-0 left-0 z-20 mt-20 transform border-r border-b border-l border-white bg-black shadow-2xl transition-all duration-400 ease-in-out">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-700 p-6">
          <NextLink href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
            <span className="sr-only">Transcend</span>
            <div className="flex items-center space-x-2">
              <Image
                src="/images/transcend logo website.png"
                alt="Transcend Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </div>
          </NextLink>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-300 transition-colors duration-200 hover:bg-gray-800 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="px-6 py-6">
          <div className="space-y-4">
            {mainMenuItems.map(({ text, href }) => (
              <NextLink
                className={clsx(
                  "block rounded-lg px-4 py-3 text-lg font-semibold text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white",
                  isMenuItemActive(href) && "bg-gray-800/50 text-lime-400",
                )}
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {text}
              </NextLink>
            ))}
          </div>

          {/* Mobile-only contact info */}
          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="space-y-3 text-sm text-gray-300">
              <NextLink
                href="mailto:aaron.transcend@gmail.com"
                className="block transition-colors hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </NextLink>
              <NextLink
                href="/location"
                className="block transition-colors hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Silver Lake Location
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
    </>
  );
}
