import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRsInfo, ILISICActivities } from '../Models/CRsInfo';
import { ApiGenericResponse } from '../../shared/Models/api-generic-response';
import { APIService } from '../../shared/Services/API-Service/api-service.service';
import { CrOwners } from '../Models/CROwners';
import { CRindustrialLicenses } from '../Models/CRindustrialLicenses';
import { CRContactDetails } from '../Models/CRContactDetails';
import { UserInfo } from '../Models/UserInfo';
import { CRContractsModal } from '../Models/CRContractsModal';

@Injectable({
  providedIn: 'root'
})
export class CRServices {
  private getUrl = 'api/CrManagement/GetUserCRs';
  private getCrUrl = 'api/CrManagement/GetCRByCRNumber';
  private getCrDetails = 'api/CrManagement/GetCRDetailsByCRId';
  private getCRIntegrationInfoByCRId = 'api/CrManagement/GetCRIntegrationInfoByCRId';
  private getCrUpdateUrl = 'api/CrManagement/GetCRDetailsUpdateFromIntegeration';
  private getCrIsicActsUrl = 'api/CrManagement/GetCRISICActivities';
  private getCrOwnesrUrl = 'api/CrManagement/GetCROwners';
  private getCrIlsUrl = 'api/CrManagement/GetCRIndustrialLicenses';
  private GetILByILNumberURL = 'api/CrManagement/GetIndustrialLicenseByNameAndType';
  private CreateILURL = 'api/CrManagement/CreateIndustrialLicense';
  private DeactiveILURL = 'api/CrManagement/DeactivateIndustrialLicense';
  private postUrl = 'api/CrManagement/CreateCRcontactRelation';

  ///////////////////////////// Contact Details component /////////////////////////
  private GetContactDetailsURL = 'api/CrManagement/GetContactDetails'
  private CreateContactDetailsURL = 'api/CrManagement/CreateContactDetails'
  private DeleteContctDetailsURL ="api/CrManagement/DeleteContactDetails"
  //////////////////////////////End Contact details component //////////////////////
  private getMyRepresentativeUrl = 'api/CrManagement/GetCRrepresentative';
  private postRepresentativeUrl = 'api/CrManagement/CreateRepresentativeRelation';
  private DeleteRepresentativeUrl ='api/CrManagement/DeleteRepresentativeRelation'
  private CreateDeleteRepresentatives = 'api/CrManagement/CreateDeleteRepresentatives'
  private getIlWithActivityList = 'api/CrManagement/GetIndustrialLicenseISICActivitiesById'
  private getCRFromIntegration = 'api/CrManagement/GetCRsByContactFromIntegration'
  private UpdateCRURL = 'api/CrManagement/UpdateCR'

  private getCrContractsURL = 'api/CrManagement/GetCrContracts'
  private getCrContactDetailsURL = 'api/CrManagement/GetCrContactDetails'
  private CreateContractContactDetailsURL = 'api/CrManagement/CreateContractContactDetailsRelationship';
  private getILUpdateUrl = "api/CrManagement/GetIndustrialLicenseUpdateFromIntegration";
  constructor(private http: APIService) {
    //this.getUrl = appConfigService.apiBaseUrl + this.getUrl;
  }


  //////////////////////// 1- My CRs ///////////////////////////////////////////////
    //++ Get

  getContactCRs(): Observable<ApiGenericResponse<CRsInfo[]>> {
    return this.http.Get<ApiGenericResponse<CRsInfo[]>>(`${this.getUrl}`);
  }

  getCRByCrNumber(params?: string): Observable<ApiGenericResponse<CRsInfo>> {
    return this.http.Get<ApiGenericResponse<CRsInfo>>(`${this.getCrUrl}?${params}`);
  }

  GetCRsByContactFromIntegration(): Observable<ApiGenericResponse<object[]>> {
    return this.http.Get<ApiGenericResponse<object[]>>(`${this.getCRFromIntegration}`);
  }

    //++ Post
  PostContactCR(CR: CRsInfo): Observable<ApiGenericResponse<object>> {
    return this.http.Post<ApiGenericResponse<CRsInfo>>(this.postUrl, CR);
  }

  /////////////////////// End My CRs//////////////////////////////////////////////


  ///////////////////// 2- CR Details //////////////////////////////////////////////
  //++ Post
  UpdateCR(CR: CRsInfo): Observable<ApiGenericResponse<CRsInfo>> {
    return this.http.Post<ApiGenericResponse<CRsInfo>>(this.UpdateCRURL, CR);
  }

  //++ Get
  GetCRDetails(params?: string): Observable<ApiGenericResponse<CRsInfo>> {
    return this.http.Get<ApiGenericResponse<CRsInfo>>(`${this.getCrDetails}?${params}`);
  }

  GetCRIntegrationInfoByCRId(params?: string): Observable<ApiGenericResponse<CRsInfo>> {
    return this.http.Get<ApiGenericResponse<CRsInfo>>(`${this.getCRIntegrationInfoByCRId}?${params}`);
  }

