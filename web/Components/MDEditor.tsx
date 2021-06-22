import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

interface MarkDown {
  value: {
    text: String;
    html: String;
  };
  setValue: any;
}

const Markdwon: React.FC<MarkDown> = ({ value, setValue }) => {
  return (
    <div className='w-full h-full'>
      <MdEditor
        value={value.text}
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
        onChange={({ html, text }, event) => {
          setValue({ html, text });
          // console.log('typeof html: ', typeof html);
          // console.log('typeof text: ', typeof text);
          // console.log('text: ', text);
          // console.log('html: ', html);
        }}
        style={{ height: '100%' }}
        renderHTML={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>}
      />
    </div>
  );
};

export default Markdwon;
