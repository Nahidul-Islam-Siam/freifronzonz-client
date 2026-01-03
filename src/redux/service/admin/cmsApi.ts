/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success?: boolean;
}

/* ================= BLOG ADMIN (with active) ================= */

export interface BlogAdmin {
  id: string;
  name: string;
  photo: string;
}

export interface Blog {
  id: string;
  title: string;
  subTitle: string;
  des: string;
  images: string[];
  views: number;
  active: boolean; // ← only in admin
  createdAt: string;
  updatedAt: string;
  admin: BlogAdmin;
}

export interface BlogListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  blogs: Blog[];
}

export type GetBlogsResponse = ApiResponse<BlogListData>;

/* ================= PUBLIC BLOG (without active) ================= */

export interface PublicBlog {
  id: string;
  title: string;
  subTitle: string;
  des: string;
  images: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  admin: BlogAdmin;
}

export interface PublicBlogListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  blogs: PublicBlog[];
}

export type GetPublicBlogsResponse = ApiResponse<PublicBlogListData>;

/* ================= COMMON CMS ITEM (Hero / Story) ================= */

export interface CmsItem {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  intro: string;
}

/* ================= HERO ================= */

export type Hero = CmsItem;
export type GetHeroResponse = ApiResponse<Hero>;

/* ================= OUR STORY ================= */

export type Story = CmsItem;
export type GetStoryResponse = ApiResponse<Story>;

/* ================= SOCIAL LINKS ================= */

export interface SocialLinks {
  id: string;
  pinterest: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinksInput {
  facebook?: string;
  instagram?: string;
  pinterest?: string;
  linkedin?: string;
}

export type GetSocialLinksResponse = ApiResponse<SocialLinks>;

/* ================= API ENDPOINTS ================= */

export const cmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Hero
    getHeroData: builder.query<GetHeroResponse, void>({
      query: () => "/hero",
      providesTags: ["cms"],
    }),
    updateHeroData: builder.mutation<GetHeroResponse, FormData>({
      query: (formData) => ({
        url: "/hero",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["cms"],
    }),

    // 🔹 Our Story
    getOurStory: builder.query<GetStoryResponse, void>({
      query: () => "/ourStory",
      providesTags: ["cms"],
    }),
    updateOurStory: builder.mutation<GetStoryResponse, FormData>({
      query: (formData) => ({
        url: "/ourStory",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["cms"],
    }),

    // 🔹 Social Links
    getSocialLinks: builder.query<GetSocialLinksResponse, void>({
      query: () => "/social",
      providesTags: ["cms"],
    }),
    updateSocialLinks: builder.mutation<
      GetSocialLinksResponse,
      SocialLinksInput
    >({
      query: (payload) => ({
        url: "/social",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["cms"],
    }),

    // 🔹 Blogs (Admin - WITH active)
    getBlogByAdmin: builder.query<GetBlogsResponse, void>({
      query: () => "/blog/getAllByAdmin",
      providesTags: ["cms"],
    }),

    // 🔹 Blogs (Public - WITHOUT active)
    getBlog: builder.query<GetPublicBlogsResponse, void>({
      query: () => "/blog",
      providesTags: ["cms"],
    }),

    createBlog: builder.mutation<GetBlogsResponse, FormData>({
      query: (formData) => ({
        url: "/blog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["cms"],
    }),

    updateBlog: builder.mutation<GetBlogsResponse, FormData>({
      query: (formData) => ({
        url: "/blog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["cms"],
    }),

    deleteBlog: builder.mutation<GetBlogsResponse, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cms"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useGetHeroDataQuery,
  useUpdateHeroDataMutation,
  useGetOurStoryQuery,
  useUpdateOurStoryMutation,
  useGetSocialLinksQuery,
  useUpdateSocialLinksMutation,
  useGetBlogByAdminQuery,
  useGetBlogQuery, // ✅ Public blog hook
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = cmsApi;