import { Injectable } from '@angular/core';
import { BuildingLicenseRequestModel } from '../Model/BuildingLicenseRequestModel';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { Observable } from 'rxjs';
import { EntityReferenceItem } from 'src/modules/shared/Models/EntityReferenceItem.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { BuildingLicenseModel } from '../Model/BuildingLicenseModel';
import { BuildingLicenseRequestValidation } from '../Model/BuildingLicenseRequestValidation';
import { promise } from 'protractor';
import { ContractsBalancesValidationModel } from 'src/modules/Plan-Approval/Model/ContractsBalancesValidationModel';


@Injectable({
  providedIn: 'root'
})
export class BuildingLicenseRequestService implements IRequestService<BuildingLicenseRequestModel> {


  private getUrlBuildingLicenseRequest = 'api/BuildingLicenseRequest/GetBuildingLicenseRequest';
  private postUrlBuildingLicenseRequest = 'api/BuildingLicenseRequest/SubmitBuildingLicenseRequest';
 //private getLookupsUrl: string = "api/EServices/GetCRsByContact";


  constructor(protected api: APIService) { }

  public get(params?: string): Observable<ApiGenericResponse<EServiceModel<BuildingLicenseRequestModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<BuildingLicenseRequestModel>>>(`${this.getUrlBuildingLicenseRequest}?${params}`);
  }

  public post(currentBuildingLicenseRequest: EServiceModel<BuildingLicenseRequestModel>): Observable<ApiGenericResponse<BuildingLicenseRequestModel>> {
    return this.api.Post(this.postUrlBuildingLicenseRequest, currentBuildingLicenseRequest);
  }

  public GetCRsByTypeByContactId(crType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
    }

  //public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    //{
      //return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
    //}

    public GetCurrentUserType(CRId:string): Observable<ApiGenericResponse<number>>
    {
      return this.api.Get<ApiGenericResponse<number>>(`api/EServices/GetCurrentUserType?CRId=${CRId}`);
    }

    //  public GetCurrentUserType(CRId:string): Promise<ApiGenericResponse<number>>
    //  {
    //    return this.api.Get<ApiGenericResponse<number>>(`api/EServices/GetCurrentUserType?CRId=${CRId}`).toPromise();
    //  }

  public GetBuildingLicensesRequestDocuments(LicenseTypeId: string, ContractId:string): Observable<ApiGenericResponse<DocumentSettingModel[]>> {
    return this.api.Get<ApiGenericResponse<DocumentSettingModel[]>>(`api/BuildingLicenseRequest/GetBuildingLicensesRequestDocuments?LicenseTypeId=${LicenseTypeId}&ContractId=${ContractId}`);
  }

  // public GetBuildingLicensesRelatedToContract(ContractId: string,IsExpired?:boolean): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  //   {
  //     return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/BuildingLicenseRequest/GetBuildingLicensesRelatedToContract?ContractId=${ContractId}&IsExpired=${IsExpired}`);
  //   }

    public GetBuildingLicensesRelatedToContract(ContractId: string,LicenseType?:string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/BuildingLicenseRequest/GetBuildingLicensesRelatedToContract?ContractId=${ContractId}&LicenseType=${LicenseType}`);
    }

    public GetBuildingLicensesTypes(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/BuildingLicenseRequest/GetBuildingLicensesTypes`);
    }

    public GetContractsRelatedToCR(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContractsRelatedToCR?CRId=${CRId}`);
    }

    public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
    {
      return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
    }

    public GetBuildingLicenseDetails(BuildingLicenseId: string): Observable<ApiGenericResponse<BuildingLicenseModel>>
    {
      return this.api.Get<ApiGenericResponse<BuildingLicenseModel>>(`api/BuildingLicenseRequest/GetBuildingLicenseDetails?BuildingLicenseId=${BuildingLicenseId}`);
    }

    public ValidateBuildingLicenseRequest(cRId?: string,contractId?: string, licenseTypeId?:string, oldLicenseNumberId?:string, docs?:DocumentSettingModel[]): Observable<ApiGenericResponse<BuildingLicenseRequestValidation>>{
      return this.api.Get<ApiGenericResponse<BuildingLicenseRequestValidation>>
      (`api/BuildingLicenseRequest/ValidateBuildingLicenseRequest?cRId=${cRId}&contractId=${contractId}&licenseTypeId=${licenseTypeId}&oldLicenseNumberId=${oldLicenseNumberId}&docs=${docs}`);
    }

    public GetValidateCRContractsBalances(CRId: string): Observable<ApiGenericResponse<ContractsBalancesValidationModel>> {
      return this.api.Get<ApiGenericResponse<ContractsBalancesValidationModel>>(`api/EServices/GetValidateCRContractsBalances?CRId=${CRId}`);
    }
}
