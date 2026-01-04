import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepFourProjectDetailsProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepFourProjectDetails({ data, onChange, errors }: StepFourProjectDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Project Details
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Tell us more about what you're looking to create and your timeline.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Project Type *
          </label>
          <select
            required
            value={data.projectType || ""}
            onChange={(e) => onChange("projectType", e.target.value as ArtistMerchIntakeData["projectType"])}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white focus:outline-none ${
              errors.projectType ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
          >
            <option value="">Select project type</option>
            <option value="album-art">Album Art & Digital Assets</option>
            <option value="merch-design">Merchandise Design (T-shirts, hoodies, etc.)</option>
            <option value="branding">Full Branding Package</option>
            <option value="other">Other / Custom Project</option>
          </select>
          {errors.projectType && <p className="mt-1 text-sm text-red-400">{errors.projectType}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Timeline *
          </label>
          <select
            required
            value={data.timeline || ""}
            onChange={(e) => onChange("timeline", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white focus:outline-none ${
              errors.timeline ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
          >
            <option value="">Select timeline</option>
            <option value="rush">ASAP (Rush - within 2 weeks)</option>
            <option value="standard">Standard (4-6 weeks)</option>
            <option value="flexible">Flexible (2-3 months)</option>
            <option value="planning">Just planning (3+ months)</option>
          </select>
          {errors.timeline && <p className="mt-1 text-sm text-red-400">{errors.timeline}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Budget Range *
          </label>
          <select
            required
            value={data.budget || ""}
            onChange={(e) => onChange("budget", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white focus:outline-none ${
              errors.budget ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
          >
            <option value="">Select budget range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2500">$1,000 - $2,500</option>
            <option value="2500-5000">$2,500 - $5,000</option>
            <option value="over-5000">Over $5,000</option>
            <option value="discuss">Let's discuss pricing</option>
          </select>
          {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget}</p>}
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
            💰 <strong>Budget note:</strong> Our pricing starts at $299 for basic designs and scales based on complexity
            and usage rights.
          </p>
        </div>
      </div>
    </div>
  );
}
