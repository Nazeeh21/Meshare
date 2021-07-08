/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { HrefComp } from "./HrefComp";

export const GithubActivity = ({ activity }) => {
  const router = useRouter();
  let body = null;
  switch (activity.type) {
    case "WatchEvent": {
      switch (activity.payload.action) {
        case "started": {
          // starred
          body = (
            <div>
              {/* <div
                className="cursor-pointer inline-block font-bold"
                onClick={() => {
                  router.push(`https://github.com/${activity.actor.login}`);
                }}
              >
                {activity.actor.display_login}
              </div> */}
              <HrefComp label={activity.actor.display_login} hrefLink={`https://github.com/${activity.actor.login}`} />
              {" "}
              starred{" "}
              {/* <span
                className="cursor-pointer font-bold"
                onClick={() => {
                  router.push(`https://github.com/${activity.repo.name}`);
                }}
              >
                {activity.repo.name}
              </span> */}
              <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
            </div>
          );
          break;
        }
      }
      break;
    }

    case "CreateEvent": {
      if (activity.payload.pusher_type === "user") {
        // user has pushed to a repository
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div> */}
            <HrefComp label={activity.actor.display_login} hrefLink={`https://github.com/${activity.actor.login}`} />
            {" "}
            created a repository{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span> */}
            <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
          </div>
        );
      }
      break;
    }

    case "ForkEvent": {
      if (activity.payload.forkee) {
        // user  has forked a repo
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div> */}
            <HrefComp label={activity.actor.display_login} hrefLink={`https://github.com/${activity.actor.login}`} />
            {" "}
            forked{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span> */}
            <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
          </div>
        );
      }
      break;
    }

    case "MemberEvent": {
      if (activity.payload.action === "added" && activity.org !== undefined) {
        // user has been added to an organization
        // const orgi = activity.org;
        // console.log("orgi:", orgi);
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(
                  `https://github.com/${activity.payload.member.login}`
                );
              }}
            >
              {activity.payload.member.login}
            </div> */}
            <HrefComp label={activity.payload.member.login} hrefLink={`https://github.com/${activity.payload.member.login}`} />
            {" "}
            has been added to an organization{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.org.login}`);
              }}
            >
              {activity.org.login}
            </span> */}
            <HrefComp label={activity.org.login} hrefLink={`https://github.com/${activity.org.login}`} />
          </div>
        );
      } else if (
        activity.payload.action === "added" &&
        activity.org === undefined &&
        activity.repo !== undefined &&
        activity.payload.member !== null
      ) {
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(
                  `https://github.com/${activity.payload.member.login}`
                );
              }}
            >
              {activity.payload.member.login}
            </div> */}
            <HrefComp label={activity.payload.member.login} hrefLink={`https://github.com/${activity.payload.member.login}`} />
            {" "}
            has been added to repository{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span> */}
            <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
          </div>
        );
      }
      break;
    }

    case "PublicEvent": {
      console.log(
        "activity.payload of PublicEvent: ",
        Object.keys(activity.payload).length === 0
      );

      if (Object.keys(activity.payload).length === 0) {
        // user has made public repo
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.display_login}
            </div> */}
            <HrefComp label={activity.actor.display_login} hrefLink={`https://github.com/${activity.actor.login}`} />
            {" "}
            made{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span> */}
            <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
          </div>
        );
      }
      break;
    }

    case "PushEvent": {
      if (
        activity.payload.commits.length !== 0 &&
        activity.payload.push_id !== null &&
        activity.payload.push_id !== undefined
      ) {
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.actor.login}`);
              }}
            >
              {activity.actor.login}
            </div> */}
            <HrefComp label={activity.actor.login} hrefLink={`https://github.com/${activity.actor.login}`} />
            {" "}
            pushed to{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }}
            >
              {activity.repo.name}
            </span> */}
            <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
          </div>
        );
      }
      break;
    }

    case "ReleaseEvent": {
      if(activity.payload.action === "published" && activity.payload.repo !== null && activity.payload.release !== null) {
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.actor.display_login}`);
              }}
            >
              {activity.actor.display_login}
            </div> */}
            <HrefComp label={activity.actor.display_login} hrefLink={`https://github.com/${activity.actor.display_login}`} />
            {" "}
            released {" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(activity.payload.release.html_url);
              }}
            >
              {activity.payload.release.tag_name}
            </span>  */}
            <HrefComp label={activity.payload.release.tag_name} hrefLink={activity.payload.release.html_url} />
            of
            {/* <span onClick={() => {
                router.push(`https://github.com/${activity.repo.name}`);
              }} className='cursor-pointer inline-block font-bold'>{activity.repo.name}</span> */}
              <HrefComp label={activity.repo.name} hrefLink={`https://github.com/${activity.repo.name}`} />
          </div>
        );
      }
      break;
    }
    case "CommitCommentEvent": {
      if(activity.payload.comment.node_id && activity.repo.name !== null && activity.payload.comment.body !== null) {
        body = (
          <div>
            {/* <div
              className="cursor-pointer inline-block font-bold"
              onClick={() => {
                router.push(`https://github.com/${activity.actor.display_login}`);
              }}
            >
              {activity.actor.login}
            </div> */}
            <HrefComp label={activity.actor.login} hrefLink={`https://github.com/${activity.actor.display_login}`} />
            {" "}
            commented on{" "}
            {/* <span
              className="cursor-pointer font-bold"
              onClick={() => {
                router.push(activity.payload.comment.html_url);
              }}
            >
              {activity.repo.name}
            </span>  */}
            <HrefComp label={activity.repo.name} hrefLink={activity.payload.comment.html_url} />
          </div>
        );
      }
      break;
    }
  }
  return (
    <div className="mt-6 text-white mr-4 ml-4 flex items-center">
      <div>
        <div className="h-12 bg-iconBlue w-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-4 md:mr-2 lg:mr-4 rounded-full overflow-hidden">
          <img
            onClick={() => {
              router.push(
                `https://www.github.com/${
                  activity.type === "MemberEvent"
                    ? activity.payload.member.login
                    : activity.actor.display_login
                }`
              );
            }}
            className="cursor-pointer"
            src={
              activity.type === "MemberEvent"
                ? activity.payload.member.avatar_url
                : activity.actor.avatar_url
            }
            alt={
              activity.type === "MemberEvent"
                ? activity.payload.member.login
                : activity.actor.display_login
            }
          />
        </div>
      </div>
      <div>
        {body}
        <div>
          <ReactTimeAgo date={activity.created_at} locale="en-US" />
        </div>
      </div>
    </div>
  );
};
