import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // TODO: Use formidable or multer to parse multipart form data
    // TODO: Upload file to Shopify Files API or cloud storage (S3, etc.)
    // TODO: Store file metadata in Shopify metafields or database
    // TODO: Return file URL and metadata

    // For now, return a placeholder response
    // In production, you would:
    // 1. Parse the FormData from req
    // 2. Upload to Shopify Files API: POST /admin/api/2024-01/files.json
    // 3. Or upload to cloud storage and get URL
    // 4. Store file reference in customer metafields

    res.status(200).json({
      success: true,
      file: {
        id: `file-${Date.now()}`,
        filename: "uploaded-file.jpg",
        url: "https://storage.example.com/file.jpg", // Replace with actual uploaded file URL
        uploadedAt: new Date().toISOString(),
        uploadedBy: "user@example.com", // Extract from form data
        fileType: "image/jpeg",
        fileSize: 1024,
      },
    });
  } catch (error: any) {
    console.error("File upload error:", error);
    res.status(500).json({
      error: "Failed to upload file",
      message: error.message || "Internal server error",
    });
  }
}

