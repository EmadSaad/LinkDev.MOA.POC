import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { ILetterResult } from '../interfaces/LettersResult.interface';
import { ILetterFiltration } from '../interfaces/LettersFilteration.interface';

@Injectable({
  providedIn: 'root'
})
export class LetterService implements WorkspaceService<ILetterFiltration, ILetterResult> {

  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  search(filter: ILetterFiltration): Observable<ApiGenericResponse<IGridResultBase<ILetterResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<ILetterResult>>>(`${this.portalUrl}/GetCoordinationletter`, filter).pipe();
  }

}
