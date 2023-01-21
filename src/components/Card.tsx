/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import type { PostType } from "../types/post";
import { downloadImage } from "../utils/helpers";
import download from "../assets/download.png";

const Card = ({ id, name, prompt, photo }: PostType) => (
  <div className="card group relative rounded-xl shadow-card hover:shadow-cardhover">
    <img
      className="h-auto w-full rounded-xl  object-cover"
      src={photo}
      alt={prompt}
    />
    <div className="absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-[#10131f] p-4 group-hover:flex">
      <p className="prompt overflow-y-auto text-sm text-white">{prompt}</p>

      <div className="mt-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 object-cover text-xs font-bold text-white">
            {name[0]}
          </div>
          <p className="text-sm text-white">{name}</p>
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

export default Card;
