import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { ContractSubmissionModel } from '../interfaces/contract-submission-model';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { Guid } from 'guid-typescript';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';

@Injectable({
  providedIn: 'root'
})
export class ContractSubmissionService implements IRequestService<ContractSubmissionModel> {
private getUrl: string = "api/ContractSubmission/GetContractSubmission?";
private postUrl: string = "api/EventPermitRequest/Post";
private getLookupsUrl: string = "api/EServices/GetCRsByContact";
constructor(protected api: APIService) { }

public get(params: string): Observable<ApiGenericResponse<EServiceModel<ContractSubmissionModel>>>{
  return this.api.Get<ApiGenericResponse<EServiceModel<ContractSubmissionModel>>>(`${this.getUrl}${params}`);
}
public post(application: EServiceModel<ContractSubmissionModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl,application);
}
public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
}
public getCRContacts(CRId: Guid): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
}

}
