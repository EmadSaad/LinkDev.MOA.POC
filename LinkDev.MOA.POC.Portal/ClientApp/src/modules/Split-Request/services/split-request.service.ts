import { SplitRequestModel } from "./../interfaces/split-request-model";
import { Injectable } from '@angular/core';
import { IRequestService } from "src/modules/shared/services/IRequestService.service";
import { Observable } from "rxjs";
import { ApiGenericResponse } from "src/modules/shared/Models/api-generic-response";
import { ApplicationPostModel } from "src/modules/shared/Models/application-post-model";
import { EServiceModel } from "src/modules/shared/Models/eservice-model.model";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
import { APIService } from "src/modules/shared/Services/API-Service/api-service.service";


@Injectable({
  providedIn: 'root'
})
export class SplitRequestService implements IRequestService<SplitRequestModel> {
  
  private getUrl: string = "api/SplitRequest/GetSplitRequest?";
  private postUrl: string = "api/SplitRequest/PostSplitRequest";

  constructor(protected api: APIService) { }
  
  get(params: string): Observable<ApiGenericResponse<EServiceModel<SplitRequestModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<SplitRequestModel>>>(`${this.getUrl}${params}`);
  }

  public post(application: EServiceModel<SplitRequestModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
    return this.api.Post(this.postUrl, application);
  }

  public getContracts(CRId:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsWithCodeByCR?CRId=${CRId}`);
  }

  public GetILsByCR(CRId:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetILsByCR?CRId=${CRId}`);
  }

  public GetContactDetailsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
  }

  public GetModonProductsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetModonProductsRelatedToCR?CRId=${CRId}`);
  }
  

  

}
