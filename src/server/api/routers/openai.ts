import { TRPCError } from "@trpc/server";
import Error from "next/error";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const openaiRouter = createTRPCRouter({
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { openai } = ctx;
        const { prompt } = input;
        const response = await openai.createImage({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
        });
        const photo = response.data.data[0].b64_json;
        return { photo };
      } catch (e: any) {
        throw new TRPCError({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: String(e?.response.data?.error?.message),
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
