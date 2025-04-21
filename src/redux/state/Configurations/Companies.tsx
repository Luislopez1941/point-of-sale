import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: [] as any[],
  reducers: {
    setCompanies: (_, action: PayloadAction<any[] | 'reset'>) => {
        if (action.payload === 'reset') return [];
        return [...action.payload]; // ← aquí guardas el array directamente
      },
  },
});

export const { setCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
