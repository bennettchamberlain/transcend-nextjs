import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // const { accountId, planId } = req.body;

  // TODO: Create Stripe subscription
  // TODO: Store subscription in database
  // TODO: Return checkout session URL

  res.status(200).json({
    success: true,
    checkoutUrl: "https://checkout.stripe.com/temp-subscription-link",
  });
}

