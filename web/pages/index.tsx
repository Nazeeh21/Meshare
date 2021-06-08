import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useEffect, useState } from "react";
import Question from "../Components/Question";

import { useQuestionsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  })
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

{/* {console.log(typeof data.questions.questions[0])} */}
      {data && data?.questions?.questions.map(question => <Question question={question} />)}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
