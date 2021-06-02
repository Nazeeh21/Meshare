import axios from 'axios';
import { LayoutProps } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

export const ActivityBar: React.FC<LayoutProps> = ({}) => {
  const userData = useSelector((state: RootStateOrAny) => state.main.userData);
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.main.isLoggedIn
  );

  const [userActivity, setUserActivity] = useState();

  let body = null;

  useEffect(() => {
    if (isLoggedIn && userData) {
      axios
        .get(`https://api.github.com/users/${userData.name}/received_events`)
        .then((res) => console.log(res.data))
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
          href='http://localhost:4000/auth/github/'
          style={{ textDecoration: 'none' }}
          className='text-white'
        >
          Login using github
        </a>
      </div>
    );
  }

  return (
    <div className='h-sidebarH w-3/12 lg:w-4/12 md:w-6/12 hidden md:block rounded-r-md bg-activityBlue'>
      {body}
    </div>
  );
};
