import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "./api";

export const companyApi = api.injectEndpoints({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    getCompanyById: build.query({
      query: (id) => `/companies/${id}`,
      // invalidatesTags: ["Company"],
    }),
    pathCompanyById: build.mutation({
      query: (data) => ({
        url: `/companies/${data.id}`,
        method: "PATCH",
        body: {
          name: data?.name,
          shortName: data?.shortName,
          businessEntity: data?.businessEntity,
          contract: {
            no: data?.contractNo,
            issue_date: data?.issueDate + "T00:00:00Z",
          },
          type: data?.type,
        },
      }),
      // providesTags: ["Company"],
    }),
    deleteCompanyById: build.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      // providesTags: ["Company"],
    }),
  }),
});

export const {
  useLazyGetCompanyByIdQuery,
  usePathCompanyByIdMutation,
  useDeleteCompanyByIdMutation,
} = companyApi;
