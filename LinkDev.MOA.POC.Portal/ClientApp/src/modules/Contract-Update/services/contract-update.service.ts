import { Injectable } from '@angular/core';
import { IRequestService } from '../../shared/services/IRequestService.service';
import { ContractUpdateModel } from '../Interfaces/Contract-Update-Model';
import { APIService } from '../../shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from '../../shared/Models/api-generic-response';
import { EServiceModel } from '../../shared/Models/eservice-model.model';
import { RetrieveOptionsRequest } from '../../shared/Models/lookup-request.model';
import { ApplicationPostModel } from '../../shared/Models/application-post-model';

@Injectable({
  providedIn: 'root'
})
export class ContractUpdateService implements IRequestService<ContractUpdateModel> {
  private getUrl: string = 'api/UpdateContractRequest/GetUpdateContractRequest?';
  private postUrl: string = 'api/UpdateContractRequest/PostUpdateContractRequest';
  private getLookupsUrl: string = 'api/EServices/GetCRsByTypeByContactId?crType=1';

  constructor(protected api: APIService) { }
  public get(params: string): Observable<ApiGenericResponse<EServiceModel<ContractUpdateModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<ContractUpdateModel>>>(`${this.getUrl}${params}`);

  }
  public post(application: EServiceModel<ContractUpdateModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrl, application);

  }
  public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
  }

  public GetFinalILsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetILsByCR?CRId=${CRId}`);
  }

  public GetProductsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetModonProductsRelatedToCR?CRId=${CRId}`);
  }

}
