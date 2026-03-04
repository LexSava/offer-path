import { cn } from '@/utils/cn';
import { IContainerProps } from '@/types';

export function Container({ children, className }: IContainerProps) {
  return (
    <main className={cn('mx-auto w-full max-w-475 px-4 py-6 md:px-6 lg:px-8', className)}>
      {children}
    </main>
  );
}
