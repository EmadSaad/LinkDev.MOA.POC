import { Injectable } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { QualificationCertificateDetails } from '../interfaces/QualificationCertificate';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { Observable } from 'rxjs';
import { ContractorCertificateDetails } from '../interfaces/ContractorCertificateDetails';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  private baseControllerUrl = 'api/Outputs';
  constructor(private api: APIService) { }

  getOfficeCertificate(Id: string): Observable<ApiGenericResponse<QualificationCertificateDetails>> {
    return this.api.Get(`${this.baseControllerUrl}/GetOfficeCertificateById?Id=${Id}`);
  }

  getContractorCertificate(Id: string): Observable<ApiGenericResponse<ContractorCertificateDetails>> {
    return this.api.Get(`${this.baseControllerUrl}/GetContractorCertificateById?Id=${Id}`);
  }

}
