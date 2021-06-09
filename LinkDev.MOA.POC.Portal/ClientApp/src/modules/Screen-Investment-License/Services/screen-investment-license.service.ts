import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { LookupsModel } from '../Models/LookupsModel';
import { QuestionsModel } from '../Models/QuestionModel';
import { ScreenInvestmentLicenseModel } from '../Models/ScreenInvestmentLicenseModel';


@Injectable({
  providedIn: 'root'
})
export class ScreenInvestmentLicenseService {
  private baseUrl: string = "https://localhost:44387/api/";
  private getUrl: string = "https://localhost:44387/api/Lookups/CompaniesLookups";
  private postUrl: string = "https://localhost:44387/api/ScreenInvestmentLicense/PostScreenInvestmentLicense";
constructor(protected api: APIService) { }
public get(params: string): Observable<EServiceModel<ScreenInvestmentLicenseModel>> {
  return this.api.Get<EServiceModel<ScreenInvestmentLicenseModel>>(`${this.getUrl}${params}`);
}

public post(application: EServiceModel<ScreenInvestmentLicenseModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl, application);
}

public getCompaniesLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/CompaniesLookups`);
}

public getQuestions(): Observable<QuestionsModel[]> {
  return this.api.Get<QuestionsModel[]>(`${this.baseUrl}Questions/GetQuestions`);
}

public getArrivingPortsLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/ArrivingPortsLookups`);
}

public getProductsLookups(): Observable<LookupsModel[]> {
  return this.api.Get<LookupsModel[]>(`${this.baseUrl}Lookups/ProductsLookups`);
}

}
