import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { WorkspaceRequestStatistics } from '../interfaces/WorkspaceRequestStatistics.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private crs: BehaviorSubject<RetrieveOptionsRequest[]>;
  private crId: BehaviorSubject<string>;
  private crType: BehaviorSubject<number>;
  private selectedContract: BehaviorSubject<string>;
  private requestStatistics: BehaviorSubject<WorkspaceRequestStatistics>;
  private submittedRequests: BehaviorSubject<any>;
  private draftRequests: BehaviorSubject<any>;
  constructor(private api: APIService) {
    this.crs = new BehaviorSubject([]);
    this.crId = new BehaviorSubject('');
    this.crType = new BehaviorSubject(null);
    this.selectedContract = new BehaviorSubject('');
    this.requestStatistics = new BehaviorSubject(null);
    this.submittedRequests = new BehaviorSubject('');
    this.draftRequests = new BehaviorSubject('');
  }
  getCrId() {
    return this.crId.asObservable();
  }
  setCrID(crId: string) {
    this.selectedContract.next('');
    this.crId.next(crId);
  }
  getContractId() {
    return this.selectedContract.asObservable();
  }
  setContractId(contractId: string) {
    this.selectedContract.next(contractId);
  }
  getCrs() {
    return this.crs;
  }
  setCrs(crArray) {
    this.crs.next(crArray);
  }
  setCrType(crType: number) {
    this.crType.next(crType);
  }
  getCrType() {
    return this.crType.asObservable();

  }
  hasCrs(): boolean {
    return this.crId.getValue() !== '';
  }
  hasRequestStatistics(): boolean {
    return this.requestStatistics.getValue() !== null;
  }

  setRequestStatistics(requestStatistics: WorkspaceRequestStatistics) {
    this.requestStatistics.next(requestStatistics);
  }
  getWorkspaceCRs(): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {

    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/workspace/GetWorkspaceCRs`);
  }
  getCrContracts(params?: string): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>> {
    return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/workspace/GetCRContracts?crId=${params}`);
  }
  getRequestStatistics(crId: string, contractId?: string): Observable<ApiGenericResponse<WorkspaceRequestStatistics>> {
    return this.api.Get<ApiGenericResponse<WorkspaceRequestStatistics>>
      (`api/workspace/GetRequestsStatistics?crId=${crId}&contractId=${contractId}`);
  }
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
}
