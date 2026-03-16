export interface IApplicationListItemProps {
  applicationId: string;
  highlightQuery: string;
  onOpenApplication: (applicationId: string) => void;
}
