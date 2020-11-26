import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

//import API services
import { APIService } from '../../shared/Services/API-Service/api-service.service';
import { ApiGenericResponse } from '../../shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from '../../shared/Models/lookup-request.model';
import { LookupService } from 'src/modules/shared/Services/lookup.service';

//Import models
// import { WorkspaceCRsModel } from '../interfaces/WorkspaceCRs-model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
//import { WorkspaceCRsInterface } from '../interfaces/WorkspaceCRs.interface';
import { WorkspaceRequestStatistics } from '../interfaces/WorkspaceRequestStatistics.interface';
import { IRequestFiltration } from '../interfaces/RequestFiltration.interface';
import { IRequestsResult } from '../interfaces/RequestResult.interface';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { IBiddingsFiltration } from '../interfaces/BiddingsFiltration.interface';
import { IBidding } from '../interfaces/Bidding.interface';
import { ITasksResult } from '../interfaces/TasksResult.interface';
import { IContractFiltration } from '../interfaces/ContractFiltration.interface';
import { IContractResult } from '../interfaces/ContractResult.interface';
import { ILicenseFiltration } from '../interfaces/LicenseFiltration.interface';
import { ILicenseResult } from '../interfaces/LicenseResult.interface';
import { IOverviewResult } from '../interfaces/OverviewResult.interface';
import { ITicketResult } from '../interfaces/TicketResult.interface';
import { ITicketFiltration } from '../interfaces/TicketFiltration.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private getWorkspaceCRsURL: string = 'api/workspace/GetWorkspaceCRs';
  private GetCRContractsURL: string = 'api/workspace/GetCRContracts?crId=';
  private GetRequestsStatisticsURL: string = 'api/workspace/GetRequestsStatistics?crId=';
  private GetRequestsURL: string = 'api/workspace/GetRequests';
  private GetWonBiddingsURL = "api/workspace/GetWonBiddings";
  private GetAvailableBiddingsURL = "api/workspace/GetAvailableBiddings";
  private GetTasksURL: string = 'api/workspace/GetTasks';
  private GetContractsURL: string = 'api/workspace/GetContracts';
  private GetLicenseURL: string = 'api/workspace/GetLicense';
  private GetOverviewDataURL: string = 'api/workspace/GetOverviewData?crId=';
  private GetRatingURL: string = "api/applicationrating/SubmitRating?ApplicationId=";

  private CRs: BehaviorSubject<RetrieveOptionsRequest[]>;
  private crId: BehaviorSubject<string>;
  private SelectedContract: BehaviorSubject<string>;
  private requestFiltration: BehaviorSubject<IRequestFiltration>;
  private contractFiltration: BehaviorSubject<IContractFiltration>;
  private biddingFiltration: BehaviorSubject<IBiddingsFiltration>;
  private availableBiddingFiltration: BehaviorSubject<IBiddingsFiltration>;
  private licenseFiltration: BehaviorSubject<ILicenseFiltration>;
  private submittedRequests: BehaviorSubject<any>;
  private draftRequests: BehaviorSubject<any>;
  private taskFiltration: BehaviorSubject<IRequestFiltration>;
  private ticketFiltration: BehaviorSubject<ITicketFiltration>;

  constructor(private api: APIService) {
    this.CRs = new BehaviorSubject([]);
    this.crId = new BehaviorSubject("");
    this.SelectedContract = new BehaviorSubject("");
    this.requestFiltration = new BehaviorSubject(new IRequestFiltration);
    this.taskFiltration = new BehaviorSubject(new IRequestFiltration);
    this.contractFiltration = new BehaviorSubject(new IContractFiltration);
    this.biddingFiltration = new BehaviorSubject({});
    this.licenseFiltration = new BehaviorSubject(new ILicenseFiltration);
    this.submittedRequests = new BehaviorSubject("");
    this.draftRequests = new BehaviorSubject("");
    this.ticketFiltration = new BehaviorSubject(new ITicketFiltration);
  }

  getWorkspaceCRs(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`${this.getWorkspaceCRsURL}`);
  }
  GetCRContracts(params?: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`${this.GetCRContractsURL}${params}`);
  }
  GetRequestStatistics(crID: string, contractID?: string): Observable<ApiGenericResponse<WorkspaceRequestStatistics>> {
    return this.api.Get<ApiGenericResponse<WorkspaceRequestStatistics>>(`${this.GetRequestsStatisticsURL}${crID}&contractId=${contractID}`);
  }
  GetRequests(requestsFilteration: IRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<IRequestsResult>>> {
    return this.api.Post(`${this.GetRequestsURL}`, requestsFilteration);
  }
  GetWonBiddings(biddingsFiltration: IBiddingsFiltration): Observable<ApiGenericResponse<IGridResultBase<IBidding>>> {
    return this.api.Post(`${this.GetWonBiddingsURL}`, biddingsFiltration);
  }
  GetAvailableBiddings(biddingsFiltration: IBiddingsFiltration): Observable<ApiGenericResponse<IGridResultBase<IBidding>>> {
    return this.api.Post(`${this.GetAvailableBiddingsURL}`, biddingsFiltration);
  }
  GetTasks(taskFilteration: IRequestFiltration): Observable<ApiGenericResponse<IGridResultBase<ITasksResult>>> {
    return this.api.Post(`${this.GetTasksURL}`, taskFilteration);
  }
  GetContratcs(contractFiltration: IContractFiltration): Observable<ApiGenericResponse<IGridResultBase<IContractResult>>> {
    return this.api.Post(`${this.GetContractsURL}`, contractFiltration);
  }
  GetLicenses(licenseFilteration: ILicenseFiltration): Observable<ApiGenericResponse<IGridResultBase<ILicenseResult>>> {
    return this.api.Post(`${this.GetLicenseURL}`, licenseFilteration);
  }
  GetOverviewData(crID: string, contractID?: string): Observable<ApiGenericResponse<IOverviewResult>> {
    return this.api.Get<ApiGenericResponse<IOverviewResult>>(`${this.GetOverviewDataURL}${crID}&contractId=${contractID}`);
  }
 
  SubmitRating(applicatioId: string, rating: number): Observable<ApiGenericResponse<boolean>> {
    console.log(`${this.GetRatingURL}${applicatioId}&Rating=${rating}`);
    return this.api.Get<ApiGenericResponse<boolean>>(`${this.GetRatingURL}${applicatioId}&Rating=${rating}`)
  }
  // getter and setter for shared items
  getCrID(): BehaviorSubject<string> {
    return this.crId;
  }
  setCrID(newID: string) {
    this.crId.next(newID);
  }
  getContractID(): BehaviorSubject<string> {
    return this.SelectedContract;
  }
  setContractID(newID: string) {
    this.SelectedContract.next(newID);
  }
  getCRS(): BehaviorSubject<any> {
    return this.CRs;
  }
  setCRS(newCRSArray) {
    this.CRs.next(newCRSArray);
  }

  getRequestFiltration(): BehaviorSubject<IRequestFiltration> {
    return this.requestFiltration;
  }
  setRequestFiltration(filter: IRequestFiltration) {
    this.requestFiltration.next(filter);
  }
  getTaskFiltration(): BehaviorSubject<IRequestFiltration> {
    return this.taskFiltration;
  }
  setTaskFiltration(filter: IRequestFiltration) {
    this.taskFiltration.next(filter);
  }
  getBiddingFiltration(): BehaviorSubject<IBiddingsFiltration> {
    return this.biddingFiltration;
  }
  setBiddingFiltration(biddingFilter: IBiddingsFiltration) {
    this.biddingFiltration.next(biddingFilter);
  }
  getAvailableBiddingFiltration(): BehaviorSubject<IBiddingsFiltration> {
    return this.availableBiddingFiltration;
  }
  setAvailableBiddingFiltration(availableBiddingFilter: IBiddingsFiltration) {
    this.availableBiddingFiltration.next(availableBiddingFilter);
  }
  getLicenseFiltration(): BehaviorSubject<ILicenseFiltration> {
    return this.licenseFiltration;
  }
  setLicenseFiltration(licenseFilter: ILicenseFiltration) {
    this.licenseFiltration.next(licenseFilter);
  }
  //////////////////////////////////////////////////////////////////////

  getTicketFiltration(): BehaviorSubject<ILicenseFiltration> {
    return this.ticketFiltration;
  }

  setTicketFiltration(ticketFilter: ITicketFiltration) {
    this.ticketFiltration.next(ticketFilter);
  }

  ///////////////////////////////////////////////////////////////////////
  getSubmittedRequests(): BehaviorSubject<any> {
    return this.submittedRequests;
  }
  setSubmittedRequests(submittedRequests) {
    this.submittedRequests.next(submittedRequests);
  }
  getDraftRequests(): BehaviorSubject<any> {
    return this.draftRequests;
  }
  setDraftRequests(draftRequests) {
    this.draftRequests.next(draftRequests);
  }

  getContractFiltration(): BehaviorSubject<IContractFiltration> {
    return this.contractFiltration;
  }
  setContractFiltration(filter: IContractFiltration) {
    this.contractFiltration.next(filter);
  }
}
