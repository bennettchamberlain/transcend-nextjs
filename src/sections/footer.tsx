"use client";

import React, { useEffect, useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setEmail("");
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrorMessage(data.message || "Failed to subscribe. Please try again.");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setErrorMessage("Network error. Please try again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNoise = (e: any, type: string) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let input, inputNoise, noiseColor;

    if (type === "input") {
      input = e.offsetParent;
      e.parentElement.parentElement.classList.add("is-focused");
      inputNoise = e.parentElement.parentElement.lastElementChild;
      noiseColor = "rgb(112, 113, 156)";
    } else {
      input = e;
      inputNoise = e.lastElementChild;
      noiseColor = "rgb(73, 77, 195)";
    }

    // Clear existing noise elements before creating new ones
    while (inputNoise.firstChild) {
      inputNoise.removeChild(inputNoise.firstChild);
    }

    const inputHeight = input.offsetHeight;
    const inputWidth = input.offsetWidth;

    svg.setAttribute("width", "300");
    svg.setAttribute("height", "48");

    const maxNumberOfHorizontalNoise = Math.round(inputWidth / inputHeight);
    const maxNumberOfVerticalNoise = Math.round(inputHeight / 8 / 2);

    const createSvg = (config: any) => {
      const svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgGroup.setAttribute("x", config.svgGroupX);
      svgGroup.setAttribute("y", config.svgGroupY);

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", config.rectX);
      rect.setAttribute("y", config.rectY);
      rect.setAttribute("width", config.noiseWidth);
      rect.setAttribute("height", config.noiseHeight);
      rect.setAttribute("class", "noise__el");
      svgGroup.appendChild(rect);

      const rectOnBorder = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectOnBorder.setAttribute("x", config.rectBorderX);
      rectOnBorder.setAttribute("y", config.rectBorderY);
      rectOnBorder.setAttribute("width", config.noiseWidth);
      rectOnBorder.setAttribute("height", config.noiseHeight);
      rectOnBorder.setAttribute("fill", "rgb(15, 16, 32)");
      svgGroup.appendChild(rectOnBorder);

      const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animate.setAttribute("attributeType", "CSS");
      animate.setAttribute("attributeName", "opacity");
      animate.setAttribute("id", config.id);
      animate.setAttribute("from", "0");
      animate.setAttribute("to", "1");
      animate.setAttribute("dur", `${Math.random() + 0.1}s`);
      animate.setAttribute("repeatCount", "indefinite");
      animate.setAttribute("begin", `${Math.random() + 0.1}s;${config.id}.end+${Math.random() + 0.1}s`);
      svgGroup.appendChild(animate);
      return svgGroup;
    };

    const verticalNoiseToGenerateBottom = Math.floor(Math.random() * (maxNumberOfHorizontalNoise - 1) + 1);
    const commonVerticalConfig = {
      inputWidth,
      noiseHeight: 2,
      rectX: "3",
      rectBorderX: "3",
      rectBorderY: "10",
      noiseColor,
    };

    const commonHorizontalConfig = {
      inputWidth,
      maxNoiseWidth: 6,
      minNoiseWidth: 2,
      noiseWidth: 2,
      rectBorderY: 10,
      noiseColor,
    };

    for (let i = 0; i <= verticalNoiseToGenerateBottom; i++) {
      svg.appendChild(
        createSvg({
          ...commonVerticalConfig,
          noiseWidth: Math.floor(Math.random() * (16 - 4) + 4),
          svgGroupX: Math.floor(Math.random() * (inputWidth - 1) + 1),
          rectY: Math.floor(Math.random() * (16 - 8) + 8),
          svgGroupY: 34,
          id: `bottom${i}`,
        }),
      );
    }

    const verticalNoiseToGenerateTop = Math.floor(Math.random() * (maxNumberOfHorizontalNoise - 1) + 1);
    for (let i = 0; i <= verticalNoiseToGenerateTop; i++) {
      svg.appendChild(
        createSvg({
          ...commonVerticalConfig,
          noiseWidth: Math.floor(Math.random() * (16 - 4) + 4),
          svgGroupX: Math.floor(Math.random() * (inputWidth - 1) + 1),
          rectY: Math.floor(Math.random() * (16 - 6) + 6),
          svgGroupY: 0,
          id: `top${i}`,
        }),
      );
    }

    for (let i = 0; i <= maxNumberOfVerticalNoise; i++) {
      svg.appendChild(
        createSvg({
          ...commonHorizontalConfig,
          noiseHeight: Math.floor(Math.random() * (8 - 2) + 2),
          rectX: "2",
          rectY: Math.floor(Math.random() * (16 - 10) + 10),
          svgGroupX: 0,
          svgGroupY: Math.floor(Math.random() * (16 - 1) + 1),
          id: `left${i}`,
          rectBorderX: 0,
        }),
      );
    }

    for (let i = 0; i <= maxNumberOfVerticalNoise; i++) {
      svg.appendChild(
        createSvg({
          ...commonHorizontalConfig,
          noiseHeight: Math.floor(Math.random() * (8 - 2) + 2),
          rectX: "0",
          rectY: Math.floor(Math.random() * (16 - 10) + 10),
          svgGroupX: inputWidth - 3,
          svgGroupY: Math.floor(Math.random() * (16 - 3) + 3),
          id: `right${i}`,
          rectBorderX: 2,
        }),
      );
    }

    inputNoise.appendChild(svg);
  };

  const removeNoise = (e: any, type: string) => {
    let inputNoise;
    if (type === "input") {
      // Navigate up to the editor-field container and find the noise element
      const editorField = e.parentElement.parentElement.parentElement;
      inputNoise = editorField.querySelector(".editor-field__noise");
      editorField.classList.remove("is-focused");
    } else {
      inputNoise = e.lastElementChild;
    }
    if (inputNoise && inputNoise.childNodes[0]) {
      inputNoise.removeChild(inputNoise.childNodes[0]);
    }
  };

  // Generate persistent background noise
  const generateBackgroundNoise = () => {
    const footer = document.querySelector("footer");
    if (!footer) {
      return;
    }

    const footerNoise = footer.querySelector(".footer-background-noise");
    if (!footerNoise) {
      return;
    }

    // Clear existing noise
    while (footerNoise.firstChild) {
      footerNoise.removeChild(footerNoise.firstChild);
    }

    const footerHeight = footer.offsetHeight;
    const footerWidth = footer.offsetWidth;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", footerWidth.toString());
    svg.setAttribute("height", footerHeight.toString());

    const createNoiseElement = (x: number, y: number, width: number, height: number, id: string) => {
      const svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgGroup.setAttribute("x", x.toString());
      svgGroup.setAttribute("y", y.toString());

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", "0");
      rect.setAttribute("y", "0");
      rect.setAttribute("width", width.toString());
      rect.setAttribute("height", height.toString());
      rect.setAttribute("class", "noise__el");
      svgGroup.appendChild(rect);

      const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animate.setAttribute("attributeType", "CSS");
      animate.setAttribute("attributeName", "opacity");
      animate.setAttribute("id", id);
      animate.setAttribute("from", "0");
      animate.setAttribute("to", "1");
      animate.setAttribute("dur", `${Math.random() * 2 + 0.5}s`);
      animate.setAttribute("repeatCount", "indefinite");
      animate.setAttribute("begin", `${Math.random() * 1}s;${id}.end+${Math.random() * 1}s`);
      svgGroup.appendChild(animate);

      return svgGroup;
    };

    // Generate noise elements across the entire footer area
    const numberOfNoiseElements = Math.floor((footerWidth * footerHeight) / 2000); // Reduced density for performance

    for (let i = 0; i < numberOfNoiseElements; i++) {
      const x = Math.floor(Math.random() * footerWidth);
      const y = Math.floor(Math.random() * footerHeight);
      const width = Math.floor(Math.random() * 12) + 6;
      const height = Math.floor(Math.random() * 12) + 6;
      const id = `bg-noise-${i}`;

      svg.appendChild(createNoiseElement(x, y, width, height, id));
    }

    footerNoise.appendChild(svg);
  };

  // Generate background noise on component mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      generateBackgroundNoise();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Select photos for footer
  // const footerPhotos = [
  //   "/images/selects/DSC07039-2.jpg",
  //   "/images/selects/Copy of DSC07092-2.jpg",
  //   "/images/selects/DSC08094.jpg",
  //   "/images/selects/DSC07176-2.jpg",
  // ];

  // Background noise effect
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    canvas.width = 200;
    canvas.height = 200;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Generate noise
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 50;
      data[i] = noise; // Red
      data[i + 1] = noise; // Green
      data[i + 2] = noise; // Blue
      data[i + 3] = 30; // Alpha
    }

    ctx.putImageData(imageData, 0, 0);
    const dataURL = canvas.toDataURL();

    // Apply to footer background
    const footer = document.querySelector(".footer-background-noise");
    if (footer) {
      (footer as HTMLElement).style.backgroundImage = `url(${dataURL})`;
      (footer as HTMLElement).style.backgroundRepeat = "repeat";
    }
  }, []);

  return (
    <footer
      className="relative overflow-hidden bg-black bg-[length:90%] px-4 pt-16 pb-16 text-white md:bg-[length:30%]"
      style={{
        backgroundImage: 'url("/images/Transcend 2.0 SYMBOL.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
      }}
    >
      {/* Persistent background noise overlay */}
      <div className="footer-background-noise"></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Select Photos Showcase
        <div className="mb-12">
          <SelectPhotosShowcase
            photos={footerPhotos}
            title="Transcend Moments"
            layout="horizontal"
            showTitle={true}
            className="mb-8"
          />
        </div> */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="lg:col-span-1 lg:pr-14">
            <div className="mb-6">
              <img src="/images/transcend logo website.png" alt="Transcend" className="h-18 w-auto" />
            </div>
            <p className="text-justify text-sm leading-relaxed text-gray-300 uppercase">
              Transcend Collective is a group of individuals that seek a higher calling and purpose to their lives
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 lg:pl-10">
            <h3 className="mb-6 font-[AOMono] font-[Druk] text-lg text-white uppercase">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/products"
                  className="text-sm text-gray-300 uppercase transition-colors duration-200 hover:text-lime-400"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/return-policy"
                  className="text-sm text-gray-300 uppercase transition-colors duration-200 hover:text-lime-400"
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a
                  href="/return-policy"
                  className="text-sm text-gray-300 uppercase transition-colors duration-200 hover:text-lime-400"
                >
                  Return Your Order
                </a>
              </li>
              <li>
                <a
                  href="mailto:aaron.transcend@gmail.com?subject=Transcend%20Collective%20Support%20Request"
                  className="text-sm text-gray-300 uppercase transition-colors duration-200 hover:text-lime-400"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 font-[AOMono] font-[Druk] text-lg text-white uppercase">ABOUT</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-sm text-gray-300 uppercase transition-colors duration-200 hover:text-lime-400"
                >
                  The Story of Transcend
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  className="text-sm text-gray-300 uppercase transition-colors duration-200 hover:text-lime-400"
                >
                  What Customers Say
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 font-[AOMono] font-[Druk] text-lg text-white uppercase">NEWSLETTER</h3>
            <p className="mb-4 text-sm text-gray-300 uppercase">Keep up...</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="editor-field editor-field__textbox">
                <div className="editor-field__label-container">
                  <label className="editor-field__label">Email</label>
                </div>
                <div className="editor-field__container">
                  <input
                    type="email"
                    className="editor-field__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => generateNoise(e.target, "input")}
                    onBlur={(e) => removeNoise(e.target, "input")}
                    placeholder="ENTER YOUR EMAIL"
                    required
                  />
                </div>
                <span className="editor-field__bottom"></span>
                <div className="editor-field__noise"></div>
              </div>
              {showSuccess && (
                <div className="success-message">
                  <p className="pt-2 text-sm font-semibold tracking-wider text-[#dcff07] uppercase">DEALS INCOMING</p>
                </div>
              )}
              {showError && (
                <div className="error-message">
                  <p className="pt-2 text-sm font-semibold tracking-wider text-[#ff0707] uppercase">{errorMessage}</p>
                </div>
              )}
              <button
                type="submit"
                className="btn btn--primary"
                onMouseOver={(e) => generateNoise(e.target, "button")}
                onMouseOut={(e) => removeNoise(e.target, "button")}
                disabled={isLoading}
              >
                <div className="btn__container text-xs uppercase">{isLoading ? "Subscribing..." : "Subscribe"}</div>
                <div className="btn__bottom"></div>
                <div className="btn__noise"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-62 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500 uppercase">© 2025 Transcend. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.tiktok.com/@transcendvisuals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors duration-200 hover:text-lime-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/transcend.collective/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors duration-200 hover:text-lime-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Transcendvisuals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors duration-200 hover:text-lime-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://open.spotify.com/playlist/7boM5g2ZoJQHvFzGQZpjtS?si=f5383223664c4546"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors duration-200 hover:text-lime-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.659-2.34-9.239-2.88-13.561-1.62-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.6 10.561 19.8 13.2c.361.181.54.78.301 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .editor-field {
          width: 100%;
          height: 48px;
          position: relative;
          margin: 10px 0;
        }

        .editor-field__noise {
          position: absolute;
          bottom: -2px;
          width: 100%;
          height: calc(100% + 2px);
          z-index: 2;
          pointer-events: none;
        }

        .editor-field__container {
          clip-path: polygon(
            0% 0%,
            calc(100% - 6px) 0,
            100% 6px,
            100% 100%,
            95% 100%,
            calc(0% + 6px) 100%,
            0% calc(100% - 6px),
            0% calc(100% + 6px)
          );
          border: 2px solid #ffffff;
          width: 100%;
          height: 36px;
          position: absolute;
          bottom: 2px;
        }

        .editor-field__container:before,
        .editor-field__container:after {
          content: "";
          height: 2px;
          width: 9px;
          background: #ffffff;
          display: block;
          position: absolute;
          z-index: 1;
          transform: rotate(45deg);
          border-radius: 4px;
        }

        .editor-field__container:before {
          right: -2.5px;
          top: 1.2px;
        }

        .editor-field__container:after {
          left: -2.5px;
          bottom: 1.2px;
        }

        .editor-field__bottom {
          position: absolute;
          content: "";
          display: block;
          height: 2px;
          width: 30%;
          background: #ffffff;
          right: 0px;
          clip-path: polygon(0 0, 100% 0%, 100% 100%, calc(0% + 2px) 100%);
          bottom: 0px;
        }

        .editor-field__label-container {
          position: absolute;
          top: 0px;
        }

        .editor-field__label-container:after {
          position: absolute;
          content: "";
          display: block;
          height: 2px;
          width: 24px;
          background: #ffffff;
          right: -22px;
          clip-path: polygon(0 0, calc(100% - 2px) 0%, 100% 100%, 0% 100%);
          bottom: 2px;
        }

        .editor-field__label {
          position: relative;
          display: block;
          height: 14px;
          width: auto;
          background: #ffffff;
          left: 0px;
          color: #0f1020;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          padding: 0 18px 0 12px;
          display: flex;
          align-items: center;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0% 100%);
        }

        .editor-field__input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: rgb(0, 0, 0);
          color: #b3b5d2;
          padding: 6px 12px;
          letter-spacing: 0.2px;
          font-family: inherit;
          font-size: 14px;
        }

        .editor-field__input:focus {
          animation: 0.05s infinite alternate blink;
        }

        @keyframes blink {
          from {
            background: #0f1020;
          }
          to {
            background: #151830;
          }
        }

        .editor-field:hover .editor-field__bottom,
        .editor-field.is-focused .editor-field__bottom {
          background: #dcff07;
        }

        .editor-field:hover .editor-field__container,
        .editor-field.is-focused .editor-field__container {
          border-color: #dcff07;
        }

        .editor-field:hover .editor-field__container:after,
        .editor-field:hover .editor-field__container:before,
        .editor-field.is-focused .editor-field__container:after,
        .editor-field.is-focused .editor-field__container:before {
          background: #dcff07 !important;
        }

        .editor-field:hover .editor-field__label-container:after,
        .editor-field.is-focused .editor-field__label-container:after {
          background: #dcff07;
        }

        .editor-field:hover .editor-field__label,
        .editor-field.is-focused .editor-field__label {
          background: #dcff07;
        }

        .btn {
          display: inline-block;
          position: relative;
          height: 32px;
          margin-top: 22px;
          cursor: pointer;
        }

        .btn__noise {
          position: absolute;
          top: -28%;
          height: 44px;
          width: 100%;
          pointer-events: none;
        }

        .btn--primary .btn__container {
          background: #dcff07;
          border-color: rgb(233, 255, 40);
          display: flex;
          align-items: center;
          line-height: 4px;
          pointer-events: none;
          color: #000000;
          height: 100%;
          border: 2px solid;
          padding: 0 8px;
          clip-path: polygon(
            0% 0%,
            calc(100% - 6px) 0,
            100% 6px,
            100% 100%,
            95% 100%,
            calc(0% + 6px) 100%,
            0% calc(100% - 6px),
            0% 20%
          );
        }

        .btn--primary:hover .btn__container {
          background: #dcff07;
          border-color: rgb(174, 194, 24);
        }

        .btn--primary:hover .btn__bottom {
          background: #dcff07;
          border-color: rgb(172, 210, 57);
        }

        .btn--primary:active .btn__container {
          background: #dcff07;
          border-color: #dcff07;
          color: #dcfce7;
        }

        .btn--primary:active .btn__bottom {
          background: #dcff07;
          border-color: #dcff07;
        }

        .btn:before,
        .btn:after {
          content: "";
          height: 2px;
          width: 9px;
          background: #dcff07;
          display: block;
          position: absolute;
          z-index: 1;
          transform: rotate(45deg);
          border-radius: 2px;
        }

        .btn:before {
          right: -0.8px;
          top: 3px;
        }

        .btn:after {
          left: -0.8px;
          bottom: 5px;
        }

        .btn__bottom {
          position: absolute;
          content: "";
          display: block;
          height: 3px;
          width: 50%;
          background: #22c55e;
          pointer-events: none;
          right: 0px;
          bottom: 0px;
          clip-path: polygon(0 0, 100% 0%, 100% 100%, calc(0% + 3px) 100%);
          border-bottom: 2px solid #16a34a;
          border-right: 2px solid #16a34a;
        }

        .btn__bottom:before {
          content: "";
          height: 2px;
          width: 9px;
          background: #16a34a;
          display: block;
          position: absolute;
          left: -4px;
          bottom: 1px;
          z-index: 1;
          transform: rotate(45deg);
        }

        .success-message {
          margin-top: 8px;
          padding: 8px 12px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 4px;
        }

        .error-message {
          margin-top: 8px;
          padding: 8px 12px;
          background: rgba(255, 7, 7, 0.1);
          border: 1px solid rgba(255, 7, 7, 0.3);
          border-radius: 4px;
        }

        .noise__el {
          fill: #70719c;
        }

        .footer-background-noise {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          footer {
            background-position: center calc(100% - 170px) !important;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
