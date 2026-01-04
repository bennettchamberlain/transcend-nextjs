import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepFiveAdditionalProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepFiveAdditional({ data, onChange, errors }: StepFiveAdditionalProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Final Details
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Almost done! Just a few more details to help us serve you better.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Special Requests or Notes (optional)
          </label>
          <textarea
            rows={4}
            value={data.specialRequests || ""}
            onChange={(e) => onChange("specialRequests", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none ${
              errors.specialRequests ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
            placeholder="Any specific requirements, technical needs, or additional details you'd like us to know?"
          />
          {errors.specialRequests && <p className="mt-1 text-sm text-red-400">{errors.specialRequests}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            How did you hear about us? (optional)
          </label>
          <select
            value={data.referralSource || ""}
            onChange={(e) => onChange("referralSource", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white focus:outline-none ${
              errors.referralSource ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
          >
            <option value="">Select how you found us</option>
            <option value="google">Google Search</option>
            <option value="social-media">Social Media</option>
            <option value="friend">Friend or Colleague</option>
            <option value="artist">Another Artist</option>
            <option value="website">Our Website</option>
            <option value="other">Other</option>
          </select>
          {errors.referralSource && <p className="mt-1 text-sm text-red-400">{errors.referralSource}</p>}
        </div>

        <div className="rounded-lg border border-lime-400/30 bg-lime-400/5 p-6">
          <h4 className="mb-3 font-semibold text-lime-400" style={{ fontFamily: "Modeseven" }}>
            What happens next?
          </h4>
          <ul className="space-y-2 text-sm text-gray-300" style={{ fontFamily: "AOMono" }}>
            <li className="flex items-start">
              <span className="mr-2 text-lime-400">✓</span>
              We'll review your submission within 24 hours
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lime-400">✓</span>
              Schedule a free consultation call to discuss your vision
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lime-400">✓</span>
              Receive initial concepts within 1-2 weeks
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lime-400">✓</span>
              Unlimited revisions until you're 100% satisfied
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
