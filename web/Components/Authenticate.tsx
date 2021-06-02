import { Auth, Typography, Button } from '@supabase/ui';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

const { Text } = Typography;

// Create a single supabase client for interacting with your database

const Container = (props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const user = props.supabaseClient.auth.user();

      setUser(user);
      console.log('user: ', user);
    }, 500);
  }, []);

  if (user) {
    return (
      <div>
        {/* @ts-ignore */}
        <Text>Signed in: {user.email}</Text>
        <Button
          block
          onClick={async () => {
            console.log('sign out start');

            await props.supabaseClient.auth.signOut();
            console.log('sign out end');
            router.reload();
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return props.children;
};

export default function Authenticate() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth providers={['github']} supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  );
}
