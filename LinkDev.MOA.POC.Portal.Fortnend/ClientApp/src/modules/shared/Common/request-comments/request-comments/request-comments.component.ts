import { observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RequestComment } from '../interfaces/request-comment';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';

@Component({
  selector: 'app-request-comments',
  templateUrl: './request-comments.component.html',
  styleUrls: ['./request-comments.component.css']
})
export class RequestCommentsComponent implements OnChanges {
  @Input() regardingID: Guid;
  requestComment: RequestComment[];
  isCompleted = false;
  isError = false;
  errorMessage: string;
  constructor(private http: HttpClient, private api: APIService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['regardingID'] && this.regardingID) {
      this.api.Get<ApiGenericResponse<RequestComment[]>>(`api/EServices/GetRequestComments?regardingID=${this.regardingID}`).subscribe(
        result => {
          if (result.ResponseCode == ResponseCode.Success) {
            this.requestComment = result.Content;
          } else {
            this.isError = true;
            this.errorMessage = result.FriendlyResponseMessage;
            this.requestComment = undefined;
          }
        },
        error => { this.isCompleted = true; this.isError = true; this.errorMessage = error; this.requestComment = undefined; },
        () => { this.isCompleted = true; });
    }
  }
}
