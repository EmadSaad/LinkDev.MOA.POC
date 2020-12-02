import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { IRequestFiltration } from '../interfaces/RequestFiltration.interface';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { IRequestsResult } from '../interfaces/RequestResult.interface';
import { FiltrationBase } from '../interfaces/filtration-base';

@Injectable({
  providedIn: 'root'
})
export class RequestsService implements WorkspaceService<IRequestFiltration, IRequestsResult> {

  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  search(filter: IRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<IRequestsResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IRequestsResult>>>(`${this.portalUrl}/GetRequests`, filter).pipe();
  }

}
