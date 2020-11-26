export interface ApiGenericResponse<T>{
    Content: T;
	ResponseCode: ResponseCode;
	FriendlyResponseMessage: string;
	InternalMessage: string;
}
export enum ResponseCode {
	Error = 0,
	Success = 1
}
