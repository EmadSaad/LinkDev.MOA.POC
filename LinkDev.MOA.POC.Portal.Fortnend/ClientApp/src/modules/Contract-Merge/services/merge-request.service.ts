import { Injectable } from '@angular/core';
import { IRequestService } from "src/modules/shared/services/IRequestService.service";
import { Observable } from "rxjs";
import { ApiGenericResponse } from "src/modules/shared/Models/api-generic-response";
import { ApplicationPostModel } from "src/modules/shared/Models/application-post-model";
import { EServiceModel } from "src/modules/shared/Models/eservice-model.model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
import { APIService } from "src/modules/shared/Services/API-Service/api-service.service";
import { MergeRequestModel } from "../interfaces/merge-request-model";
import { SharedHelper } from 'src/modules/shared/services/shared-helper';


@Injectable({
  providedIn: 'root'
})
export class MergeRequestService implements IRequestService<MergeRequestModel> {

  private getUrl: string = "api/MergeRequest/GetMergeContractRequest?";
  private postUrl: string = "api/MergeRequest/PostMergeContractRequest";

  constructor(protected api: APIService) { }

  get(params: string): Observable<ApiGenericResponse<EServiceModel<MergeRequestModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<MergeRequestModel>>>(`${this.getUrl}${params}`);
  }

  public post(application: EServiceModel<MergeRequestModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
    return this.api.Post(this.postUrl, application);
  }
  public GetFinalILsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetFinalILsByCR?CRId=${CRId}`);
    }
  public getContracts(CRId:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsWithCodeByCR?CRId=${CRId}`);
  }
  public getCRSRelatedToUser(CRId:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsWithCodeByCR?CRId=${CRId}`);
  }
  public GetProductsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetModonProductsRelatedToCR?CRId=${CRId}`);
   }

   public getContractsRelatedToUser(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
   {

     return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsByLoggedInUser`);
   }

   public GetContactDetailsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
   {
     return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
   }

   public GetILsByCR(CRId:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetILsByCR?CRId=${CRId}`);
  }

  public GetModonProductsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetModonProductsRelatedToCR?CRId=${CRId}`);
  }

}
