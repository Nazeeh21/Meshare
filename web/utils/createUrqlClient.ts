import { dedupExchange,  Exchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import Router from 'next/router';
import { pipe, tap } from 'wonka';
import { isServer } from './isServer';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('not Authenticated')) {
        // console.log('error: ', error.message);
        Router.replace('/login');
      }
    })
  );
};
export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = '';
  if (isServer()) {
    console.log('githubId from ctx: ', ctx.req.headers.cookie.split(' ')[1])
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        // TODO: add keys, resolvers, updates
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
