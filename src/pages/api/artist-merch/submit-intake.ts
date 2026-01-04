import type { NextApiRequest, NextApiResponse } from "next";

import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data: ArtistMerchIntakeData = req.body;

    // Validate required fields
    const requiredFields = ["name", "artistName", "phone", "moodboardDescription", "projectType", "timeline", "budget"];
    const missingFields = requiredFields.filter((field) => !data[field as keyof ArtistMerchIntakeData]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Here you would typically save to a database
    // For now, we'll just log the submission and return success
    // eslint-disable-next-line no-console
    console.log("Artist Merch Intake Submitted:", {
      ...data,
      submittedAt: new Date().toISOString(),
    });

    // TODO: Send confirmation email
    // TODO: Save to database
    // TODO: Create project in design system

    res.status(200).json({
      message: "Artist merch intake submitted successfully",
      data: {
        id: `merch-${Date.now()}`,
        status: "submitted",
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error submitting artist merch intake:", error);
    res.status(500).json({
      message: "Failed to submit artist merch intake",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
