import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    stream: [
        {
            url: "",
            ownner: "",
            calling: false,
        },
    ]
}

export const streamSlice = createSlice({
    name: "stream",
    initialState,
    reducers: {
        setStreamUrl: (state, action) => {
            const { roomId, owner } = action.payload;
            state.stream.push({url: roomId, owner: owner, calling: calling});
        },

        clearStreamUrl: (state, action) => {
            state.stream = state.stream.filter((stream) => stream.url !== action.payload);
            console.log("Successfull in clearing")
        },

        clearAllStreamUrl: (state) => {
            state.stream = [];
        }
    }
})

export const { setStreamUrl, clearStreamUrl, clearAllStreamUrl } = streamSlice.actions;
export default streamSlice.reducer;