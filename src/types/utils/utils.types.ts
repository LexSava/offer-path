export interface IUseCloseOnEscapeParams {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
}