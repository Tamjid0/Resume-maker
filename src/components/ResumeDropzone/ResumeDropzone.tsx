import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setResume } from '../../store/resumeSlice';
import { parseResumeFromPdf } from '../../lib/parseresumefrom-pdf';
import { Upload, FileText, X, Loader } from 'lucide-react';

interface ResumeDropzoneProps {
  onClose: () => void;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resumeData = await parseResumeFromPdf(file);
      dispatch(setResume(resumeData));
      onClose();
    } catch (err) {
      setError('Failed to parse PDF. Please try with a different file.');
      console.error('PDF parsing error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, onClose]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Import Resume from PDF</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-sm text-gray-600">Parsing your resume...</p>
            <p className="text-xs text-gray-500 mt-1">This may take a few seconds</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <Upload className="text-gray-400" size={48} />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your resume here
              </p>
              <p className="text-sm text-gray-600 mb-4">
                or click to browse for a PDF file
              </p>
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="resume-file-input"
                disabled={isLoading}
              />
              <label
                htmlFor="resume-file-input"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 cursor-pointer"
              >
                <FileText size={16} />
                Choose PDF File
              </label>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p className="mb-2">Supported format: PDF</p>
              <p>The parser will extract text and attempt to organize it into resume sections.</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};