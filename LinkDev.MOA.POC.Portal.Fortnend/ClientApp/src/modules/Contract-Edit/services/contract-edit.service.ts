import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { CRVersion } from 'src/modules/shared/Common/CR-version/interfaces/cr-version-model';
import { ILVersion } from 'src/modules/shared/Common/IL-version/interfaces/il-version-model';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { ContractEditModel } from '../interfaces/contract-edit-model';

@Injectable({ 
  providedIn: 'root'
})
export class ContractEditService implements IRequestService<ContractEditModel> {
  private getUrl: string = 'api/EditContract/GetEditContractRequest?';
  private postUrl: string = 'api/EditContract/PostEditContractRequest';
  private getLookupsUrl: string = 'api/EServices/GetCRsByTypeByContactId?crType=1';

  constructor(protected api: APIService) { }
  public get(params: string): Observable<ApiGenericResponse<EServiceModel<ContractEditModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<ContractEditModel>>>(`${this.getUrl}${params}`);

  }
  public post(application: EServiceModel<ContractEditModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrl, application);

  }
  public getAvailableContracts() {

  }
  public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
 }

 public GetContactDetailsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
   return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
 }
 public GetFinalILsByCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetILsByCR?CRId=${CRId}`);
  }
  public CheckCRTransferOwnerShip(CRNumber: string): Observable<ApiGenericResponse<CRVersion>> {
    return this.api.Get<ApiGenericResponse<CRVersion>>(`api/EditContract/CRTransferOwnerShip?CRNumber=${CRNumber}`);
  }

  public CheckILTransferOwnerShip(CRNumber: string , ILNumber: string): Observable<ApiGenericResponse<ILVersion>> {
    return this.api.Get<ApiGenericResponse<ILVersion>>
    (`api/EditContract/ILTransferOwnerShip?CRNumber=${CRNumber}&ILNumber=${ILNumber}`);
  }
 public GetProductsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetModonProductsRelatedToCR?CRId=${CRId}`);
 }

 public GetLoanStatus(CRId: string): Observable<ApiGenericResponse<boolean>> {
  return this.api.Get<ApiGenericResponse<boolean>>(`api/EditContract/GetLoanStatus?CRId=${CRId}`);
 }

}
