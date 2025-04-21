// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models/user.model";
import userSliceReducer from "./state/user";
import modalsSliceReducer from "./state/modals";
import Sales from './state/Sales'
import Categories from './state/Categories'
import selectReducer from './state/general/Select';
import loginReducer from './state/login/Login';
import companiesReducer from './state/Configurations/Companies';
import branchReducer from './state/Configurations/Branch';
import storeReducer from './state/store/Store';
import unitsReducer from './state/catalogos/Units'
import inventoryReducer from './state/store/Inventory'

export interface AppStore {
    user: UserInfo;
    modals: string;
    categories: any;
    sales: any;
    select: any;
    login: any;
    companies: any;
    branch: any;
    store: any;
    units: any;
    inventory: any;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer,
        modals: modalsSliceReducer,
        select: selectReducer,
        sales: Sales,
        categories: Categories,
        login: loginReducer,
        companies: companiesReducer,
        branch: branchReducer,
        store: storeReducer,
        units: unitsReducer,
        inventory: inventoryReducer
    }
});
