import { useRouter } from 'next/router';
import React from 'react';

export const GithubActivity = ({ activity }) => {
  const router = useRouter();
  let body = null;
  switch (activity.type) {
    case 'WatchEvent': {
      switch (activity.payload.action) {
        case 'started': {
          // starred
          body = (
            <div>
              <div
                className='cursor-pointer inline-block font-bold'
                onClick={() => {
                  router.push(`https://github.com/${activity.actor.login}`);
                }}
              >
                {activity.actor.display_login}
              </div>{' '}
              has starred{' '}
              <span
                className='cursor-pointer font-bold'
                onClick={() => {
                  router.push(`https://github.com/${activity.repo.name}`);
                }}
              >
                {activity.repo.name}
              </span>
            </div>
          );
          break;
        }
      }
      break;
    }

    case 'CreateEvent': {
      if (activity.payload.pusher_type === 'user') {
        // user has pushed to a repository
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div>{' '}
            has pushed to{' '}
            <span
              className='cursor-pointer font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span>
          </div>
        );
      }
      break;
    }

    case 'ForkEvent': {
      if (activity.payload.forkee) {
        // user  has forked a repo
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div>{' '}
            has forked{' '}
            <span
              className='cursor-pointer font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span>
          </div>
        );
      }
      break;
    }

    case 'MemberEvent': {
      if (activity.payload.action === 'added') {
        // user has been added to an organization
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div>{' '}
            has been added to{' '}
            <span
              className='cursor-pointer font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.org.login}
            </span>
          </div>
        );
      }
      break;
    }

    case 'PublicEvent': {
      console.log(
        'activity.payload of PublicEvent: ',
        Object.keys(activity.payload).length === 0
      );

      if (Object.keys(activity.payload).length === 0) {
        // user has made public repo
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div>{' '}
            made{' '}
            <span
              className='cursor-pointer font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span>
          </div>
        );
      }
      break;
    }
  }
  return (
    <div className='mt-6 text-white mr-4 ml-4 flex items-center'>
      <div>
        <div className='h-12 bg-iconBlue w-12 mr-4 rounded-full overflow-hidden'>
          <img
            onClick={() => {
              router.push(`https://www.github.com/${activity.actor.display_login}`);
              }
            }
            className='cursor-pointer'
            src={activity.actor.avatar_url}
            alt={activity.actor.display_login}
          />
        </div>
      </div>
      <div>{body}</div>
    </div>
  );
};
