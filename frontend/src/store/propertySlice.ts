import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import axios from "axios";

interface Property {
  id: number;
  name: string;
  description: string;
}

interface PropertyState {
  items: Property[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PropertyState = {
  items: [],
  status: "idle",
  error: null,
};

const devStatus: string = "development";
const baseUrl: string = devStatus == "development" ? "http://127.0.0.1:8000" : "";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProperties = createAsyncThunk<Property[], void, { state: RootState }>("properties/fetchProperties", async () => {
  const response = await api.get<Property[]>(`/api/properties/`);
  return response.data;
});

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch properties";
      });
  },
});

export default propertySlice.reducer;
