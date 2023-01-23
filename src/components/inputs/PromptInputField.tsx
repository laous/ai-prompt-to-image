import type { FormEvent } from "react";

interface FormFieldProps {
  value: string;
  handleChange: (e: FormEvent) => void;
  handleSurpriseMe?: () => void;
}

const PromptInputField = ({
  value,
  handleChange,
  handleSurpriseMe,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label
          htmlFor="propmt"
          className="block text-sm font-medium text-gray-900"
        >
          Prompt
        </label>
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="rounded-[5px] bg-[#EcECF1] py-1 px-2 text-xs font-semibold text-black"
        >
          Surprise me
        </button>
      </div>
      <input
        type="text"
        id="prompt"
        name="prompt"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-[#6469ff] focus:ring-[#6469ff]"
        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};
export default PromptInputField;
