import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
  if(!context.req.session.githubId) {
    throw new Error('not Authenticated')
  }

  return next()
}