import DataLoader from 'dataloader';
import { User } from '../entities/User';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (githubIds) => {
    const users = await User.findByIds(githubIds as string[]);
    const githubIdToUser: Record<string, User> = {};

    users.forEach((u) => {
      githubIdToUser[+u.githubId] = u;
    });

    return githubIds.map((githubId) => githubIdToUser[githubId]);
  });
