
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://identitytoolkit.googleapis.com/v1/",
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (authInfo) => ({
                url: `accounts:signUp?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
                method: "POST",
                body: authInfo,
            }),
        }),
        login: builder.mutation({
            query: (authInfo) => ({
               
                url: `accounts:signInWithPassword?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
                method: "POST",
                body: authInfo,
            }),
        }),
        getUser: builder.query({
            query: (localId) => ({
               
                url: `https://react-native-app-849c5-default-rtdb.firebaseio.com/${localId}.json`,
                method: "GET",
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation,useGetUserQuery } = authApi;
