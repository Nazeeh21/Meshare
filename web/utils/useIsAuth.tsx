import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useGetUserQuery } from '../generated/graphql';

export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useGetUserQuery();
  useEffect(() => {
    if (!fetching && !data?.getUser) {
      router.push('/login');
    }
  });
};
