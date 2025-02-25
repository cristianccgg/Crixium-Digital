import React, { useRef } from "react";
import { Upload, File } from "lucide-react";

const SimpleFileUploadComponent = ({
  files,
  setFiles,
  label,
  description,
  acceptTypes = ".pdf,.doc,.docx,.txt,.mp3,.jpg,.jpeg,.png",
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label || "Referencias o Documentos"}
      </label>
      <p className="text-sm text-gray-500 mb-3">
        {description ||
          "Adjunta referencias o detalles relevantes para tu proyecto"}
      </p>

      <div className="mt-2 flex flex-col gap-3">
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <Upload className="text-gray-400 mb-2" size={24} />
          <p className="text-sm text-gray-500">
            Haz clic para subir archivos o arrastra aquí
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, DOC, TXT, Imágenes, MP3 (máx 10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept={acceptTypes}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-3 space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <File size={16} className="text-gray-500" />
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.name)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleFileUploadComponent;
