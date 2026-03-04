import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface IDropdownOption {
  label: string;
  value: string;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export interface IDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: IDropdownOption[];
  placeholder?: string;
  registration?: UseFormRegisterReturn;
}

export interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  maxCharacters?: number;
  registration?: UseFormRegisterReturn;
}
