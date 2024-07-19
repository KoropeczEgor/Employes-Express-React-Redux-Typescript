import { Employee } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { employeesApi } from '../../app/services/employees';
import { RootState } from '../../app/store';

interface initialState {
  employees: Employee[] | null;
}

const initialState: initialState = {
  employees: null,
};

const slice = createSlice({
  name: 'employees',
  initialState,

  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      employeesApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.employees = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectEmployees = (state: RootState) => state.employees.employees;
