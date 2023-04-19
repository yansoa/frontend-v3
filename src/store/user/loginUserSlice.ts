import { createSlice } from "@reduxjs/toolkit";

type UserStoreInterface = {
  user: any;
  isLogin: boolean;
  freshUnread: boolean;
};

let defaultValue: UserStoreInterface = {
  user: null,
  isLogin: false,
  freshUnread: false,
};

const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    value: defaultValue,
  },
  reducers: {
    loginAction(stage, e) {
      stage.value.user = e.payload;
      stage.value.isLogin = true;
      stage.value.freshUnread = true;
    },
    logoutAction(stage) {
      stage.value.user = null;
      stage.value.isLogin = false;
    },
    changeUserCredit(stage, e) {
      stage.value.user.credit1 = e.payload;
    },
    saveUnread(stage, e) {
      stage.value.freshUnread = e.payload;
    },
  },
});

export default loginUserSlice.reducer;
export const { loginAction, logoutAction, saveUnread, changeUserCredit } =
  loginUserSlice.actions;

export type { UserStoreInterface };
