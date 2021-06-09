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

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  githubId: Scalars['String'];
  questionId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
};

export type CommentInput = {
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestion: Question;
  vote: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
};


export type MutationCreateQuestionArgs = {
  input: QuestionInput;
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

export type Question = {
  __typename?: 'Question';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  tags: Array<Scalars['String']>;
  imageUrls: Array<Scalars['String']>;
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  githubId: Scalars['String'];
  creator: User;
  createdAt: Scalars['String'];
};

export type QuestionInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  tags: Array<Scalars['String']>;
  imageUrls: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  githubId: Scalars['String'];
  avatarUrl: Scalars['String'];
  createdAt: Scalars['String'];
};

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  questionId: Scalars['Int'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'githubId' | 'questionId' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  ) }
);

export type CreateQuestionMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  imageUrls: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion: (
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'title' | 'description' | 'tags' | 'imageUrls' | 'voteStatus'>
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
      & Pick<Comment, 'id' | 'text' | 'githubId'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'avatarUrl' | 'name'>
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
    & Pick<Question, 'id' | 'title' | 'description' | 'tags' | 'imageUrls' | 'githubId' | 'voteStatus' | 'points'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'avatarUrl'>
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
      & Pick<Question, 'id' | 'title' | 'description' | 'imageUrls' | 'tags' | 'voteStatus' | 'githubId' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'avatarUrl' | 'name'>
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


export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $questionId: Int!) {
  createComment(input: {text: $text}, questionId: $questionId) {
    id
    text
    githubId
    questionId
    createdAt
    creator {
      name
    }
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($title: String!, $description: String!, $tags: [String!]!, $imageUrls: [String!]!) {
  createQuestion(
    input: {title: $title, description: $description, tags: $tags, imageUrls: $imageUrls}
  ) {
    id
    title
    description
    tags
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
export const CommentsDocument = gql`
    query Comments($questionId: Int!, $limit: Int!, $cursor: String) {
  comments(questionId: $questionId, cursor: $cursor, limit: $limit) {
    hasMore
    comments {
      id
      text
      githubId
      creator {
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
    title
    description
    tags
    imageUrls
    githubId
    voteStatus
    points
    creator {
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
      description
      imageUrls
      tags
      voteStatus
      githubId
      createdAt
      creator {
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