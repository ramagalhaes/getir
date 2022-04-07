import { TaskModel } from "./TaskModel";

export interface TaskState {
    action: 'insert' | 'update';
    description:string;
    loading: boolean;
    showForm: boolean;
    tasks: TaskModel[];
    newTitle: string;
    newDescription: string;
    taskId: string;
    completedTasks: number;
    dialog: Dialog;
    showDialogSnack: boolean;
}

export interface Dialog {
    type: 'error' | 'success';
    message: string
} 