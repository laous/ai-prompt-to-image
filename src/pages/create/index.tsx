import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import PromptInputField from "../../components/inputs/PromptInputField";
import Loader from "../../components/Loader";
import preview from "../../assets/preview.png";
import Head from "next/head";
import { getRandomPrompt } from "../../utils/helpers";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import OptionsFileds from "../../components/inputs/OptionsFileds";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";

interface FormInputs {
  prompt: string;
  photo: string;
  size: "1024x1024" | "512x512" | "256x256";
}

const Create = () => {
  const { data, status } = useSession();
  // console.log("Session data: ", data);
  const currentUser = data?.user;

  const router = useRouter();

  const generateImageMutation = api.openai.generateImage.useMutation({
    onSuccess: (data) => {
      setForm({
        ...form,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        photo: `data:image/jpeg;base64,${data?.photo}`,
      });
      setGeneratingImg(false);
    },
  });

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: async () => {
      alert("Success");
      await router.push("/");
      setLoading(false);
    },
  });

  const [form, setForm] = useState<FormInputs>({
    prompt: "",
    photo: "",
    size: "256x256",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonDisabled = loading || generatingImg;

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setForm((state) => ({ ...state, [target.name]: target.value }));
  };

  const handleSurpriseMe = () => {
    const randomPrompt: string = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        generateImageMutation.mutate({
          prompt: form.prompt,
          size: form.size,
          num_results: 1,
        });
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        createPostMutation.mutate({ ...form });
      } catch (err) {
        alert(err);
      }
    } else {
      setLoading(false);
      alert("Please generate an image with proper details");
    }
  };

  const disabledTailwindClass = "cursor-not-allowed opacity-30";

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    void (async () => await router.push("/"))();
    return;
  }

  return (
    <>
      <Head>
        <title>Create a new post</title>
      </Head>
      <section className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-[32px] font-extrabold text-[#222328]">Create</h1>
          <p className="mt-2 max-w-[500px] text-[14px] text-[#666e75]">
            Generate an imaginative image through OpenAI and share it with the
            community!
          </p>
        </div>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <form
          className="mt-16 max-w-3xl"
          onSubmit={handleSubmit}
          name="create-post"
          id="create-post"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="lock text-sm font-medium text-gray-900"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full cursor-not-allowed rounded-lg border border-green-600 bg-green-50 p-2.5 text-sm text-green-600 placeholder-green-700 hover:border-pink-700 hover:text-pink-700 hover:ring-pink-700"
                defaultValue={String(currentUser?.name)}
                disabled={true}
              />
              <p className=" text-center text-xs text-gray-800">
                <span className="font-medium">
                  Name used in your GitHub account.
                </span>
              </p>
            </div>

            <PromptInputField
              value={form.prompt}
              handleChange={handleChange}
              handleSurpriseMe={handleSurpriseMe}
            />
            <OptionsFileds handleChange={handleChange} />

            <div className="relative flex h-64 w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
              {form.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
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
              disabled={buttonDisabled}
              onClick={generateImage}
              className={` w-full rounded-md bg-green-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 sm:w-auto ${
                buttonDisabled ? disabledTailwindClass : ""
              }`}
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
              disabled={buttonDisabled}
              type="submit"
              className={`mt-3 w-full rounded-md bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto ${
                buttonDisabled ? disabledTailwindClass : ""
              }}`}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
