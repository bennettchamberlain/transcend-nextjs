import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepOneBasicInfoProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepOneBasicInfo({ data, onChange, errors }: StepOneBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Basic Information
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Let's start with some basic details about you and your project.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={data.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.name ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Artist/Project Name *
          </label>
          <input
            type="text"
            required
            value={data.artistName || ""}
            onChange={(e) => onChange("artistName", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.artistName ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="Your artist name or project name"
          />
          {errors.artistName && <p className="mt-1 text-sm text-red-400">{errors.artistName}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={data.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}
