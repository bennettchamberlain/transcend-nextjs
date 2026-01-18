import { useState } from "react";

import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

import { ArtistMerchStepper } from "../components/artist-merch/artist-merch-stepper";

export function ArtistMerchIntakeSection() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const handleIntakeComplete = async (data: ArtistMerchIntakeData) => {
    setError(null);

    try {
      const response = await fetch("/api/artist-merch/submit-intake", {
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

      const responseData = await response.json();
      setUserName(data.name);
      setUserEmail(responseData.email || data.email);
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
          <div className="mb-8">
            <div className="text-6xl">🎨</div>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-lime-400" style={{ fontFamily: "Shapiro" }}>
            Thank You, {userName}!
          </h2>
          <p className="mb-6 text-lg text-gray-300" style={{ fontFamily: "AOMono" }}>
            Your artist merch design request has been submitted successfully.
          </p>

          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6 text-left">
            <p className="mb-4 text-gray-300" style={{ fontFamily: "AOMono" }}>
              We will get back to you within 48 hours.
            </p>

            <div className="mb-4 rounded border border-lime-400/50 bg-lime-400/10 p-4">
              <p className="mb-2 text-sm font-medium text-gray-400" style={{ fontFamily: "AOMono" }}>
                Your account credentials:
              </p>
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

            <p className="text-xs text-gray-500" style={{ fontFamily: "AOMono" }}>
              Please save these credentials. You can use them to log in to your artist dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="/artist-dashboard"
              className="inline-block rounded bg-lime-400 px-8 py-3 text-lg font-semibold text-black transition-colors hover:bg-lime-300"
              style={{ fontFamily: "Modeseven" }}
            >
              Go to Dashboard
            </a>

            <p className="text-sm text-gray-400" style={{ fontFamily: "AOMono" }}>
              Questions? Contact us at{" "}
              <a href="mailto:design@transcend.com" className="text-lime-400 hover:underline">
                design@transcend.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-black">
      <ArtistMerchStepper onComplete={handleIntakeComplete} />
      {error && (
        <div className="mx-auto max-w-4xl p-4">
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">{error}</div>
        </div>
      )}
    </section>
  );
}
