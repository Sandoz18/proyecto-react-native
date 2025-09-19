import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {     
      const { product, quantity } = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity: quantity });
      }
      state.total = state.items.reduce((acc, currentItem) => acc + (currentItem.price * currentItem.quantity), 0);
    },
    removeOneUnit: (state, action) => {
      const productId = action.payload;
      const productToRemove = state.items.find((item) => item.id === productId);
      if (productToRemove && productToRemove.quantity > 1) {
        productToRemove.quantity -= 1;
      } else if (productToRemove && productToRemove.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== productId);
      }
      state.total = state.items.reduce((acc, currentItem) => acc + (currentItem.price * currentItem.quantity), 0);
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      state.total = state.items.reduce((acc, currentItem) => acc + (currentItem.price * currentItem.quantity), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeOneUnit, deleteProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
