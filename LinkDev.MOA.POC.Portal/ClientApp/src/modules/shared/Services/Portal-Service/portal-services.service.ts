import { Injectable } from '@angular/core';

import { APIService } from '../API-Service/api-service.service';
import { ApiGenericResponse } from '../../Models/api-generic-response';
import { Observable, BehaviorSubject } from 'rxjs';
import { ServiceCatogoriesModel } from '../../Models/service-catogories.model';
import { ServiceCatogoriesResponseModel } from '../../Models/services-by-category-Response.model';
import { ServiceDetailsResponseModel } from '../../Models/service-details-response.model';

@Injectable({
    providedIn: 'root'
})

export class PortalServicesService {

    private getServicesCategoriesURL: string = 'api/serviceheaders/GetServiceCatogories';
    private GetServicesByCategoryURL: string = 'api/serviceheaders/GetServicesByCategory?serviceCategoryCode=';
    private GetServiceDetailsURL: string = 'api/serviceheaders/GetServiceLandingDetails?servicePortalCode=';

    private category:BehaviorSubject<string>;
    private serviceCategories:BehaviorSubject<ServiceCatogoriesModel[]>;
    constructor(private api: APIService) {
        this.category = new BehaviorSubject("ModonServices");
        this.serviceCategories = new BehaviorSubject([]);
     }

    getServicesCategories(): Observable<ApiGenericResponse<ServiceCatogoriesModel[]>> {
        return this.api.Get<ApiGenericResponse<ServiceCatogoriesModel[]>>(`${this.getServicesCategoriesURL}`);
    }
    getServicesByCategory(params): Observable<ApiGenericResponse<ServiceCatogoriesResponseModel>> {
        return this.api.Get<ApiGenericResponse<ServiceCatogoriesResponseModel>>(`${this.GetServicesByCategoryURL}${params}`);
    }
    getServiceDetails(params): Observable<ApiGenericResponse<ServiceDetailsResponseModel>> {
        return this.api.Get<ApiGenericResponse<ServiceDetailsResponseModel>>(`${this.GetServiceDetailsURL}${params}`);
    }

    getCategory():BehaviorSubject<string>{
        return this.category;
    }
    setCategory(categoryCode:string){
        this.category.next(categoryCode);
    }
    getServiceCategories():BehaviorSubject<ServiceCatogoriesModel[]>{
        return this.serviceCategories;
    }
    setServiceCategories(categories:ServiceCatogoriesModel[]){
        this.serviceCategories.next(categories);
    }

}