import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = "https://pgsystem-g2hecxxdd85jex.southeastasia-01.azurewebsites.net/api/Admin/Users";

// Thunk để gọi API lấy danh sách user
export const getUsersContent = createAsyncThunk('/users/content', async () => {
    const response = await axios.get(API_URL);
    return response.data.data;  // Trả về danh sách user từ API
});

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        users: [],
        filteredUsers: []
    },
    reducers: {
        addNewUser: (state, action) => {
            state.users.push(action.payload);
            state.filteredUsers = state.users;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.uid !== action.payload);
            state.filteredUsers = state.users;
        },
        filterUsers: (state, action) => {
            const { searchText, role } = action.payload;
            state.filteredUsers = state.users.filter(user => {
                return (
                    (searchText === "" || user.email.toLowerCase().includes(searchText.toLowerCase())) &&
                    (role === "All" || user.role === role)
                );
            });
        }
    },
    extraReducers: {
        [getUsersContent.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsersContent.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.filteredUsers = action.payload;
            state.isLoading = false;
        },
        [getUsersContent.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addNewUser, deleteUser, filterUsers } = usersSlice.actions;
export default usersSlice.reducer;
