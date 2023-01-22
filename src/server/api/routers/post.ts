import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({ name: z.string(), prompt: z.string(), photo: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, cloudinary, session } = ctx;
      let photoURL;
      try {
        photoURL = await cloudinary.uploader.upload(input.photo);
      } catch (e) {
        throw new TRPCError({
          message: "Photo not uploaded => Post not created",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      const post = await prisma.post.create({
        data: {
          name: session?.user?.name || session.user.id,
          prompt: input.prompt,
          photo: photoURL.url,
          User: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
      if (!post) {
        throw new TRPCError({
          message: "Post not created",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return post;
    }),
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return await prisma.post.findMany();
  }),
});
