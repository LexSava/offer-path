'use client';

import React from 'react';

export const LoginButton: React.FC = () => {
  const handleClick = () => {
    console.log('Model login is open');
  };

  return (
    <button
      type="button"
      className="bg-accent hover:bg-primary cursor-pointer rounded px-4 py-2 font-semibold text-white transition-colors"
      onClick={handleClick}
    >
      Login
    </button>
  );
};
