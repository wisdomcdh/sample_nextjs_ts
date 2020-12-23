import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface _coreState {
    modal: Array<ModalOpenInfo<AppAlertOpenType>>
}
const initialState: _coreState = {
    modal: []
}
const _coreSlice = createSlice({
    name: '_core',
    initialState,
    reducers: {
        showModal(state, action: PayloadAction<ModalOpenInfo<AppAlertOpenType>>) {
            state.modal.push(action.payload);
        },
        destroyModal(state, action: PayloadAction<ModalOpenInfo<AppAlertOpenType>>) {
            const findIndex = state.modal.findIndex(v => v.key === action.payload.key);
            state.modal.splice(findIndex, 1);
        }
    }
});

export { _coreSlice };