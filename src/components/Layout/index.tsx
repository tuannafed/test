import { Fragment, ReactNode } from 'react';

import Head from 'next/head';
import { AuthLayout } from './AdminLayout';
import { GuestLayout } from './GuestLayout';

// import { NextScript } from 'next/document';
export interface LayoutProps {
  title?: string | undefined;
  description?: string;
  children: ReactNode;
  variant?: 'default' | 'auth' | 'blank';
  extraMetaTags?: ReactNode;
}

export const Layout = ({
  title,
  description,
  children,
  variant = 'default',
  extraMetaTags
}: LayoutProps) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" /> */}
        {extraMetaTags}
      </Head>
      {variant === 'auth' ? (
        <AuthLayout title={title}>{children}</AuthLayout>
      ) : variant === 'default' ? (
        <GuestLayout>{children}</GuestLayout>
      ) : (
        children
      )}
    </Fragment>
  );
};

export * from './AdminLayout/AuthMenu';
