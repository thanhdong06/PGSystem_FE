import { configureStore } from '@reduxjs/toolkit';
import userReducer from './pages/admin/userSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
});
