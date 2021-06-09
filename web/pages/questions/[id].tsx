import React from 'react';
import Question from '../../Components/Question';
import { useGetQuestionFromUrl } from '../../utils/useGetQuestionFromUrl';

const DetailedQuestion = () => {
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

  return <div className='overflow-y-auto'>
   {data?.question && <Question question={data.question} />}
   {data?.question?.imageUrls?.length !== 0 && data?.question?.imageUrls?.map(image => <img className='w-40 h-40 inline-block' src={image} alt='image' />)}
  </div>;
};

export default DetailedQuestion;
