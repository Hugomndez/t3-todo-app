import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const todosRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ newText: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const Todo = await ctx.prisma.todo.create({
        data: {
          text: input.newText,
        },
      });
      return { success: true, text: Todo };
    }),
  toggle: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
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
        completed: true,
      },
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany();
  }),
});
