import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfrastructurePermitModel } from 'src/modules/Infrastructure-Permit/Models/InfrastructurePermitModel';
import { CaseModel } from 'src/modules/MOA-CreateCase/Models/CaseModel';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';

@Injectable({
  providedIn: 'root'
})
export class MoaPaymentService implements IRequestService<CaseModel> {

  private getUrl: string = "https://localhost:44387/api/Requests/GetPayment?";
  private postUrl: string = "https://localhost:44387/api/Requests/PostPayment";

  constructor(protected api: APIService) { }

  get(params: string): Observable<ApiGenericResponse<EServiceModel<InfrastructurePermitModel>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<InfrastructurePermitModel>>>(`${this.getUrl}${params}`);
  }

  public post(application: EServiceModel<CaseModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
    return this.api.Post(this.postUrl, application);
  }
  public postpayment(application: EServiceModel<CaseModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
    return this.api.Post(this.postUrl, application);
  }
}
