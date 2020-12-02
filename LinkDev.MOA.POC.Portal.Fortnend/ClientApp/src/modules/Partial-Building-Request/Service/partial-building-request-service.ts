import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { PartialBuildingRequestModel } from '../Model/PartialBuildingRequestModel';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';


@Injectable({
  providedIn: 'root'
})
export class PartialBuildingRequestService implements IRequestService<PartialBuildingRequestModel> {

  
  private getUrlPartialBuildingRequest = 'api/PartialBuildingRequest/GetPartialBuildingRequest';
  private postUrlPartialBuildingRequest = 'api/PartialBuildingRequest/SubmitPartialBuildingRequest';

  constructor(protected api: APIService) { }
  
  
  public get(params?: string): Observable<ApiGenericResponse<EServiceModel<PartialBuildingRequestModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<PartialBuildingRequestModel>>>(`${this.getUrlPartialBuildingRequest}?${params}`);
  }

  
  public post(currentPartialBuildingRequest: EServiceModel<PartialBuildingRequestModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrlPartialBuildingRequest, currentPartialBuildingRequest);
  }

 

  public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
  }

  public GetCRsByTypeByContactId(crType: number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
  }

  public GetContractsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsRelatedToCR?CRId=${CRId}`);
    }

    public GetBuildingLicensesRelatedToContract(ContractId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/PartialBuildingRequest/GetBuildingLicensesRelatedToContract?ContractId=${ContractId}`);
    }

    public ValidateBuildingLicense(buildingLicenseId: string): Observable<ApiGenericResponse<boolean>>
    {
      return this.api.Get<ApiGenericResponse<boolean>>(`api/PartialBuildingRequest/ValidateBuildingLicense?buildingLicenseId=${buildingLicenseId}`);
    }
}
