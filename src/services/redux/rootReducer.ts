import { combineReducers } from "@reduxjs/toolkit";
import { customerSlice } from "./reducers/customer";
import { _coreSlice } from "./reducers/_core";

const rootReducer = combineReducers({
    _core: _coreSlice.reducer,
    customer: customerSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;