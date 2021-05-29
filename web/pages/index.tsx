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
    <div className='container'>
      <Head>
        <title>Getit Here</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Login />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0;
        }
        main {
          padding: 0rem 0;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
