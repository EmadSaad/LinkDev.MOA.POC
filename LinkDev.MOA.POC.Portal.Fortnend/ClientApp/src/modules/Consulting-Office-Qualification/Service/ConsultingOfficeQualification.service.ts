import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { ConsultingOfficeQualificationModel, ConsultingOfficeQualificationValidation } from '../Model/ConsultingOfficeQualificationModel';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { Guid } from 'guid-typescript';
import { QualificationCertificateModel } from '../Model/QualificationCertificateModel';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';

@Injectable({
  providedIn: 'root'
})
export class ConsultingOfficeQualificationService implements IRequestService<ConsultingOfficeQualificationModel>{

  private getUrlConsultingOfficeQualification = 'api/ConsultingOfficeQualification/GetConsultingOfficeQualification';
  private postUrlConsultingOfficeQualification = 'api/ConsultingOfficeQualification/SubmitConsultingOfficeQualification';
  private getUrlGetQualificationType = 'api/ConsultingOfficeQualification/GetQualificationType';
  private getUrlGetOldCertificateList = 'api/ConsultingOfficeQualification/GetOldCertificateList';
  private getUrlGetOldCertificateById = 'api/ConsultingOfficeQualification/GetOldCertificateById';
  private getUrlGetCityBySectorId = 'api/ConsultingOfficeQualification/GetCityBySectorId';
  private getUrlGetDocumentSettingByQualificationType = 'api/ConsultingOfficeQualification/GetDocumentSettingByQualificationType';
  private getUrlGetCanMakeRequest = 'api/ConsultingOfficeQualification/GetCanMakeRequest';

  

constructor(protected api: APIService) { }


public get(params?: string): Observable<ApiGenericResponse<EServiceModel<ConsultingOfficeQualificationModel>>> {
  return this.api.Get<ApiGenericResponse<EServiceModel<ConsultingOfficeQualificationModel>>>(`${this.getUrlConsultingOfficeQualification}?${params}`);
}

public post(currentConsultingOfficeQualification: EServiceModel<ConsultingOfficeQualificationModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
  return this.api.Post(this.postUrlConsultingOfficeQualification, currentConsultingOfficeQualification);
}

public GetCRsByTypeByContactId(crType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
}

public GetQualificationType(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getUrlGetQualificationType);
}

public GetOldCertificateList( CrId: Guid, QualificationTypeId: Guid ): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getUrlGetOldCertificateList+`?CRId=${CrId}&QualificationTypeId=${QualificationTypeId}`);
}

public GetOldCertificateById( Id: Guid ): Observable<ApiGenericResponse<QualificationCertificateModel>>
{
  return this.api.Get<ApiGenericResponse<QualificationCertificateModel>>(this.getUrlGetOldCertificateById+`?Id=${Id}`);
}

public GetCityBySectorId( sectorId: Guid ): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getUrlGetCityBySectorId+`?sectorId=${sectorId}`);
}

public GetDocumentSettingByQualificationType(QualificationTypeId: Guid): Observable<ApiGenericResponse<DocumentSettingModel[]>> {
  return this.api.Get<ApiGenericResponse< DocumentSettingModel[]>>(`${this.getUrlGetDocumentSettingByQualificationType}?QualificationTypeId=${QualificationTypeId}`);
}

public GetCanMakeRequest(QualificationTypeId:Guid, CRNumberId:Guid, OldQualificationCertificateId:Guid, SectorId:Guid): Observable<ApiGenericResponse<ConsultingOfficeQualificationValidation>> {
  return this.api.Get<ApiGenericResponse< ConsultingOfficeQualificationValidation>>(`${this.getUrlGetCanMakeRequest}?QualificationTypeId=${QualificationTypeId}&CRNumberId=${CRNumberId}&OldQualificationCertificateId=${OldQualificationCertificateId}&SectorId=${SectorId}`);
}

public getCRContacts(CRId: Guid): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
}

}
