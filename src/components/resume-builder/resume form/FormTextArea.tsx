interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// src/components/ResumeForm/BulletListTextarea.tsx - For handling bullet points
interface BulletListTextareaProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const BulletListTextarea: React.FC<BulletListTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    onChange(lines);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value.join('\n')}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <p className="text-xs text-gray-500 mt-1">
        Each line will be a separate bullet point
      </p>
    </div>
  );
};