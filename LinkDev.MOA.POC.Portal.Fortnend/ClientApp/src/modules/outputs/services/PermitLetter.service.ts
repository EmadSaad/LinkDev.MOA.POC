import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PermitLetterService{

 
    private baseControllerUrl = 'api/Outputs';
  constructor(private api: APIService) { }

  GetPermitRequest(PermitLetterId: string): Observable<ApiGenericResponse<any>>  {
    return this.api.Get(`${this.baseControllerUrl}/GetPermitRequest?PermitLetterId=${PermitLetterId}`);
}
   getPermitRequestDocuments(regardingId: string): Observable<ApiGenericResponse<DocumentSettingModel[]>> {
     return this.api.Get(`${this.baseControllerUrl}/GetDocuments?regardingId=${regardingId}`);
    
  }

}