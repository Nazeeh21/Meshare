/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

interface CommentCompProps {
  comment: any;
}

export const CommentComp: React.FC<CommentCompProps> = ({ comment }) => {
  const acceptedAnswer = useSelector(
    (state: any) => state.question.acceptedAnswer
  );
  console.log('comment: ', comment);
  const router = useRouter();

  return (
    <div
      className={`w-full mb-2 p-2`}
    >
      <div className={`flex w-full ${acceptedAnswer && acceptedAnswer?.id === comment.id ? 'justify-end' : 'justify-start'}`}>
        {acceptedAnswer && acceptedAnswer?.id !== comment.id  && <img
          className='w-10 h-10 rounded-full mr-2 cursor-pointer'
          onClick={() =>
            router.push(`https://github.com/${comment.creator.name}`)
          }
          src={comment.creator.avatarUrl}
          alt={comment.creator.name}
        />}
        <div
          className={`rounded-md w-9/12 ${
            acceptedAnswer && acceptedAnswer?.id === comment.id
              ? 'bg-acceptedAnswer text-black mr-0 rounded-tr-none'
              : 'text-white bg-iconBlue rounded-tl-none'
          } p-2 mb-4 pl-3`}
        >
          <div className='overflow-x-auto'>
            {/* {comment.text} */}
            <ReactMarkdown>{comment.text}</ReactMarkdown>
          </div>
          <div className='mt-4'>
            Posted by:{' '}
            <a
              href={`https://github.com/${comment.creator.name}`}
              className='inline-block font-medium'
            >
              {comment.creator.name}
            </a>
          </div>
        </div>
        {acceptedAnswer && acceptedAnswer?.id === comment.id  && <img
          className='w-10 h-10 rounded-full ml-2 cursor-pointer'
          onClick={() =>
            router.push(`https://github.com/${comment.creator.name}`)
          }
          src={comment.creator.avatarUrl}
          alt={comment.creator.name}
        />}
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.6rem;
          width: 4rem;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          display: none;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #1389e6;
          border: 1px solid #1c3f73;
          border-radius: 0.5rem;
          margin-left: 0.2rem;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #fff;
          width: 0.8rem;
        }
        ReactMarkdown pre {
          background: #000 !important;
        }
      `}</style>
    </div>
  );
};
