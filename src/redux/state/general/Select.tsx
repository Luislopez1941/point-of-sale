// src/redux/selectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definimos el tipo para los objetos seleccionados
interface SelectedState {
  selectedItems: Record<string, any>; // Un registro con instanceId como clave y el objeto completo como valor
}

// Estado inicial
const initialState: SelectedState = {
  selectedItems: {},
};

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<{ instanceId: string; item: any | null }>) => {
      const { instanceId, item } = action.payload;
      state.selectedItems[instanceId] = item;
    },
  },
});

export const { setSelectedItem } = selectSlice.actions;
export default selectSlice.reducer;
