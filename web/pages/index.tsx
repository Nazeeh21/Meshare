import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Question from '../Components/Question';

import { useQuestionsQuery } from '../generated/graphql';
import { setAcceptedAnswer } from '../redux/actions/questionAction';
import { createUrqlClient } from '../utils/createUrqlClient';
import { supabase } from '../utils/supabaseClient';

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

  useEffect(() => {
    // const { publicURL, error } = supabase.storage
    //   .from('avatars')
    //   .getPublicUrl('avatars/test_image.jpg');

    // if (publicURL) {
    //   console.log(publicURL);
    // } else {
    //   console.log(error);
    // }

    const downloadImage = async () => {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download('logo_transparent_background.png');

      if (error) {
        console.log('error: ', error);
      } else {
        console.log('downloaded Image data: ', data);
      }
    };

    downloadImage();
  }, []);

  return (
    <div>
      <Head>
        <title>Getit Here</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel='icon' href='/favicon.ico' />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>

      {/* {console.log(typeof data.questions.questions[0])} */}
      {data &&
        data?.questions?.questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
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
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
