import { Injectable } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { ContractorCr } from '../interfaces/contractor-cr';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { AddSafetyCrToLicenseRequest } from '../interfaces/add-safety-cr-to-license-request';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private baseControllerUrl = 'api/Outputs';
  constructor(private api: APIService) { }

  getLicenseDocuments(regardingId: string): Observable<ApiGenericResponse<DocumentSettingModel[]>> {
    return this.api.Get(`${this.baseControllerUrl}/GetDocuments?regardingId=${regardingId}`);
  }
  getBuildingLicenseInfo(licenseId: string): Observable<ApiGenericResponse<any>> {
    return this.api.Get(`${this.baseControllerUrl}/GetBuildingLicenseDetails?LicenseId=${licenseId}`);
  }
  getBuildingLicenseContractorAndConsultingOffice(licenseId: string): Observable<ApiGenericResponse<ContractorCr[]>> {
    return this.api.Get(`${this.baseControllerUrl}/ContractorsandConsultingOffices?contractId=&buildingliicenseId=${licenseId}`);
  }
  getRequiredLookups(licenseId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get(`${this.baseControllerUrl}/GetAvailableConsultingOfficesAndContractors?licenseId=${licenseId}`);
  }
  addSafetyToLicense(safetyRequest: AddSafetyCrToLicenseRequest): Observable<ApiGenericResponse<boolean>> {
    return this.api.Post(`${this.baseControllerUrl}/AddSafetyCRtoLicense`, safetyRequest);
  }
}
