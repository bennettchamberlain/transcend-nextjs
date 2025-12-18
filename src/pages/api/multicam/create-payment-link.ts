import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // const { amount, accountId, requestId } = req.body;

  // TODO: Create Stripe payment link
  // TODO: Store payment link in database
  // TODO: Return payment link URL

  res.status(200).json({
    success: true,
    paymentLink: "https://checkout.stripe.com/temp-link",
  });
}

