import { EntityReferenceItem } from './EntityReferenceItem.model';
import { Guid } from 'guid-typescript';

export class ApplicationHeader {
  Id?: string
  RequestNumber: string;
  ServiceCode: string;
  ServiceName: string;
  CRMStatusCode: string;
  PortalStatusCode: string;
  PortalStatusName: string;
  ContactId: Guid;
  Accounts: Guid[];
  SubmissionDateString: string;
}
