import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskModel } from '../../models/TaskModel';
import { AddTaskPayload, ChangeStatusPayload } from '../../models/Payloads';
import { Dialog, TaskState } from '../../models/TaskState';

const initialState: TaskState = {
  action: 'insert',
  description: '',
  loading: false,
  showForm: false,
  tasks: [] as TaskModel[],
  newTitle: '',
  newDescription: '',
  taskId: '',
  completedTasks: 0,
  dialog: {} as Dialog,
  showDialogSnack: false
};

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
      state.completedTasks = payload.filter(
        (task) => task.completed === true
      ).length;
    },
    fetchTasksFailure: (state) => {
      state.loading = false;
    },
    startEditTask: (state, { payload }: PayloadAction<TaskModel>) => {
      state.loading = true;
    },
    startAddTask: (state, { payload }: PayloadAction<AddTaskPayload>) => {
      state.loading = true;
    },
    startChangeTaskStatus: (
      state,
      { payload }: PayloadAction<TaskModel>
    ) => {
      state.loading = true;
    },
    startDeleteTask: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },
    genericFailure: (state, { payload }: PayloadAction<Dialog>) => {
      state.loading = false;
      state.dialog.type = payload.type;
      state.dialog.message = payload.message;
    },
    genericSuccess: (state, { payload }: PayloadAction<Dialog>) => {
      state.loading = false;
      state.dialog.type = payload.type;
      state.dialog.message = payload.message;
    },
    showDialogSnack: (state) => {
      state.showDialogSnack = true;
    },
    hideDialogSnack: (state) => {
      state.showDialogSnack = false;
    },
    setInserting: (state) => {
      state.action = 'insert';
    },
    setEditing: (state, { payload }: PayloadAction<string>) => {
      state.action = 'update';
      state.taskId = payload;
    },
    openForm: (state) => {
      state.showForm = true;
    },
    closeForm: (state) => {
      state.showForm = false;
    }
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
  startChangeTaskStatus,
  genericFailure,
  showDialogSnack,
  hideDialogSnack,
  genericSuccess
} = slice.actions;
