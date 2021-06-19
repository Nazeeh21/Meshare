import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

export default () => {
  return (
    <div className='w-full h-full'>
      <MdEditor
      readOnly={false}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
            hideMenu: true,
          },
          table: {
            maxRow: 5,
            maxCol: 6,
          },
          // imageUrl: 'https://octodex.github.com/images/minion.png',
          syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
        }}
        onChange={({html, text}, event) => {
          console.log('text: ', text);
          console.log('html: ', html)
        }}
        style={{ height: '100%' }}
        renderHTML={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>}
      />
    </div>
  );
};