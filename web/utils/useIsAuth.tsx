import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useGetUserQuery } from '../generated/graphql';
import { isServer } from './isServer';

export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useGetUserQuery({
    // pause: isServer(),
  });
  useEffect(() => {
    if (!fetching && !data?.getUser) {
      router.push('/login');
    }
  });
};
