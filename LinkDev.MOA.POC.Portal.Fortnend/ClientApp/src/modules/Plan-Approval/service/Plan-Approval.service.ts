import { Injectable } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { PlanApprovalModel } from '../Model/PlanApprovalModel';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { Guid } from 'guid-typescript';
import { PlanApprovalValidation } from '../Model/PlanApprovalValidation';
import { ContractInfoModel } from '../Model/ContractInfoModel';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { ContractsBalancesValidationModel } from '../Model/ContractsBalancesValidationModel';

@Injectable({
  providedIn: 'root'
})
export class PlanApprovalService implements IRequestService<PlanApprovalModel> {

  private getUrlPlanApproval = 'api/PlanApproval/GetPlanApproval';
  private postUrlPlanApproval = 'api/PlanApproval/SubmitPlanApproval';
  private getURLValidatePlanApprovalRequest = 'api/PlanApproval/GetValidatePlanApprovalRequest';
  
  //private getLookupsUrl: string = "api/EServices/GetCRsByContact";
  private getLookupsUrl: string = "api/EServices/GetCRsByTypeByContactId?crType=";
    
  constructor(protected api: APIService) { }
 

    public get(params?: string): Observable<ApiGenericResponse<EServiceModel<PlanApprovalModel>>> {
      return this.api.Get<ApiGenericResponse<EServiceModel<PlanApprovalModel>>>(`${this.getUrlPlanApproval}?${params}`);
    }
  
    public post(currentPlanApproval: EServiceModel<PlanApprovalModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
      //return this.api.Post<ApiGenericResponse<PlanApprovalModel>>(this.postUrlPlanApproval, currentPlanApproval);
      return this.api.Post(this.postUrlPlanApproval, currentPlanApproval);
    }
    // public post(currentPlanApproval: PlanApprovalModel): Observable<ApiGenericResponse<PlanApprovalModel>> {
    //   //return this.api.Post<ApiGenericResponse<PlanApprovalModel>>(this.postUrlPlanApproval, currentPlanApproval);
    //   return this.api.Post(this.postUrlPlanApproval, currentPlanApproval);
    // }

    // public getDynamicLookups(crType: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    // {
    //   //return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
    //   return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
    // }


    public GetCRsByTypeByContactId(crType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
    }

    public GetFilteredOfficeByTypeByContactId(industrialCity:string, requestType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>
      (`api/EServices/GetFilteredOfficeByTypeByContactId?industrialCity=${industrialCity}&requestType=${requestType}`);
    }

    public GetCurrentUserType(CRId:string): Observable<ApiGenericResponse<number>>
    {
      return this.api.Get<ApiGenericResponse<number>>(`api/EServices/GetCurrentUserType?CRId=${CRId}`);
    }

    public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
    }

    public GetContractsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsRelatedToCR?CRId=${CRId}`);
    }

    public GetContractMeterNumberByContract(contractId: string): Observable<ApiGenericResponse<number>>
    {
      return this.api.Get<ApiGenericResponse<number>>(`api/PlanApproval/GetContractMeterNumber?contractId=${contractId}`);
    }

    public ValidatePlanApprovalRequest(planTypeId?: string, contractId?:string, cRId?:string, requestId?:string): Observable<ApiGenericResponse<PlanApprovalValidation>>{
      return this.api.Get<ApiGenericResponse<PlanApprovalValidation>>
      (`api/PlanApproval/GetValidatePlanApprovalRequest?planTypeId=${planTypeId}&contractId=${contractId}&cRId=${cRId}&requestId=${requestId}`);
    }

    public GetContractInfo(contractId: string): Observable<ApiGenericResponse<ContractInfoModel>>
    {
      return this.api.Get<ApiGenericResponse<ContractInfoModel>>(`api/PlanApproval/GetContractInfo?Id=${contractId}`);
    }

    public GetValidateCRContractsBalances(CRId: string): Observable<ApiGenericResponse<ContractsBalancesValidationModel>> {
      return this.api.Get<ApiGenericResponse<ContractsBalancesValidationModel>>(`api/EServices/GetValidateCRContractsBalances?CRId=${CRId}`);
    }

}
