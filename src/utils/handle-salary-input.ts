import type { ComponentProps } from 'react';

export const handleSalaryInput: NonNullable<ComponentProps<'input'>['onInput']> = (event) => {
  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');
};
