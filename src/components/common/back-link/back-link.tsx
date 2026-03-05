import { SquareArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { IBackLinkProps } from '@/types';

export function BackLink({ url, text }: IBackLinkProps) {
  return (
    <Link
      href={url}
      className="text-secondary hover:text-primary hover:bg-surface flex items-start justify-between gap-1 border border-transparent px-2 py-1 transition-colors hover:border-gray-300"
    >
      <SquareArrowLeft size={24} />
      <span>{text}</span>
    </Link>
  );
}
