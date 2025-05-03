"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OngoingTasksTab from "./ongoingTasksTab";
import AssignedTasksTab from "./assignedTasksTab";
import CompletedTasksTab from "./completedTasksTab";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed_at?: string;
  status: string;
  mandatory?: boolean;
}

interface CompletedTask extends Omit<Task, "status"> {
  status: "Completed On Time" | "Completed Late";
}

interface TasksTabsInterfaceProps {
  ongoingTasks: Task[];
  assignedTasks: Task[];
  completedTasks: CompletedTask[];
  setOngoingTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<CompletedTask[]>>;
}

export default function TasksTabsInterface({
  ongoingTasks,
  assignedTasks,
  completedTasks,
}: TasksTabsInterfaceProps) {
  const [activeTab, setActiveTab] = useState("ongoing");

  // These functions would connect to your backend in a real application
  const handleMarkAsFinished = async (taskId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/${taskId}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorBody = await response.json(); // read ONCE
        throw new Error(errorBody.message || "Failed to mark task complete");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error completing task:", error);
      throw error;
    }
  };

  const handleAccept = (taskId: number) => {
    console.log(`Task ${taskId} accepted`);
    // In a real app, you would move this task to ongoing tasks
  };

  const handleReject = (taskId: number) => {
    console.log(`Task ${taskId} rejected`);
    // In a real app, you would update the task status or remove it
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      <Tabs
        defaultValue="ongoing"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full"
      >
        <div className="px-6 pt-6 border-b">
          <TabsList className="grid grid-cols-3 mb-2 w-full ">
            <TabsTrigger
              value="ongoing"
              className="data-[state=active]:bg-[rgb(20,26,34)] data-[state=active]:text-white"
            >
              Ongoing Tasks
            </TabsTrigger>
            <TabsTrigger
              value="assigned"
              className="data-[state=active]:bg-[rgb(20,26,34)] data-[state=active]:text-white"
            >
              Assigned Tasks
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[rgb(20,26,34)] data-[state=active]:text-white"
            >
              Completed Tasks
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="ongoing"
          className="p-6 h-[calc(100%-60px)] overflow-auto"
        >
          <OngoingTasksTab
            tasks={ongoingTasks}
            onMarkAsFinished={handleMarkAsFinished}
          />
        </TabsContent>

        <TabsContent
          value="assigned"
          className="p-6 h-[calc(100%-60px)] overflow-auto"
        >
          <AssignedTasksTab
            tasks={assignedTasks}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </TabsContent>

        <TabsContent
          value="completed"
          className="p-6 h-[calc(100%-60px)] overflow-auto"
        >
          <CompletedTasksTab tasks={completedTasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
