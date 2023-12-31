import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../../store/statuses";

const initialState = {
  user: { role: "user" },
  isAuthenticated: false,
  status: STATUSES.IDLE,
  error: null,
};

const setLoadingState = (state) => {
  state.status = STATUSES.LOADING;
};

const handleAuthFulfilled = (state, action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
  state.status = STATUSES.IDLE;
};

export const registerUser = createAsyncThunk("user/register", async (userData) => {
  try {
    const response = await axios.post("/api/v1/register", userData);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  try {
    const response = await axios.post("/api/v1/login", userData);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axios.get("/api/v1/logout");
});

export const loadUser = createAsyncThunk("user/load", async () => {
  try {
    const response = await axios.get("/api/v1/me");
    return response.data.user;
  } catch (error) {
    throw error.response.data
  }
});
export const updateUserProfile = createAsyncThunk("user/updateuserprofile", async (userData) => {
  const response = await axios.put("/api/v1/me/update", userData);
  return response.data.user;
});
export const updatepassword = createAsyncThunk('user/updatepassword', async (passwordData) => {
  try {
    const response = await axios.put("/api/v1/password/update", passwordData);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});
export const forgotPassword = createAsyncThunk("user/forgetpassword", async ({ email }) => {
  await axios.post("/api/v1/password/forgot", { email });
})
export const resetPassword = createAsyncThunk("user/resetpassword", async ({ token, passwordData }) => {
  console.log(token)
  await axios.put(`/api/v1/password/reset/${token}`, passwordData);
})
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.error = null;
      state.status = STATUSES.IDLE
    },
    resetIsProfileUpdated: (state, action) => {
      state.isProfileUpdated = null;
    },
    resetIspasswordUpdated: (state, action) => {
      state.isPasswordUpdated = null;
    },
    resetIsVerificationEmailSend: (state, action) => {
      state.isVerificationEmailSend = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, setLoadingState)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isVerificationEmailSend = true;
        state.status = STATUSES.IDLE;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUSES.ERROR
      })
      .addCase(updatepassword.pending, setLoadingState)
      .addCase(updatepassword.fulfilled, (state, action) => {
        state.isPasswordUpdated = true;
        state.status = STATUSES.IDLE;
        state.error = null;
      })
      .addCase(updatepassword.rejected, (state, action) => {
        state.error = action.error;
        state.status = STATUSES.ERROR;
      })
      .addCase(loginUser.pending, setLoadingState)
      .addCase(loginUser.fulfilled, handleAuthFulfilled)
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUSES.ERROR
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
      .addCase(loadUser.fulfilled, handleAuthFulfilled)
      .addCase(updateUserProfile.pending, setLoadingState)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
        state.isProfileUpdated = true;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { role: "user" };
        state.isAuthenticated = false;
        state.status = STATUSES.IDLE;
      });

  },
});

export default userSlice.reducer;
export const { resetIsProfileUpdated, resetIspasswordUpdated, resetError, resetIsVerificationEmailSend } = userSlice.actions;
