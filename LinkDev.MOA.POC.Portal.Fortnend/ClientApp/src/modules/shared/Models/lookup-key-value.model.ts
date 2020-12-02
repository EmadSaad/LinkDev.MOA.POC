export interface LookupKeyValue {
  Value: any;
  Text: string;
}

export interface MainCategoryLookupKeyValue extends LookupKeyValue {
  Code: string;
  CaseTypeCode: number;
}
