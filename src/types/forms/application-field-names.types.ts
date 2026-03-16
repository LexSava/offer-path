export type ApplicationInputFieldName = 'position' | 'company' | 'salary' | 'url';

export type ApplicationDropdownFieldName =
  | 'specialization'
  | 'grade'
  | 'mainStack'
  | 'currency'
  | 'period'
  | 'contract'
  | 'status';

export type ApplicationTextareaFieldName = 'notes';

export type ApplicationFieldName =
  | ApplicationInputFieldName
  | ApplicationDropdownFieldName
  | ApplicationTextareaFieldName;
