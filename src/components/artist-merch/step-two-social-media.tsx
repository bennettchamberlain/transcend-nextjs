import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepTwoSocialMediaProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepTwoSocialMedia({ data, onChange, errors }: StepTwoSocialMediaProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Social Media & Branding
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Help us understand your online presence and brand identity.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Instagram Handle
          </label>
          <div className="flex">
            <span className="inline-flex items-center rounded-l border border-r-0 border-gray-600 bg-gray-800 px-3 text-sm text-gray-400">
              @
            </span>
            <input
              type="text"
              value={data.instagram || ""}
              onChange={(e) => onChange("instagram", e.target.value)}
              className={`w-full rounded-r border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
                errors.instagram ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
              }`}
              style={{ fontFamily: "Modeseven" }}
              placeholder="yourhandle"
            />
          </div>
          {errors.instagram && <p className="mt-1 text-sm text-red-400">{errors.instagram}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Spotify Artist Link (optional)
          </label>
          <input
            type="url"
            value={data.spotify || ""}
            onChange={(e) => onChange("spotify", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.spotify ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="https://open.spotify.com/artist/..."
          />
          {errors.spotify && <p className="mt-1 text-sm text-red-400">{errors.spotify}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Website or Bandcamp Link (optional)
          </label>
          <input
            type="url"
            value={data.website || ""}
            onChange={(e) => onChange("website", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.website ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="https://yourwebsite.com or https://yourband.bandcamp.com"
          />
          {errors.website && <p className="mt-1 text-sm text-red-400">{errors.website}</p>}
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
            💡 <strong>Pro tip:</strong> Including your social media links helps us understand your brand aesthetic and target audience.
          </p>
        </div>
      </div>
    </div>
  );
}
