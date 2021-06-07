import DataLoader from 'dataloader';
import { Upvote } from '../entities/Upvote';

export const createUpvoteLoader = () =>
  new DataLoader<{ questionId: number; githubId: String }, Upvote | null>(
    async (keys) => {
      const upvotes = await Upvote.findByIds(keys as any);
      const upvoteIdsToUpvote: Record<string, Upvote> = {};

      upvotes.forEach((upvote) => {
        upvoteIdsToUpvote[`${upvote.githubId}|${upvote.questionId}`] = upvote;
      });

      keys.map((key, index) => {
        const content = upvoteIdsToUpvote[`${key.githubId}|${key.questionId}`];

        if (content == undefined) {
          keys.slice(index, 1);
        }
      });
      return keys.map(
        (key) => upvoteIdsToUpvote[`${key.githubId}|${key.questionId}`]
      );
    }
  );
