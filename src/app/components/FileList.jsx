export default function FileList({ files }) {
  return (
    files.length > 0 && (
      <div className="text-sm text-gray-700 mt-2">
        <strong>Selected files:</strong>
        <ul className="list-disc ml-5">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    )
  );
}
