import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>Good morning</main>

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
