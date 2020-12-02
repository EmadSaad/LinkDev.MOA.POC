import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { ConstructionReportRequestModel } from '../Construction-Report-Request/Model/ConstructionReportRequest';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';

@Injectable({
  providedIn: 'root'
})
export class ConstructionReportRequestService implements IRequestService<ConstructionReportRequestModel>{

  private getUrlConstructionReportRequest = 'api/ConstructionReportRequest/GetConstructionReportRequest';
  private postUrlConstructionReportRequest = 'api/ConstructionReportRequest/SubmitConstructionReportRequest';

  

constructor(protected api: APIService) { }


public get(params?: string): Observable<ApiGenericResponse<EServiceModel<ConstructionReportRequestModel>>> {
  return this.api.Get<ApiGenericResponse<EServiceModel<ConstructionReportRequestModel>>>(`${this.getUrlConstructionReportRequest}?${params}`);
}

public post(currentConstructionReport: EServiceModel<ConstructionReportRequestModel>): Observable<ApiGenericResponse<ApplicationPostModel>> {
  return this.api.Post(this.postUrlConstructionReportRequest, currentConstructionReport);
}

public GetCurrentUserType(CRId:string): Observable<ApiGenericResponse<number>>
    {
      return this.api.Get<ApiGenericResponse<number>>(`api/EServices/GetCurrentUserType?CRId=${CRId}`);
    }

}
