import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountState = {
  signer: any;
  provider: any;
  address: any;
  chain: any;
};

type GlobalState = {
  auth: boolean;
  web3: AccountState | null;
};

const initialState: GlobalState = {
  auth: false,
  web3: {
    signer: null,
    provider: null,
    address: null,
    chain: null,
  },
};

export const accountSlicer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setWeb3: (state, action: PayloadAction<AccountState>) => {
      state.web3 = action.payload;
    },
  },
});

export const { setAuth, setWeb3 } = accountSlicer.actions;
export default accountSlicer.reducer;
