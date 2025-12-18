import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  // const { password } = req.body;

  // TODO: Validate credentials
  // TODO: Check database for user
  // TODO: Verify password
  // TODO: Generate session token
  // TODO: Return account data

  res.status(200).json({
    success: true,
    account: {
      id: "temp-id",
      email,
      artistName: "Temp Artist",
      requests: [],
      balance: 0,
      subscriptionActive: false,
    },
    token: "temp-token",
  });
}

