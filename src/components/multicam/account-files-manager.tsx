import { useState } from "react";

import type { FileAttachment } from "@site/types/multicam";

import { FileUpload } from "./file-upload";

interface AccountFilesManagerProps {
  userEmail: string;
  isAdmin: boolean;
  initialFiles?: FileAttachment[];
}

const EMPTY_ARRAY: FileAttachment[] = [];

export function AccountFilesManager({
  userEmail,
  isAdmin: _isAdmin,
  initialFiles = EMPTY_ARRAY,
}: AccountFilesManagerProps) {
  const [files, setFiles] = useState<FileAttachment[]>(initialFiles);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userEmail", userEmail);

      const response = await fetch("/api/multicam/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      setFiles((prev) => [...prev, result.file]);
    } catch (error) {
      console.error("Upload error:", error);
      // eslint-disable-next-line no-alert
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Are you sure you want to delete this file?")) {
      return;
    }

    setDeletingId(fileId);
    try {
      const response = await fetch(`/api/multicam/delete-file?id=${fileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (error) {
      console.error("Delete error:", error);
      // eslint-disable-next-line no-alert
      alert("Failed to delete file. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold" style={{ fontFamily: "Shapiro" }}>
          Account Files
        </h3>
        <span className="text-sm text-gray-400">{files.length} file(s)</span>
      </div>

      {/* File Upload */}
      <FileUpload step="Account Files" onUpload={handleFileUpload} existingFiles={files} userEmail={userEmail} />

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-400">Your Files</h4>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded border border-gray-700 bg-gray-800 p-4"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{file.filename}</p>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  <span>
                    Uploaded by {file.uploadedBy === userEmail ? "you" : file.uploadedBy} on{" "}
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </span>
                  <span>{file.fileType}</span>
                  <span>{(file.fileSize / 1024).toFixed(2)} KB</span>
                </div>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-lime-400 px-3 py-1 text-sm text-black transition-colors hover:bg-lime-300"
                >
                  View
                </a>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(file.id)}
                  disabled={deletingId === file.id}
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                >
                  {deletingId === file.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-8 text-center">
          <p className="text-gray-400">No files uploaded yet. Upload files using the form above.</p>
        </div>
      )}
    </div>
  );
}