  getCRUpdateFromIntgeration(params?: string): Observable<ApiGenericResponse<CRsInfo>> {
    return this.http.Get<ApiGenericResponse<CRsInfo>>(`${this.getCrUpdateUrl}?${params}`);
  }
  getCrIsicActs(params?: string): Observable<ApiGenericResponse<ILISICActivities[]>> {
    return this.http.Get<ApiGenericResponse<ILISICActivities[]>>(`${this.getCrIsicActsUrl}?${params}`);
  }
  getCROwners(params?: string): Observable<ApiGenericResponse<CrOwners[]>> {
    return this.http.Get<ApiGenericResponse<CrOwners[]>>(`${this.getCrOwnesrUrl}?${params}`);
  }


  ///////////////////// End CR Details //////////////////////////////////////////////

  //////////////////// 3- ILs //////////////////////////////////////////////////
  //++ Post
  CreateIL(ILObj: CRindustrialLicenses): Observable<ApiGenericResponse<Boolean>> {
    return this.http.Post<ApiGenericResponse<Boolean>>(this.CreateILURL, ILObj);
  }

  DeleteIL(ILOgj: CRindustrialLicenses): Observable<ApiGenericResponse<Boolean>> {
    return this.http.Post<ApiGenericResponse<Boolean>>(this.DeactiveILURL, ILOgj);
  }
  //++ Get
  getCRindustrialLicenses(params?: string): Observable<ApiGenericResponse<CRindustrialLicenses[]>> {
    return this.http.Get<ApiGenericResponse<CRindustrialLicenses[]>>(`${this.getCrIlsUrl}?${params}`);
  }

  GetILByILNumber(params?: string): Observable<ApiGenericResponse<CRindustrialLicenses>> {
    return this.http.Get<ApiGenericResponse<CRindustrialLicenses>>(`${this.GetILByILNumberURL}?${params}`);
  }

  getIndustrialLicenseDetailsWithActivityList(params?: string): Observable<ApiGenericResponse<CRindustrialLicenses>> {
    return this.http.Get<ApiGenericResponse<CRindustrialLicenses>>(`${this.getIlWithActivityList}?${params}`);
  }
  getILUpdateFromIntgeration(params?: string): Observable<ApiGenericResponse<CRindustrialLicenses>> {
    return this.http.Get<ApiGenericResponse<CRindustrialLicenses>>(`${this.getILUpdateUrl}?${params}`);
  }
   
  //////////////////// End Ils//////////////////////////////////////////////////

  /////////////////// 4- Contact Details /////////////////////////////////////
  //++ Post
  postContactDetails(ContactDetaillsOBJ: CRContactDetails): Observable<ApiGenericResponse<CRContactDetails>> {
    return this.http.Post<ApiGenericResponse<CRContactDetails>>(this.CreateContactDetailsURL, ContactDetaillsOBJ);
  }

  DeleteContactDetails(ContactDetaillsOBJ: CRContactDetails): Observable<ApiGenericResponse<Boolean>> {
    return this.http.Post<ApiGenericResponse<Boolean>>(this.DeleteContctDetailsURL, ContactDetaillsOBJ);
  }

  ///++ Get
  getContactDetails(params?: string): Observable<ApiGenericResponse<CRContactDetails[]>> {
    return this.http.Get<ApiGenericResponse<CRContactDetails[]>>(`${this.GetContactDetailsURL}?${params}`);
  }

  ////////////////// End Contact Details /////////////////////////////////////

  ////////////// // 5- Representatives //////////////////////////////////////
  //++ Post
  CreateRepresentative(UserInfo: UserInfo): Observable<ApiGenericResponse<UserInfo>> {
    return this.http.Post<ApiGenericResponse<UserInfo>>(this.postRepresentativeUrl, UserInfo);
  }

  DeleteRepresentative(UserInfo: UserInfo): Observable<ApiGenericResponse<UserInfo>> {
    return this.http.Post<ApiGenericResponse<UserInfo>>(this.DeleteRepresentativeUrl, UserInfo);
  }
 
  getMyRepresentative(params?: string): Observable<ApiGenericResponse<UserInfo[]>> {
    return this.http.Get<ApiGenericResponse<UserInfo[]>>(`${this.getMyRepresentativeUrl}?${params}`);
  }

/////////////////// End Representatives/////////////////////////////////////


  /////////////////// start CR Contracts/////////////////////////////////////

  getCRContracts(params?: string): Observable<ApiGenericResponse<CRContractsModal[]>> {
    return this.http.Get<ApiGenericResponse<CRContractsModal[]>>(`${this.getCrContractsURL}?${params}`);
  }

  getCRContactDetails(params?: string): Observable<ApiGenericResponse<object[]>> {
    return this.http.Get<ApiGenericResponse<object[]>>(`${this.getCrContactDetailsURL}?${params}`);
  }

  updateContractContactDetailsRelation(CrContract: CRContractsModal): Observable<ApiGenericResponse<boolean>> {
    return this.http.Post<ApiGenericResponse<boolean>>(this.CreateContractContactDetailsURL, CrContract);
  }
}
