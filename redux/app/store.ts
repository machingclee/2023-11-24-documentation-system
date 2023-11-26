import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice, { authMiddleware } from "../slices/authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
    key: 'user',
    storage: storage,
    stateReconciler: autoMergeLevel2,
}

export const store = configureStore({
    reducer: {
        auth: persistReducer<ReturnType<typeof authSlice.reducer>>(authPersistConfig, authSlice.reducer),
    },
    devTools: true,
    middleware: (gDM) => gDM({
        serializableCheck: false
    }).concat(
        authMiddleware.middleware,
    )
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;