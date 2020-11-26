import { Injectable } from '@angular/core';
import { ILicenseFiltration } from '../interfaces/LicenseFiltration.interface';
import { WorkspaceService } from './workspace-service.service';
import { ILicenseResult } from '../interfaces/LicenseResult.interface';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';

@Injectable({
  providedIn: 'root'
})
export class LicenseService implements WorkspaceService<ILicenseFiltration, ILicenseResult> {

  private portalUrl = 'api/Workspace';
  constructor(private api: APIService) { }
  search(filter: ILicenseFiltration): Observable<ApiGenericResponse<IGridResultBase<ILicenseResult>>> {
    return this.api.Post<ApiGenericResponse<IGridResultBase<ILicenseResult>>>(`${this.portalUrl}/GetLicense`, filter).pipe();
  }

}
