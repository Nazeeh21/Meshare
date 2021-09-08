import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  question: Question;
  questionId: Scalars['Float'];
  githubId: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
};

export type BookmarkInput = {
  questionId: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  html: Scalars['String'];
  githubId: Scalars['String'];
  questionId: Scalars['Float'];
  address?: Maybe<Scalars['String']>;
  isAccepted: Scalars['Boolean'];
  acceptedByQuestion?: Maybe<Question>;
  creator: User;
  createdAt: Scalars['String'];
};

export type CommentInput = {
  text: Scalars['String'];
  html: Scalars['String'];
  address?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestion: Question;
  deleteQuestion: Scalars['Boolean'];
  acceptAnswer: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  createBookmark: Scalars['Boolean'];
};


export type MutationCreateQuestionArgs = {
  input: QuestionInput;
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['Int'];
};


export type MutationAcceptAnswerArgs = {
  answerId: Scalars['Int'];
  questionId: Scalars['Int'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  questionId: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  questionId: Scalars['Int'];
  input: CommentInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateBookmarkArgs = {
  input: BookmarkInput;
};

export type PaginatedBookmarks = {
  __typename?: 'PaginatedBookmarks';
  bookmarks: Array<Bookmark>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  comments: Array<Comment>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedQuestions = {
  __typename?: 'PaginatedQuestions';
  questions: Array<Question>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  questions: PaginatedQuestions;
  question?: Maybe<Question>;
  getUser?: Maybe<User>;
  comments: PaginatedComments;
  bookmarks: PaginatedBookmarks;
};


export type QueryQuestionsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryQuestionArgs = {
  id: Scalars['Int'];
};


export type QueryCommentsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  questionId: Scalars['Int'];
};


export type QueryBookmarksArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  html: Scalars['String'];
  tags: Array<Scalars['String']>;
  imageUrls: Array<Scalars['String']>;
  bountyAmount?: Maybe<Scalars['Float']>;
  answerId?: Maybe<Scalars['Int']>;
  acceptedAnswer?: Maybe<Comment>;
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  bookmarkStatus?: Maybe<Scalars['Boolean']>;
  githubId: Scalars['String'];
  creator: User;
  createdAt: Scalars['String'];
  bookmarks?: Maybe<Bookmark>;
};

export type QuestionInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  html: Scalars['String'];
  tags: Array<Scalars['String']>;
  imageUrls: Array<Scalars['String']>;
  bountyAmount?: Maybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  githubId: Scalars['String'];
  avatarUrl: Scalars['String'];
  createdAt: Scalars['String'];
};

export type AcceptAnswerMutationVariables = Exact<{
  answerId: Scalars['Int'];
  questionId: Scalars['Int'];
}>;


export type AcceptAnswerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptAnswer'>
);

export type CreateBookmarkMutationVariables = Exact<{
  questionId: Scalars['Float'];
}>;


export type CreateBookmarkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createBookmark'>
);

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  html: Scalars['String'];
  questionId: Scalars['Int'];
  address?: Maybe<Scalars['String']>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'html' | 'githubId' | 'questionId' | 'createdAt' | 'address' | 'isAccepted'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'githubId' | 'name'>
    ) }
  ) }
);

export type CreateQuestionMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  html: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  imageUrls: Array<Scalars['String']> | Scalars['String'];
  bountyAmount?: Maybe<Scalars['Float']>;
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion: (
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'title' | 'html' | 'text' | 'tags' | 'bountyAmount' | 'imageUrls' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteQuestionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteQuestion'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  questionId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type BookmarksQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type BookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks: (
    { __typename?: 'PaginatedBookmarks' }
    & Pick<PaginatedBookmarks, 'hasMore'>
    & { bookmarks: Array<(
      { __typename?: 'Bookmark' }
      & Pick<Bookmark, 'githubId' | 'questionId' | 'createdAt'>
      & { question: (
        { __typename?: 'Question' }
        & Pick<Question, 'id' | 'title' | 'text' | 'html' | 'imageUrls' | 'tags' | 'points' | 'bookmarkStatus' | 'voteStatus' | 'githubId' | 'createdAt'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'avatarUrl' | 'name' | 'githubId'>
        ) }
      ) }
    )> }
  ) }
);

export type CommentsQueryVariables = Exact<{
  questionId: Scalars['Int'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: (
    { __typename?: 'PaginatedComments' }
    & Pick<PaginatedComments, 'hasMore'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'html' | 'githubId' | 'address' | 'questionId' | 'isAccepted' | 'createdAt'>
      & { acceptedByQuestion?: Maybe<(
        { __typename?: 'Question' }
        & Pick<Question, 'id' | 'text' | 'html'>
      )>, creator: (
        { __typename?: 'User' }
        & Pick<User, 'githubId' | 'avatarUrl' | 'name'>
      ) }
    )> }
  ) }
);

export type QuestionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuestionQuery = (
  { __typename?: 'Query' }
  & { question?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'html' | 'title' | 'text' | 'tags' | 'imageUrls' | 'githubId' | 'bookmarkStatus' | 'voteStatus' | 'bountyAmount' | 'points' | 'answerId' | 'createdAt'>
    & { acceptedAnswer?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'html' | 'isAccepted' | 'githubId'>
    )>, creator: (
      { __typename?: 'User' }
      & Pick<User, 'githubId' | 'name' | 'avatarUrl'>
    ) }
  )> }
);

