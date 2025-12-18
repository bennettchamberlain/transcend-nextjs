import type { NextApiRequest, NextApiResponse } from "next";

import type { FileAttachment } from "@site/types/multicam";

import { findCustomerByEmail } from "@site/utilities/shopify-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // TODO: Fetch customer from Shopify
    // TODO: Get files from customer metafields or separate file storage
    // TODO: Return list of FileAttachment objects

    const customer = await findCustomerByEmail(email);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // TODO: Fetch files from metafields
    const files: FileAttachment[] = [];

    res.status(200).json({
      success: true,
      files,
    });
  } catch (error: any) {
    console.error("Get files error:", error);
    res.status(500).json({
      error: "Failed to fetch files",
      message: error.message || "Internal server error",
    });
  }
}

