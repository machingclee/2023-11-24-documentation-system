"use client";
// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react';
import { PropsWithChildren } from "react";
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/app/store';

export default ({ children }: PropsWithChildren) => {
    return (
        <Provider store={store} >
            <PersistGate persistor={persistor}>
                {children}
            </ PersistGate>
        </ Provider>
    )
}


