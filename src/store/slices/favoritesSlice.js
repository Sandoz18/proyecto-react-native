import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    value: [],
};


const favoriteSlice = createSlice({
name: 'favorites',
initialState,
reducers:{
    toggleFavorite: (state, action) => {
       const product = action.payload;
       const isProductInFavorites = state.value.some(
        (item)=> item.id == product.id
       );
       if(isProductInFavorites){
        state.value = state.value.filter(
            (item) => item.id !== product.id
        );
       }else{
        state.value.push(product);
       }


    }
    
}
});

export const {toggleFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer