import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';
import { DrillingModal } from '../Model/DrillingPermitModel';
import { ValidContractModel } from '../Model/ValidContractModel';

@Injectable({
  providedIn: 'root'
})
export class DrillingPermitService implements IRequestService<DrillingModal> {
  private getUrl: string = "api/DrillingPermit/GetDrillingPermitRquest?";
  private postUrl: string = "api/DrillingPermit/PostDrillingPermitLetter";
  private getLookupsUrl: string = "api/EServices/GetCRsByTypeByContactId?crType=7";
  getContractsRelatedToContact: string = "api/PermitLetter/GetContractsRelatedToContact";
constructor(protected api: APIService) { }
  get(params?: string): Observable<ApiGenericResponse<EServiceModel<DrillingModal>>>
   {
     debugger;
    return this.api.Get<ApiGenericResponse<EServiceModel<DrillingModal>>>(`${this.getUrl}${params}`);
  }
  post(eServiceModel: EServiceModel<DrillingModal>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    debugger;
    return this.api.Post(this.postUrl, eServiceModel);
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
    public GetOldDrillingPermit(CRNameId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/DrillingPermit/GetOldDrillingPermit?CRNameId=${CRNameId}`);
    }
    public ValidateContract(contractId: string):Observable<ApiGenericResponse<ValidContractModel>>
    {
      return this.api.Get<ApiGenericResponse<ValidContractModel>>(`api/DrillingPermit/ValidateContract?contractId=${contractId}`);
    }

    public GetOldDrillingPermitRquestDetails(Id: string):Observable<ApiGenericResponse<DrillingModal>>
    {
      return this.api.Get<ApiGenericResponse<DrillingModal>>(`api/DrillingPermit/GetOldDrillingPermitRquestDetails?Id=${Id}`);
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
