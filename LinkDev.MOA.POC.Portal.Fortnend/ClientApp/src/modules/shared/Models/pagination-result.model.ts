export class PaginationResult<T>
{
  Results: T
  PageIndex: number;
  TotalNumber: number;
  PagingCookie: string;
}
