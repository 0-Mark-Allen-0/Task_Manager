"use client";

//Import the custom tRPC client
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function HomePage() {
  //Call the tRPC query `task.getAll` from the tRPC router
  //Destructure the result into `data`
  const { data: tasks, isLoading } = trpc.task.getAll.useQuery();

  //Allow cache manipulation for things like refetching the queries
  const utils = trpc.useUtils();

  //Define the mutation to create tasks
  const createTask = trpc.task.create.useMutation({
    //When the task is created successfully:
    onSuccess: () => {
      //Refresh the list using getAll
      utils.task.getAll.invalidate();

      //To clear the fields after the form is submitted
      setTitle("");
      setPriority("low");
      setDueDate("");
    },
  });

  //State variables to control form setting and clearing
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");

  // Helper function to format dates safely
  const formatDate = (dateValue: any) => {
    try {
      // Make sure we have a valid date string or object
      if (!dateValue) return "No date";

      // Convert to string if it's a Date object
      const dateString =
        typeof dateValue === "object" && dateValue instanceof Date
          ? dateValue.toISOString()
          : String(dateValue);

      // Now create a date from the string and format it
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Invalid date";
    }
  };

  //Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //Prevent page refresh on submission

    //To prevent empty field inputs
    if (!title || !dueDate) {
      return;
    }

    //Call the mutation to create the task
    createTask.mutate({ title, priority, dueDate });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // For debugging - log the actual structure of tasks
  console.log("Tasks data:", tasks);

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6 mt-24">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block font-semibold">Priority</label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-semibold">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-lime-300 px-4 py-2 rounded hover:scale-110 transition-all delay-75"
          disabled={createTask.status == "pending"}
        >
          {createTask.status == "pending" ? "Creating..." : "Create"}
        </button>
      </form>

      <hr />

      {tasks && tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task: any) => (
            <li key={task.id} className="border p-3 rounded shadow">
              <div className="font-semiboldbold">{task.title}</div>
              {/* Priority & Due Date (w/ formatting) */}
              <div>
                Priority: {task.priority} | Due: {formatDate(task.dueDate)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </main>
  );
}
