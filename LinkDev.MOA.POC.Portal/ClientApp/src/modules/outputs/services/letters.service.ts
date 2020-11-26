import { Injectable } from "@angular/core";
import { APIService } from "src/modules/shared/Services/API-Service/api-service.service";
import { ApiGenericResponse } from "src/modules/shared/Models/api-generic-response";
import { Observable } from "rxjs";
import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";

@Injectable({
  providedIn: "root",
})
export class LettersService {
  private baseControllerUrl = "api/Outputs";
  constructor(private api: APIService) {}

  getLetterDetails(letterId: string): Observable<ApiGenericResponse<any>> {
    return this.api.Get(
      `${this.baseControllerUrl}/GetLetterDetails?LetterId=${letterId}`
    );
  }
  getContractDocuments(regardingId: string): Observable<ApiGenericResponse<DocumentSettingModel[]>> {
    return this.api.Get(`${this.baseControllerUrl}/GetDocuments?regardingId=${regardingId}`);
  }
}
