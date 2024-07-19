import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReduce from '../features/counter/counterSlice';
import { api } from './services/api';
import auth from '../features/auth/authSlice';
import employees from '../features/employees/employeesSlice';
import { listenerMiddleware } from '../middleware/auth';

export const store = configureStore({
  reducer: {
    counter: counterReduce,
    [api.reducerPath]: api.reducer,
    auth,
    employees,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
