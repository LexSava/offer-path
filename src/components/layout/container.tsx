import { cn } from '@/utils/cn';
import { ContainerProps } from '@/types';

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-475 px-4 py-6 md:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
