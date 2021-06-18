import { dedupExchange, Exchange, fetchExchange } from '@urql/core';
import { Cache, cacheExchange, Resolver } from '@urql/exchange-graphcache';
import Router from 'next/router';
import { gql, stringifyVariables } from 'urql';
import { pipe, tap } from 'wonka';
import { CreateBookmarkMutationVariables, VoteMutationVariables } from '../generated/graphql';
import { isServer } from './isServer';

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
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

export type MergeMode = 'before' | 'after';

export interface PaginationParams {
  offsetArgument?: string;
  limitArgument?: string;
  mergeMode?: MergeMode;
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);

    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;

    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'questions'
    );

    info.partial = !isItInTheCache;

    const results: string[] = [];

    let hasMore = true;

    fieldInfos.forEach((fieldInfo) => {
      const key = cache.resolve(entityKey, fieldInfo.fieldKey) as string;
      const data = cache.resolve(key, 'questions') as string[];
      const _hasMore = cache.resolve(key, 'hasMore');

      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }

      results.push(...data);
    });
    return {
      __typename: 'PaginatedQuestions',
      hasMore,
      questions: results,
    };
  };
};

const cursorPaginationforComments = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);

    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;

    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'comments'
    );

    info.partial = !isItInTheCache;

    const results: string[] = [];

    let hasMore = true;

    fieldInfos.forEach((fieldInfo) => {
      const key = cache.resolve(entityKey, fieldInfo.fieldKey) as string;
      const data = cache.resolve(key, 'comments') as string[];
      const _hasMore = cache.resolve(key, 'hasMore');

      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      // const data = cache.resolve(entityKey, fieldInfo.fieldKey) as string[];
      results.push(...data);
    });

    return {
      __typename: 'PaginatedComments',
      hasMore,
      posts: results,
    };
  };
};

const invalidateAllBookmarks = (cache: Cache) => {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info) => info.fieldName === 'bookmarks');

  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate('Query', 'bookmarks', fieldInfo.arguments || {});
  });
};

const invalidateAllQuestions = (cache: Cache) => {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info) => info.fieldName === 'questions');

  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate('Query', 'questions', fieldInfo.arguments || {});
  });
};

const invalidateAllComments = (cache: Cache) => {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info) => info.fieldName === 'comments');

  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate('Query', 'comments', fieldInfo.arguments || {});
  });
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = '';
  if (isServer()) {
    // console.log('githubId from ctx: ', ctx.req.headers.cookie.split(' ')[1])
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
        keys: {
          PaginatedQuestions: () => null,
          PaginatedComments: () => null,
        },
        resolvers: {
          Query: {
            questions: cursorPagination(),
            comments: cursorPaginationforComments(),
          },
        },
        updates: {
          Mutation: {
            createComment: (_result, _args, cache, _info) => {
              invalidateAllComments(cache);
            },
            createQuestion: (_result, _args, cache, _info) => {
              invalidateAllQuestions(cache);
            },
            createBookmark: (_result, _args, cache, _info) => {
              const {questionId} = _args as CreateBookmarkMutationVariables

              const data = cache.readFragment(
                gql`
                fragment _ on Question {
                  id
                  bookmarkStatus
                }
                `,
                {id: questionId}
              )

              if(data) {
                const newBookMarkStatus = !data.bookmarkStatus

                cache.writeFragment(
                  gql`
                  fragment _ on Question {
                    id
                    bookmarkStatus
                  }
                  `,
                  {id: questionId, bookmarkStatus: newBookMarkStatus}
                )
              }
              // invalidateAllBookmarks(cache);
            },
            vote: (_result, _args, cache, _info) => {
              const { questionId, value } = _args as VoteMutationVariables;

              const data = cache.readFragment(
                gql`
                  fragment _ on Question {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: questionId }
              ); //Data or null

              // console.log('data: ', data);

              if (data) {
                let newPoints = data.points;
                let newVoteStatus = data.voteStatus;

                if (data.voteStatus === value) {
                  newPoints = newPoints - value;
                  newVoteStatus = null;
                } else if (data.voteStatus !== value) {
                  newPoints = newPoints + (!data.voteStatus ? 1 : 2) * value;
                  newVoteStatus = value;
                }

                cache.writeFragment(
                  gql`
                    fragment _ on Question {
                      id
                      points
                      voteStatus
                    }
                  `,
                  {
                    id: questionId,
                    points: newPoints,
                    voteStatus: newVoteStatus,
                  }
                );
              }
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
