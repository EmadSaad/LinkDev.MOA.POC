import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { ITicketFiltration } from '../interfaces/TicketFiltration.interface';
import { ITicketResult } from '../interfaces/TicketResult.interface';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService implements WorkspaceService<ITicketFiltration, ITicketResult> {

  private portalUrl = 'api/Workspace';
  public url: string = ConfigService.CRMAPI;
  constructor(private api: APIService) { }
  
  search(filter: ITicketFiltration): Observable<ApiGenericResponse<IGridResultBase<ITicketResult>>> {
    return this.api.GetTicketList<ApiGenericResponse<IGridResultBase<ITicketResult>>>(`${this.url}Cases?customerID=${filter.CRId}`).pipe();
  }
}
