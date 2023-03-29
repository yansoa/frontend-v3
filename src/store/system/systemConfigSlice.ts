import { createSlice } from "@reduxjs/toolkit";

type SystemConfigStoreInterface = {
  vip: boolean;
  live: boolean;
  book: boolean;
  topic: boolean;
  paper: boolean;
  practice: boolean;
  mockPaper: boolean;
  wrongBook: boolean;
  wenda: boolean;
  share: boolean;
  codeExchanger: boolean;
  snapshort: boolean;
  ke: boolean;
  promoCode: boolean;
  daySignIn: boolean;
  credit1Mall: boolean;
  tuangou: boolean;
  miaosha: boolean;
  cert: boolean;
};

let defaultValue: SystemConfigStoreInterface = {
  vip: true,
  live: false,
  book: false,
  topic: false,
  paper: false,
  practice: false,
  mockPaper: false,
  wrongBook: false,
  wenda: false,
  share: false,
  codeExchanger: false,
  snapshort: false,
  ke: false,
  promoCode: false,
  daySignIn: false,
  credit1Mall: false,
  tuangou: false,
  miaosha: false,
  cert: false,
};

const systemConfigSlice = createSlice({
  name: "systemConfig",
  initialState: {
    value: defaultValue,
  },
  reducers: {
    saveConfigAction(stage, e) {
      stage.value = e.payload;
    },
  },
});

export default systemConfigSlice.reducer;
export const { saveConfigAction } = systemConfigSlice.actions;

export type { SystemConfigStoreInterface };
