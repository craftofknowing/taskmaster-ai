export interface Employee {
  description: string;
  skills: { id: number; name: string }[];
  phone: string;
  assigned_task_count: number;
  tasks_before_deadline_count: number;
  marks: number;
  name: string;
  user_id: number;
  id: number;
  email: string;
  rejected_task_count: number;
  tasks_completed_count: number;
}
