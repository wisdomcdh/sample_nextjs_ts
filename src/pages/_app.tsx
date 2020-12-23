// import App from 'next/app'
import { Provider } from 'react-redux';
import type { AppProps /*, AppContext */ } from 'next/app'
import { GlobalContextProvider } from '@Services/context/GlobalContext';
import Alert from '@Components/common/alert';
import { DefaultLayout } from '@Components/layout';
import store from '@Services/redux'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <GlobalContextProvider>
                <DefaultLayout>
                    <Component {...pageProps} />
                </DefaultLayout>
                <Alert />
            </GlobalContextProvider>
        </Provider>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp