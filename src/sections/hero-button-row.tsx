import { Zap } from "lucide-react";

export function HeroButtonRow() {
  const handleClick = () => {
    console.log("Button clicked, navigating to /products");
    window.location.href = "/products";
  };

  return (
    <section className="relative z-20 flex items-center justify-center">
      <div
        className="group relative flex cursor-pointer items-center justify-center bg-white px-px py-px shadow-lg transition-colors duration-200 hover:bg-gray-100"
        style={{
          clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
        }}
        onClick={handleClick}
      >
        <div
          className="flex items-center justify-center bg-black px-6 py-3 text-lg font-bold text-white transition-colors duration-200 hover:bg-gray-900 hover:underline"
          style={{
            clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
          }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-x-6">
              <Zap className="inline-block h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <p className="text-lg font-bold text-white">ALL PRODUCTS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
