import { Injectable } from '@angular/core';
import { ILatestNonRatedAppData } from '../models/latest-non-rated-app-data.model';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { Observable } from 'rxjs';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
@Injectable({
    providedIn: 'root'
  })
  
  export class RatingService {
      private latestNonRatedAppURL = 'api/applicationrating/GetLastestNonRatedApplication';

      constructor(private api: APIService) { }

      getlatestNonRatedApp(): Observable<ApiGenericResponse<ILatestNonRatedAppData>> {
        return this.api.Get<ApiGenericResponse<ILatestNonRatedAppData>>(this.latestNonRatedAppURL);
      }
  }