"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/tasks";
import AddTaskForm from "@/components/taskForm";
import axios from "axios";
import { employees } from "../../data/employees";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  completed_at: string | null;
  deadline: string | null;
  assigned_to: number | null;
  accepted_by: number | null;
  mandatory: boolean;
  status:
    | "unassigned"
    | "in_progress"
    | "completed_before_deadline"
    | "completed_after_deadline";
  rejected: boolean;
}

export default function TaskView() {
  const [activeTab, setActiveTab] = useState("in-progress");

  const [rejectedTasks, setRejectedTasks] = useState<Task[]>([]);
  const [inProgressTasks, setinProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [error, setError] = useState();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`
        );

        const allTasks = response.data;

        setRejectedTasks(
          allTasks.filter(
            (task) => task.rejected === true && task.accepted_by === null
          )
        );

        setinProgressTasks(
          allTasks.filter((task) => task.status === "in_progress")
        );
        setCompletedTasks(
          allTasks.filter((task) => task.completed_at !== null)
        );

        setAssignedTasks(
          allTasks.filter(
            (task) => task.assigned_to !== null && task.accepted_by === null
          )
        );
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Failed to fetch tasks"
            : "Failed to fetch tasks"
        );
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees/names`
        );
        const allEmp = response.data;

        setEmployee(allEmp);
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Failed to fetch Employees"
            : "Failed to fetch Employees"
        );
        console.error("Error fetching Employees:", error);
      }
    };

    fetchTasks();
    fetchEmployee();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[rgb(20,26,34)]">
      <header className="bg-[rgb(20,26,34)] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Taskmaster AI - Task View</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-6">
        <Tabs
          defaultValue="in-progress"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b mb-6">
            <TabsList className="bg-transparent h-auto p-0 mb-[-1px]">
              <TabsTrigger
                value="in-progress"
                className="px-4 py-3 border-0 data-[state=active]:border-b-2 data-[state=active]:border-[rgb(20,26,34)] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="px-4 py-3 border-0 data-[state=active]:border-b-2 data-[state=active]:border-[rgb(20,26,34)] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Rejected Tasks
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="px-4 py-3 border-0 data-[state=active]:border-b-2 data-[state=active]:border-[rgb(20,26,34)] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Completed Tasks
              </TabsTrigger>

              <TabsTrigger
                value="add-task"
                className="px-4 py-3 border-0 data-[state=active]:border-b-2 data-[state=active]:border-[rgb(20,26,34)] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Add New Task
              </TabsTrigger>
              <TabsTrigger
                value="assigned"
                className="px-4 py-3 border-0 data-[state=active]:border-b-2 data-[state=active]:border-[rgb(20,26,34)] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Assigned Tasks
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="in-progress" className="mt-0">
            <TaskList tasks={inProgressTasks} />
          </TabsContent>

          <TabsContent value="rejected" className="mt-0">
            <TaskList tasks={rejectedTasks} />
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <TaskList tasks={completedTasks} />
          </TabsContent>

          <TabsContent value="assigned" className="mt-0">
            <TaskList tasks={assignedTasks} employees={employee} />
          </TabsContent>

          <TabsContent value="add-task" className="mt-0">
            <AddTaskForm employees={employee} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
