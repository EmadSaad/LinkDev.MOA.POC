import { Injectable } from '@angular/core';
import { APIService } from "src/modules/shared/Services/API-Service/api-service.service";
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { OperatingLicenseModel } from 'src/modules/Operating-License-Request/Model/OperatingLicenseModel';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';

@Injectable({
    providedIn: 'root'
})
export class OperatingLicenseService {
    constructor(private api: APIService) { }

    public GetOperatingLicense(Id: string): Observable<ApiGenericResponse<OperatingLicenseModel>> {
        return this.api.Get<ApiGenericResponse<OperatingLicenseModel>>(`api/OperatingLicense/GetOperatingLicense?Id=${Id}`);
    }

    public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
        return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
      }
}