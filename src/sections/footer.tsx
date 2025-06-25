"use client";

import React, { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setShowSuccess(true);
    setEmail("");

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
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
    svg.setAttribute("height", "66");

    const maxNumberOfHorizontalNoise = Math.round(inputWidth / inputHeight);
    const maxNumberOfVerticalNoise = Math.round(inputHeight / 10 / 2);

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
      rectX: "4",
      rectBorderX: "4",
      rectBorderY: "14",
      noiseColor,
    };

    const commonHorizontalConfig = {
      inputWidth,
      maxNoiseWidth: 8,
      minNoiseWidth: 2,
      noiseWidth: 2,
      rectBorderY: 14,
      noiseColor,
    };

    for (let i = 0; i <= verticalNoiseToGenerateBottom; i++) {
      svg.appendChild(
        createSvg({
          ...commonVerticalConfig,
          noiseWidth: Math.floor(Math.random() * (16 - 4) + 4),
          svgGroupX: Math.floor(Math.random() * (inputWidth - 1) + 1),
          rectY: Math.floor(Math.random() * (16 - 8) + 8),
          svgGroupY: 46,
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
          rectY: Math.floor(Math.random() * (20 - 8) + 8),
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
          rectY: Math.floor(Math.random() * (20 - 12) + 12),
          svgGroupX: 0,
          svgGroupY: Math.floor(Math.random() * (20 - 1) + 1),
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
          rectY: Math.floor(Math.random() * (20 - 12) + 12),
          svgGroupX: inputWidth - 4,
          svgGroupY: Math.floor(Math.random() * (20 - 5) + 5),
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
      inputNoise = e.offsetParent.lastElementChild;
      e.offsetParent.classList.remove("is-focused");
    } else {
      inputNoise = e.lastElementChild;
    }
    if (inputNoise.childNodes[0]) {
      inputNoise.removeChild(inputNoise.childNodes[0]);
    }
  };

  return (
    <footer className="bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-lime-500">TRANSCEND</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Transcend Collective is a group of inviduals that seek a higher calling and purpose to thier lives
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-lime-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  Return Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-lime-400">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  The Story of Transcend
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 transition-colors duration-200 hover:text-lime-400">
                  What Customers Say
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-lime-400">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-400">Keep up...</p>
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
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <span className="editor-field__bottom"></span>
                <div className="editor-field__noise"></div>
              </div>
              {showSuccess && (
                <div className="success-message">
                  <p className="pt-2 text-sm font-semibold tracking-wider text-[#dcff07]">DEALS INCOMING</p>
                </div>
              )}
              <button
                type="submit"
                className="btn btn--primary"
                onMouseOver={(e) => generateNoise(e.target, "button")}
                onMouseOut={(e) => removeNoise(e.target, "button")}
              >
                <div className="btn__container">Subscribe</div>
                <div className="btn__bottom"></div>
                <div className="btn__noise"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">© 2025 Transcend. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-lime-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-lime-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-lime-400">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-lime-400">
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
          height: 64px;
          position: relative;
          margin: 14px 0;
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
            calc(100% - 8px) 0,
            100% 8px,
            100% 100%,
            95% 100%,
            calc(0% + 8px) 100%,
            0% calc(100% - 8px),
            0% calc(100% + 8px)
          );
          border: 2px solid #ffffff;
          width: 100%;
          height: 48px;
          position: absolute;
          bottom: 2px;
        }

        .editor-field__container:before,
        .editor-field__container:after {
          content: "";
          height: 2px;
          width: 11.5px;
          background: #ffffff;
          display: block;
          position: absolute;
          z-index: 1;
          transform: rotate(45deg);
          border-radius: 5px;
        }

        .editor-field__container:before {
          right: -3.1px;
          top: 1.6px;
        }

        .editor-field__container:after {
          left: -3.1px;
          bottom: 1.6px;
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
          width: 32px;
          background: #ffffff;
          right: -29px;
          clip-path: polygon(0 0, calc(100% - 2px) 0%, 100% 100%, 0% 100%);
          bottom: 2px;
        }

        .editor-field__label {
          position: relative;
          display: block;
          height: 16px;
          width: auto;
          background: #ffffff;
          left: 0px;
          color: #0f1020;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.25px;
          font-weight: 600;
          padding: 0 24px 0 16px;
          display: flex;
          align-items: center;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0% 100%);
        }

        .editor-field__input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: #0f1020;
          color: #b3b5d2;
          padding: 8px 16px;
          letter-spacing: 0.2px;
          font-family: inherit;
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
          background: #70719c;
        }

        .editor-field:hover .editor-field__container,
        .editor-field.is-focused .editor-field__container {
          border-color: #70719c;
        }

        .editor-field:hover .editor-field__container:after,
        .editor-field:hover .editor-field__container:before,
        .editor-field.is-focused .editor-field__container:after,
        .editor-field.is-focused .editor-field__container:before {
          background: #70719c !important;
        }

        .editor-field:hover .editor-field__label-container:after,
        .editor-field.is-focused .editor-field__label-container:after {
          background: #70719c;
        }

        .editor-field:hover .editor-field__label,
        .editor-field.is-focused .editor-field__label {
          background: #70719c;
        }

        .btn {
          display: inline-block;
          position: relative;
          height: 50px;
          margin-top: 32px;
          cursor: pointer;
        }

        .btn__noise {
          position: absolute;
          top: -28%;
          height: 66px;
          width: 100%;
          pointer-events: none;
        }

        .btn--primary .btn__container {
          background: #dcff07;
          border-color: rgb(233, 255, 40);
          display: flex;
          align-items: center;
          line-height: 10px;
          pointer-events: none;
          color: #000000;
          height: 100%;
          border: 2px solid;
          padding: 0 24px;
          clip-path: polygon(
            0% 0%,
            calc(100% - 8px) 0,
            100% 8px,
            100% 100%,
            95% 100%,
            calc(0% + 8px) 100%,
            0% calc(100% - 8px),
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
          width: 11px;
          background: #dcff07;
          display: block;
          position: absolute;
          z-index: 1;
          transform: rotate(45deg);
          border-radius: 2px;
        }

        .btn:before {
          right: -1.07px;
          top: 4px;
        }

        .btn:after {
          left: -1.07px;
          bottom: 6px;
        }

        .btn__bottom {
          position: absolute;
          content: "";
          display: block;
          height: 4px;
          width: 50%;
          background: #22c55e;
          pointer-events: none;
          right: 0px;
          bottom: 0px;
          clip-path: polygon(0 0, 100% 0%, 100% 100%, calc(0% + 4px) 100%);
          border-bottom: 2px solid #16a34a;
          border-right: 2px solid #16a34a;
        }

        .btn__bottom:before {
          content: "";
          height: 2px;
          width: 11px;
          background: #16a34a;
          display: block;
          position: absolute;
          left: -5px;
          bottom: 2px;
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

        .noise__el {
          fill: #70719c;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
