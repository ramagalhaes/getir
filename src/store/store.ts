import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";
import createSagaMiddleware from "redux-saga";
import taskSaga from "./sagas/sagas";

const saga = createSagaMiddleware();


const store = configureStore({ 
    reducer: {
        tasks: tasksReducer
    },
    middleware: [saga]
});

saga.run(taskSaga)

export default store;