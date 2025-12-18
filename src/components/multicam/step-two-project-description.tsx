import type { MulticamIntakeData } from "@site/types/multicam";

interface StepTwoProps {
  data: Partial<MulticamIntakeData>;
  onChange: (field: keyof MulticamIntakeData, value: string) => void;
  errors: Record<string, string>;
}

export function StepTwoProjectDescription({ data, onChange, errors }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>
        Project Description
      </h3>

      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={data.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        <p className="mt-1 text-xs text-gray-500">This email will be used for your account login</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Project Description</label>
        <textarea
          value={data.projectDescription || ""}
          onChange={(e) => onChange("projectDescription", e.target.value)}
          rows={8}
          placeholder="Describe your DJ set project, vision, style, and any specific requirements..."
          className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
        />
        {errors.projectDescription && <p className="mt-1 text-sm text-red-400">{errors.projectDescription}</p>}
      </div>
    </div>
  );
}
