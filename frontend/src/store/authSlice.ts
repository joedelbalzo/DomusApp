import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "./index";
import api from "./api";

// interface Auth {
//   id: number;
//   name: string;
//   description: string;
// }

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data.access_token;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed. Please try again.");
  }
});

export const register = createAsyncThunk("auth/register", async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const response = await api.post("/register", { email, password });
    return response.data.access_token;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed. Please try again.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = "null";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
