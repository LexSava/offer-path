'use client';

import { memo } from 'react';
import { Pencil } from 'lucide-react';
import { DeleteApplicationButton, FavoriteApplicationButton } from '@/components/common';
import type { IApplicationDetailContentHeaderProps } from '@/types';

export const ApplicationDetailContentHeader = memo(
  function ApplicationDetailContentHeaderComponent({
    resolvedApplication,
    isEditing,
    onDeleted,
    onStartEdit,
  }: IApplicationDetailContentHeaderProps) {
    return (
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-logo text-primary text-3xl font-medium">
            {resolvedApplication.position}
          </h2>
          <p className="text-secondary text-lg">{resolvedApplication.specialization}</p>
          <p className="text-secondary text-lg">Company: {resolvedApplication.company}</p>
        </div>

        <div className="flex items-center gap-2">
          <FavoriteApplicationButton applicationId={resolvedApplication.id} />

          {!isEditing ? (
            <DeleteApplicationButton applicationId={resolvedApplication.id} onDeleted={onDeleted} />
          ) : null}

          {!isEditing ? (
            <button
              type="button"
              onClick={onStartEdit}
              className="text-secondary flex cursor-pointer items-center gap-1 border border-gray-300 px-3 py-2 text-sm font-medium transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900"
            >
              <Pencil size={16} />
              Edit
            </button>
          ) : null}
        </div>
      </div>
    );
  },
);
