import { Request, Response } from "express";
import { createCommentLoader } from "./utils/createCommentLoader";
import { createQuestionLoader } from "./utils/createQuestionLoader";
import { createUpvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  // @ts-ignore-start
  req: Request & { session: Express.Session };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
  commentLoader: ReturnType<typeof createCommentLoader>;
  questionLoader: ReturnType<typeof createQuestionLoader>;
  // @ts-ignore-end
}