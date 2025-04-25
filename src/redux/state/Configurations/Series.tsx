import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const seriesSlice = createSlice({
  name: 'series',
  initialState: {
    series: [] as any[]  // Mantienes el array vacío en el estado inicial
  },
  reducers: {
    setSeries: (state, action: PayloadAction<any[] | 'reset'>) => {
        if (action.payload === 'reset') {
          state.series = [];  // Aquí resetemos solo la propiedad 'series'
        } else {
          state.series = [...action.payload];  // Aquí actualizamos solo la propiedad 'series'
        }
      },
  },
});

export const { setSeries } = seriesSlice.actions;
export default seriesSlice.reducer;
