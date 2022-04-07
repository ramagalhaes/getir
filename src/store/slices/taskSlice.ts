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
    openForm,
    closeForm,
    setInserting,
    setEditing,
    startChangeTaskStatus
} = slice.actions;