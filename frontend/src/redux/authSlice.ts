import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isAuthentication: false,
    access_token: null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        signInRedux: (state, action) => {
            state.user= action.payload
            state.isAuthentication = true
            // state.access_token = action.payload.
        },

        signOutRedux: (state) => {
            state.user = null
            state.isAuthentication = false
            state.access_token = null
        }
    }
})

export const {signInRedux, signOutRedux} = authSlice.actions
export default authSlice.reducer