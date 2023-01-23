import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const openaiRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        size: z.enum(["1024x1024", "512x512", "256x256"]),
        num_results: z.number().int().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { openai } = ctx;
        const { prompt, size, num_results } = input;
        const response = await openai.createImage({
          prompt: prompt,
          n: num_results || 1,
          size: size || "256x256",
          response_format: "b64_json",
        });
        // console.log("TRPC Response from OpenAI: ", response.data);
        const photo = response?.data?.data[0]?.b64_json;
        return { photo };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw new TRPCError({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          message: String(e?.response.data?.error?.message),
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
