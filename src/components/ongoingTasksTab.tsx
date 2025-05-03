"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  mandatory?: boolean;
}

interface OngoingTasksTabProps {
  tasks: Task[];
  onMarkAsFinished: (taskId: number) => void;
}

export default function OngoingTasksTab({
  tasks,
  onMarkAsFinished,
}: OngoingTasksTabProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
        <p className="text-lg font-medium">No ongoing tasks</p>
        <p className="mt-1">Tasks you accept will appear here.</p>
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
              {task.mandatory && (
                <Badge className="bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]">
                  Mandatory
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">{task.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span className="font-medium">Deadline:</span>
              <span className="ml-1">{formatDate(task.deadline)}</span>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-3 flex justify-end gap-3">
            <Button
              className="bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]"
              onClick={() => onMarkAsFinished(task.id)}
            >
              Mark as Finished
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
