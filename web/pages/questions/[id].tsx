import { withUrqlClient } from 'next-urql';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Comments from '../../Components/Comments';
import MarkDown from '../../Components/MDEditor';
import Question from '../../Components/Question';
import { useCreateCommentMutation } from '../../generated/graphql';
import {
  setAcceptedAnswer,
  setBountyAmount,
  setCurrentQuestionCreatorId,
} from '../../redux/actions/questionAction';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { GetAvatar } from '../../utils/getAvatar';
import { useGetIntId } from '../../utils/useGetIntId';
import { useGetQuestionFromUrl } from '../../utils/useGetQuestionFromUrl';

const DetailedQuestion = () => {
  const questionId = useGetIntId();
  const dispatch = useDispatch();
  const [{ data, error, fetching }] = useGetQuestionFromUrl();
  const [comment, setComment] = useState<{
    text: string;
    html: string;
  }>({
    text: '',
    html: '',
  });
  const [address, setAddress] = useState<null | string>(null);

  const [, createComment] = useCreateCommentMutation();

  const addCommentHandler = async () => {
    if (data.question.bountyAmount && (address === '' || address === null)) {
      alert('Address cannot be null');
      return;
    }

    if (comment.text === '' || comment.html === '') {
      alert('Comment cannot be null');
      return;
    }

    console.log('creating comment');
    const { error } = await createComment({ ...comment, questionId, address });

    if (!error) {
      console.log('comment created successfully');
      setComment({ html: '', text: '' });
      setAddress(null);
    } else {
      console.log('error while creating comment: ', error);
    }
  };

  useEffect(() => {
    console.log('comment state: ', comment);
  }, [comment]);

  if (fetching) {
    return (
      <div className="m-auto text-activityBlue font-medium text-md text-center">
        Loading ...
      </div>
    );
  }

  if (error) {
    console.log('error while fetching question', error);
  }

  if (data && !data.question) {
    return (
      <div className="m-auto text-activityBlue font-medium text-md text-center">
        Question not found
      </div>
    );
  }

  if (data && !error) {
    dispatch(setAcceptedAnswer(data.question.acceptedAnswer));
    dispatch(setBountyAmount(data.question.bountyAmount));
    dispatch(setCurrentQuestionCreatorId(data.question.creator.githubId));
  }

  return (
    <div className="overflow-y-auto h-full p-2">
      {data?.question && <Question question={data.question} />}
      {data?.question?.imageUrls?.length !== 0 && (
        <div className="ml-12 flex justify-around">
          {data?.question?.imageUrls?.map((image, index) => (
            <div
              key={index}
              className=" inline-block mr-4 border-activityBlue border-2"
            >
              <GetAvatar path={image} styles="w-auto h-48" />
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 overflow-y-auto">
        <Comments pageProps />
      </div>
      <div className="w-full lg:w-11/12 xl:w-10/12 mt-4 mb-4 m-auto ">
        <div className="w-full h-64 overflow-y-auto">
          <MarkDown value={comment} setValue={setComment} />
        </div>
        {data.question.bountyAmount && (
          <div>
            <div className="font-semibold text-lg text-activityBlue mt-4">
              Enter Ethereum wallet address to claim the bounty
            </div>
            <input
              className="p-2 rounded-md bg-greyS text-activityBlue text-lg focus:border-activityBlue w-10/12 sm:w-6/12"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        )}
        <button
          onClick={addCommentHandler}
          className="border-none bg-iconBlue text-blue font-semibold text-lg mt-4 mb-32 sm:mb-12 rounded-md p-2 pl-3 pr-3"
        >
          Add answer
        </button>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 0.6rem;
          height: 4rem;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          display: none;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #132b4f;
          border: 1px solid #637b9f;
          border-radius: 0.5rem;
          margin-left: 0.2rem;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #fff;
          width: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(
  DetailedQuestion
);
