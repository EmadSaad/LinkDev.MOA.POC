import { APIService } from "src/modules/shared/Services/API-Service/api-service.service";
import { IOperatingLicenseFiltration } from "../interfaces/OperatingLicenseFiltration";
import { IOperatingLicenseResult } from "../interfaces/OperatingLicenseResult.interface";
import { WorkspaceService } from './workspace-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from "src/modules/shared/Models/api-generic-response";
import { IGridResultBase } from "../interfaces/GridResultBase.interface";


@Injectable({
    providedIn: 'root'
  })
  export class OperatingLicensesService implements WorkspaceService<IOperatingLicenseFiltration, IOperatingLicenseResult> {

    constructor(private api: APIService) { }
    search(filter: IOperatingLicenseFiltration): Observable<ApiGenericResponse<IGridResultBase<IOperatingLicenseResult>>> {
      return this.api.Post<ApiGenericResponse<IGridResultBase<IOperatingLicenseResult>>>(`api/workspace/GetOperatingLicense`, filter).pipe();
    }
  
  }