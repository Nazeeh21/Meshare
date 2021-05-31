import { LayoutProps } from 'framer-motion';
import React from 'react';
import { ActivityBar } from './ActivityBar';
import { MidComponent } from './MidComponent';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-background p-4 flex'>
      <Sidebar />
      <MidComponent />
      <ActivityBar />
      {/* {children} */}
    </div>
  );
};
