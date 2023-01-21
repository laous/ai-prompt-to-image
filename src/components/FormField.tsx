import type { FormEvent } from "react";

interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: FormEvent) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: FormFieldProps) => (
  <div>
    <div className="mb-2 flex items-center gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="rounded-[5px] bg-[#EcECF1] py-1 px-2 text-xs font-semibold text-black"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-[#6469ff] focus:ring-[#6469ff]"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
