export interface GridColumn {
  field: string;
  header: string;
  typeConfig: ColumnFieldTypeConfiguration;
}

export interface ColumnFieldTypeConfiguration {
  type: ColumnFieldType,
  lookupKey?: any;
  //listOptions?: any[];
  dateFormat?: string;
  urlKey?: string;
  dropDownconfig?: any;
}
export enum ColumnFieldType {
  None = '',
  Text = 'text',
  TextArea = 'textArea',
  Dropdown = 'dropdown',
  Date = 'date',
  Href = 'href',
  HTML = 'HTML',
  RadioButton = 'RadioButton',
  Number = 'number'
}
