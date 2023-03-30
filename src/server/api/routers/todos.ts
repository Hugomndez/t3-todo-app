import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  }),
  add: publicProcedure
    .input(z.object({ newText: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: {
          text: input.newText,
        },
      });
    }),
  toggle: publicProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: input.isCompleted,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
  clear: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.todo.deleteMany({
      where: {
        isCompleted: true,
      },
    });
  }),
});
