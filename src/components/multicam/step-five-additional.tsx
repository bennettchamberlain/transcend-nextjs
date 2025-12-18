import type { MulticamIntakeData } from "@site/types/multicam";

interface StepFiveProps {
  data: Partial<MulticamIntakeData>;
  onChange: (field: keyof MulticamIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepFiveAdditional({ data, onChange }: StepFiveProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>
        Additional Information
      </h3>

      <div>
        <label className="mb-2 block text-sm font-medium">Special Requests</label>
        <textarea
          value={data.specialRequests || ""}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          rows={6}
          placeholder="Any special requests or requirements..."
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">How did you hear about us?</label>
        <select
          value={data.referralSource || ""}
          onChange={(e) => onChange("referralSource", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="">Select source</option>
          <option value="social-media">Social Media</option>
          <option value="friend">Friend/Colleague</option>
          <option value="search">Search Engine</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}
