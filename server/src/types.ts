import { Request, Response } from "express";

export type MyContext = {
  // @ts-ignore-start
  req: Request & { session: Express.Session };
  res: Response;
  // @ts-ignore-end
}