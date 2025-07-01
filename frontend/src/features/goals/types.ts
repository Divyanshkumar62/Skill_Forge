export interface Milestone {
  _id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  _id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  status: "pending" | "completed";
  progress: number;
  dueDate: string;
}
