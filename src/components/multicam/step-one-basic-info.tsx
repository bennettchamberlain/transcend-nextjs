import type { MulticamIntakeData } from "@site/types/multicam";

interface StepOneProps {
  data: Partial<MulticamIntakeData>;
  onChange: (field: keyof MulticamIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepOneBasicInfo({ data, onChange, errors }: StepOneProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>
        Basic Information
      </h3>

      <div>
        <label className="mb-2 block text-sm font-medium">Artist Name</label>
        <input
          type="text"
          value={data.artistName || ""}
          onChange={(e) => onChange("artistName", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.artistName && <p className="mt-1 text-sm text-red-400">{errors.artistName}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Phone</label>
        <input
          type="tel"
          value={data.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
      </div>
    </div>
  );
}
