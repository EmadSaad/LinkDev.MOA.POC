import { EServiceModel } from '../Models/eservice-model.model';
import { Observable } from 'rxjs';
//import { ApiPostEntityRequest } from '../Models/api-post-entity-request';
import { LinkDevApiResult } from '../Models/LinkDev-api-result.model';
import { RequestCommonPostResult } from '../Models/rquest-common-post-result.model';
import { ApiGenericResponse } from '../Models/api-generic-response';
import { ApplicationPostModel } from '../Models/application-post-model';

export interface IRequestService<TApplication> {
  get(params: string): Observable<ApiGenericResponse<EServiceModel<TApplication>>>;
  post(application: EServiceModel<TApplication>): Observable<ApiGenericResponse<ApplicationPostModel>>;
}
