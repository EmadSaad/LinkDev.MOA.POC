import { LookupRequestMode } from '../Enums/lookup-request-mode.enum';

 export class LookupResponse {

   LookupStrategyKey: LookupRequestMode;
   EntityLogicalName: string;
   OptionSetLogicalName: string;
   Value: string;
   Label: string;
 }


 export class MainCategoryLookupResponse extends LookupResponse {
   Code : string;
   CaseTypeCode: number;
 }

