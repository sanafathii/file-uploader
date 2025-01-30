export default function UploadedImages({ uploadedFiles }) {
  if (uploadedFiles.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Uploaded Images:</h2>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {uploadedFiles.map((file, index) => (
          <img
            key={index}
            src={file}
            alt={`Uploaded ${index}`}
            className="w-20 h-20 object-cover rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
