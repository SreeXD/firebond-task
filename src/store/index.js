import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/appSlice'

const store = configureStore({
    reducer: appSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export default store