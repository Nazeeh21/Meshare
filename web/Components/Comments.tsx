import { withUrqlClient } from 'next-urql';
import React, { useEffect, useState } from 'react';
import { useCommentsQuery } from '../generated/graphql';
import { setAcceptedAnswer } from '../redux/actions/questionAction';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGetIntId } from '../utils/useGetIntId';
import { CommentComp } from './CommentComp';

const Comments: React.FC = ({}) => {
  const intId = useGetIntId();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null,
    questionId: intId,
  });

  const [{ data, error, fetching }] = useCommentsQuery({
    variables,
  });

  if (!data && !fetching) {
    return (
      <div>
        <div>You got no Answers, query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  useEffect(() => {
    if (data) {
      console.log('comments: ', data.comments);
    }
  }, [data]);

  return (
    <div>
      {data?.comments?.comments?.map((comment) => (
        <CommentComp comment={comment} />
      ))}
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Comments);
