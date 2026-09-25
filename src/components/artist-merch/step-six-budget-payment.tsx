import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

interface StepSixBudgetPaymentProps {
  data: Partial<ArtistMerchIntakeData>;
  onChange: (field: keyof ArtistMerchIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepSixBudgetPayment({ data, onChange, errors }: StepSixBudgetPaymentProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold text-lime-400" style={{ fontFamily: "Modeseven" }}>
          Budget & Payment
        </h3>
        <p className="text-gray-300" style={{ fontFamily: "AOMono" }}>
          Let us know your budget range and how you'd like to handle payment.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Budget Range *
          </label>
          <select
            required
            value={data.budgetPaymentRange || ""}
            onChange={(e) => onChange("budgetPaymentRange", e.target.value)}
            className={`w-full rounded border bg-gray-900 px-4 py-3 text-white focus:outline-none ${
              errors.budgetPaymentRange
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600 focus:border-lime-400"
            }`}
            style={{ fontFamily: "Modeseven" }}
          >
            <option value="">Select budget range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2500">$1,000 - $2,500</option>
            <option value="2500-5000">$2,500 - $5,000</option>
            <option value="5000-plus">$5,000+</option>
          </select>
          {errors.budgetPaymentRange && <p className="mt-1 text-sm text-red-400">{errors.budgetPaymentRange}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300" style={{ fontFamily: "AOMono" }}>
            Payment Preference *
          </label>
          <div className="space-y-2" style={{ fontFamily: "AOMono" }}>
            <label className="flex items-center text-gray-300">
              <input
                type="radio"
                name="paymentPreference"
                value="one-time"
                checked={data.paymentPreference === "one-time"}
                onChange={(e) => onChange("paymentPreference", e.target.value)}
                className="mr-2 accent-lime-400"
              />
              One-time Payment
            </label>
            <label className="flex items-center text-gray-300">
              <input
                type="radio"
                name="paymentPreference"
                value="subscription"
                checked={data.paymentPreference === "subscription"}
                onChange={(e) => onChange("paymentPreference", e.target.value)}
                className="mr-2 accent-lime-400"
              />
              Subscription (Monthly)
            </label>
          </div>
          {errors.paymentPreference && <p className="mt-1 text-sm text-red-400">{errors.paymentPreference}</p>}
        </div>
      </div>
    </div>
  );
}
