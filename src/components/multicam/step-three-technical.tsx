import type { MulticamIntakeData } from "@site/types/multicam";

interface StepThreeProps {
  data: Partial<MulticamIntakeData>;
  onChange: (field: keyof MulticamIntakeData, value: string | number) => void;
  errors: Record<string, string>;
}

export function StepThreeTechnical({ data, onChange, errors }: StepThreeProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>
        Technical Requirements
      </h3>

      <div>
        <label className="mb-2 block text-sm font-medium">Number of Cameras</label>
        <input
          type="number"
          min="1"
          max="10"
          value={data.numberOfCameras || ""}
          onChange={(e) => onChange("numberOfCameras", Number.parseInt(e.target.value) || 0)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.numberOfCameras && <p className="mt-1 text-sm text-red-400">{errors.numberOfCameras}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Streaming Platform *</label>
        <select
          value={data.streamingPlatform || ""}
          onChange={(e) => onChange("streamingPlatform", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="">Select platform</option>
          <option value="youtube">YouTube</option>
          <option value="twitch">Twitch</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="other">Other</option>
        </select>
        {errors.streamingPlatform && <p className="mt-1 text-sm text-red-400">{errors.streamingPlatform}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Recording Format *</label>
        <select
          value={data.recordingFormat || ""}
          onChange={(e) => onChange("recordingFormat", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="">Select format</option>
          <option value="1080p">1080p</option>
          <option value="4k">4K</option>
          <option value="raw">RAW</option>
        </select>
        {errors.recordingFormat && <p className="mt-1 text-sm text-red-400">{errors.recordingFormat}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Additional Requirements</label>
        <textarea
          value={data.additionalRequirements || ""}
          onChange={(e) => onChange("additionalRequirements", e.target.value)}
          rows={4}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
