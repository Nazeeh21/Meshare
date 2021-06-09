import DataLoader from 'dataloader';
import { Comment } from '../entities/Comment';

export const createCommentLoader = () =>
  new DataLoader<number, Comment>(async (commentIds) => {
    const comments = await Comment.findByIds(commentIds as number[]);
    console.log('comments from createCommentLoader: ', comments);

    const commentIdsToComment: Record<number, Comment> = {};

    comments.forEach((c) => {
      commentIdsToComment[+c.id] = c;
    });

    return commentIds.map((commentId) => commentIdsToComment[commentId]);
  });
