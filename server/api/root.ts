//Import the custom router configuration and our taskRouter with all created routes
import { router } from "../trpc";
import { taskRouter } from "./routers/task";

//appRouter acts as the root router of the entire tRPC project
//It will combine all sub-routers into one router object
//All procedures inside the taskRouter will be accessed throught task.<procedure_name>
export const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
