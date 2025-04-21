import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: null,
  reducers: {
    updateSales: (state: any, action: PayloadAction<any | 'reset'>) => {
      if (action.payload === 'reset') {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSales } = inventorySlice.actions;

export default inventorySlice.reducer;
            