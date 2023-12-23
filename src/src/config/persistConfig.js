import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['auth', 'cart'] // Persisting only the 'auth' state to storage.
}

export default persistConfig;
