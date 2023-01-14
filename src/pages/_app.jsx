/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
