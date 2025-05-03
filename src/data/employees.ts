import type { Employee } from "@/types/employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    bio: "Experienced frontend developer specializing in React and modern JavaScript frameworks.",
    stats: {
      mandatoryTasksRate: 92,
      tasksCompletedThisMonth: 14,
      beforeDeadlineRate: 88,
      positiveFeedbackRate: 95,
    },
    newSkills: ["TypeScript", "Next.js", "Tailwind CSS"],
    currentTasks: [
      {
        id: 101,
        title: "Implement new dashboard UI",
        description:
          "Create responsive dashboard interface based on the provided Figma designs.",
        deadline: "2023-06-15",
        status: "in-progress",
        mandatory: true,
      },
      {
        id: 102,
        title: "Fix navigation bugs",
        description:
          "Address issues with mobile navigation menu not closing properly on route change.",
        deadline: "2023-06-10",
        status: "completed",
        mandatory: true,
      },
      {
        id: 103,
        title: "Optimize image loading",
        description:
          "Implement lazy loading for images to improve initial page load performance.",
        deadline: "2023-06-20",
        status: "in-progress",
        mandatory: false,
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "UX Designer",
    bio: "Creative UX designer with a passion for creating intuitive and accessible user experiences.",
    stats: {
      mandatoryTasksRate: 96,
      tasksCompletedThisMonth: 12,
      beforeDeadlineRate: 94,
      positiveFeedbackRate: 98,
    },
    newSkills: ["Figma Advanced Prototyping", "User Research"],
    currentTasks: [
      {
        id: 201,
        title: "Design user onboarding flow",
        description:
          "Create a seamless onboarding experience for new users of the platform.",
        deadline: "2023-06-18",
        status: "completed",
        mandatory: false,
      },
      {
        id: 202,
        title: "Conduct usability testing",
        description:
          "Organize and conduct usability testing sessions for the new feature set.",
        deadline: "2023-06-25",
        status: "in-progress",
        mandatory: true,
      },
    ],
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Backend Developer",
    bio: "Backend specialist with expertise in scalable architecture and database optimization.",
    stats: {
      mandatoryTasksRate: 89,
      tasksCompletedThisMonth: 9,
      beforeDeadlineRate: 82,
      positiveFeedbackRate: 90,
    },
    newSkills: ["GraphQL", "Redis", "Kubernetes"],
    currentTasks: [
      {
        id: 301,
        title: "Implement authentication API",
        description:
          "Develop secure authentication endpoints with JWT and refresh token rotation.",
        deadline: "2023-06-12",
        status: "completed",
        mandatory: false,
      },
      {
        id: 302,
        title: "Optimize database queries",
        description:
          "Identify and fix slow-performing database queries to improve API response times.",
        deadline: "2023-06-08",
        status: "in-progress",
        mandatory: true,
      },
      {
        id: 303,
        title: "Set up CI/CD pipeline",
        description:
          "Configure automated testing and deployment pipeline using GitHub Actions.",
        deadline: "2023-06-22",
        status: "in-progress",
        mandatory: false,
      },
    ],
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Project Manager",
    bio: "Detail-oriented project manager with a track record of delivering complex projects on time.",
    stats: {
      mandatoryTasksRate: 98,
      tasksCompletedThisMonth: 22,
      beforeDeadlineRate: 96,
      positiveFeedbackRate: 92,
    },
    newSkills: ["Agile Certification", "Risk Management"],
    currentTasks: [
      {
        id: 401,
        title: "Q3 Planning",
        description:
          "Finalize project roadmap and resource allocation for Q3 initiatives.",
        deadline: "2023-06-30",
        status: "in-progress",
        mandatory: false,
      },
      {
        id: 402,
        title: "Stakeholder presentation",
        description:
          "Prepare and deliver monthly progress presentation to key stakeholders.",
        deadline: "2023-06-15",
        status: "in-progress",
        mandatory: true,
      },
    ],
  },
  {
    id: 5,
    name: "David Kim",
    role: "QA Engineer",
    bio: "Thorough QA engineer focused on test automation and maintaining high quality standards.",
    stats: {
      mandatoryTasksRate: 94,
      tasksCompletedThisMonth: 18,
      beforeDeadlineRate: 90,
      positiveFeedbackRate: 88,
    },
    newSkills: ["Cypress", "Performance Testing"],
    currentTasks: [
      {
        id: 501,
        title: "Create test plan for v2.0",
        description:
          "Develop comprehensive test strategy for the upcoming major release.",
        deadline: "2023-06-20",
        status: "in-progress",
        mandatory: false,
      },
      {
        id: 502,
        title: "Automate regression tests",
        description: "Expand automated test coverage for critical user flows.",
        deadline: "2023-06-25",
        status: "completed",
        mandatory: true,
      },
      {
        id: 503,
        title: "Bug verification",
        description: "Verify and close fixed bugs from the latest sprint.",
        deadline: "2023-06-10",
        status: "in-progress",
        mandatory: false,
      },
    ],
  },
];
