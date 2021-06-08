import { useRouter } from 'next/router';
import React from 'react';
import { Tag } from './Tags';

interface QuestionProps {
  question: any;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const router = useRouter();
  return (
    <div className='flex'>
      <img
        className='w-10 h-10 rounded-full mr-2 cursor-pointer'
        onClick={() =>
          router.push(`https://github.com/${question.creator.name}`)
        }
        src={question.creator.avatarUrl}
        alt={question.creator.name}
      />
      <div className='w-full rounded-md bg-activityBlue text-white rounded-tl-none p-2 mb-4 pl-3'>
        <div className='flex justify-space items-center mb-4'>
          {router.pathname === '/' ? (
            <div
              className='cursor-pointer'
              onClick={() => router.push(`/questions/${question.id}`)}
            >
              {question.description.slice(0, 100)}{' '}
              {question.description.length > 100 && <span>. . .</span>}
            </div>
          ) : (
            <div>{question.description}</div>
          )}
          <div>{/* TODO: Like and unlike options */}</div>
        </div>
        {question?.tags &&
          question?.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
        <div className='mt-2'>
          Posted by:{' '}
          <a
            href={`https://github.com/${question.creator.name}`}
            className='inline-block font-medium'
          >
            {question.creator.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Question;
