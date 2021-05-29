import React from 'react';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div
      style={{
        backgroundColor: '#4aa96c',
        width: '12vw',
        padding: '0.5rem',
        textAlign: 'center',
        borderRadius: '0.2rem',
        fontWeight: 'bold',
        margin: '20px',
      }}
    >
      <a
        href='http://localhost:4000/auth/github/'
        style={{ color: 'white', textDecoration: 'none' }}
      >
        Login using github
      </a>
    </div>
  );
};
