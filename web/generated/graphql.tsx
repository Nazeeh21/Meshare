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

export type Mutation = {
  __typename?: 'Mutation';
  createQuestion: Question;
};


export type MutationCreateQuestionArgs = {
  input: QuestionInput;
};

export type Query = {
  __typename?: 'Query';
  question?: Maybe<Question>;
};


export type QueryQuestionArgs = {
  id: Scalars['Int'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type QuestionInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type CreateQuestionMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion: (
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'title' | 'points' | 'creatorId' | 'description'>
  ) }
);


export const CreateQuestionDocument = gql`
    mutation CreateQuestion($title: String!, $description: String!) {
  createQuestion(input: {title: $title, description: $description}) {
    id
    title
    points
    creatorId
    description
  }
}
    `;

export function useCreateQuestionMutation() {
  return Urql.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument);
};