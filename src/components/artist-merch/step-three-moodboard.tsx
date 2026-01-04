import { useState } from "react";

import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepThreeMoodboardProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string | File[]) => void;
  errors: Record<string, string>;
}

export function StepThreeMoodboard({ data, onChange, errors }: StepThreeMoodboardProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      onChange("moodboardFiles", fileArray);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Moodboard & Inspiration
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Share your vision! Upload images, describe your aesthetic, and tell us what inspires you.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Describe Your Vision *
          </label>
          <textarea
            required
            rows={4}
            value={data.moodboardDescription || ""}
            onChange={(e) => onChange("moodboardDescription", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.moodboardDescription
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="Describe the aesthetic, colors, themes, and overall vibe you're going for. What kind of energy do you want your merch to convey?"
          />
          {errors.moodboardDescription && <p className="mt-1 text-sm text-red-400">{errors.moodboardDescription}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Upload Reference Images (optional)
          </label>
          <div
            className={`relative rounded border-2 border-dashed p-8 text-center transition-colors ${
              dragActive ? "border-lime-400 bg-lime-400/10" : "border-gray-600 bg-gray-900 hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <div className="space-y-4">
              <div className="text-4xl">📸</div>
              <div>
                <p className="text-lg font-medium text-white" style={{ fontFamily: "Modeseven" }}>
                  Drop images here or click to browse
                </p>
                <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                  Upload photos, album art, or any visual inspiration (PNG, JPG, up to 10MB each)
                </p>
              </div>
            </div>
          </div>

          {data.moodboardFiles && data.moodboardFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
                {data.moodboardFiles.length} file(s) selected
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Inspiration & References (optional)
          </label>
          <textarea
            rows={3}
            value={data.inspiration || ""}
            onChange={(e) => onChange("inspiration", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.inspiration ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="Any artists, brands, or styles that inspire you? Specific color palettes or design elements you love?"
          />
          {errors.inspiration && <p className="mt-1 text-sm text-red-400">{errors.inspiration}</p>}
        </div>
      </div>
    </div>
  );
}
