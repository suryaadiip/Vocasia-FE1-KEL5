import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";
import authReducer from "./features/authSlice";
import persistConfig from "./config/persistConfig";

const rootReducer = combineReducers({
  products: productSlice,
  cart: cartSlice,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
