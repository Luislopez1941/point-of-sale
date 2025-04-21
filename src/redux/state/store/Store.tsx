import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
  name: 'store',
  initialState: [] as any[],
  reducers: {
    setStore: (_, action: PayloadAction<any[] | 'reset'>) => {
        if (action.payload === 'reset') return [];
        return [...action.payload]; // ← aquí guardas el array directamente
      },
  },
});

export const { setStore } = storeSlice.actions;
export default storeSlice.reducer;
