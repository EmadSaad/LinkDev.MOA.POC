import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { PermitLetterModel } from '../Model/PermitLetterModel';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';

@Injectable({
  providedIn: 'root'
})
export class PermitsLetterService implements IRequestService<PermitLetterModel> {
  private getUrl: string = "api/PermitLetter/GetPermitLetterRequest?";
  private postUrl: string = "api/PermitLetter/PostPermitLetter";
  private getLookupsUrl: string = "api/EServices/GetCRsByContact";
  getContractsRelatedToContact: string = "api/PermitLetter/GetContractsRelatedToContact";
constructor(protected api: APIService) { }
  get(params?: string): Observable<ApiGenericResponse<EServiceModel<PermitLetterModel>>>
   {
     debugger;
    return this.api.Get<ApiGenericResponse<EServiceModel<PermitLetterModel>>>(`${this.getUrl}${params}`);
  }
  post(application: EServiceModel<PermitLetterModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrl, application);
  }
  public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
  }
  public GetContractsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsRelatedToCR?CRId=${CRId}`);
    }
    public GetContractsRelatedToContact(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`${this.getContractsRelatedToContact}`);
    }
    public GetContractInfo(contractId: string): Observable<ApiGenericResponse<ContractInfoModel>>
    {
      return this.api.Get<ApiGenericResponse<ContractInfoModel>>(`api/PlanApproval/GetContractInfo?Id=${contractId}`);
    }
    public GetOldPermit(contractId: string,permitTypeId: string): Observable<ApiGenericResponse<string>>
    {
      return this.api.Get<ApiGenericResponse<string>>(`api/PermitLetter/GetOldPermit?contractId=${contractId}&permitType=${permitTypeId}`);
    }
    public ValidateContract(contractId: string):Observable<ApiGenericResponse<boolean>>
    {
      return this.api.Get<ApiGenericResponse<boolean>>(`api/PermitLetter/ValidateContract?contractId=${contractId}`);
    }
    public ValidateDuplicateRequest(contractId: string,permitTypeId: string):Observable<ApiGenericResponse<boolean>>
    {
      return this.api.Get<ApiGenericResponse<boolean>>(`api/PermitLetter/ValidateDuplicate?contractId=${contractId}&permitType=${permitTypeId}`);
    }
     public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
    }
}
