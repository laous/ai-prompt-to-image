import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({ name: z.string(), prompt: z.string(), photo: z.string() })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      return await prisma.post.create({
        data: {
          name: input.name,
          prompt: input.prompt,
          photo: input.photo,
        },
      });
    }),
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return await prisma.post.findMany();
  }),
});
