import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Question from '../Components/Question';

import { useQuestionsQuery } from '../generated/graphql';
import { setAcceptedAnswer } from '../redux/actions/questionAction';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  const dispatch = useDispatch();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = useQuestionsQuery({
    variables,
  });

  useEffect(() => {
    dispatch(setAcceptedAnswer(null));
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

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
      <Head>
        <title>Getit Here</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        ></link>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
      </Head>

      {/* {console.log(typeof data.questions.questions[0])} */}
      {data && (
        <div className='h-full w-full overflow-y-auto overflow-x-hidden'>
          {data?.questions?.questions.map((question) => (
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
      `}</style>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
