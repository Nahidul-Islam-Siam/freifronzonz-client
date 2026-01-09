/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= TYPES ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// Your existing Event interface
export interface Event {
  id: string;
  name: string;
  des: string;
  images: string[];
  price: string;        // string (not number) - API returns "200"
  startDate: string;    // ISO date string "2026-01-02"
  endDate: string;      // ISO date string "2026-01-10"
  audienceSize: string; // string (not number) - API returns "100"
}

export interface EventListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  products: Event[]; // Note: API uses "products", not "events"
}

export type GetEventListResponse = ApiResponse<EventListData>;
export type CreateEventResponse = ApiResponse<Event>;

export interface UpdateEventResponseData {
  updatedEvent: Event;
}
export type UpdateEventResponse = ApiResponse<UpdateEventResponseData>;
export type DeleteEventResponse = ApiResponse<null>;

/* ================= EVENT BOOKING TYPES ================= */

// ✅ Request payload for booking
export interface CreateEventBookingPayload {
  eventId: string;
  paymentMethod: string; // or "CARD" | "CASH" if you want to restrict
  person: string; // or number if backend accepts number
}

// ✅ Payment response from backend
export interface PaymentInfo {
  type: string;
  sessionId: string;
  url: string;
  amount: number;
}

// ✅ Booking response data
export interface EventBookingData {
  eventBookingId: string;
  paymentId: string;
  payment: PaymentInfo;
}

export type CreateEventBookingResponse = ApiResponse<EventBookingData>;

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

    // ✅ CREATE EVENT BOOKING
    createEventBooking: builder.mutation<
      CreateEventBookingResponse,
      CreateEventBookingPayload // ✅ Correct payload type
    >({
      query: (payload) => ({
        url: "/event/booking/create-booking",
        method: "POST",
        body: payload, // ✅ Send as JSON (not FormData)
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
  useCreateEventBookingMutation, // ✅ Export the new hook
} = eventApi;