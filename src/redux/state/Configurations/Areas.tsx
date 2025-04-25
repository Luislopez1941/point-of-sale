import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const areasSlice = createSlice({
  name: 'series',
  initialState: {
    areas: [] as any[]  // Mantienes el array vacío en el estado inicial
  },
  reducers: {
    setAreas: (state: any, action: PayloadAction<any[] | 'reset'>) => {
        if (action.payload === 'reset') {
          state.series = [];  // Aquí resetemos solo la propiedad 'series'
        } else {
          state.areas = [...action.payload];  // Aquí actualizamos solo la propiedad 'series'
        }
      },
  },
});

export const { setAreas } = areasSlice.actions;
export default areasSlice.reducer;
