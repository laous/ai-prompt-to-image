/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import type { PostType } from "../types/post";
import { downloadImage } from "../utils/helpers";
import download from "../assets/download.png";
import { useState } from "react";

const Card = ({ id, User, prompt, photo, createdAt }: PostType) => {
  const [imageIslazy, setImageIslazy] = useState<boolean>(true);
  const getPostDate = (createdAt: Date) => {
    const today = new Date();
    if (
      createdAt.getDay() === today.getDay() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else if (
      createdAt.getDay() === today.getDay() - 1 &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    ) {
      return "Yesterday";
    }

    return `${createdAt?.getDay()}-${createdAt?.getMonth()}-${createdAt?.getFullYear()}`;
  };
  return (
    <div className="card group relative rounded-xl shadow-card hover:shadow-cardhover">
      <Image
        className={`h-auto w-full rounded-xl object-cover duration-300 ease-out ${
          imageIslazy
            ? "scale-75 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }`}
        src={photo}
        alt={prompt}
        width={400}
        height={400}
        onLoadingComplete={() => setImageIslazy(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-[#10131f] p-4 group-hover:flex">
        <p className="prompt overflow-y-auto text-sm text-white">{prompt}</p>

        <div className="mt-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 object-cover text-xs font-bold text-white">
              {User?.name?.charAt(0)}
            </div>
            <p className="relative text-sm text-white">
              {User?.name}
              <span className="absolute top-4 right-1 text-xs text-gray-300">
                {createdAt && getPostDate(createdAt)}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(String(id), photo)}
            className="border-none bg-transparent outline-none"
          >
            <Image
              src={download}
              alt="download"
              className="h-6 w-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
