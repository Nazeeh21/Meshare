import { LayoutProps } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { SearchBarHolder } from './SearchBarHolder';

export const MidComponent: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  // console.log(router)
  return (
    <div
      className={`sm:h-sidebarH h-full w-full bg-midSection sm:pt-12 sm:px-4 p-0 ${
        router.asPath === '/create-question'
          ? 'overflow-x-hidden mx-1'
          : 'overflow-hidden'
      }`}
    >
      {router.asPath !== '/create-question' ? (
        <SearchBarHolder>{children}</SearchBarHolder>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
