import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  isLoginWindowOpen: boolean;
  isAuthenticated: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  isLoginWindowOpen: false,
  isAuthenticated: false,
};

/**
 * Stores Dark/Light mode and Sidebar collapse/display states
 */
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },

    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },

    setIsLoginWindowOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginWindowOpen = action.payload;
    },

    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators
export const {
  setIsSidebarCollapsed,
  setIsDarkMode,
  setIsLoginWindowOpen,
  setIsAuthenticated,
} = globalSlice.actions;

export default globalSlice.reducer;
