import { z } from "zod";
import bcrypt from "bcrypt";
import ShortUniqueId from "short-unique-id";

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

      // custom path id that is used to create shareable link
      const pathId = new ShortUniqueId({ length: 8 }).rnd();

      let hashedPassword = "";
      if (password) {
        hashedPassword = await bcrypt.hash(password, 12);
      }

      const dox = await ctx.db.dox.create({
        data: {
          title,
          content,
          pathId,
          expiration: expiration === 0 ? null : expiration,
          exposure,
          isPasswordProtected: hashedPassword.length > 0 ? true : false,
          password: hashedPassword ? `${password}` : "",
          userId: ctx.session.user.id,
        },
      });

      return { dox };
    }),
  getDox: protectedProcedure
    .input(
      z.object({
        pathId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { pathId } = input;

      const dox = await ctx.db.dox.findUnique({
        where: {
          pathId,
        },
      });

      return { dox };
    }),
  getAllDox: protectedProcedure.query(async ({ input, ctx }) => {
    const { id } = ctx.session.user;

    let doxes = await ctx.db.dox.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: id,
      },
      select: {
        id: true,
        title: true,
        isPasswordProtected: true,
        exposure: true,
        createdAt: true,
        expiration: true,
        pathId: true,
      },
    });

    return {
      doxes,
    };
  }),
  deleteDox: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const userId = ctx.session.user.id;

      try {
        const result = await ctx.db.dox.delete({
          where: {
            id,
            userId,
          },
        });
        return { result };
      } catch (err) {
        throw new Error("Cannot delete the dox");
      }
    }),
});
