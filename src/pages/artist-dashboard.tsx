import { useState } from "react";

import type { FileAttachment, MulticamRequest, WorkflowStep } from "@site/types/multicam";

import { AccountFilesManager } from "@site/components/multicam/account-files-manager";
import { JuiceBarProgress } from "@site/components/multicam/juice-bar-progress";
import Footer from "@site/sections/footer";
import { NavigationSection } from "@site/sections/navigation-section";

export default function ArtistDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFiles, setUserFiles] = useState<FileAttachment[]>([]);

  // TODO: Fetch from API/Shopify
  const mockRequest: MulticamRequest = {
    id: "req-1",
    createdAt: new Date().toISOString(),
    status: "in-progress",
    intakeData: {
      artistName: "Test Artist",
      email: "test@example.com",
      phone: "123-456-7890",
      projectDescription: "Test project description for multicam DJ set recording",
      eventName: "Test Event",
      eventDate: "2024-12-31",
      eventLocation: "Test Location",
      eventDuration: "2 hours",
      numberOfCameras: 3,
      streamingPlatform: "youtube",
      recordingFormat: "4k",
      additionalRequirements: "",
      budget: "1000-2500",
      paymentPreference: "one-time",
      specialRequests: "",
      referralSource: "social-media",
    },
    quote: 2000,
    balance: 500,
    currentStep: "intake" as WorkflowStep,
    steps: [
      { step: "intake", completed: true },
      { step: "consultation", completed: false },
      { step: "shoot", completed: false },
      { step: "post", completed: false },
      { step: "delivery", completed: false },
    ],
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication
    setIsAuthenticated(true);
    // TODO: Fetch user files from API
    // For now using mock data
    setUserFiles([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavigationSection />
        <div className="mx-auto max-w-md p-8">
          <h1 className="mb-6 text-3xl font-bold">Artist Dashboard</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-gray-600 bg-black px-4 py-2 text-white focus:border-lime-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-lime-400 px-6 py-2 text-black transition-colors hover:bg-lime-300"
            >
              Login
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationSection />
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Artist Dashboard</h1>

        {/* Account Balance */}
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Account Balance</h2>
          <p className="text-3xl font-bold text-lime-400">$0.00</p>
          <p className="mt-2 text-sm text-gray-400">Pay via Stripe link or manage subscription</p>
        </div>

        {/* Subscription Status */}
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Subscription</h2>
          <p className="mb-4 text-gray-300">No active subscription</p>
          <button type="button" className="rounded bg-lime-400 px-6 py-2 text-black transition-colors hover:bg-lime-300">
            Subscribe Now
          </button>
        </div>

        {/* Account Files */}
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6">
          <AccountFilesManager userEmail={email} isAdmin={false} initialFiles={userFiles} />
        </div>

        {/* Multicam Requests */}
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h2 className="mb-6 text-xl font-semibold">Your Multicam Requests</h2>

          {/* Juice Bar Progress */}
          <div className="mb-6">
            <JuiceBarProgress currentStep={mockRequest.currentStep} steps={mockRequest.steps} />
          </div>

          {/* Request Details */}
          <div className="space-y-4">
            <div className="rounded border border-gray-700 bg-black p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{mockRequest.intakeData.eventName}</h3>
                <span className="rounded bg-lime-400/20 px-2 py-1 text-xs text-lime-400">{mockRequest.status}</span>
              </div>
              <p className="text-sm text-gray-400">Created: {new Date(mockRequest.createdAt).toLocaleDateString()}</p>
              <p className="mt-2 text-sm text-gray-300">Quote: ${mockRequest.quote?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
