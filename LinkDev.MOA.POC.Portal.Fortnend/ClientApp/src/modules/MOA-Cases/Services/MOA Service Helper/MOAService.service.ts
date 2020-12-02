import { Observable } from "rxjs";
import { ApiGenericResponse } from "src/modules/shared/Models/api-generic-response";
import { IGridResultBase } from "src/modules/workspace/interfaces/GridResultBase.interface";

export interface MOAService<TFiltration, TResult> {
    search(filter: TFiltration): Observable<ApiGenericResponse<IGridResultBase<TResult>>>;
}
