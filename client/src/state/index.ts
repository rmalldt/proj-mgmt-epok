import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  isGuest: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  isGuest: false,
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

    setIsGuestUser: (state, action: PayloadAction<boolean>) => {
      state.isGuest = action.payload;
    },
  },
});

// Action creators
export const { setIsSidebarCollapsed, setIsDarkMode, setIsGuestUser } =
  globalSlice.actions;
export default globalSlice.reducer;
