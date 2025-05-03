import type { Task } from "@/types/task";
import TaskCard from "@/components/taskCard";

interface TaskListProps {
  tasks: Task[];
  employees?: { user_id: number; name: string }[];
}

export default function TaskList({ tasks, employees }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-4"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 8h10" />
          <path d="M7 12h5" />
          <path d="M7 16h8" />
        </svg>
        <p className="text-lg font-medium">No tasks found</p>
        <p className="mt-1">Tasks will appear here when they are available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} employees={employees} />
      ))}
    </div>
  );
}
