export interface NameFieldsViewProps {
  states: {
    validationErrors?: Record<string, string>;
    content: {
      firstNameLabel: string;
      lastNameLabel: string;
    };
  };
}
export declare function NameFieldsView(props: NameFieldsViewProps): any;
