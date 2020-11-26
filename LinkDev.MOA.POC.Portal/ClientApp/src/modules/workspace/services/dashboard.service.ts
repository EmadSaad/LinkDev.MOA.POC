import { Injectable } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IOverviewResult } from '../interfaces/OverviewResult.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api: APIService) { }

  getOverviewData(crId: string, contractId?: string): Observable<ApiGenericResponse<IOverviewResult>> {
    return this.api.Get<ApiGenericResponse<IOverviewResult>>(`api/workspace/GetOverviewData?crId=${crId}&contractId=${contractId}`);
  }
}
