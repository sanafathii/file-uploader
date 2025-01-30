export default function FileInput({ onFileChange, error }) {
  return (
    <div>
      <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all">
        <span className="text-gray-600">Click to select files (max 5)</span>
        <input
          type="file"
          name="file"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
      </label>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
