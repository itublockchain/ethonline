import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contract } from "ethers";

type ContractState = {
  MARKETPLACE: Contract | null;
  SOURCE: Contract | null;
};

const initialState: ContractState = {
  MARKETPLACE: null,
  SOURCE: null,
};

export const contractSlicer = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setMarketPlaceContract: (state, action: PayloadAction<any>) => {
      state.MARKETPLACE = action.payload;
    },
    setSourceContract: (state, action: PayloadAction<any>) => {
      state.SOURCE = action.payload;
    },
  },
});

export const { setMarketPlaceContract, setSourceContract } =
  contractSlicer.actions;
export default contractSlicer.reducer;
