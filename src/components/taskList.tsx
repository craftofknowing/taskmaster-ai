import type { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const processedTasks = tasks.map((task) => ({
    ...task,
    status: task.status === "unassigned" ? "in_progress" : task.status,
  }));

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-3">
      {processedTasks.length > 0 ? (
        processedTasks.map((task) => (
          <div
            key={task.id}
            className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{task.title}</h3>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <div className="flex items-center mr-4">
                <CalendarIcon size={14} className="mr-1" />
                <span>Due: {formatDate(task.deadline || "")}</span>
              </div>
              {/* <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>Est: {task.estimatedHours}h</span>
              </div> */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No tasks currently assigned</p>
        </div>
      )}
    </div>
  );
}
