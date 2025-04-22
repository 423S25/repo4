// pages/api/search.js
import { listFilesInFolder } from "../../lib/googleDrive";

export default async function handler(req, res) {
  const { query } = req.query;

  console.log("Searching for:", query);

  try {
    // Use our helper function to search within the specific folder
    const files = await listFilesInFolder(query);
    console.log("Search results:", files?.length || 0);

    // Return the search results
    res.status(200).json({ files });
  } catch (error) {
    console.error("Drive API error:", error);
    res.status(500).json({
      error: error.message,
      details: error.errors ? error.errors : null
    });
  }
}