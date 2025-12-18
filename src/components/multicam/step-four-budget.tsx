import type { MulticamIntakeData } from "@site/types/multicam";

interface StepFourProps {
  data: Partial<MulticamIntakeData>;
  onChange: (field: keyof MulticamIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepFourBudget({ data, onChange, errors }: StepFourProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>Budget & Payment</h3>

      <div>
        <label className="mb-2 block text-sm font-medium">Budget Range *</label>
        <select
          value={data.budget || ""}
          onChange={(e) => onChange("budget", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="">Select budget range</option>
          <option value="under-500">Under $500</option>
          <option value="500-1000">$500 - $1,000</option>
          <option value="1000-2500">$1,000 - $2,500</option>
          <option value="2500-5000">$2,500 - $5,000</option>
          <option value="5000-plus">$5,000+</option>
        </select>
        {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Payment Preference *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentPreference"
              value="one-time"
              checked={data.paymentPreference === "one-time"}
              onChange={(e) => onChange("paymentPreference", e.target.value)}
              className="mr-2"
            />
            One-time Payment
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentPreference"
              value="subscription"
              checked={data.paymentPreference === "subscription"}
              onChange={(e) => onChange("paymentPreference", e.target.value)}
              className="mr-2"
            />
            Subscription (Monthly)
          </label>
        </div>
        {errors.paymentPreference && <p className="mt-1 text-sm text-red-400">{errors.paymentPreference}</p>}
      </div>
    </div>
  );
}
