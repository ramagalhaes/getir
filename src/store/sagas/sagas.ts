import Api from "../../api/Api";
import { put, takeEvery } from 'redux-saga/effects'
import { 
    fetchTasksSuccess,
    startTasksFetch,
    startAddTask,
    startEditTask,
    startChangeTaskStatus,
    startDeleteTask }
from "../slices/taskSlice";

function* workStartTasksFetch(): Generator<any, any, any> {
    try {
        const response = yield Api.get('/tasks');
        const data = yield response.data;
        yield put(fetchTasksSuccess(data));
    } catch {
        console.log('quebrou FetchTask')
    }
}

function* workAddTask({ payload }: any) {
    try {
        yield Api.post('/tasks', payload)
        yield put(startTasksFetch())
    } catch {
        console.log('quebrou addTask')
    }
}

function* workEditTask({ payload }: any) {
    try {
        yield Api.put(`/tasks/${payload.id}`, payload)
        yield put(startTasksFetch())
    } catch {
        console.log('quebrou editTask')
    }
}

function* workChangeTaskStatus({ payload }: any): Generator<any, any, any> {
    try{ 
        const response = yield Api.patch(`/tasks/${payload.id}`, {completed: payload.completed});
        console.log(response)
        yield put(startTasksFetch())
    } catch {
        console.log('erroCompleteTask')
    }
}

function* workDeleteTask({ payload }: any) {
    try {
        yield Api.delete(`/tasks/${payload}`);
        yield put(startTasksFetch());
    } catch {
        console.log('erro aqui')
    }
}

function* taskSaga() {
    yield takeEvery(startTasksFetch, workStartTasksFetch);
    yield takeEvery(startAddTask, workAddTask);
    yield takeEvery(startEditTask, workEditTask);
    yield takeEvery(startChangeTaskStatus, workChangeTaskStatus)
    yield takeEvery(startDeleteTask, workDeleteTask);
}

export default taskSaga;


