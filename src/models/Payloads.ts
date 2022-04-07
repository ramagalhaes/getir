export interface ChangeStatusPayload {
  id: string;
  completed: boolean;
}

export interface AddTaskPayload {
  title: string;
  description: string;
}
