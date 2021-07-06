/* eslint-disable react-hooks/rules-of-hooks */
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Question from '../Components/Question';
import { useQuestionsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { isServer } from '../utils/isServer';
import { useIsAuth } from '../utils/useIsAuth';

const myQuestions: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const search = useSelector(
    (state: RootStateOrAny) => state.question.searchedValue
  );
  const [{ data, error, fetching }] = useQuestionsQuery({
    variables,
    pause: isServer()
  });

  const userData = useSelector((state: RootStateOrAny) => state.main.userData);

  if (!data && !fetching) {
    return (
      <div>
        You got no questions, query failed for some reason
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <div>
      {data && (
        <div className='h-full w-full overflow-y-auto overflow-x-hidden pb-32'>
          {data?.questions?.questions
            .filter(
              (question) =>
                question.text.includes(search) &&
                question.creator.githubId === userData?.githubId
            )
            .map((question) => (
              <Question key={question.id} question={question} />
            ))}
        </div>
      )}
      {data && data.questions.hasMore && (
        <div
          onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor:
                data.questions.questions[data.questions.questions.length - 1]
                  .createdAt,
            });
          }}
          className='bg-activityBlue mt-4 w-32 text-center rounded-md cursor-pointer text-white m-auto font-medium p-2'
        >
          Load more
        </div>
      )}
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 0.6rem;
          height: 4rem;
          display: none;
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
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #fff;
          width: 0.8rem;
        }
      `}</style>{' '}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(myQuestions);
