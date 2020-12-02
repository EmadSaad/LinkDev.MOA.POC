

import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { IPermitRequestFiltration } from '../interfaces/PermitRequestFiltration.interface';
import { IPermitRequestResult } from '../interfaces/PermitRequestResult.interface';

@Injectable({
  providedIn: 'root'
})
export class PermitRequestService implements WorkspaceService<IPermitRequestFiltration, IPermitRequestResult> {

  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  search(filter: IPermitRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<IPermitRequestResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IPermitRequestResult>>>(`${this.portalUrl}/GetPermitRequest`, filter).pipe();
  }

}
