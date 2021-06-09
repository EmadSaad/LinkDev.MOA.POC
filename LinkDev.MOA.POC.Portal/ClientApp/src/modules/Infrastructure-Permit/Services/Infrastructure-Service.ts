import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { InfrastructurePermitModel } from '../Models/InfrastructurePermitModel';
import { LookupsModel } from '../Models/LookupsModel';
import { APIHelperService } from './ApiHelper-service';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  private baseUrl: string = "https://localhost:44387/api/";
  private getUrl: string = "https://localhost:44387/api/Lookups/CompaniesLookups";
  private postUrl: string = "https://localhost:44387/api/InfrastructurePermitRequest/PostInfrastructurePermitRequest";
constructor(protected api: APIService) { }
public get(params: string): Observable<EServiceModel<InfrastructurePermitModel>> {
  return this.api.Get<EServiceModel<InfrastructurePermitModel>>(`${this.getUrl}${params}`);
}

public post(application: EServiceModel<InfrastructurePermitModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl, application);
}

public getDesignConsultantLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/DesignConsultantLookups`);
}


}
