import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        username: "",
        fullName: "",
        email: "",
        avatar: "",
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { username, fullName, email, avatar, accessToken, refreshToken } = action.payload;
            state.user.username = username;
            state.user.fullName = fullName;
            state.user.email = email;
            state.user.avatar = avatar;
            state.user.accessToken = accessToken;
            state.user.refreshToken = refreshToken;
            state.user.isAuthenticated = !!refreshToken;
        },

        clearUserData: (state) => {
            state.user = {};
        },
    }
})

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;