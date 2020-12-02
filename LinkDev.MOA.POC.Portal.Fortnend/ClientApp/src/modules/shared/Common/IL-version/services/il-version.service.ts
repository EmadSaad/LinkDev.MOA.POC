import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ILVersion } from '../interfaces/il-version-model';

@Injectable({
  providedIn: 'root'
})
export class IlVersionService {

  constructor(protected api: APIService) { }

  public GetILVersionDetails(ILId:string): Observable<ApiGenericResponse<ILVersion>>
  {
  return this.api.Get<ApiGenericResponse<ILVersion>>(`api/EServices/GetILVersionDetails?ILId=${ILId}`);
  }

  public GetILVersion(ILId:string): Observable<ApiGenericResponse<ILVersion>>
  {
  return this.api.Get<ApiGenericResponse<ILVersion>>(`api/EServices/GetILVersion?ILId=${ILId}`);
  }

  
}
