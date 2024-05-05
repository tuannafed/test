import { Loading, Notications } from 'components';

import { CssBaseline } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useSelectAppLoaded } from './redux';

export default function AppProvider({ children }: PropsWithChildren) {
  const showLoading = useSelectAppLoaded();

  return (
    <>
      <CssBaseline />
      <Notications>{children}</Notications>
      {showLoading && <Loading open={showLoading} />}
    </>
  );
}
