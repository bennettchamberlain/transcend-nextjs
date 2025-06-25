import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@shopify/hydrogen-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { clsx, NextLink, useRouter } from "@site/utilities/deps";

const mainMenuItems: { text: string; href: string }[] = [
  {
    text: "Products",
    href: "/products",
  },
  {
    text: "Collections",
    href: "/collections",
  },
];

const offers = [
  "30 Day Return Policy",
  "Free Shipping on Orders of $150 or more",
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
    <span className="font-mono text-xs" style={{ color: "#dcff07" }}>
      <span className="text-gray-200">C:\</span>
      {currentText}
      <span className={`transition-opacity duration-150 ${cursorVisible ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
}

export function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const router = useRouter();
  const { totalQuantity } = useCart();

  useEffect(() => {
    const _lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowTopBar(currentScrollY < 50); // Show top bar when scrolled less than 50px
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
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black shadow-sm">
      {/* Top Bar */}
      <div
        className={clsx(
          "bg-black transition-all duration-300 ease-in-out",
          showTopBar ? "h-10 opacity-100" : "h-0 overflow-hidden opacity-0",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <TypingEffect />
            </div>
            <div className="flex hidden items-center space-x-4 text-xs text-gray-400 sm:flex">
              <NextLink href="mailto:aaron.transcend@gmail.com" className="transition-colors hover:text-white">
                Contact Us
              </NextLink>
              <span>•</span>
              <NextLink href="/location" className="transition-colors hover:text-white">
                Silver Lake Location
              </NextLink>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NextLink href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Transcend</span>
            <div className="flex items-center space-x-2">
              <Image src="/images/logo-white.png" alt="Transcend Logo" width={32} height={32} className="h-8 w-10" />
              {/* <Image
                src="/images/transcend-text.png"
                alt="Transcend"
                width={120}
                height={24}
                className="h-8 w-auto brightness-0 invert"
              /> */}
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
              <ShoppingCartIcon className="h-6 w-6 text-white"></ShoppingCartIcon>
              {!!totalQuantity && (
                <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs leading-none font-bold text-red-100">
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
        <DialogPanel className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] fixed top-0 right-0 left-0 z-20 mt-4 transform border-r border-b border-l border-white bg-black shadow-2xl transition-all duration-400 ease-in-out">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-700 p-6">
              <NextLink href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Transcend</span>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/logo-white.png"
                    alt="Transcend Logo"
                    width={32}
                    height={32}
                    className="h-8 w-10"
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
                <div className="space-y-3 text-sm text-gray-400">
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
    </header>
  );
}
