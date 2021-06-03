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
              starred{' '}
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
            created a repository{' '}
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
            forked{' '}
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
      if (activity.payload.action === 'added' && activity.org !== undefined) {
        // user has been added to an organization
        // const orgi = activity.org;
        // console.log("orgi:", orgi);
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(
                  `https://github.com/${activity.payload.member.login}`
                );
              }}
            >
              {activity.payload.member.login}
            </div>{' '}
            has been added to an organization{' '}
            <span
              className='cursor-pointer font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.org.login}`);
              }}
            >
              {activity.org.login}
            </span>
          </div>
        );
      } else if (
        activity.payload.action === 'added' &&
        activity.org === undefined &&
        activity.repo !== undefined &&
        activity.payload.member !== null
      ) {
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(
                  `https://github.com/${activity.payload.member.login}`
                );
              }}
            >
              {activity.payload.member.login}
            </div>{' '}
            has been added to repository{' '}
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

    case 'PushEvent': {
      if (
        activity.payload.commits.length !== 0 &&
        activity.push_id !== null &&
        activity.push_id !== undefined
      ) {
        body = (
          <div>
            <div
              className='cursor-pointer inline-block font-bold'
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.login}
            </div>{' '}
            pushed to{' '}
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
        <div className='h-12 bg-iconBlue w-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-4 md:mr-2 lg:mr-4 rounded-full overflow-hidden'>
          <img
            onClick={() => {
              router.push(
                `https://www.github.com/${activity.type === "MemberEvent" ? activity.payload.member.login : activity.actor.display_login}`
              );
            }}
            className='cursor-pointer'
            src={activity.type === "MemberEvent" ? activity.payload.member.avatar_url : activity.actor.avatar_url}
            alt={activity.type === "MemberEvent" ? activity.payload.member.login : activity.actor.display_login}
          />
        </div>
      </div>
      <div>{body}</div>
    </div>
  );
};
