import { useState } from "react";

import type { MulticamIntakeData } from "@site/types/multicam";

import { IntakeStepper } from "../components/multicam/intake-stepper";

export function MulticamIntakeSection() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleIntakeComplete = async (data: MulticamIntakeData) => {
    setError(null);

    try {
      const response = await fetch("/api/multicam/submit-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit intake");
      }

      setUserEmail(data.email);
      setIsCompleted(true);
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting your intake");
    }
  };

  if (isCompleted) {
    const defaultPassword = "QualityControl";

    return (
      <div className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-lime-400" style={{ fontFamily: "Divine" }}>
            Thank You!
          </h2>
          <p className="mb-6 text-lg text-gray-300" style={{ fontFamily: "Shapiro" }}>
            Your multicam service request has been submitted.
          </p>

          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6 text-left">
            <p className="mb-4 text-gray-300" style={{ fontFamily: "Shapiro" }}>
              An email has been sent to <span className="font-semibold text-white">{userEmail}</span> with your account
              details.
            </p>

            <div className="mb-4 rounded border border-lime-400/50 bg-lime-400/10 p-4">
              <p className="mb-2 text-sm font-medium text-gray-400">You can log in now with:</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-mono text-lime-400">{userEmail}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Password:</span>{" "}
                  <span className="font-mono text-lime-400">{defaultPassword}</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Please save these credentials. You can change your password after logging in.
            </p>
          </div>

          <a
            href="/multicam-dashboard"
            className="inline-block rounded bg-lime-400 px-8 py-3 text-lg font-semibold text-black transition-colors hover:bg-lime-300"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-black">
      <IntakeStepper onComplete={handleIntakeComplete} />
      {error && (
        <div className="mx-auto max-w-4xl p-4">
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">{error}</div>
        </div>
      )}
    </section>
  );
}
