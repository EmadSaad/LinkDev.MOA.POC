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
  private baseUrl: string = "https://localhost:44387/api/";
  private getUrl: string = "https://localhost:44387/api/Lookups/CompaniesLookups";
  private postUrl: string = "https://localhost:44387/api/Requests/PostCase";
constructor(protected api: APIService) { }
public get(params: string): Observable<EServiceModel<CaseModel>> {
  return this.api.Get<EServiceModel<CaseModel>>(`${this.getUrl}${params}`);
}

public post(application: EServiceModel<CaseModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl, application);
}

public getCompaniesLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/CompaniesLookups`);
}

public getCountriesLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/CountriesLookups`);
}

public getArrivingPortsLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/ArrivingPortsLookups`);
}

public getProductsLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/ProductsLookups`);
}
}
