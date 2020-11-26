import { Injectable } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { BiddingModel } from '../models/BiddingModel';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  private getUrlBidding = 'api/Bidding/GetBidding';
  private getUrlOldBidding = 'api/Bidding/GetBiddingByRequestId';
  private postUrlBidding = 'api/Bidding/SubmitBidding';

  private getLookupsUrl: string = "api/EServices/GetCRsByContact";

  constructor(private http: APIService) { }//APIService

  post(application: EServiceModel<BiddingModel>): Observable<ApiGenericResponse<BiddingModel>> {
    throw new Error("Method not implemented.");
  }

  public get(params?: string): Observable<ApiGenericResponse<EServiceModel<BiddingModel>>> {
    return this.http.Get<ApiGenericResponse<EServiceModel<BiddingModel>>>(`${this.getUrlBidding}?${params}`);
  }
  public getBidding(params?: string): Observable<ApiGenericResponse<BiddingModel>> {
    return this.http.Get<ApiGenericResponse<BiddingModel>>(`${this.getUrlBidding}?${params}`);
  }

  public getOldBiddingsByPlanApproval(requestId?: string, serviceType?: string, qualify?: string): Observable<ApiGenericResponse<BiddingModel[]>> {
    return this.http.Get<ApiGenericResponse<BiddingModel[]>>
      (`${this.getUrlOldBidding}?requestId=${requestId}&serviceType=${serviceType}&qualify=${qualify}`);
  }


  public postModel(currentBidding: BiddingModel): Observable<ApiGenericResponse<BiddingModel>> {
    return this.http.Post<ApiGenericResponse<BiddingModel>>(this.postUrlBidding, currentBidding);
  }

  public getDynamicLookups(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.http.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(this.getLookupsUrl);
  }

  public GetFilteredOffice(industrialCity: string, requestType: number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.http.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetFilteredOffice?industrialCity=${industrialCity}&requestType=${requestType}`);
  }

  public GetFilteredContractors(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.http.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetFilteredContractors`);
  }

}
