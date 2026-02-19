'use client';

import React from 'react';

import { useState } from 'react';

export const AddNewApplicationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log('Opening modal...');
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="cursor-pointer rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Add New Application
      </button>
    </div>
  );
};
