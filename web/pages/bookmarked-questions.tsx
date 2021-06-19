import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Question from '../Components/Question';
import { useBookmarksQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { isServer } from '../utils/isServer';
import { useIsAuth } from '../utils/useIsAuth';

const bookmarkedQuestions: React.FC<{}> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  useIsAuth();
  const [{ data, error, fetching }] = useBookmarksQuery({
    pause: isServer(),
    variables,
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
  return (
    <div>
      {data?.bookmarks.bookmarks.map((bookmark, index) => (
        <Question key={index} question={bookmark.question} />
      ))}
      {data && data.bookmarks.hasMore && (
        <div
          onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor:
                data.bookmarks.bookmarks[data.bookmarks.bookmarks.length - 1]
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

export default withUrqlClient(createUrqlClient, { ssr: true })(
  bookmarkedQuestions
);
