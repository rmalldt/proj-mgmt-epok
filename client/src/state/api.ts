import {
  BaseQueryError,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query/react";
import {
  AuthError,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  GetCurrentUserOutput,
} from "aws-amplify/auth";
import { UserInfo } from "os";

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
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }), // base URL
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"], // tags to identify cached data on FE used to invalidate cached data later
  endpoints: (build) => ({
    getAuthUser: build.query<UserAuthInfo, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        // Request1: Retrieve information from Cognito User Pool
        // Call the API with Cognito User Pool URL
        const user = await getCurrentUser();
        const session = await fetchAuthSession();

        if (!session)
          return {
            error: {
              data: (session as AuthError).cause,
              status: 500,
              statusTex: (session as AuthError).message,
            },
          };

        const { userSub } = session; // cognito ID
        const { accessToken } = session.tokens ?? {};

        // Request2: Retrive information fro RDS
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

    // getAuthUser: build.query({
    //   queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
    //     try {
    //       // Request1: Retrieve information from Cognito User Pool
    //       // Call the API with Cognito User Pool URL
    //       const user = await getCurrentUser();
    //       const session = await fetchAuthSession();
    //       if (!session) throw new Error("No session found");
    //       const { userSub } = session; // cognito ID
    //       const { accessToken } = session.tokens ?? {};

    //       // Request2: Retrive information fro RDS
    //       // Call the API with Base URL
    //       const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
    //       const userDetails = userDetailsResponse.data as User;

    //       return { data: { user, userSub, userDetails } };
    //     } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    //       return { error: error.message || "Couldn't fetch user data" };
    //     }
    //   },
    // }),

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
