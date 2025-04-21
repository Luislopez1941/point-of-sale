import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    updateCategories: (state: any, action: PayloadAction<any | 'reset'>) => {
      if (action.payload === 'reset') {
        return null;
      }
      return { ...state, ...action.payload };
    },
    setCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },

  },
});

export const { updateCategories, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
