import { withUrqlClient } from 'next-urql';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comments from '../../Components/Comments';
import Question from '../../Components/Question';
import { setAcceptedAnswer } from '../../redux/actions/questionAction';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetQuestionFromUrl } from '../../utils/useGetQuestionFromUrl';

const DetailedQuestion = () => {
  const dispatch = useDispatch();
  const [{ data, error, fetching }] = useGetQuestionFromUrl();

  if (fetching) {
    return (
      <div className='m-auto text-activityBlue font-medium text-md text-center'>
        Loading ...
      </div>
    );
  }

  if (error) {
    console.log('error while fetching question', error);
  }

  if (data && !data.question) {
    return (
      <div className='m-auto text-activityBlue font-medium text-md text-center'>
        Question not found
      </div>
    );
  }

  if (data && !error) {
    dispatch(setAcceptedAnswer(data.question.acceptedAnswer));
  }

  return (
    <div className='overflow-y-auto'>
      {data?.question && <Question question={data.question} />}
      {data?.question?.imageUrls?.length !== 0 &&
        data?.question?.imageUrls?.map((image) => (
          <img className='w-40 h-40 inline-block' src={image} alt='image' />
        ))}
      <div className='mt-6'><Comments pageProps /></div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(
  DetailedQuestion
);
