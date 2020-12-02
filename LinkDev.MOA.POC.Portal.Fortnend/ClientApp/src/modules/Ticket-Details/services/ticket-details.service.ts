import { Injectable } from '@angular/core';
import { IRequestService } from 'src/modules/shared/services/IRequestService.service';
import { TicketModel } from '../interfaces/ticket-model';
import { Observable } from 'rxjs';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { ApplicationPostModel } from 'src/modules/shared/Models/application-post-model';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';



@Injectable({
  providedIn: 'root'
})
export class TicketDetailsService implements IRequestService<TicketModel> {
  private getUrl: string = "api/TicketManagemnt/GetTicketList?";
  private postUrl: string = "api/TicketManagemnt/PostTicket";
constructor(protected api: APIService) { }

public url: string = ConfigService.CRMAPI;

  public get(params: string): Observable<ApiGenericResponse<EServiceModel<TicketModel>>>{
    return this.api.Get<ApiGenericResponse<EServiceModel<TicketModel>>>(`${this.getUrl}${params}`);
}
  public post(application: EServiceModel<TicketModel>): Observable<ApiGenericResponse<ApplicationPostModel>>{
  return this.api.Post(this.postUrl,application);
}
public GetCurrentUserType(CRId:string): Observable<ApiGenericResponse<number>>
{
  return this.api.Get<ApiGenericResponse<number>>(`api/EServices/GetCurrentUserType?CRId=${CRId}`);
}
// public GetCRsByTypeByContactId(crType:number): Observable<ApiGenericResponse<RetrieveOptionsRequest[]>>
// {
//   return this.api.Get<ApiGenericResponse<RetrieveOptionsRequest[]>>(`api/EServices/GetCRsByTypeByContactId?crType=${crType}`);
// }

//  // This function is to get the Detail of tickets with the reply 
//  public GetTicketDetails(id: string): TicketModel {
//   var ticketModel: TicketModel;
//   this.api.GetTicket(this.url + `cases/${id}/withreplies`).subscribe(
//     (response: any) => {
    
//      /// Ticket Detials
//      ticketModel.Status = Number(response.data.case.status);
//      ticketModel.StatusNameArabic = response.data.case.statusNameArabic;
//      ticketModel.TicketNumber = response.data.case.ticketNumber;
//      ticketModel.Title = response.data.case.caseTitle;
//      ticketModel.Description = response.data.case.description;
//      ticketModel.RatingScore = response.data.case.rating;
//      ticketModel.RatingComment = response.data.case.ratingComment;

//     //  ticketModle.header.RequestNumber = response.data.case.ticketNumber;
//     //  ticketModle.header.PortalStatusName = response.data.case.statusNameArabic;
//     //  ticketModle.caseTitle = response.data.case.caseTitle;
//     //  ticketModle.caseDescription = response.data.case.description;
//       //// Reply Details  
//       if (response.data.replies.length != 0) {
//         ticketModel.hasReply = true;
//         ticketModel.NoteTitle = response.data.replies[0].subject;
//         ticketModel.Note = response.data.replies[0].body;
//       }
//       // SharedHelper.hideLoader();
     
//     },
//     (error) => {
//       console.log("err", error);
//     });
//     return ticketModel;
// }

// public async GetTicket (pageId: string): Promise<any> {
//   await this.api.GetTicket(this.url + `cases/${pageId}/withreplies`).subscribe(
//     (response: any) => {
//       return response.data.case.rating;
//       // SharedHelper.hideLoader();
//       // this.ratingScore = response.data.case.rating;
//       // var x = Number(this.ratingScore) - 1
//       // this.onStarClick(x);
//     },
//     (error) => {
//       console.log("err", error);
//     });
// }
// public PostComment(noteId: string, fileInput: any, ticketId: string, postObject: any): void {
//  // Add the comment to specific Ticket 
//  this.api.PostComment<ApiGenericResponse<Response>>(this.url + `cases/${ticketId}/note`, postObject).subscribe(
//   (data: any) => {
//     // 1. Get file from html
//     debugger;
//     noteId = data.data.note.id;
//     const formData: FormData = new FormData();
//     formData.set('', fileInput);
//     // 2. I should Get the GUID from thr response pass to function down
//     this.UploadFile(formData, noteId);
//   },
//   (error) => {
//     console.log("err", error);
//   });
// }

// // Upload the File attached with Comment
// public UploadFile(fileInput: any, ticketRef: string) {
// this.api.PutFileNote<ApiGenericResponse<Response>>(this.url + `cases/${ticketRef}/noteattachments`, fileInput).subscribe(
//   (data: any) => {
//     // After Successfully Attached the attachment Reload the Page
//     location.reload();
//   },
//   (error) => {
//     console.log("err", error);
//   });
// }

}
