"use client";

import { useState } from "react";
import FileInput from "./FileInput";
import FileList from "./FileList";
import UploadedImages from "./UploadedImages";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");

  const MAX_FILES = 5;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);
    try {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      setUploadedFiles(result.files);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
    } else {
      setError("");
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Upload Images</h1>

      <form onSubmit={onSubmitHandler} className="space-y-4">
        <FileInput onFileChange={handleFileChange} error={error} />
        <FileList files={files} />
        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <UploadedImages uploadedFiles={uploadedFiles} />
    </div>
  );
}
