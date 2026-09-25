import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepSevenAdditionalInfoProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepSevenAdditionalInfo({ data, onChange, errors }: StepSevenAdditionalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Additional Information
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Anything else we should know before we get started?
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Special Requests
          </label>
          <textarea
            rows={6}
            value={data.additionalNotes || ""}
            onChange={(e) => onChange("additionalNotes", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.additionalNotes ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="Any special requests or requirements..."
          />
          {errors.additionalNotes && <p className="mt-1 text-sm text-red-400">{errors.additionalNotes}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            How did you hear about us?
          </label>
          <select
            value={data.howDidYouHear || ""}
            onChange={(e) => onChange("howDidYouHear", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white focus:outline-none ${
              errors.howDidYouHear ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
          >
            <option value="">Select source</option>
            <option value="social-media">Social Media</option>
            <option value="friend">Friend/Colleague</option>
            <option value="search">Search Engine</option>
            <option value="other">Other</option>
          </select>
          {errors.howDidYouHear && <p className="mt-1 text-sm text-red-400">{errors.howDidYouHear}</p>}
        </div>
      </div>
    </div>
  );
}
