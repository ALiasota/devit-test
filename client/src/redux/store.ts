import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authApi } from './auth/authSlice'
import { postsApi } from './posts/postsSlice'

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token']
}

const persistedReducer = persistReducer(authPersistConfig, authApi.reducer)

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: persistedReducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
    postsApi.middleware,
    authApi.middleware
  ]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
