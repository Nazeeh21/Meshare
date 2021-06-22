/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import {
  useCreateBookmarkMutation,
  useVoteMutation,
} from "../generated/graphql";
import { Tag } from "./Tags";

interface QuestionProps {
  question: any;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const router = useRouter();
  const [, vote] = useVoteMutation();
  const [, createBookmark] = useCreateBookmarkMutation();

  const bookmarkClicked = async () => {
    await createBookmark({
      questionId: question.id,
    });
  };

  const upVoteClicked = async () => {
    await vote({
      questionId: question.id,
      value: 1,
    });
  };

  const downVoteClicked = async () => {
    await vote({
      questionId: question.id,
      value: -1,
    });
  };

  return (
    <div className="flex h-auto">
      <div className="w-12 mr-2 sm:mr-0">
        <img
          className="w-10 h-10 rounded-full mr-2 cursor-pointer"
          onClick={() =>
            router.push(`https://github.com/${question.creator.name}`)
          }
          src={question.creator.avatarUrl}
          alt={question.creator.name}
        />
        <div className="sm:hidden right-0 bottom-0 bg-black justify-center items-center p-2">
          <img
            className="mr-2 cursor-pointer"
            onClick={upVoteClicked}
            src={
              question.voteStatus && question.voteStatus === 1
                ? "/upvote.svg"
                : "/upvoteEmpty.svg"
            }
            alt="upvote"
          />
          <div className="text-white text-lg mr-2">{question.points}</div>
          <img
            className="mr-2 cursor-pointer"
            onClick={downVoteClicked}
            src={
              question.voteStatus && question.voteStatus === -1
                ? "/downvote.svg"
                : "/downvoteEmpty.svg"
            }
            alt="downvote"
          />
          <img
              onClick={bookmarkClicked}
              className="h-6 cursor-pointer"
              src={
                question.bookmarkStatus
                  ? "/bookmarkSelected.svg"
                  : "/bookmark.svg"
              }
              alt="bookmark"
            />
            {router.pathname !== "/questions/[id]" && (
              <img
                onClick={() => router.push(`/questions/${question.id}`)}
                className="h-6 mt-3 mb-3 -ml-1 mr-2 cursor-pointer"
                src="/share.png"
                alt="share"
              />
            )}
        </div>
      </div>

      <div className="w-10/12 sm:w-11/12 h-auto rounded-md bg-activityBlue relative text-white rounded-tl-none p-2 mb-4 pl-3">
        <div className="flex justify-space items-center mb-4">
          <div className="w-11/12 md:w-10/12 overflow-x-auto">
            <ReactMarkdown>{question.text}</ReactMarkdown>
          </div>
          <div className="sm:absolute hidden right-0 bottom-0 sm:flex justify-center items-center p-2">
            <img
              className="mr-2 cursor-pointer"
              onClick={upVoteClicked}
              src={
                question.voteStatus && question.voteStatus === 1
                  ? "/upvote.svg"
                  : "/upvoteEmpty.svg"
              }
              alt="upvote"
            />
            <div className="text-white text-lg mr-2">{question.points}</div>
            <img
              className="mr-2 cursor-pointer"
              onClick={downVoteClicked}
              src={
                question.voteStatus && question.voteStatus === -1
                  ? "/downvote.svg"
                  : "/downvoteEmpty.svg"
              }
              alt="downvote"
            />
            {/* <img className="ml-2" src="downvoteEmpty.svg" alt="downvote" /> */}
          </div>
          <div className="hidden sm:absolute sm:flex sm:flex-col right-0 top-0 p-3">
            {/* <Icon icon={bookmarkIcon} height={25} /> */}
            <img
              onClick={bookmarkClicked}
              className="h-6 cursor-pointer"
              src={
                question.bookmarkStatus
                  ? "/bookmarkSelected.svg"
                  : "/bookmark.svg"
              }
              alt="bookmark"
            />
            {router.pathname !== "/questions/[id]" && (
              <img
                onClick={() => router.push(`/questions/${question.id}`)}
                className="h-6 mt-3 mb-3 -ml-1 mr-2 cursor-pointer"
                src="/share.png"
                alt="share"
              />
            )}
          </div>
        </div>
        {question?.tags &&
          question?.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
        <div className="mt-2">
          Posted by:{" "}
          <a
            href={`https://github.com/${question.creator.name}`}
            className="inline-block font-medium"
          >
            {question.creator.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Question;
