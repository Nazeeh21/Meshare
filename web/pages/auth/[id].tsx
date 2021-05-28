import { useRouter } from 'next/router';
import React from 'react';

const AuthSuccess = () => {
  const router = useRouter()
  const accessToken = router.query.id;
  return <div>
    {accessToken ? 'Auth successful' : 'Auth failed'}
  </div>;
};

export default AuthSuccess;
