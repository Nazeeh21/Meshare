/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import {
  useCreateBookmarkMutation,
  useVoteMutation,
} from "../generated/graphql";
import { Tag } from "./Tags";
import { HrefComp } from "./HrefComp";
import { Tooltip } from "@material-ui/core";

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
    <div className={`flex h-auto`}>
      <div className="w-12 mr-2 sm:mr-0">
        <img
          className="w-10 h-10 rounded-full mr-2 cursor-pointer"
          onClick={() =>
            router.push(`https://github.com/${question.creator.name}`)
          }
          src={question.creator.avatarUrl}
          alt={question.creator.name}
        />
        <div className="sm:hidden right-0 bottom-0 rounded-sm justify-center items-center p-3">
          <Tooltip
            title={
              question.voteStatus && question.voteStatus === 1
                ? "Remove Upvote"
                : "Upvote"
            }
          >
            <img
              className="mr-2 cursor-pointer"
              onClick={upVoteClicked}
              src={
                question.voteStatus && question.voteStatus === 1
                  ? "/upvote.svg"
                  : "/Group-1.svg"
              }
              alt="upvote"
            />
          </Tooltip>

          <div className="text-black text-center text-lg mr-2">
            {question.points}
          </div>

          <Tooltip
            title={
              question.voteStatus && question.voteStatus === -1
                ? "Remove Downvote"
                : "Downvote"
            }
          >
            <img
              className="mr-2 cursor-pointer mb-2"
              onClick={downVoteClicked}
              src={
                question.voteStatus && question.voteStatus === -1
                  ? "/downvote.svg"
                  : "/Group.svg"
              }
              alt="downvote"
            />
          </Tooltip>

          <Tooltip
            title={question.bookmarkStatus ? "Remove Bookmark" : "Bookmark"}
          >
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
          </Tooltip>

          {/* {router.pathname !== "/questions/[id]" && (
            <img
              onClick={() => router.push(`/questions/${question.id}`)}
              className="h-6 mt-3 mb-3 -ml-1 mr-2 cursor-pointer"
              src="/share.png"
              alt="share"
            />
          )} */}
        </div>
      </div>

      <div className={`${question.bountyAmount !== null && 'border-2 border-acceptedAnswer'} w-10/12 sm:w-11/12 h-auto rounded-md bg-activityBlue relative text-white rounded-tl-none p-2 mb-4 pl-3`}>
        <div className="flex justify-space items-center mb-4">
          <div
            style={{ minHeight: "3rem" }}
            className="w-11/12 md:w-10/12 overflow-x-auto"
          >
            <div
              className={`${
                router.pathname !== "/questions/[id]"
                  ? "cursor-pointer"
                  : "mb-3 text-lg"
              } font-semibold`}
              style={{ width: "fit-content" }}
              onClick={() => {
                if (router.pathname === "/questions/[id]") {
                  return;
                }
                router.push(`/questions/${question.id}`);
              }}
            >
              {router.pathname === "/questions/[id]"
                ? question.title
                : question.title.substring(0, 100)}
            </div>
            {router.pathname === "/questions/[id]" && (
              <ReactMarkdown components={{}}>{question.text}</ReactMarkdown>
            )}
          </div>
          <div className="sm:absolute hidden right-0 bottom-0 sm:flex justify-center items-center p-2">
            <Tooltip
              title={
                question.voteStatus && question.voteStatus === 1
                  ? "Remove Upvote"
                  : "Upvote"
              }
            >
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
            </Tooltip>

            <div className="text-white text-lg mr-2">{question.points}</div>
            <Tooltip
              title={
                question.voteStatus && question.voteStatus === -1
                  ? "Remove Downvote"
                  : "Downvote"
              }
            >
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
            </Tooltip>
          </div>
          <div className="hidden sm:absolute sm:flex sm:flex-col right-0 top-0 p-3">
            <Tooltip
              title={question.bookmarkStatus ? "Remove Bookmark" : "Bookmark"}
            >
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
            </Tooltip>
          </div>
        </div>
        {question?.tags &&
          question?.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
        <div className="mt-3">
          Posted by:{" "}
          <HrefComp
            hrefLink={`https://github.com/${question.creator.name}`}
            label={question.creator.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
