import React from 'react'

export const GithubActivity = ({activity}) => {

  let body = null
  switch(activity.type) {
    case "WatchEvent": {
      switch (activity.payload.action) {
        case "started" : {
          // starred
          body = <div className='cursor-pointer' onClick={() => {window.location.href = `https://github.com/${activity.actor.login}`}}>{activity.actor.display_login} has starred <span>{activity.repo.name}</span></div>;
        }
      }
    };

    case "CreateEvent": {
      if(activity.payload.pusher_type === "user") {
        // user has pushed to a repository
        body = <div className='cursor-pointer' onClick={() => {window.location.href = `https://github.com/${activity.actor.login}`}}>{activity.actor.display_login} has pushed to <span>{activity.repo.name}</span></div>
      }
    };

    case "ForkEvent": {
      if(activity.payload.forkee) {
        // user  has forked a repo
        body = <div className='cursor-pointer' onClick={() => {window.location.href = `https://github.com/${activity.actor.login}`}}>{activity.actor.display_login} has forked <span>{activity.repo.name}</span></div>
      }
    };

    case "MemberEvent": {
      if(activity.payload.action === "added") {
        // user has been added to an organization
        body = <div className='cursor-pointer' onClick={() => {window.location.href = `https://github.com/${activity.actor.login}`}}>{activity.actor.display_login} has been added to <span>{activity.org.login}</span></div>
      }
    };

    case "PublicEvent": {
      // if(activity.payload === {}) {
        // user has made public repo
        body = <div className='cursor-pointer' onClick={() => {window.location.href = `https://github.com/${activity.actor.login}`}}>{activity.actor.display_login} made <span>{activity.repo.name}</span></div>;
      // }
    }
  }
    return (<div className='mt-6 text-white mr-4 ml-4'>
      {body}
    </div>);
}