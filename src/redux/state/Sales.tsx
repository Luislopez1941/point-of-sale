import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const salesSlice = createSlice({
  name: 'sales',
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

export const { updateSales } = salesSlice.actions;

export default salesSlice.reducer;
