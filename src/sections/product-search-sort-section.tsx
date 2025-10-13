import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export type SortOption =
  | "best-selling"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc"
  | "created-asc"
  | "created-desc";

interface ProductSearchSortSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

function generateNoise(e: any, type: string) {
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
}

function removeNoise(e: any, type: string) {
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
}

const sortOptions = [
  { value: "best-selling" as const, label: "BEST SELLING" },
  { value: "title-asc" as const, label: "ALPHABETICALLY, A-Z" },
  { value: "title-desc" as const, label: "ALPHABETICALLY, Z-A" },
  { value: "price-asc" as const, label: "PRICE, LOW TO HIGH" },
  { value: "price-desc" as const, label: "PRICE, HIGH TO LOW" },
  { value: "created-desc" as const, label: "NEWEST TO OLDEST" },
  { value: "created-asc" as const, label: "OLDEST TO NEWEST" },
];

export function ProductSearchSortSection({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: ProductSearchSortSectionProps) {
  return (
    <section className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Search Bar */}
        <div className="editor-field editor-field__textbox max-w-md flex-1 pt-12">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Search</label>
          </div>
          <div className="editor-field__container">
            <input
              type="text"
              className="editor-field__input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={(e) => generateNoise(e.target, "input")}
              onBlur={(e) => removeNoise(e.target, "input")}
              placeholder="SEARCH PRODUCTS..."
              style={{ paddingLeft: "48px" }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-50 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-300" aria-hidden="true" />
            </div>
          </div>
          <span className="editor-field__bottom"></span>
          <div className="editor-field__noise"></div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex-shrink-0 pt-4">
          <label htmlFor="sort-select" className="sr-only">
            Sort by
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="block w-full rounded-md border border-gray-700 bg-gray-800 py-2 pr-10 pl-3 text-base leading-5 text-white focus:border-lime-400 focus:ring-1 focus:ring-lime-400 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

        .editor-field__input::placeholder {
          color: #6e6e6e;
          opacity: 1;
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

        .noise__el {
          fill: #70719c;
        }
      `}</style>
    </section>
  );
}
