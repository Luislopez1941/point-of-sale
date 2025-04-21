import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const branchSlice = createSlice({
  name: 'branch',
  initialState: [] as any[],
  reducers: {
    setBranch: (_, action: PayloadAction<any[] | 'reset'>) => {
        if (action.payload === 'reset') return [];
        return [...action.payload]; // ← aquí guardas el array directamente
      },
  },
});

export const { setBranch } = branchSlice.actions;
export default branchSlice.reducer;
