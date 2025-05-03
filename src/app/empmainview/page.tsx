"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import EmployeeProfile from "@/components/employeeProfile";
import CallToAction from "@/components/callToAction";
import TasksTabsInterface from "@/components/tasksTabInterface";
import axios from "axios";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

interface Skill {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  completed_at?: string;
  mandatory?: boolean;
}

interface CompletedTask extends Omit<Task, "status"> {
  status: "Completed On Time" | "Completed Late";
}

export default function EmpMainView() {
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState<Skill[]>();
  const [name, setName] = useState("");

  const [ongoingTasks, setOngoingTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const employeeId = user?.id;

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/employee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        setBio(response.data.description);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setName(response.data.name);
        setSkills(response.data.skills);
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };

    const fetchEmployeeTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        // Now you'll want to update your task state here:
        const taskData = response.data;

        // You'll need to declare these at the top with useState first:
        // setOngoingTasks, setAssignedTasks, setCompletedTasks

        setOngoingTasks(taskData.ongoing || []);
        setAssignedTasks(taskData.assigned || []);
        setCompletedTasks(
          (taskData.completed || []).map((task: Task) => ({
            ...task,
            status:
              task.status === "completed_before_deadline"
                ? "Completed On Time"
                : "Completed Late",
          }))
        );
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    if (employeeId) {
      fetchEmployeeData();
      fetchEmployeeTasks();
    }
  }, []);

  return (
    <main
      className={`min-h-screen bg-white text-[rgb(20,26,34)] p-6 ${roboto.variable}`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Taskmaster AI</h1>

        {<CallToAction />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <EmployeeProfile
              profile={{
                name: name,
                bio: bio,
                contactInfo: { email: email, phone: phone },
                profileComplete: !!name,
                skills: skills || [],
              }}
            />
          </div>
          <div className="lg:col-span-2">
            <TasksTabsInterface
              ongoingTasks={ongoingTasks}
              assignedTasks={assignedTasks}
              completedTasks={completedTasks}
              setOngoingTasks={setOngoingTasks}
              setCompletedTasks={setCompletedTasks}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
