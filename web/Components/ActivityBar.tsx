import axios from 'axios';
import { LayoutProps } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GithubActivity } from './GithubActivity';

export const ActivityBar: React.FC<LayoutProps> = ({}) => {
  const userData = useSelector((state: RootStateOrAny) => state.main.userData);
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.main.isLoggedIn
  );

  const [userActivity, setUserActivity] = useState(null);

  let body = null;

  useEffect(() => {
    if (isLoggedIn && userData) {
      axios
        .get(`https://api.github.com/users/${userData.name}/received_events`)
        .then((res) => {
          setUserActivity(res.data);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [isLoggedIn, userData]);

  if (!isLoggedIn && !userData) {
    body = (
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

  if (userData && isLoggedIn && !userActivity) {
    body = (
      <div className='text-white font-semibold text-center mt-4 text-lg'>
        Loading ...
      </div>
    );
  }

  if (userData && isLoggedIn && userActivity) {
    body =
      userActivity !== undefined &&
      userActivity &&
      userActivity!.map((activity, index) => (
        <GithubActivity key={index} activity={activity} />
      ));
  }
  return (
    <div className='h-sidebarH pb-16 w-3/12 lg:w-6/12 md:w-6/12 hidden md:block rounded-r-md bg-activityBlue overflow-y-hidden'>
      <div className='text-white font-semibold text-center mt-4 mb-2 text-xl'>
        GitHub Activity
      </div>
      <div className='w-full h-full mb-2 overflow-y-auto overflow-x-hidden'>
        {body}
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 0.6rem;
            height: 4rem;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            display: none;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #132b4f;
            border: 1px solid #637b9f;
            border-radius: 0.5rem;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #fff;
            width: 0.8rem;
          }
        `}</style>
      </div>
    </div>
  );
};
