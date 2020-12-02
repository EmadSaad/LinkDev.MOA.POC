import { ApplicationHeader } from './application-header.model';
import { ServiceStatusEnum } from '../Enums/service-status-enum';
import { DocumentSettingModel } from '../Documents/Interfaces/DocumentSettingModel';
export class EServiceModel<T>
{
  ApplicationHeader: ApplicationHeader;
  Documents: DocumentSettingModel[];
  Request: T;
  IsSubmitted: boolean;
  IsReadOnly: boolean;
}
