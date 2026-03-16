import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface IFieldRegistration {
  name: string;
  onBlur: (...event: any[]) => void | Promise<boolean | void>;
  onChange: (...event: any[]) => void | Promise<boolean | void>;
  ref: (instance: any) => void;
  value?: string | number | readonly string[] | undefined;
}

export interface IDropdownOption {
  label: string;
  value: string;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: IFieldRegistration;
}

export interface IDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: IDropdownOption[];
  placeholder?: string;
  registration?: IFieldRegistration;
}

export interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  maxCharacters?: number;
  registration?: IFieldRegistration;
}
