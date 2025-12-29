import baseApi from "@/redux/api/baseApi";

/* ================= TYPES ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

export interface Event {
  id: string;
  name: string;
  des: string;
  images: string[];
  price: string;
  startDate: string;
  endDate: string;
  audienceSize: string;
}

export interface EventListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  products: Event[];
}

export type GetEventListResponse = ApiResponse<EventListData>;
export type CreateEventResponse = ApiResponse<Event>;

export interface UpdateEventResponseData {
  updatedEvent: Event;
}
export type UpdateEventResponse = ApiResponse<UpdateEventResponseData>;

export type DeleteEventResponse = ApiResponse<null>;

/* ================= API ================= */

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET event list
    getEventList: builder.query<GetEventListResponse, void>({
      query: () => "/event",
      providesTags: ["event"],
    }),

    // CREATE event
    createEvent: builder.mutation<CreateEventResponse, FormData>({
      query: (formData) => ({
        url: "/event",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["event"],
    }),

    // UPDATE event
    updateEvent: builder.mutation<
      UpdateEventResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/event/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["event"],
    }),

    // DELETE event
    deleteEvent: builder.mutation<DeleteEventResponse, string>({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOKS ================= */

export const {
  useGetEventListQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
