import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useEffect } from 'react';
import Question from '../Components/Question';
import { useBookmarksQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { isServer } from '../utils/isServer';
import { useIsAuth } from '../utils/useIsAuth';

const bookmarkedQuestions: React.FC<{}> = ({}) => {
  useIsAuth();
  const [{ data, error, fetching }] = useBookmarksQuery({
    pause: isServer(),
  });

  useEffect(() => {
    console.log('data: ', data);
  }, [data, error, fetching]);

  if (!data && !fetching) {
    return (
      <div>
        You got no questions, query failed for some reason
        <div>{error?.message}</div>
      </div>
    );
  }
  return <div>
    {data?.bookmarks.map((bookmark, index) => <Question key={index} question={bookmark.question} />)}
  </div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(
  bookmarkedQuestions
);
