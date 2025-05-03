import type { Employee } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TaskList from "@/components/taskList";
import SkillBadges from "@/components/skillBadges";
import StatCard from "@/components/statCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "@/types/task";

interface EmployeeDetailsProps {
  employee: Employee;
}

export default function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  console.log(employee);
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchEmployeeTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/emp/alltask/${employee.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTasks(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployeeTasks();
  }, [employee]);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <Image
                src={
                  employee.avatar ||
                  "/images/placeholder.svg?height=96&width=96"
                }
                alt={employee.name}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <p className="text-gray-500">{employee.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Mandatory Tasks"
          value={`${employee.tasks_before_deadline_count}%`}
          description="Completion rate"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        >
          <Progress
            value={employee.tasks_before_deadline_count}
            className="h-2 mt-2"
          />
        </StatCard>

        <StatCard
          title="Tasks Completed"
          value={employee.assigned_task_count}
          description="This month"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />

        <StatCard
          title="Before Deadline"
          value={`${employee.tasks_before_deadline_count}%`}
          description="Completion rate"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-500"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        >
          <Progress
            value={employee.tasks_before_deadline_count}
            className="h-2 mt-2"
          />
        </StatCard>
      </div>

      {/* Feedback Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Positive Feedback Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={employee.marks} className="h-2" />
            </div>
            <div className="text-lg font-bold">{employee.marks}%</div>
          </div>
        </CardContent>
      </Card>

      {/* New Skills */}
      {/* <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">New Skills This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillBadges skills={employee.newSkills} />
        </CardContent>
      </Card> */}

      {/* Current Tasks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
