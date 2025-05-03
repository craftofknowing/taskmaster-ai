import type { Task } from "@/types/task";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, User } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

interface TaskCardProps {
  task: Task;

  employees?: { user_id: number; name: string }[];
}

export default function TaskCard({ task, employees }: TaskCardProps) {
  // Format date to be more readable

  const handleAccept = async (id: number) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/accept/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          {task.mandatory && (
            <Badge className="bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]">
              Mandatory
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{task.description}</p>
        {task.assigned_to && task.accepted_by === null && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <User size={16} className="mr-1" />
            <span>
              Assigned to: {""}
              {employees.find((emp) => emp.user_id === task.assigned_to)
                ?.name || "Unknown"}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t text-sm text-gray-500 flex justify-between">
        <div className="flex items-center">
          <CalendarIcon size={16} className="mr-1" />
          <span>Deadline: {formatDate(task.deadline || "")}</span>
        </div>
        {task.accepted_by === null && task.rejected === true && (
          <Button
            className="bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]"
            onClick={() => handleAccept(task.id)}
          >
            Accept
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
