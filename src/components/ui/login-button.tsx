'use client';

import React from 'react';
import { LoginModal } from '../common/login-modal';

export const LoginButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="bg-accent hover:bg-primary cursor-pointer rounded px-4 py-2 font-semibold text-white transition-colors"
        onClick={handleOpenModal}
      >
        Login
      </button>

      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
