import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { IRequestFiltration } from '../interfaces/RequestFiltration.interface';
import { ITasksResult } from '../interfaces/TasksResult.interface';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements WorkspaceService<IRequestFiltration, ITasksResult> {

  constructor(private api: APIService) { }
  search(filter: IRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<ITasksResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<ITasksResult>>>(`api/workspace/GetTasks`, filter).pipe();
  }

}
