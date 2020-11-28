import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { IGridResultBase } from 'src/modules/workspace/interfaces/GridResultBase.interface';
import { IRequestFiltration } from 'src/modules/workspace/interfaces/RequestFiltration.interface';
import { IRequestsResult } from 'src/modules/workspace/interfaces/RequestResult.interface';



@Injectable({
  providedIn: 'root'
})
export class MOAService {
  
  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
 
 

  search(filter: IRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<IRequestsResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IRequestsResult>>>(`${this.portalUrl}/GetRequests`, filter).pipe();
}
}