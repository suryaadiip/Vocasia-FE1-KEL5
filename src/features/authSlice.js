import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authLogin } from "../services/auth";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: '',
  token: null,
}

export const userLogin = createAsyncThunk('auth/login', async ({username, password}) => {
  try {
    
    const token = await authLogin({username, password});
    return token;

  } catch(error) {
    throw(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.errorMessage = '';
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.errorMessage = '';
    })
    .addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.errorMessage = '';
      state.token = action.payload;
    })
    .addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.errorMessage = action.error.message;
    })
  }
});

export const { userLogout } = authSlice.actions;
export default authSlice.reducer;