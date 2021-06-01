import { LayoutProps } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  faGlobe,
  faQuestionCircle,
  faPenNib,
  faSignOutAlt,
  // @ts-ignore
} from '@fortawesome/free-solid-svg-icons';
import { SidebarButton } from './SidebarButton';
import { useGetUserQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';
interface Props {
  image?: string;
}
export const Sidebar: React.FC<Props> = ({ image }: Props) => {
  const router = useRouter();
  const [active, setActive] = useState<Number>(0);
  const [user, setUser] = useState(null);

  const [{ data, error }] = useGetUserQuery({
    pause: isServer(),
  });

  const [_, logout] = useLogoutMutation();

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);
  // useEffect(() => {
  //   const fetchedUser = supabase.auth.user()
  //   setUser(fetchedUser)
  // }, [])

  return (
    <div className='h-sidebarH lg:w-32 md:w-32 bg-white w-1/12 rounded-l-md hidden md:flex flex-col justify-around'>
      <div className='h-16 bg-iconBlue w-16 rounded-full mx-auto mt-8 overflow-hidden'>
        <img
          src={
            data?.getUser && !error ? data.getUser.avatarUrl : '/doraemon.svg'
          }
          alt={user ? user.user_metadata.full_name : 'Default avatar'}
        />
      </div>
      <div>
        <div className='my-24'>
          <SidebarButton
            click={() => setActive(0)}
            isActive={active === 0}
            icon={faGlobe}
          />

          <SidebarButton
            click={() => setActive(1)}
            isActive={active === 1}
            icon={faQuestionCircle}
          />

          <SidebarButton
            click={() => setActive(2)}
            isActive={active === 2}
            icon={faPenNib}
          />
        </div>
      </div>
      <div>
        {/* <Button> */}
        <SidebarButton
          click={async () => {
            await logout();
            router.reload();
          }}
          icon={faSignOutAlt}
          color={'#BCD2E2'}
        />
        {/* </Button> */}
      </div>
    </div>
  );
};
