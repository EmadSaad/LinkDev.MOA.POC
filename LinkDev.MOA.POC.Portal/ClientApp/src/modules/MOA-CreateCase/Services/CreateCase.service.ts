import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { CaseModel } from '../Models/CaseModel';
import { LookupsModel } from '../Models/LookupsModel';
import { APIHelperService } from './ApiHelper-service';

@Injectable({
  providedIn: 'root'
})
export class CreateCaseService {
  private getUrl: string = "https://localhost:44387/api/Lookups/CompaniesLookups";
  private postUrl: string = "api/MergeRequest/PostMergeContractRequest";
constructor(protected api: APIService) { }
public get(params: string): Observable<ApiGenericResponse<EServiceModel<CaseModel>>> {
  return this.api.Get<ApiGenericResponse<EServiceModel<CaseModel>>>(`${this.getUrl}${params}`);
}

public post(application: EServiceModel<CaseModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl, application);
}

public getCompaniesLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.getUrl}`);
}
}
