/* eslint-disable react-hooks/rules-of-hooks */
import { RootStateOrAny, useSelector } from 'react-redux';
import React from 'react';
import { useRouter } from 'next/router';
import { useGetUserQuery } from '../generated/graphql';
import { useEffect } from 'react';
import { isServer } from '../utils/isServer';

const login = () => {
  const router = useRouter();
  const userData = useSelector((state: RootStateOrAny) => state.main.userData);
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.main.isLoggedIn
  );
  const [{ data, fetching }] = useGetUserQuery({
    pause: isServer(),
  });

  useEffect(() => {
    if (!fetching && data?.getUser) {
      router.push('/');
    }
  }, [data, fetching, router]);

  if (userData && isLoggedIn) {
    router.push('/');
  }

  if (!isLoggedIn && !userData) {
    return (
      <div
        style={{
          backgroundColor: '#4aa96c',
          width: '12vw',
          padding: '0.5rem',
          borderRadius: '0.2rem',
          fontWeight: 'bold',
        }}
        className='text-center mt-6 m-auto'
      >
        <a
          href={`${process.env.NEXT_PUBLIC_AUTH_URL}`}
          style={{ textDecoration: 'none' }}
          className='text-white'
        >
          Login using github
        </a>
      </div>
    );
  }

  return null;
};

export default login;
