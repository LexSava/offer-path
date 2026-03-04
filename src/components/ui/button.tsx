import { IButtonProps } from '@/types';
import { cn } from '@/utils';

const variantClassMap = {
	primary:
		'bg-primary hover:bg-primary/90 cursor-pointer rounded px-4 py-2 text-sm font-medium text-white transition-colors',
	secondary:
		'cursor-pointer rounded px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100',
} as const;

export function Button({
	text,
	variant,
	onClick,
	type = 'button',
	disabled = false,
	className,
}: IButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={cn(variantClassMap[variant], className, disabled && 'opacity-50')}
		>
			{text}
		</button>
	);
}

