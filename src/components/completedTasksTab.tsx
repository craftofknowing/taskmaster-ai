import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircle } from "lucide-react";

interface CompletedTask {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed_at?: string;
  mandatory?: boolean;
  status: "Completed On Time" | "Completed Late";
}

interface CompletedTasksTabProps {
  tasks: CompletedTask[];
}

export default function CompletedTasksTab({ tasks }: CompletedTasksTabProps) {
  console.log("Completed tasks:", tasks);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status color based on completion status
  const getStatusColor = (status: string) => {
    if (status === "Completed On Time") {
      return "bg-green-100 text-green-800";
    }
    return "bg-amber-100 text-amber-800";
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="mb-4">
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
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <p className="text-lg font-medium">No completed tasks</p>
        <p className="mt-1">Tasks you finish will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl tracking-tight font-semibold">
                {task.title}
              </CardTitle>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">{task.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                <span className="font-medium">Completed:</span>
                <span className="ml-1">
                  {formatDate(task.completed_at || "")}
                </span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span className="font-medium">Deadline:</span>
                <span className="ml-1">{formatDate(task.deadline)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
