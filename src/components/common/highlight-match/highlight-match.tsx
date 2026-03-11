import { Fragment, ReactNode } from 'react';
import { cn } from '@/utils';
import type { IHighlightMatchProps } from '@/types';
import { getMatchRanges } from './highlight-match.utils';

export function HighlightMatch({ text, query, highlightClassName }: IHighlightMatchProps) {
  const matchRanges = getMatchRanges(text, query ?? '');

  if (matchRanges.length === 0) {
    return text;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  matchRanges.forEach((range, index) => {
    if (cursor < range.start) {
      parts.push(
        <Fragment key={`text-${index}-${cursor}`}>{text.slice(cursor, range.start)}</Fragment>,
      );
    }

    parts.push(
      <span
        key={`match-${index}-${range.start}`}
        className={cn('rounded bg-yellow-200', highlightClassName)}
      >
        {text.slice(range.start, range.end)}
      </span>,
    );

    cursor = range.end;
  });

  if (cursor < text.length) {
    parts.push(<Fragment key={`text-tail-${cursor}`}>{text.slice(cursor)}</Fragment>);
  }

  return <>{parts}</>;
}
