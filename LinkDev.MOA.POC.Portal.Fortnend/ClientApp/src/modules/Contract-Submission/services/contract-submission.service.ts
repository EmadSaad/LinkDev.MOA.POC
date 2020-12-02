import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { ContractSubmissionModel } from '../interfaces/contract-submission-model';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { Guid } from 'guid-typescript';
import { CRAndRelatedILsModel } from '../interfaces/CRAndRelatedILsModel';
import { ILAndRelatedIndustrialCitiesModel } from '../interfaces/ILAndRelatedIndustrialCitiesModel';
import { SAGIAModel } from '../interfaces/SAGIAModel';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { Factory } from '../interfaces/factory';

@Injectable({
  providedIn: 'root' 
})
export class ContractSubmissionService implements IRequestService<ContractSubmissionModel> {
private getUrl: string = "api/ContractSubmission/GetContractSubmission?";
private postUrl: string = "api/ContractSubmission/PostContractSubmission";
private getLookupsUrl: string = "api/EServices/GetCRsByTypeByContactId?crType=1";
constructor(protected api: APIService) { }

public get(params: string): Observable<ApiGenericResponse<EServiceModel<ContractSubmissionModel>>>{
  return this.api.Get<ApiGenericResponse<EServiceModel<ContractSubmissionModel>>>(`${this.getUrl}${params}`);
}
public post(application: EServiceModel<ContractSubmissionModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl, application);
}
public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
}
public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
}
public getContactsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactsByCR?CRId=${CRId}`);
}
public getCRContracts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsRelatedToCR?CRId=${CRId}`);
}
public getAllIndustrialCities(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/ContractSubmission/GetAllIndustrialCities`);
}
public GetCRDetailsAndRelatedILs(CRId: string): Observable<ApiGenericResponse<CRAndRelatedILsModel>>
{
  return this.api.Get<ApiGenericResponse<CRAndRelatedILsModel>>(`api/ContractSubmission/GetCRDetailsAndRelatedILs?CRId=${CRId}`);
}
public GetILDetailsAndRelatedIndustrialCities(ILId: string): Observable<ApiGenericResponse<ILAndRelatedIndustrialCitiesModel>>
{
  return this.api.Get<ApiGenericResponse<ILAndRelatedIndustrialCitiesModel>>(`api/ContractSubmission/GetILDetailsAndRelatedIndustrialCities?ILId=${ILId}`);
}
public GetSAGIADetails(number: string): Observable<ApiGenericResponse<SAGIAModel>>
{
  return this.api.Get<ApiGenericResponse<SAGIAModel>>(`api/ContractSubmission/GetSAGIA?number=${number}`);
}
public GetFactoryDetails(number: string): Observable<ApiGenericResponse<Factory>>
{
  return this.api.Get<ApiGenericResponse<Factory>>(`api/ContractSubmission/GetFactory?number=${number}&isFinal=true`);
}
public getCRModonProducts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetModonProductsRelatedToCR?CRId=${CRId}`);
}
}
