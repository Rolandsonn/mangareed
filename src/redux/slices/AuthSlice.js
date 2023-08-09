import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (dataReg) => {
    try {
      const response = await axios.post("api/auth/signup/", dataReg, {
        headers: { "Content-type": "multipart/form-data" },
      });

      return response;
    } catch (error) {
      console.error("registerUser error", error);
    }
  }
);

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get("api/auth/profile/");
    return response.data;
  } catch (error) {
    console.error("getUser error", error);
  }
});

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (data, { dispatch }) => {
    try {
      await axios.post("api/auth/logout/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(Cookies.get("tokenAccess"))
          )}`,
        },
      });
      dispatch(setLogOut());
    } catch (error) {
      console.error(error);
    }
  }
);

export const authUser = createAsyncThunk("auth", async (data) => {
  try {
    const response = await axios.post("api/auth/signin/", data);

    return response.data;
  } catch (error) {
    console.error("authUser error", error);
  }
});

const initialState = {
  isAuth: false,
  users: [],
  imageProfile: "",
  dataUser: {
    username: "",
    password: "",
  },
};

const authAndRegSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.dataUser.username = action.payload;
    },
    setPassword(state, action) {
      state.dataUser.password = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLogOut(state) {
      state.isAuth = false;
    },
    setAccount(state, action) {
      state.dataUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      localStorage.setItem("account", JSON.stringify(action.payload));
      localStorage.setItem(
        "tokenAccess",
        JSON.stringify(action.payload.access)
      );
      localStorage.setItem(
        "tokenRefresh",
        JSON.stringify(action.payload.refresh)
      );
      localStorage.setItem("isAuth", JSON.stringify(true));
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.dataUser = action.payload;
      localStorage.setItem("account", JSON.stringify(action.payload));
      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem(
        "tokenAccess",
        JSON.stringify(action.payload.access)
      );
      localStorage.setItem(
        "tokenRefresh",
        JSON.stringify(action.payload.refresh)
      );
    });
  },
});

export default authAndRegSlice.reducer;
export const { setIsAuth, setAccount, setUsername, setPassword, setLogOut } =
  authAndRegSlice.actions;
