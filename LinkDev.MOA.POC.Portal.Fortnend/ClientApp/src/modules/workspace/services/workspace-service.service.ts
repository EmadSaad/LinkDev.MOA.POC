import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';

export interface WorkspaceService<TFiltration, TResult> {
    search(filter: TFiltration): Observable<ApiGenericResponse<IGridResultBase<TResult>>>;
}
