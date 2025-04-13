"use client";

//Import the custom tRPC client
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  //Call the tRPC query `task.getAll` from the tRPC router
  //Destructure the result into `data`
  const { data: tasks, isLoading } = trpc.task.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      tRPC Task Manager
      <h1>Tasks:</h1>
      {/* Task List */}
      <ul>
        {tasks?.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}
