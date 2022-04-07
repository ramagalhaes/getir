import Api from "../../api/Api";
import { delay, put, takeEvery } from 'redux-saga/effects'
import { 
    fetchTasksSuccess,
    startTasksFetch,
    startAddTask,
    startEditTask,
    startChangeTaskStatus,
    startDeleteTask, 
    genericFailure,
    showDialogSnack,
    hideDialogSnack,
    genericSuccess}
from "../slices/taskSlice";

function* workStartTasksFetch(): Generator<any, any, any> {
    try {
        const response = yield Api.get('/tasks');
        const data = yield response.data;
        yield put(fetchTasksSuccess(data));
    } catch(error: any){
        yield put(genericFailure({type: 'error', message: error.message}));
    }
}

function* workAddTask({ payload }: any) {
    try {
        yield Api.post('/tasks', payload)
        yield put(startTasksFetch());
        yield put(genericSuccess({type: 'success', message: 'Task added successfuly'}));
    } catch(error: any){
        yield put(genericFailure({type: 'error', message: error.message}));
    }
}

function* workEditTask({ payload }: any) {
    try {
        yield Api.put(`/tasks/${payload.id}`, payload)
        yield put(startTasksFetch());
        yield put(genericSuccess({type: 'success', message: 'Task updated successfuly'}));
    } catch(error: any){
        yield put(genericFailure({type: 'error', message: error.message}));
    }
}

function* workChangeTaskStatus({ payload }: any): Generator<any, any, any> {
    try{ 
        yield Api.patch(`/tasks/${payload.id}`, {completed: payload.completed});
        yield put(genericSuccess({type: 'success', message: 'Task updated successfuly'}));
        yield put(startTasksFetch());
    } catch(error: any){
        yield put(genericFailure({type: 'error', message: error.message}));
    }
}

function* workDeleteTask({ payload }: any) {
    try {
        yield Api.delete(`/tasks/${payload}`);
        yield put(genericSuccess({type: 'success', message: 'Task deleted successfuly'}));
        yield put(startTasksFetch());
    } catch(error: any) {
        yield put(genericFailure({type: 'error', message: error.message}));
    }
}

function* workRequestFailure({ payload }: any) {
    yield put(showDialogSnack());
    yield delay(3000);
    yield put(hideDialogSnack());
}

function* workRequestSuccess({ payload }: any) {
    yield put(showDialogSnack());
    yield delay(3000);
    yield put(hideDialogSnack());
}

function* taskSaga() {
    yield takeEvery(startTasksFetch, workStartTasksFetch);
    yield takeEvery(startAddTask, workAddTask);
    yield takeEvery(startEditTask, workEditTask);
    yield takeEvery(startChangeTaskStatus, workChangeTaskStatus)
    yield takeEvery(startDeleteTask, workDeleteTask);
    yield takeEvery(genericFailure, workRequestFailure);
    yield takeEvery(genericSuccess, workRequestSuccess);
}

export default taskSaga;


