import { Injectable } from '@angular/core';
import { IRequestService } from '../../shared/services/IRequestService.service';
import { FactoryInsideFactoryModal } from '../Modals/FactoryInsideFactoryModal';
import { APIService } from '../../shared/Services/API-Service/api-service.service';
import { ApiGenericResponse } from '../../shared/Models/api-generic-response';
import { Observable } from 'rxjs';
import { EServiceModel } from '../../shared/Models/eservice-model.model';
import { ApplicationPostModel } from '../../shared/Models/application-post-model';

@Injectable({
  providedIn: 'root'
})
export class FactoryInsideFactoryService implements IRequestService<FactoryInsideFactoryModal> {
  private getUrl: string = "api/LeasingLetter/GetLeasingLetter?";
  private postUrl: string = "api/LeasingLetter/SubmitCompleteProfile";
  constructor(protected api: APIService) { }

  public get(params: string): Observable<ApiGenericResponse<EServiceModel<FactoryInsideFactoryModal>>> {
    return this.api.Get<ApiGenericResponse<EServiceModel<FactoryInsideFactoryModal>>>(`${this.getUrl}${params}`);
  }
  public post(application: EServiceModel<FactoryInsideFactoryModal>): Observable<ApiGenericResponse<ApplicationPostModel>> {
    return this.api.Post(this.postUrl, application);
  }
}
