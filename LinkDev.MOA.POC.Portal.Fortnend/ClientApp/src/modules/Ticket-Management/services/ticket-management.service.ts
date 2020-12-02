import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { TicketModel } from '../interfaces/ticket-model';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { CRAndRelatedILsModel } from 'src/modules/Contract-Submission/interfaces/CRAndRelatedILsModel';
import { ContractInfoModel } from 'src/modules/Plan-Approval/Model/ContractInfoModel';

@Injectable({
  providedIn: 'root'
})
export class TicketManagementService implements IRequestService<TicketModel> {
  private getUrl: string = "api/TicketManagemnt/GetTicketList?";
  private postUrl: string = "api/TicketManagemnt/PostTicket";
constructor(protected api: APIService) { }

  public get(params: string): Observable<ApiGenericResponse<EServiceModel<TicketModel>>>{
    return this.api.Get<ApiGenericResponse<EServiceModel<TicketModel>>>(`${this.getUrl}${params}`);
}
  public post(application: EServiceModel<TicketModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl,application);
}
public GetCRsByTypeByContactId(crType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
}

public getCRContacts(CRId: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
{
  return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetContactDetailsByCR?CRId=${CRId}`);
}
}
