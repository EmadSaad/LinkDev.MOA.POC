import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { PriceOfferModel } from '../models/PriceOfferModel';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { Guid } from 'guid-typescript';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';

@Injectable({
  providedIn: 'root'
})
export class PriceOfferService {

  private getUrlPriceOffer = 'api/PriceOffer/GetPriceOffer';
  private getUrlPriceOffersByBidId = 'api/PriceOffer/GetPriceOfferByBiddingId';
  private getUrlPriceOffersByBidingIdBidderId = 'api/PriceOffer/GetPriceByBiddingIdBidderId';
  private getUrlActiveBidId = 'api/PriceOffer/GetActiveBiddingId';
  private postUrlPriceOffer = 'api/PriceOffer/SubmitPriceOffer';

  constructor(private http: APIService) { }
  post(application: EServiceModel<PriceOfferModel>): Observable<ApiGenericResponse<PriceOfferModel>> {
    throw new Error("Method not implemented.");
  }

  public get(params: string): Observable<ApiGenericResponse<EServiceModel< PriceOfferModel>>> {
    return this.http.Get<ApiGenericResponse<EServiceModel<PriceOfferModel>>> (`${this.getUrlPriceOffer}?${params}`);
  }

  public getActiveBiddingIdByPlanApprovalId(params: string): Observable<ApiGenericResponse<Guid>> {
    return this.http.Get<ApiGenericResponse<Guid>> (`${this.getUrlActiveBidId}?${params}`);
  }


  public getPriceOffer(params: string): Observable<ApiGenericResponse<PriceOfferModel>> {
    return this.http.Get<ApiGenericResponse<PriceOfferModel>> (`${this.getUrlPriceOffer}?${params}`);
  }

  public getPriceOffersByBiddingId(params:string):Observable<ApiGenericResponse<PriceOfferModel[]>>{
    return this.http.Get<ApiGenericResponse<PriceOfferModel[]>>(`${this.getUrlPriceOffersByBidId}?${params}`);

}


public getPriceOffersByBiddingIdBidderId(params:string):Observable<ApiGenericResponse<PriceOfferModel>>{
  return this.http.Get<ApiGenericResponse<PriceOfferModel>>(`${this.getUrlPriceOffersByBidingIdBidderId}?${params}`);

}

public postModel(currentPriceOffer: PriceOfferModel): Observable<ApiGenericResponse<PriceOfferModel>> {
  return this.http.Post<ApiGenericResponse<PriceOfferModel>>(this.postUrlPriceOffer, currentPriceOffer);
}
  

}
