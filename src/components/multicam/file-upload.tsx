import { useState } from "react";

import type { FileAttachment } from "@site/types/multicam";

interface FileUploadProps {
  step: string;
  onUpload: (file: File) => Promise<void>;
  existingFiles?: FileAttachment[];
  userEmail: string;
}

const EMPTY_FILES_ARRAY: FileAttachment[] = [];

export function FileUpload({ step, onUpload, existingFiles = EMPTY_FILES_ARRAY, userEmail }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);
    try {
      await onUpload(files[0]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">{step}</h4>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragActive ? "border-lime-400 bg-lime-400/10" : "border-gray-600 bg-gray-900"
        }`}
      >
        <input
          type="file"
          id={`file-upload-${step}`}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={uploading}
        />
        <label
          htmlFor={`file-upload-${step}`}
          className={`cursor-pointer ${uploading ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {uploading ? (
            <p className="text-gray-400">Uploading...</p>
          ) : (
            <>
              <p className="mb-2 text-gray-300">Drag and drop files here or click to upload</p>
              <p className="text-sm text-gray-500">Supports images, videos, and documents</p>
            </>
          )}
        </label>
      </div>

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-400">Uploaded Files</h5>
          {existingFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded border border-gray-700 bg-gray-800 p-3"
            >
              <div className="flex-1">
                <p className="text-sm text-white">{file.filename}</p>
                <p className="text-xs text-gray-500">
                  Uploaded by {file.uploadedBy === userEmail ? "you" : file.uploadedBy} on{" "}
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 rounded bg-lime-400 px-3 py-1 text-sm text-black transition-colors hover:bg-lime-300"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
