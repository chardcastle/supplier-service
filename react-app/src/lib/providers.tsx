'use client'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { reduxStore } from '@/lib/redux'
import React from "react";

export const Providers = (props: React.PropsWithChildren) => {
    return <Provider store={reduxStore}>{props.children}</Provider>
}
