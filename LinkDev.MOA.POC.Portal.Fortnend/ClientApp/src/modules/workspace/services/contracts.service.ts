import { Injectable } from '@angular/core';
import { IContractFiltration } from '../interfaces/ContractFiltration.interface';
import { WorkspaceService } from './workspace-service.service';
import { IContractResult } from '../interfaces/ContractResult.interface';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';

@Injectable({
  providedIn: 'root'
})
export class ContractsService implements WorkspaceService<IContractFiltration, IContractResult> {

  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  search(filter: IContractFiltration): Observable<ApiGenericResponse<IGridResultBase<IContractResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IContractResult>>>(`${this.portalUrl}/GetContracts`, filter).pipe();
  }

}
