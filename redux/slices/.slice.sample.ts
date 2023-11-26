import { PayloadAction, createAsyncThunk, createListenerMiddleware, createSlice, isAnyOf } from "@reduxjs/toolkit"
// import appSlice from "./appSlice"
import registerEffect from "../../util/registerEffect"

type State = {
    sth: string
}
const initialState: State = {
    sth: ""
}

const slice = createSlice(
    {
        name: "sth",
        initialState,
        reducers: {
            reset: (state) => {
                return initialState
            }
        },
        extraReducers: (builder) => {
            builder.addCase(someThunkAction.fetchSth.fulfilled, (state, action) => {

            })
        }
    }
)

export const someThunkAction = {
    fetchSth: createAsyncThunk("get-sth", async () => {

    })
}

export const someMiddleware = createListenerMiddleware();

registerEffect(someMiddleware,
    [
        {
            action: "",
            effect: (action, { dispatch }) => {
            }
        }
    ]
);

export default slice;