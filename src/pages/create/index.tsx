import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import FormField from "../../components/FormField";
import Loader from "../../components/Loader";
import preview from "../../assets/preview.png";
import Head from "next/head";
import { getRandomPrompt } from "../../utils/helpers";

interface FromInputs {
  name: string;
  prompt: string;
  photo: string;
}

const Create = () => {
  const router = useRouter();

  const [form, setForm] = useState<FromInputs>({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: FormEvent) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setForm({ ...form, [e?.target.name]: e?.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt: string = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dalle-arbb.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-arbb.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
        await router.push("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <>
      <Head>
        <title>Create a new post</title>
      </Head>
      <section className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-[32px] font-extrabold text-[#222328]">Create</h1>
          <p className="mt-2 max-w-[500px] text-[14px] text-[#666e75]">
            Generate an imaginative image through DALL-E AI and share it with
            the community
          </p>
        </div>

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Ex., john doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative flex h-64 w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              {form.photo ? (
                <Image
                  src={form.photo}
                  alt={form.prompt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={preview}
                  alt="preview"
                  className="h-9/12 w-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" w-full rounded-md bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[14px] text-[#666e75]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <button
              type="submit"
              className="mt-3 w-full rounded-md bg-[#6469ff] px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Create;
