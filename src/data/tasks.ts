import type { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Update User Dashboard",
    description:
      "Implement the new analytics widgets on the user dashboard based on the provided designs.",
    deadline: "2023-07-15",
    status: "in-progress",
    mandatory: true,
    assignedTo: "Alex Johnson",
  },
  {
    id: 2,
    title: "Fix Navigation Bug",
    description:
      "Address the issue where the mobile navigation menu doesn't close properly after selecting an item.",
    deadline: "2023-07-10",
    status: "in-progress",
    mandatory: false,
    assignedTo: "Sarah Miller",
  },
  {
    id: 3,
    title: "Optimize Database Queries",
    description:
      "Identify and optimize slow-performing database queries to improve API response times.",
    deadline: "2023-07-05",
    status: "completed",
    mandatory: true,
    assignedTo: "Michael Chen",
  },
  {
    id: 4,
    title: "Create Marketing Email Templates",
    description:
      "Design and implement responsive email templates for the upcoming product launch campaign.",
    deadline: "2023-07-20",
    status: "rejected",
    mandatory: false,
    assignedTo: "Emily Rodriguez",
  },
  {
    id: 5,
    title: "Implement User Authentication",
    description:
      "Set up secure user authentication with JWT and refresh token rotation.",
    deadline: "2023-07-12",
    status: "completed",
    mandatory: true,
    assignedTo: "David Kim",
  },
  {
    id: 6,
    title: "Write API Documentation",
    description:
      "Create comprehensive documentation for the new API endpoints using Swagger.",
    deadline: "2023-07-18",
    status: "rejected",
    mandatory: false,
    assignedTo: "Alex Johnson",
  },
  {
    id: 7,
    title: "Conduct User Testing",
    description:
      "Organize and conduct user testing sessions for the new feature set.",
    deadline: "2023-07-25",
    status: "in-progress",
    mandatory: true,
    assignedTo: "Sarah Miller",
  },
];
