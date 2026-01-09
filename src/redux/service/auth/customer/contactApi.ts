/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

/* ================= CONTACT FORM TYPES ================= */

// ✅ Request payload interface
export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ✅ Response data is an array of email strings
export type ContactFormResponseData = string[];

/* ================= API RESPONSE TYPES ================= */

export type CreateContactResponse = ApiResponse<ContactFormResponseData>;

/* ================= API ENDPOINTS ================= */

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create contact form submission
    createContact: builder.mutation<CreateContactResponse, ContactFormPayload>({
      query: (payload) => ({
        url: "/auth/contactFormSubmit",
        method: "POST",
        body: payload, // ✅ Send as JSON object (not FormData)
      }),
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useCreateContactMutation, // ✅ Export the mutation hook
} = contactApi;