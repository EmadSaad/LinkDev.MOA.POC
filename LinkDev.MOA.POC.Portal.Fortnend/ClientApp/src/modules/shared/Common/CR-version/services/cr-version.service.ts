import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { CRVersion } from '../interfaces/cr-version-model';

@Injectable({
  providedIn: 'root'
})
export class CrVersionService {

  constructor(protected api: APIService) { }

  public GetCRsByContactId(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
  {
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>("api/EServices/GetCRsByTypeByContactId?crType=1");
  }

  public GetCRVersionDetails(CRId:string): Observable<ApiGenericResponse<CRVersion>>
  {
     return this.api.Get<ApiGenericResponse<CRVersion>>(`api/EServices/GetCRVersionDetails?CRId=${CRId}`);
  }


  public GetCRVersion(CRId:string): Observable<ApiGenericResponse<CRVersion>>
  {
     return this.api.Get<ApiGenericResponse<CRVersion>>(`api/EServices/GetCRVersion?CRId=${CRId}`);
  }
  
  
  
}
