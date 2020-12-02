import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AppConfigService } from './app-config.service';
import { LookupKeyValue } from '../Models/lookup-key-value.model';
import { LinkDevApiResult } from '../Models/LinkDev-api-result.model';
import { ApiCollectionResponse } from '../Models/api-collection-response.model';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from '../Models/api-generic-response';
import { RetrieveOptionsRequest } from '../Models/lookup-request.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';

@Injectable({ providedIn: 'root' })
export class LookupService {
  

  // private lookupServiceUrl: string = "api/OptionSetLocalization/LoadLookups";
  // private ServiceLookupUrl: string = "api/OptionSetLocalization/LoadServiceLookup";

  lookupEntities: { [name: string]: any[]; } = {};

  constructor(private http: HttpClient, public api: APIService) {
    this.lookupEntities = {};
    // this.lookupServiceUrl = appConfigService.apiBaseUrl + this.lookupServiceUrl;
    // this.ServiceLookupUrl = appConfigService.apiBaseUrl + this.ServiceLookupUrl;

  }
  loadLookups(lookupRequest: RetrieveOptionsRequest[]): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.api.Post<ApiGenericResponse<RetrieveOptionsRequest[]>>('api/Lookups/GetLookups',lookupRequest).subscribe(response => {
         //debugger;
        this.handleRetrievedLookup(response.Content);
      }, error => {
        observer.error(false);
      }, () => {
        observer.next(true);
      });
    });
  }

  //loadServiceLookup(): Observable<boolean> {
  //  return new Observable<boolean>(observer => {
  //    this.http.get<LinkDevApiResult<ServiceLookupLocalizationResponse[]>>(this.ServiceLookupUrl).subscribe(response => {
  //      this.lookupEntities["Service"] = response.Content.map(s => {
  //        return { Label: s.Label, Value: s.Value, CategoryId: s.CategoryId }
  //      });
  //    }, error => {
  //      observer.error(false);
  //    }, () => {
  //      observer.next(true);
  //    });
  //  });
  //}

  public handleRetrievedLookup(response: RetrieveOptionsRequest[]): void {
    if (response) {
       debugger;
      for (var i = 0; i < response.length; i++) {
        this.lookupEntities[response[i].CachingKey] = response[i].Result;
      }
    }
  }
}
