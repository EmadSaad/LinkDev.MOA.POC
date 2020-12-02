import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { IBiddingsFiltration } from '../interfaces/BiddingsFiltration.interface';
import { IBidding } from '../interfaces/Bidding.interface';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';

@Injectable({
  providedIn: 'root'
})
export class WonBiddingsService implements WorkspaceService<IBiddingsFiltration, IBidding> {

  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  search(filter: IBiddingsFiltration): Observable<ApiGenericResponse<IGridResultBase<IBidding>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IBidding>>>(`${this.portalUrl}/GetWonBiddings`, filter).pipe();
  }
}