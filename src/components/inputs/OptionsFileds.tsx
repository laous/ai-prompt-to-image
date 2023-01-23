import type { FormEvent } from "react";

const OptionsFileds = ({
  handleChange,
}: {
  handleChange: (e: FormEvent) => void;
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
      <SizeInputField handleChange={handleChange} />
      {/* <SizeInputField handleChange={handleChange} /> */}
    </div>
  );
};
export default OptionsFileds;

const SizeInputField = ({
  handleChange,
}: {
  handleChange: (e: FormEvent) => void;
}) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      <div className="flex items-center gap-2">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-900"
        >
          Size
        </label>
      </div>
      <select
        id="size"
        name="size"
        required
        onChange={handleChange}
        defaultValue={"256x256"}
        className="bg-gray-30 outline-noe block w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm transition-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      >
        <option key={"256x256"} value={"256x256"}>
          256x256
        </option>
        <option key={"512x512"} value={"512x512"}>
          512x512
        </option>
        <option key={"1024x1024"} value={"1024x1024"}>
          1024x1024
        </option>
      </select>
    </div>
  );
};
