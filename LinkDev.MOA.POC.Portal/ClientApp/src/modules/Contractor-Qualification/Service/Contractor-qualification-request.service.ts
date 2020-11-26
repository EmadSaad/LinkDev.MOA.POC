import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { Observable } from 'rxjs';
import { EntityReferenceItem } from 'src/modules/shared/Models/EntityReferenceItem.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { ContractorQualificationRequestModel } from '../models/Contractor-Qualification-Request-Model';
import { promise } from 'protractor';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { CRAndRelatedILsModel } from 'src/modules/Contract-Submission/interfaces/CRAndRelatedILsModel';

@Injectable({
  providedIn: 'root'
})
export class ContractorQualificationRequestService implements IRequestService<ContractorQualificationRequestModel> {

  private GetContractorQualificationRequest = 'api/ContractorQualification/GetContractorQualificationRequest';
  private SubmitContractorQualificationRequest = 'api/ContractorQualification/SubmitContractorQualificationRequest';
  constructor(protected api: APIService) { }
  
  public get(params?: string): Observable<ApiGenericResponse<EServiceModel<ContractorQualificationRequestModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<ContractorQualificationRequestModel>>>(`${this.GetContractorQualificationRequest}?${params}`);
  }

  public post(currentContractorQualificationRequest: EServiceModel<ContractorQualificationRequestModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.SubmitContractorQualificationRequest, currentContractorQualificationRequest);
  }
  public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
  }
  public GetCRDetailsAndRelatedILs(CRId: string): Observable<ApiGenericResponse<CRAndRelatedILsModel>>
{
  return this.api.Get<ApiGenericResponse<CRAndRelatedILsModel>>(`api/ContractSubmission/GetCRDetailsAndRelatedILs?CRId=${CRId}`);
}
  public GetCRsByTypeByContactId(crType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}&IsContractorrequest=true`);
  }
  public GetOldCertificateByCRIdandRequestTypeId(CrId:string , RequestTypeId:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/ContractorQualification/GetOldCertificateByCRIdandRequestTypeId?CrId=${CrId}&RequestTypeId=${RequestTypeId}`);
  }
  public BindOldCertificateData(oldId:string, RequestTypeId:string): Observable<ApiGenericResponse<EServiceModel<ContractorQualificationRequestModel>>>
  {
    return this.api.Get<ApiGenericResponse<EServiceModel<ContractorQualificationRequestModel>>>(`api/ContractorQualification/BindOldCertificateData?oldId=${oldId}&RequestTypeId=${RequestTypeId}`);
  }
  public GetRequestProjects(Id:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/ContractorQualification/GetRequestProjects?Id=${Id}`);
  }
  public GetCurrentUserType(CRId:string): Observable<ApiGenericResponse<number>>{
      return this.api.Get<ApiGenericResponse<number>>(`api/EServices/GetCurrentUserType?CRId=${CRId}`);
    }

    public ValidateContractorRequest (cRId?:string, requesttypeId?:string,oldCertificateId?:string): Observable<ApiGenericResponse<boolean>>{
      return this.api.Get<ApiGenericResponse<boolean>>
      (`api/ContractorQualification/ValidateContractorQualificationRequest?crId=${cRId}&requestTypeId=${requesttypeId}&oldCertificateId=${oldCertificateId}`);
    }
}
