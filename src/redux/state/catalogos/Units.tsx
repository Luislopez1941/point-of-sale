import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const unitsSlice = createSlice({
  name: 'units',
  initialState: [] as any[],
  reducers: {
    setUnits: (_, action: PayloadAction<any[] | 'reset'>) => {
        if (action.payload === 'reset') return [];
        return [...action.payload]; // ← aquí guardas el array directamente
      },
  },
});

export const { setUnits } = unitsSlice.actions;
export default unitsSlice.reducer;
