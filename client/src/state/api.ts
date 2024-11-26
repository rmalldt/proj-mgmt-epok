import {
  BaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  AuthError,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  cognitoId?: string;
  username: string;
  email: string;
  profilePictureUrl?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Comment {
  id: number;
  text: string;
  taskId: number;
  userId: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

export interface UserAuthInfo {
  user: AuthUser;
  userSub: string | undefined;
  userDetails: User;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { accessToken } = session.tokens ?? {};
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"], // tags to identify cached data on FE used to invalidate cached data later
  endpoints: (build) => ({
    getAuthUser: build.query<UserAuthInfo, boolean>({
      queryFn: async (
        isAuthenticated,
        _queryApi,
        _extraoptions,
        fetchWithBQ,
      ) => {
        if (!isAuthenticated) {
          return {
            error: {
              data: "",
              status: 401,
              statusText: "Not Authenticated",
            },
          };
        }

        // Request1: Get current user and user session from Cognito User Pool
        // Call the API with Cognito User Pool ID URL
        const user = await getCurrentUser();
        const session = await fetchAuthSession();

        if (!session)
          return {
            error: {
              data: (session as AuthError).cause,
              status: 500,
              statusText: (session as AuthError).message,
            },
          };

        const { userSub } = session; // cognito ID
        const { accessToken } = session.tokens ?? {};

        // Request2: Get User data with the current cognito ID from RDS
        // Call the API with Base URL
        const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);

        if (userDetailsResponse.error)
          return { error: userDetailsResponse.error };

        return {
          data: {
            user,
            userSub,
            userDetails: userDetailsResponse.data as User,
          },
        };
      },
    }),

    // API requests to the endpoints to fetch data (TS Prisma schema) from backend
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"], // invalidate to auto-refetch the data tagged under "Projects"
    }),

    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      // Update only one specific task based on task id
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    getTasksByUser: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),

    createTasks: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      // Invalidate only one specific task based on task id
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),

    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useGetTasksByUserQuery,
  useCreateTasksMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
} = api;
