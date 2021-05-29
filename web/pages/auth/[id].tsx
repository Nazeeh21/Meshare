import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { isServer } from '../../utils/isServer';

const AuthSuccess = () => {
  const router = useRouter()
  useEffect(() => {
    if(!isServer()) {

      // console.log(window.sessionStorage.getItem())
    }
  }, [isServer()])
return <div>
  please wait
  </div>;
};

export default AuthSuccess;
