import { Injectable } from '@angular/core';
import { IQualificationFiltration } from '../interfaces/QualificationFiltration.interface';
import { IQualificationResult } from '../interfaces/QualificationResult.interface';
import { WorkspaceService } from './workspace-service.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';

@Injectable({
  providedIn: 'root'
})
export class QualificationService implements WorkspaceService<IQualificationFiltration, IQualificationResult> {
  
  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  
  search(filter: IQualificationFiltration): Observable<ApiGenericResponse<IGridResultBase<IQualificationResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IQualificationResult>>>(`${this.portalUrl}/GetQualification`, filter).pipe();
  }


}
