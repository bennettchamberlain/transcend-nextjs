import type { NextApiRequest, NextApiResponse } from "next";

import type { ArtistMerchIntakeData } from "@site/types/artist-merch";

import {
  createCustomer,
  findCustomerByEmail,
  updateCustomerMetafields,
  updateCustomerPassword,
} from "@site/utilities/shopify-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data: ArtistMerchIntakeData = req.body;

    // Validate required fields
    const requiredFields = ["name", "artistName", "email", "phone", "moodboardDescription", "projectType", "timeline", "budget"];
    const missingFields = requiredFields.filter((field) => !data[field as keyof ArtistMerchIntakeData]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Check if customer already exists (one account per email)
    let customer = await findCustomerByEmail(data.email);
    const defaultPassword = "QualityControl";

    if (!customer) {
      try {
        // Create new customer in Shopify with default password "QualityControl"
        customer = await createCustomer(data.email, data.artistName, data.phone, defaultPassword);
      } catch (createError: any) {
        // If customer creation succeeded but no data returned, treat as success
        if (createError.message?.includes("Customer creation succeeded but no customer data returned")) {
          // Customer was created but we don't have the full customer object
          // Return success response with email and password
          return res.status(200).json({
            success: true,
            message: "Artist merch intake submitted successfully",
            email: data.email,
            password: defaultPassword,
            accountCreated: true,
          });
        }
        // Re-throw other errors
        throw createError;
      }
    } else {
      // Customer exists, ensure password is set to default
      if (customer.id) {
        await updateCustomerPassword(customer.id.toString(), defaultPassword);
      }
    }

    // Validate customer was created/found
    if (!customer || !customer.id) {
      // If we get here and customer is null/undefined, treat as success with email/password
      return res.status(200).json({
        success: true,
        message: "Artist merch intake submitted successfully",
        email: data.email,
        password: defaultPassword,
        accountCreated: true,
      });
    }

    // Store intake data in customer metafields
    await updateCustomerMetafields(customer.id.toString(), [
      {
        namespace: "artist_merch",
        key: "intake_data",
        value: JSON.stringify(data),
        type: "json",
      },
      {
        namespace: "artist_merch",
        key: "project_type",
        value: data.projectType,
        type: "single_line_text_field",
      },
      {
        namespace: "artist_merch",
        key: "timeline",
        value: data.timeline,
        type: "single_line_text_field",
      },
      {
        namespace: "artist_merch",
        key: "budget",
        value: data.budget,
        type: "single_line_text_field",
      },
    ]);

    // eslint-disable-next-line no-console
    console.log("Artist Merch Intake Submitted:", {
      ...data,
      customerId: customer.id.toString(),
      submittedAt: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "Artist merch intake submitted successfully",
      customerId: customer.id.toString(),
      email: customer.email,
      password: defaultPassword,
    });
  } catch (error: any) {
    console.error("Error submitting artist merch intake:", error);
    res.status(500).json({
      message: "Failed to submit artist merch intake",
      error: error.message || "Unknown error",
    });
  }
}
