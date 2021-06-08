import { useRouter } from 'next/router';

export const useGetIntId = () => {
  const router = useRouter();

  const intId = typeof router.query.id === 'string' ? +router.query.id : -1;

  return intId;
};
