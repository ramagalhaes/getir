import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskModel } from '../../models/TaskModel';
import { AddTaskPayload, ChangeStatusPayload } from '../../types/Payloads'

interface TaskState {
    action: 'insert' | 'update';
    description:string;
    loading: boolean;
    showForm: boolean;
    tasks: TaskModel[];
    newTitle: string;
    newDescription: string;
    taskId: string;
    completedTasks: number;
}


const initialState: TaskState = {
    action: 'insert',
    description: '',
    loading: false,
    showForm: false,
    tasks: [] as TaskModel[],
    newTitle: '',
    newDescription: '',
    taskId: '',
    completedTasks: 0
}


export const slice = createSlice({
    name: 'formSlice',
    initialState: initialState,
    reducers: {
        startTasksFetch: (state) => {
            state.loading = true;
        },
        fetchTasksSuccess: (state, { payload }: PayloadAction<TaskModel[]>) => {
            state.tasks = payload;
            state.loading = false;
            state.completedTasks = payload.filter((task) => task.completed === true).length
        },
        fetchTasksFailure: (state) => {
            state.loading = false
        },
        startEditTask: (state, { payload }: PayloadAction<TaskModel>) => {
            state.loading = true;
        },
        startAddTask: (state, { payload }: PayloadAction<AddTaskPayload>) => {
            state.loading = true;
        },
        startChangeTaskStatus: (state, { payload }: PayloadAction<ChangeStatusPayload>) => {
            state.loading = true;
        },
        startDeleteTask: (state, { payload }: PayloadAction<string>) => {
            state.loading = true;
        },
        setInserting: (state) => {
            state.action = 'insert';
        },
        setEditing: (state, { payload }: PayloadAction<string>) => {
            state.action = 'update'
            state.taskId = payload
        },
        openForm: (state) => {
            state.showForm = true;
        },
        closeForm: (state) => {
            state.showForm = false;
        },
    }   
});

export default slice.reducer;

export const { 
    startTasksFetch,
    fetchTasksSuccess,
    fetchTasksFailure,
    startEditTask,
    startAddTask,
    startDeleteTask,
    openForm,
    closeForm,
    setInserting,
    setEditing,
    startChangeTaskStatus
} = slice.actions;