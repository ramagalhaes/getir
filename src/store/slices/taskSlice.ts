import { createSlice } from '@reduxjs/toolkit';
import { ToDo } from '../../models/ToDoModel';

interface TaskState {
    action: 'insert' | 'update';
    description:string;
    loading: boolean;
    showForm: boolean;
    tasks: ToDo[];
    newTitle: string;
    newDescription: string;
    taskId: number | null;
}


const initialState: TaskState = {
    action: 'insert',
    description: '',
    loading: false,
    showForm: false,
    tasks: [] as ToDo[],
    newTitle: '',
    newDescription: '',
    taskId: null,
}


export const slice = createSlice({
    name: 'formSlice',
    initialState: initialState,
    reducers: {
        startTasksFetch: (state) => {
            state.loading = true;
        },
        fetchTasksSuccess: (state, action) => {
            state.tasks = action.payload;
            state.loading = false;
        },
        fetchTasksFailure: (state) => {
            state.loading = false
        },
        startEditTask: (state, action) => {
            state.loading = true;
        },
        startAddTask: (state, action) => {
            state.loading = true;
        },
        startChangeTaskStatus: (state, action) => {
            state.loading = true;
        },
        setInserting: (state) => {
            state.action = 'insert';
        },
        setEditing: (state, action) => {
            state.action = 'update'
            state.taskId = action.payload
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

export const { startTasksFetch, fetchTasksSuccess, fetchTasksFailure, startEditTask, startAddTask, openForm, closeForm, setInserting, setEditing, startChangeTaskStatus } = slice.actions;