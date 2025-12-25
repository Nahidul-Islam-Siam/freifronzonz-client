import baseApi from "@/redux/api/baseApi";
export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
  };
}

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
  role: "CUSTOMER" | "ADMIN" | "SELLER"; // extend if needed
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

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
getUserProfile: builder.query<UserProfileResponse, void>({
  query: () => "/user",
})

  }),
});

export const { useGetUserProfileQuery } = profileApi;
