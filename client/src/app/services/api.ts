import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    //Эта затычка в конечный вариант сайта такое идти не должно 
    baseUrl: 'http://localhost:8000/api',
    // prepareHeaders: (headers, {getState}) => {
    //     //Мы будем брать токен из localStorage
    //     const token = (getState() as RootState)
    // }
});

//Если запрос повториться, то повтори его 1 раз 
const baseOueryWithRetry = retry(baseQuery, {maxRetries: 1});

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseOueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})