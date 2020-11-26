import { LookupRequestMode } from '../Enums/lookup-request-mode.enum';
export class RetrieveOptionsRequest {
  EntityName: string;
  CachingKey: string;
  Mode: LookupRequestMode;
  OptionSetName?: string;
  Result?: any[];
}
