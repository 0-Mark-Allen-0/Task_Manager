//Importing the prisma client from our 'lib' folder
import { prisma } from "@/lib/prisma";
//Import Zod for schema input validation
import { z } from "zod";

//Importing tRPC utilities:
import { router, publicProcedure } from "@/server/trpc";
import { create } from "node:domain";

//Define a new tRPC router for all task operations
export const taskRouter = router({
  //To get all tasks from the database:
  getAll: publicProcedure.query(() => {
    //Prisma's built-in findMany() method will fetch all tasks
    return prisma.task.findMany();
  }),

  //To create a new task:
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        priority: z.enum(["low", "medium", "high"]),
        dueDate: z.string(), //Can be converted into a date object later
      })
    )
    //This procedure will modify the database, hence it is called a mutation
    .mutation(async ({ input }) => {
      //Creating a new task using Prisma
      //Using spread to spread out the input values (title, priority, due date)
      return await prisma.task.create({
        //Default is incomplete
        //userId will be eventually replaced with a real user ID from Next-Auth
        data: {
          ...input,
          dueDate: new Date(input.dueDate),
          completed: false,
          userId: "placeholder-user-id",
        },
      });
    }),
});
