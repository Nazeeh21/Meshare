import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Question from '../Components/Question';

import { useQuestionsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = useQuestionsQuery({
    variables,
  });

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
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* {console.log(typeof data.questions.questions[0])} */}
      {data &&
        data?.questions?.questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      {data && data.questions.hasMore && (
        <div onClick={() => {
          setVariables({
            limit: variables.limit,
            cursor: data.questions.questions[data.questions.questions.length - 1].createdAt,
          });
        }} className='bg-activityBlue mt-4 w-32 text-center rounded-md cursor-pointer text-white m-auto font-medium p-2'>
          Load more
        </div>
       )} 
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
