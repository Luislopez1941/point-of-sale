import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  data: Record<string, any>;
  statusCreate: boolean;
  statusLogin: boolean;
}

const initialState: LoginState = {
  data: {},
  statusCreate: false,
  statusLogin: false  // El estado inicial es 'false' (no en proceso de creación)
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Acción para actualizar el estado con un nuevo payload o resetearlo
    updateData: (state, action: PayloadAction<any | 'reset'>) => {
      if (action.payload === 'reset') {
        state.data = {};  // Restablecer solo los datos, no todo el estado
      } else {
        state.data = { ...state.data, ...action.payload }; // Actualizar parcialmente
      }
    },
    // Acción para establecer datos directamente
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    // Acción para actualizar el estado de la creación
    setStatusCreate: (state, action: PayloadAction<boolean>) => {
      state.statusCreate = action.payload;
    },
    setStatusLogin: (state, action: PayloadAction<boolean>) => {
        state.statusLogin = action.payload;
      },
  },
});

export const { updateData, setData, setStatusCreate, setStatusLogin } = loginSlice.actions;

export default loginSlice.reducer;
