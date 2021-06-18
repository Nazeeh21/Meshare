import DataLoader from 'dataloader';
import { Bookmark } from '../entities/Bookmark';

export const createBookmarkLoader = () =>
  new DataLoader<{ questionId: number; githubId: String }, Bookmark | null>(
    async (keys) => {
      const bookmarks = await Bookmark.findByIds(keys as any);
      console.log('bookmarks from bookmarkLoader: ', bookmarks);
      
      const bookmarkIdsToBookmark: Record<string, Bookmark> = {};

      bookmarks.forEach((bookmark) => {
        console.log('bookmark from bookmarkLoader: ', bookmark)
        bookmarkIdsToBookmark[`${bookmark.githubId}|${bookmark.questionId}`] =
          bookmark;
      });

      keys.map((key, index) => {
        const content =
          bookmarkIdsToBookmark[`${key.githubId}|${key.questionId}`];

        if (content == undefined) {
          keys.slice(index, 1);
        }
      });
      return keys.map(
        (key) => bookmarkIdsToBookmark[`${key.githubId}|${key.questionId}`]
      );
    }
  );
