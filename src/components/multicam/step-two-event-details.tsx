import type { MulticamIntakeData } from "@site/types/multicam";

interface StepTwoProps {
  data: Partial<MulticamIntakeData>;
  onChange: (field: keyof MulticamIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepTwoEventDetails({ data, onChange, errors }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>Event Details</h3>

      <div>
        <label className="mb-2 block text-sm font-medium">Event Name *</label>
        <input
          type="text"
          value={data.eventName || ""}
          onChange={(e) => onChange("eventName", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.eventName && <p className="mt-1 text-sm text-red-400">{errors.eventName}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Event Date *</label>
        <input
          type="date"
          value={data.eventDate || ""}
          onChange={(e) => onChange("eventDate", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.eventDate && <p className="mt-1 text-sm text-red-400">{errors.eventDate}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Event Location *</label>
        <input
          type="text"
          value={data.eventLocation || ""}
          onChange={(e) => onChange("eventLocation", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.eventLocation && <p className="mt-1 text-sm text-red-400">{errors.eventLocation}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Event Duration *</label>
        <input
          type="text"
          placeholder="e.g., 2 hours"
          value={data.eventDuration || ""}
          onChange={(e) => onChange("eventDuration", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.eventDuration && <p className="mt-1 text-sm text-red-400">{errors.eventDuration}</p>}
      </div>
    </div>
  );
}
