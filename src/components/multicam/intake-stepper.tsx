import { useEffect, useRef, useState } from "react";

import type { MulticamIntakeData } from "@site/types/multicam";

import { StepFiveAdditional } from "./step-five-additional";
import { StepFourBudget } from "./step-four-budget";
import { StepOneBasicInfo } from "./step-one-basic-info";
import { StepThreeTechnical } from "./step-three-technical";
import { StepTwoProjectDescription } from "./step-two-project-description";

interface IntakeStepperProps {
  onComplete: (data: MulticamIntakeData) => void;
}

export function IntakeStepper({ onComplete }: IntakeStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MulticamIntakeData>>({});
  const stepperRef = useRef<HTMLDivElement>(null);

  const totalSteps = 5;

  // Scroll stepper on mobile when moving past step 3
  useEffect(() => {
    if (currentStep > 3 && stepperRef.current) {
      const stepElement = stepperRef.current.children[currentStep - 1] as HTMLElement;
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentStep]);

  const validateStep = (_step: number): boolean => {
    // TODO: Implement step validation
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete intake
        onComplete(formData as MulticamIntakeData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof MulticamIntakeData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Stepper Progress */}
      <div className="border-b border-white/20 bg-black/80 p-6">
        <div className="mx-auto max-w-4xl">
          <div
            ref={stepperRef}
            className="scrollbar-hide flex items-center overflow-x-auto lg:justify-between"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex min-w-fit flex-shrink-0 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step <= currentStep ? "border-lime-400 bg-lime-400 text-black" : "border-gray-600 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < totalSteps && (
                  <div className={`h-1 w-12 lg:w-24 ${step < currentStep ? "bg-lime-400" : "bg-gray-600"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mx-auto max-w-4xl p-8">
        <div className="min-h-[400px]">
          <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "Divine" }}>
            Step {currentStep} of {totalSteps}
          </h2>

          {currentStep === 1 && <StepOneBasicInfo data={formData} onChange={updateFormData} errors={{}} />}
          {currentStep === 2 && <StepTwoProjectDescription data={formData} onChange={updateFormData} errors={{}} />}
          {currentStep === 3 && <StepThreeTechnical data={formData} onChange={updateFormData} errors={{}} />}
          {currentStep === 4 && <StepFourBudget data={formData} onChange={updateFormData} errors={{}} />}
          {currentStep === 5 && <StepFiveAdditional data={formData} onChange={updateFormData} errors={{}} />}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>
                Review & Submit
              </h3>
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
                <p className="mb-4 text-gray-300">Please review your information before submitting.</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-500">Artist:</span> {formData.artistName}
                  </p>
                  <p>
                    <span className="text-gray-500">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="text-gray-500">Event:</span> {formData.eventName}
                  </p>
                  <p>
                    <span className="text-gray-500">Date:</span> {formData.eventDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded bg-gray-700 px-6 py-2 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded bg-lime-400 px-6 py-2 text-black transition-colors hover:bg-lime-300"
          >
            {currentStep === totalSteps ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
