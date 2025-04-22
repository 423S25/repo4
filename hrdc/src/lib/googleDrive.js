import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Create a reusable Google Drive client using a service account
export function getDriveClient() {
  const client = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });

  return google.drive({ version: 'v3', auth: client });
}

// Helper function to list files in a specific folder
export async function listFilesInFolder(query = null) {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  console.log("Using folder ID:", folderId);

  let searchQuery = `'${folderId}' in parents and trashed = false`;

  if (query && query !== "*") {
    searchQuery = `'${folderId}' in parents and name contains '${query}' and trashed = false`;
    console.log("Using simplified name-only search");
  }

  console.log("Search query:", searchQuery);

  try {
    const response = await drive.files.list({
      q: searchQuery,
      fields: "files(id, name, mimeType, webViewLink, iconLink, thumbnailLink)",
      spaces: "drive",
      pageSize: 100,
    });

    console.log("API response received");

    // Log the actual files received
    if (response.data.files && response.data.files.length > 0) {
      console.log("Files found:", response.data.files.map(f => f.name));
    } else {
      console.log("No files found matching query");
    }

    return response.data.files || [];
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
}

export default {
  getDriveClient,
  listFilesInFolder
};