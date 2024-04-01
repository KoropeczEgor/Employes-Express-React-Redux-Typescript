import {User} from '@prisma/client';
import {api} from'./api';

//Позволяет создать пользователя без id
export type UserData = Omit<User, "id">;
//Нам будет приходить вся инф которая находятся в User+ token
type ResponseLoginData = User & { token: string};
//В api будет жобавлять endpoints
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            })
        }),
        register: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData
            })
        }),
        current: builder.query<ResponseLoginData, void>({
            query: () => ({
                url: '/user/current',
                method: 'GET',
            })
        }),
    })
})

//Название сгенерировалось самостоятельно
export const {useLoginMutation, useRegisterMutation, useCurrentQuery} = authApi;

export const {endpoints: {login, register, current}} = authApi;