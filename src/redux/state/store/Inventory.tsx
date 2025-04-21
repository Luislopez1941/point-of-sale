import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const inventorySlice = createSlice({
    name: 'store',
    initialState: {
        modal: '',
        subModal: '',

        branch: [],
        store: [],
        units: []
    },
    reducers: {
        setModal: (state, action: PayloadAction<string>) => {
            state.modal = action.payload;
        },
        setSubModal: (state, action: PayloadAction<string>) => {
            state.subModal = action.payload;
        },
        resetModals: (state) => {
            state.modal = '';
            state.subModal = '';
        },
        setBranch: (state, action: PayloadAction<any>) => {
            state.branch = action.payload;
        },
        setStore: (state, action: PayloadAction<any>) => {
            state.store = action.payload;
        },
        setUnits: (state, action: PayloadAction<any>) => {
            state.units = action.payload;
        },
    },
});

export const { setModal, setSubModal, resetModals, setUnits, setBranch, setStore } = inventorySlice.actions;
export default inventorySlice.reducer;