export type QuestionsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { questions: (
    { __typename?: 'PaginatedQuestions' }
    & Pick<PaginatedQuestions, 'hasMore'>
    & { questions: Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'title' | 'text' | 'html' | 'imageUrls' | 'tags' | 'points' | 'bookmarkStatus' | 'voteStatus' | 'githubId' | 'bountyAmount' | 'createdAt'>
      & { acceptedAnswer?: Maybe<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id'>
      )>, creator: (
        { __typename?: 'User' }
        & Pick<User, 'githubId' | 'avatarUrl' | 'name'>
      ) }
    )> }
  ) }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'githubId' | 'avatarUrl'>
  )> }
);


export const AcceptAnswerDocument = gql`
    mutation AcceptAnswer($answerId: Int!, $questionId: Int!) {
  acceptAnswer(answerId: $answerId, questionId: $questionId)
}
    `;

export function useAcceptAnswerMutation() {
  return Urql.useMutation<AcceptAnswerMutation, AcceptAnswerMutationVariables>(AcceptAnswerDocument);
};
export const CreateBookmarkDocument = gql`
    mutation CreateBookmark($questionId: Float!) {
  createBookmark(input: {questionId: $questionId})
}
    `;

export function useCreateBookmarkMutation() {
  return Urql.useMutation<CreateBookmarkMutation, CreateBookmarkMutationVariables>(CreateBookmarkDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $html: String!, $questionId: Int!, $address: String) {
  createComment(
    input: {text: $text, html: $html, address: $address}
    questionId: $questionId
  ) {
    id
    text
    html
    githubId
    questionId
    createdAt
    address
    isAccepted
    creator {
      githubId
      name
    }
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($title: String!, $text: String!, $html: String!, $tags: [String!]!, $imageUrls: [String!]!, $bountyAmount: Float) {
  createQuestion(
    input: {title: $title, text: $text, html: $html, tags: $tags, imageUrls: $imageUrls, bountyAmount: $bountyAmount}
  ) {
    id
    title
    html
    text
    tags
    bountyAmount
    imageUrls
    voteStatus
    creator {
      name
    }
  }
}
    `;

export function useCreateQuestionMutation() {
  return Urql.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Int!) {
  deleteComment(id: $id)
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($id: Int!) {
  deleteQuestion(id: $id)
}
    `;

export function useDeleteQuestionMutation() {
  return Urql.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $questionId: Int!) {
  vote(value: $value, questionId: $questionId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const BookmarksDocument = gql`
    query Bookmarks($limit: Int!, $cursor: String) {
  bookmarks(cursor: $cursor, limit: $limit) {
    hasMore
    bookmarks {
      githubId
      questionId
      question {
        id
        title
        text
        html
        imageUrls
        tags
        points
        bookmarkStatus
        voteStatus
        githubId
        createdAt
        creator {
          avatarUrl
          name
          githubId
        }
      }
      createdAt
    }
  }
}
    `;

export function useBookmarksQuery(options: Omit<Urql.UseQueryArgs<BookmarksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BookmarksQuery>({ query: BookmarksDocument, ...options });
};
export const CommentsDocument = gql`
    query Comments($questionId: Int!, $limit: Int!, $cursor: String) {
  comments(questionId: $questionId, cursor: $cursor, limit: $limit) {
    hasMore
    comments {
      id
      text
      html
      githubId
      address
      questionId
      isAccepted
      acceptedByQuestion {
        id
        text
        html
      }
      createdAt
      creator {
        githubId
        avatarUrl
        name
      }
    }
  }
}
    `;

export function useCommentsQuery(options: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommentsQuery>({ query: CommentsDocument, ...options });
};
export const QuestionDocument = gql`
    query Question($id: Int!) {
  question(id: $id) {
    id
    html
    title
    text
    tags
    imageUrls
    githubId
    bookmarkStatus
    voteStatus
    bountyAmount
    points
    answerId
    createdAt
    acceptedAnswer {
      id
      text
      html
      isAccepted
      githubId
    }
    creator {
      githubId
      name
      avatarUrl
    }
  }
}
    `;

export function useQuestionQuery(options: Omit<Urql.UseQueryArgs<QuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuestionQuery>({ query: QuestionDocument, ...options });
};
export const QuestionsDocument = gql`
    query Questions($limit: Int!, $cursor: String) {
  questions(cursor: $cursor, limit: $limit) {
    hasMore
    questions {
      id
      title
      text
      html
      imageUrls
      acceptedAnswer {
        id
      }
      tags
      points
      bookmarkStatus
      voteStatus
      githubId
      bountyAmount
      createdAt
      creator {
        githubId
        avatarUrl
        name
      }
    }
  }
}
    `;

export function useQuestionsQuery(options: Omit<Urql.UseQueryArgs<QuestionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuestionsQuery>({ query: QuestionsDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    name
    githubId
    avatarUrl
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};