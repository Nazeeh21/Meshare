import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { useEffect } from 'react';
import { Login } from '../Components/Login';
import { useQuestionQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { isServer } from '../utils/isServer';

const Home = () => {
  const [{data, error}] = useQuestionQuery({
    pause: isServer(),
    variables: {
      id: 1
    }
  })

  useEffect(() => {
    console.log(data);
    console.log(error);
    
  }, [data, error])
  return (
    <div>
      <Head>
        <title>Getit Here</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <Login />
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
