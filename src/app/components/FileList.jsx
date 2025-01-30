export default function FileList({ files }) {
  if (files.length === 0) return null;

  return (
    <div className="text-sm text-gray-700 mt-2">
      <strong>Selected files:</strong>
      <ul className="list-disc ml-5">
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
