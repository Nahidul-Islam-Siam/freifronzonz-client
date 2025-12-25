// profileApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic response wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// User object (same structure)
export interface User {
  id: string;
  name: string;
  photo: string | null;
  email: string;
  phone: string | null;
  password: string;
  isEmailVerified: boolean;
  isDeleted: boolean;
  lang: string;
  role: "CUSTOMER" | "ADMIN" | "SELLER";
  createdAt: string;
  updatedAt: string;
  dob: string | null;
  fcmToken: string;
  isGoogleAuth: boolean;
  lastLogin: string | null;
  lastSeen: string;
  brandId: string | null;
  profile: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  fullName: string;
  bloodGroup: string | null;
  gender: string | null;
  zip: string | null;
  city: string | null;
  state: string | null;
  address: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

// ✅ GET response: data = { user: User }
export interface GetUserProfileResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
  };
}

// ✅ UPDATE response: data = User (direct)
export interface UpdateProfileResponse {
  status: boolean;
  message: string;
  data: User;
}

// Endpoints
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => "/user",
    }),

    updateProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/user/updateProfile",
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileMutation } = profileApi;