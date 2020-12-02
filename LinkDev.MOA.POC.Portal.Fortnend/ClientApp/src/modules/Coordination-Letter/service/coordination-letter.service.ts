import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { CoordinationLetterModel } from '../Model/CoordinationLetterModel';
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
export class CoordinationLetterService implements IRequestService<CoordinationLetterModel> {
  
private getUrl="api/CoordinationLetter/GetCoordinationLetterRequest";
private postUrl: string = "api/CoordinationLetter/PostCoordinationLetter";
  getContractsRelatedToContact: string = "api/CoordinationLetter/GetContractsRelatedToContact";
constructor(protected api: APIService) { }

  get(params?: string): Observable<ApiGenericResponse<EServiceModel<CoordinationLetterModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<CoordinationLetterModel>>>(`${this.getUrl}?${params}`);
  }
  post(application: EServiceModel<CoordinationLetterModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrl, application);
  }

  public GetContractsRelatedToContact(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`${this.getContractsRelatedToContact}`);
  }

  public GetContractInfo(contractId: string): Observable<ApiGenericResponse<ContractInfoModel>>
  {
    return this.api.Get<ApiGenericResponse<ContractInfoModel>>(`api/PlanApproval/GetContractInfo?Id=${contractId}`);
  }

  public ValidateRequest(contractId: string):Observable<ApiGenericResponse<boolean>>
    {
      return this.api.Get<ApiGenericResponse<boolean>>(`api/CoordinationLetter/ValidateContract?contractId=${contractId}`);
    }
}
