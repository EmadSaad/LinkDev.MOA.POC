import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { ContractModel } from '../interfaces/Contract-model';

@Injectable({
  providedIn: 'root'
})
export class OldCrAndContractService {
  

  constructor(protected api: APIService) { }

  public GetCRsByContactId(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>("api/EServices/GetCRsByTypeByContactId?crType=1");
  }

  

  public getContracts(CRId:string,isFinalOnly:boolean): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
    debugger;
    SharedHelper.showLoader();
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsWithCodeByCR?CRId=${CRId}&isFinalOnly=${isFinalOnly}`);
  }

  public getContractDetails(contractId:string): Observable<ApiGenericResponse<ContractModel>>
  {
    return this.api.Get<ApiGenericResponse<ContractModel>>(`api/EServices/GetContractDetails?contractId=${contractId}`);
  }



}
