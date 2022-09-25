import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import contractSlicer from "store/slicers/contracts";
import accountSlicer from "./slicers/account";
import themeSlice from "./slicers/theme";

export const store = configureStore({
  reducer: {
    account: accountSlicer,
    contracts: contractSlicer,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return customizedMiddleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
