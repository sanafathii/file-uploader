"use client";

export default function FileInput({ onFileChange }) {
  return (
    <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all">
      <span className="text-gray-600">Click to select files</span>
      <input
        type="file"
        name="file"
        multiple
        onChange={(e) => onFileChange(e.target.files)}
        className="hidden"
      />
    </label>
  );
}
