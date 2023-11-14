import React from 'react';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    // You can use this hook for global context providers, layouts, etc.

    return <Component {...pageProps} />;
};

export default MyApp;
