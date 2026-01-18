import { useEffect, useRef, useState } from "react";

import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

import { StepFiveAdditional } from "./step-five-additional";
import { StepFourProjectDetails } from "./step-four-project-details";
import { StepOneBasicInfo } from "./step-one-basic-info";
import { StepThreeMoodboard } from "./step-three-moodboard";
import { StepTwoSocialMedia } from "./step-two-social-media";

interface ArtistMerchStepperProps {
  onComplete: (data: ArtistMerchIntakeData) => void;
}

export function ArtistMerchStepper({ onComplete }: ArtistMerchStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ArtistMerchIntakeData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name?.trim())
          newErrors.name = "Name is required";
        if (!formData.artistName?.trim())
          newErrors.artistName = "Artist/project name is required";
        if (!formData.email?.trim())
          newErrors.email = "Email is required";
        else if (!/^[\w.+-]+@[\da-z-]+(?:\.[\da-z-]+)*\.[a-z]{2,}$/i.test(formData.email))
          newErrors.email = "Please enter a valid email address";
        if (!formData.phone?.trim())
          newErrors.phone = "Phone number is required";
        break;
      case 2:
        // Social media is optional
        break;
      case 3:
        if (!formData.moodboardDescription?.trim())
          newErrors.moodboardDescription = "Please describe your vision";
        break;
      case 4:
        if (!formData.projectType)
          newErrors.projectType = "Please select a project type";
        if (!formData.timeline)
          newErrors.timeline = "Please select a timeline";
        if (!formData.budget)
          newErrors.budget = "Please select a budget range";
        break;
      case 5:
        // Additional info is optional
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        // Complete intake
        onComplete(formData as ArtistMerchIntakeData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const updateFormData = (field: keyof ArtistMerchIntakeData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Basic Info";
      case 2:
        return "Social Media";
      case 3:
        return "Moodboard";
      case 4:
        return "Project Details";
      case 5:
        return "Final Details";
      default:
        return `Step ${step}`;
    }
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
                  style={{ fontFamily: "Modeseven" }}
                >
                  {step}
                </div>
                <div className="ml-3 hidden lg:block">
                  <div
                    className={`text-sm ${step <= currentStep ? "text-lime-400" : "text-gray-400"}`}
                    style={{ fontFamily: "Modeseven" }}
                  >
                    {getStepTitle(step)}
                  </div>
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
          <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "Shapiro" }}>
            {getStepTitle(currentStep)}
          </h2>

          {currentStep === 1 && <StepOneBasicInfo data={formData} onChange={updateFormData} errors={errors} />}
          {currentStep === 2 && <StepTwoSocialMedia data={formData} onChange={updateFormData} errors={errors} />}
          {currentStep === 3 && <StepThreeMoodboard data={formData} onChange={updateFormData} errors={errors} />}
          {currentStep === 4 && <StepFourProjectDetails data={formData} onChange={updateFormData} errors={errors} />}
          {currentStep === 5 && <StepFiveAdditional data={formData} onChange={updateFormData} errors={errors} />}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded border border-gray-600 bg-gray-800 px-6 py-2 text-white transition-colors hover:border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: "Modeseven" }}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded bg-lime-400 px-6 py-2 text-black transition-colors hover:bg-lime-300"
            style={{ fontFamily: "Modeseven" }}
          >
            {currentStep === totalSteps ? "Submit Design Request" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
