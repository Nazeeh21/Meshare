import { LayoutProps } from 'framer-motion';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '../utils/createUrqlClient';
import { ActivityBar } from './ActivityBar';
import { MidComponent } from './MidComponent';
import { Sidebar } from './Sidebar';

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-background p-4 flex'>
      <Sidebar />
      <MidComponent children={children} />
      <ActivityBar />
      {/* {children} */}
    </div>
  );
};


export default withUrqlClient(createUrqlClient, {ssr: true})(AppLayout)