import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        localId:"",
        image:"",       
        token:"",
        firstName:"",

    },
    reducers:{
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setLocalId: (state, action) =>{
            state.localId = action.payload;
        },
         setFirstName: (state, action) =>{ 
            state.firstName = action.payload;
        },
         setImage: (state,action) => {
            state.image = action.payload
        },
        clearUser:(state) => {
            state.email = ""
            state.localId=""
            state.image=""
            state.firstName=""
        },
          logout: (state) => {
            state.email = null;
            state.localId = null;
            state.token = null;
            state.image = null;
            state.firstName=""
        }
    },
     
});

export const { setEmail, setLocalId, setImage, clearUser, logout, setFirstName } = userSlice.actions;
export default userSlice.reducer;

