export interface Task {
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
