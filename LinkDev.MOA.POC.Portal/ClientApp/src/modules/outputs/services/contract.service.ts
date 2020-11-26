import { Injectable } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { Observable } from 'rxjs';
import { ContractContactDetails } from '../interfaces/contract-contact-details';
import { ContractStatement } from '../interfaces/contract-statement';
import { ContractDetails } from '../interfaces/contract-details';
import { ContractorCr } from '../interfaces/contractor-cr';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseControllerUrl = 'api/Outputs';
  constructor(private api: APIService) { }

  getContractContacts(contractId: string): Observable<ApiGenericResponse<ContractContactDetails[]>> {
    return this.api.Get(`${this.baseControllerUrl}/GetContactDetails?contractId=${contractId}`);
  }
  getContractStatement(contractNumber: string): Observable<ApiGenericResponse<ContractStatement>> {
    return this.api.Get(`${this.baseControllerUrl}/GetContractStatment?contractNumber=${contractNumber}`);
  }
  getContractDetails(contractId: string): Observable<ApiGenericResponse<ContractDetails>> {
    return this.api.Get(`${this.baseControllerUrl}/GetContractDetails?contractId=${contractId}`);
  }
  getContractContractorsAndConsultingOffices(contractId: string): Observable<ApiGenericResponse<ContractorCr[]>> {
    return this.api.Get(`${this.baseControllerUrl}/ContractorsandConsultingOffices?contractId=${contractId}&buildingliicenseId=`);
  }
  getContractDocuments(regardingId: string): Observable<ApiGenericResponse<DocumentSettingModel[]>> {
    return this.api.Get(`${this.baseControllerUrl}/GetDocuments?regardingId=${regardingId}`);
  }
  getAvailableContacts(crId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get(`api/EServices/GetContactDetailsByCR?CRId=${crId}`);
  }
  deleteContact(contractId: string, contactId: string): Observable<ApiGenericResponse<boolean>> {
    return this.api.Get(`${this.baseControllerUrl}/DeleteContactDetailsToContract?ContactDetailsID=${contactId}&ContractID=${contractId}`);
  }
  addContact(contractId: string, contactId): Observable<ApiGenericResponse<boolean>> {
    return this.api.Get(`${this.baseControllerUrl}/AddContactDetailsToContract?ContactDetailsID=${contactId}&ContractID=${contractId}`);

  }
}
