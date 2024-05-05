import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'styles/main.scss';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { store } from 'common/redux';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { theme } from 'themes';
import { createEmotionCache } from 'utils';
import AppProvider from '../modules/App/AppProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? (page => page);
  return (
    <>
      <Head>
        <meta key="og:title" property="og:title" content={pageProps?.title} />,
        <meta
          key="og:description"
          property="og:description"
          content={pageProps?.description}
        />
        <meta key="og:url" property="og:url" content={pageProps?.url} />
        <meta key="og:image" property="og:image" content={pageProps?.images} />
        <meta
          key="twitter:title"
          name="twitter:title"
          content={pageProps?.title}
        />
        <meta
          key="twitter:url"
          property="twitter:url"
          content={pageProps?.url}
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={pageProps?.description}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={pageProps?.images}
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <AppProvider>
                {getLayout(<Component {...pageProps} />)}
              </AppProvider>
            </Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </>
  );
};

export default App;
