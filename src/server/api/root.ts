import { createTRPCRouter } from "./trpc";
import { postRouter } from "./routers/post";
import { openaiRouter } from "./routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  openai: openaiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
