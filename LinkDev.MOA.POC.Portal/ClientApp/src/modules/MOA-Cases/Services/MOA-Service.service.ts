import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { IGridResultBase } from 'src/modules/workspace/interfaces/GridResultBase.interface';
import { IRequestFiltration } from 'src/modules/workspace/interfaces/RequestFiltration.interface';
import { IRequestsResult } from 'src/modules/workspace/interfaces/RequestResult.interface';
import { CaseStatistics } from '../Models/case-statistics';



@Injectable({
  providedIn: 'root'
})
export class MOAService {

  private MOACasesUrl = 'http://moa.westeurope.cloudapp.azure.com/api/Requests/GetRequests';
  constructor(private api: APIService) { }



  search(filter: IRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<IRequestsResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<IRequestsResult>>>(`${this.MOACasesUrl}`, filter).pipe();
}

getCaseStatistics():Observable<CaseStatistics>{
  return this.api.Get<CaseStatistics>("http://moa.westeurope.cloudapp.azure.com/api/Requests/CaseStatistics").pipe();
}
}
