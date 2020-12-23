import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiStore, { LoginReqDTO, LoginResDTO } from '@Services/apiStore'
import reducerHandler from '@Services/utils/reducerHandler'

const name = "customer";

const fetchLogin = createAsyncThunk(
    `${name}/fetchLogin`,
    async (reqDto: LoginReqDTO) => {
        const response = await ApiStore.customer.login(reqDto);
        return response.data
    }
);

const fetchExtension = createAsyncThunk(
    `${name}/fetchExtension`,
    async () => {
        const response = await ApiStore.customer.extention();
        return response.data;
    }
);

interface customerState {
    login: LoginResDTO,
    extension: any
}
const initialState: customerState = {
    login: { name: '' },
    extension: {}
}

const customerSlice = createSlice({
    name: `${name}`,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLogin.pending.type]: reducerHandler.pending<customerState>('login'),
        [fetchLogin.fulfilled.type]: reducerHandler.fulfilled<customerState>('login'),
        [fetchLogin.rejected.type]: reducerHandler.rejected<customerState>('login'),

        [fetchExtension.fulfilled.type]: reducerHandler.fulfilled<customerState>('extension'),
        [fetchExtension.rejected.type]: reducerHandler.rejected<customerState>('extension')
    }
});

const customerFetch = {
    fetchLogin,
    fetchExtension
}

export {
    customerSlice,
    customerFetch
}