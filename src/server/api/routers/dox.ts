import { z } from "zod";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
  
export const doxRouter = createTRPCRouter({
  createDox: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        password: z.string().optional(),
        expiration: z.number(),
        exposure: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { expiration, exposure, title, password, content } = input;

      let hashedPassword = "";
      if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
      }

      const dox = await ctx.db.dox.create({
        data: {
          title,
          content,
          expiration,
          exposure,
          password: hashedPassword ? `${password}` : "",
          userId: ctx.session.user.id,
        },
      });

      return { dox };
    }),
  getDox: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const dox = await ctx.db.dox.findUnique({
        where: {
          id,
        },
      });

      return { dox: { ...dox, isPasswordProtected: !!dox?.password } };
    }),
  getAllDox: protectedProcedure.query(async ({ input, ctx }) => {
    const { id } = ctx.session.user;

    let doxes = await ctx.db.dox.findMany({
      orderBy: {
        
      },
      where: {
        userId: id,
      },
      select: {
        id: true,
        title: true,
        isPasswordProtected: true,
        exposure: true,
        createdAt: true
      },
    });

    return {
      doxes,
    };
  }),
});
