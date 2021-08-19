/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RootStateOrAny, useSelector } from 'react-redux';
import Meshare from '../ethereum/Meshare';
import web3 from '../ethereum/web3';
import { useAcceptAnswerMutation } from '../generated/graphql';

interface CommentCompProps {
  comment: any;
  acceptAnswerLoading: boolean;
  setAcceptAnswerLoading: (loading: boolean) => void;
}

export const CommentComp: React.FC<CommentCompProps> = ({
  comment,
  acceptAnswerLoading,
  setAcceptAnswerLoading,
}) => {
  const userData = useSelector((state: RootStateOrAny) => state.main.userData);
  const bountyAmount = useSelector(
    (state: RootStateOrAny) => state.question.bountyAmount
  );

  const acceptedAnswer = useSelector(
    (state: RootStateOrAny) => state.question.acceptedAnswer
  );
  const currentQuestionCreatorId = useSelector(
    (state: RootStateOrAny) => state.question.currentQuestionCreatorId
  );

  console.log('comment: ', comment);
  const router = useRouter();
  const questionId = router.query.id;

  const [, acceptAnswer] = useAcceptAnswerMutation();

  const acceptAnswerHandler = async () => {
    if (acceptAnswerLoading) {
      return;
    }
    setAcceptAnswerLoading(true);
    const { error } = await acceptAnswer({
      answerId: comment.id,
      questionId: +questionId,
    });
    if (error) {
      throw error;
    } else {
      if (bountyAmount) {
        const accounts = await web3.eth.getAccounts();
        await Meshare.methods.acceptAnswer(comment.address, +questionId).send({
          from: accounts[0],
        });
      }
      console.log('answer accepted successfully');
      setAcceptAnswerLoading(false);
      router.reload();
    }
  };

  return (
    <div className={`w-full mb-2 p-2`}>
      <div
        className={`flex w-full ${
          acceptedAnswer && acceptedAnswer?.id === comment.id
            ? 'justify-end'
            : 'justify-start'
        }`}
      >
        {acceptedAnswer?.id !== comment.id && (
          <img
            className='w-10 h-10 rounded-full mr-2 cursor-pointer'
            onClick={() =>
              router.push(`https://github.com/${comment.creator.name}`)
            }
            src={comment.creator.avatarUrl}
            alt={comment.creator.name}
          />
        )}
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
        {!acceptedAnswer &&
          userData &&
          currentQuestionCreatorId === userData.githubId && (
            <div className='ml-3'>
              <button
                disabled={acceptAnswerLoading}
                onClick={acceptAnswerHandler}
                className={`border-none ${acceptAnswerLoading && 'cursor-not-allowed'} bg-iconBlue text-blue font-semibold text-sm mt-4 mb-32 sm:mb-12 rounded-md p-2 pl-3 pr-3`}
              >
                {acceptAnswerLoading ? 'Loading' : 'Accept Answer'}
              </button>
            </div>
          )}
        {acceptedAnswer && acceptedAnswer?.id === comment.id && (
          <img
            className='w-10 h-10 rounded-full ml-2 cursor-pointer'
            onClick={() =>
              router.push(`https://github.com/${comment.creator.name}`)
            }
            src={comment.creator.avatarUrl}
            alt={comment.creator.name}
          />
        )}
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
