import type { NextApiRequest, NextApiResponse } from "next";

import type { MulticamIntakeData } from "@site/types/multicam";

import {
  createCustomer,
  findCustomerByEmail,
  updateCustomerMetafields,
  updateCustomerPassword,
} from "@site/utilities/shopify-admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const intakeData: MulticamIntakeData = req.body;

    // Validate required fields
    if (!intakeData.email || !intakeData.artistName || !intakeData.projectDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if customer already exists (one account per email)
    let customer = await findCustomerByEmail(intakeData.email);
    const defaultPassword = "QualityControl";

    if (!customer) {
      try {
        // Create new customer in Shopify with default password "QualityControl"
        customer = await createCustomer(intakeData.email, intakeData.artistName, intakeData.phone, defaultPassword);
      } catch (createError: any) {
        // If customer creation succeeded but no data returned, treat as success
        if (createError.message?.includes("Customer creation succeeded but no customer data returned")) {
          // Customer was created but we don't have the full customer object
          // Return success response with email and password
          return res.status(200).json({
            success: true,
            message: "Intake submitted successfully",
            customerId: null,
            email: intakeData.email,
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
        message: "Intake submitted successfully",
        customerId: null,
        email: intakeData.email,
        password: defaultPassword,
        accountCreated: true,
      });
    }

    // Store intake data in customer metafields
    await updateCustomerMetafields(customer.id.toString(), [
      {
        namespace: "multicam",
        key: "intake_data",
        value: JSON.stringify(intakeData),
        type: "json",
      },
      {
        namespace: "multicam",
        key: "project_description",
        value: intakeData.projectDescription,
        type: "single_line_text_field",
      },
      {
        namespace: "multicam",
        key: "event_name",
        value: intakeData.eventName || "",
        type: "single_line_text_field",
      },
      {
        namespace: "multicam",
        key: "event_date",
        value: intakeData.eventDate || "",
        type: "date",
      },
      {
        namespace: "multicam",
        key: "budget",
        value: intakeData.budget || "",
        type: "single_line_text_field",
      },
      {
        namespace: "multicam",
        key: "payment_preference",
        value: intakeData.paymentPreference || "",
        type: "single_line_text_field",
      },
    ]);

    // TODO: Handle file uploads (upload to Shopify Files API or cloud storage)
    // TODO: Create multicam request record
    // TODO: Send confirmation email
    // TODO: Generate login credentials or magic link

    res.status(200).json({
      success: true,
      message: "Intake submitted successfully",
      customerId: customer.id.toString(),
      email: customer.email,
    });
  } catch (error: any) {
    console.error("Intake submission error:", error);
    res.status(500).json({
      error: "Failed to submit intake",
      message: error.message || "Internal server error",
    });
  }
}

