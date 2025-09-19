import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const rtbdBaseUrl = process.env.EXPO_PUBLIC_RTDB_URL;

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: rtbdBaseUrl }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: (localId) => `users/${localId}.json`,
    }),
    getProfilePicture: builder.query({
      query: (localId) => `profilePictures/${localId}.json`,
    }),
    putProfilePicture: builder.mutation({
      query: (data) => ({
        url: `profilePictures/${data.localId}.json`,
        method: "PUT",
        body: {
          image: data.image,
        },
      }),
    }),
  }),
});

export const { useGetUserDataQuery, useGetProfilePictureQuery, usePutProfilePictureMutation } =
  profileApi;
