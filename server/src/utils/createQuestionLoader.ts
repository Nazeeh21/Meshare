import DataLoader from 'dataloader';
import { Question } from '../entities/Question';

export const createQuestionLoader = () =>
  new DataLoader<number, Question>(async (questionIds) => {
    const questions = await Question.findByIds(questionIds as number[]);
    console.log('questions from createQuestionLoader: ', questions);

    const questionIdsToQuestion: Record<number, Question> = {};
    questions.forEach((q) => {
      questionIdsToQuestion[+q.id] = q;
    });
    return questionIds.map((questionId) => questionIdsToQuestion[questionId]);
  });
