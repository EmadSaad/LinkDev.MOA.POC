import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { OperatingLicenseRequestModel } from '../Model/OperatingLicenseRequestModel';
import { OperatingLicenseValidation } from '../Model/OperatingLicenseValidation';
import { OperatingLicenseModel } from '../Model/OperatingLicenseModel';
import { ContractsBalancesValidationModel } from '../Model/ContractsBalancesValidationModel';


@Injectable({
  providedIn: 'root'
})
export class OperatingLicenseRequestService implements IRequestService<OperatingLicenseRequestModel> {

  
  private getUrlOperatingLicenseRequest = 'api/OperatingLicenseRequest/GetOperatingLicenseRequest';
  private postUrlOperatingLicenseRequest = 'api/OperatingLicenseRequest/SubmitOperatingLicenseRequest';

  constructor(protected api: APIService) { }


  public get(params?: string): Observable<ApiGenericResponse<EServiceModel<OperatingLicenseRequestModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<OperatingLicenseRequestModel>>>(`${this.getUrlOperatingLicenseRequest}?${params}`);
  }


  public post(currentOperatingLicenseRequest: EServiceModel<OperatingLicenseRequestModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrlOperatingLicenseRequest, currentOperatingLicenseRequest);
  }

  public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
  }

  public GetCRsByTypeByContactId(crType: number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
  }

  public GetContractsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsRelatedToCR?CRId=${CRId}`);
  }

  public GetBuildingLicensesRelatedToContract(ContractId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/OperatingLicenseRequest/GetBuildingLicensesRelatedToContract?ContractId=${ContractId}`);
  }

  public ValidateOperatingLicenseRequest(contractId: string): Observable<ApiGenericResponse<OperatingLicenseValidation>>
  {
    return this.api.Get<ApiGenericResponse<OperatingLicenseValidation>>(`api/OperatingLicenseRequest/GetValidateOperatingLicenseRequest?contractId=${contractId}`);
  }

  public GetOperatingLicense(Id: string): Observable<ApiGenericResponse<OperatingLicenseModel>> {
    return this.api.Get<ApiGenericResponse<OperatingLicenseModel>>(`api/OperatingLicense/GetOperatingLicense?Id=${Id}`);
  }

  public GetValidateCRContractsBalances(CRId: string): 
  Observable<ApiGenericResponse<ContractsBalancesValidationModel>> {
    return this.api.Get<ApiGenericResponse<ContractsBalancesValidationModel>>
    (`api/EServices/GetValidateCRContractsBalances?CRId=${CRId}`);
  }


}
