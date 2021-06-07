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
          href='http://localhost:4000/auth/github/'
          style={{ textDecoration: 'none' }}
          className='text-white'
        >
          Login using github
        </a>
      </div>
    );
  }

  if (userData && isLoggedIn && userActivity) {
    body =
      userActivity !== undefined &&
      userActivity &&
      userActivity!.map((activity, index) => <GithubActivity key={index} activity={activity} />);
  }
  return (
    <div className='h-sidebarH pb-8 w-3/12 lg:w-6/12 md:w-6/12 hidden md:block rounded-r-md bg-activityBlue overflow-y-auto'>
      {body}
      <style jsx>{`
      ::-webkit-scrollbar {
        width: 0.6rem;
        height: 4rem;
      }
      
      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.3rem #dbe6fd; 
        border-radius: 0.5rem;
      }
       
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #dbe6fd; 
        border-radius: 0.5rem;
      }
      
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #fff; 
        width: 0.8rem;
      }

      `}</style>
    </div>
  );
};
