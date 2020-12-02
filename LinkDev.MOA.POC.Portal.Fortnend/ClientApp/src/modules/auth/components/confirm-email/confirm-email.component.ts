import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { TranslateService } from '@ngx-translate/core';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  Message: string="error";
  class: string = "error-select";
  mode: Mode;
  ErrorMode = Mode.Error;
  SuccessMode = Mode.Success;
  public Email: string = "";
  public ShowResendActivation: boolean = false;
  constructor(public api: APIService, public route: ActivatedRoute,private translate : TranslateService) { }

  ngOnInit() {
    SharedHelper.showLoader();
    debugger;
    this.api.Get<ApiGenericResponse<boolean>>("api/ProfileManagement/ConfirmEmail?token="
      + this.route.snapshot.queryParams['token']
      +"&userId="
      + this.route.snapshot.queryParams['id']).subscribe(
      res => {
          debugger;
        if(res.ResponseCode === ResponseCode.Error)
        {
          if (res.FriendlyResponseMessage == "Activation Link Is Expired") {
            this.ShowResendActivation = true;
            this.SetError("Activation.ActivationLinkIsExpired");
          }
          else {
            this.ShowResendActivation = false;
            this.SetError(res.FriendlyResponseMessage);
          }
        }
        else
        {
          this.SetSuccess("Auth.EmailConfirmationSuccess")
          //localStorage.setItem("is-active","true");
        }
      },
      error => {
        debugger;
        this.SetError("Auth.EmailConfirmationError");
      }
      );
  }

SetError(message: string)
{
  this.mode = Mode.Error;
  this.class = "error-select";
  this.SetMessage(message);
  SharedHelper.hideLoader();
}
SetSuccess(message: string)
{
  this.mode = Mode.Success;
  this.class = "success-select";
  this.SetMessage(message);
  SharedHelper.hideLoader();
}

SetMessage(message: string)
{
  this.Message = message;
}


  Resendactivationemail() {
    this.Email = this.route.snapshot.queryParams["Email"];
    SharedHelper.showLoader();
    this.api.Get<ApiGenericResponse<string>>("api/ProfileManagement/ResendActivationMail?Email=" + this.Email).subscribe(
      res => {
        SharedHelper.hideLoader();
        if (res.ResponseCode === ResponseCode.Error) {
          this.SetError(res.FriendlyResponseMessage);
        }
        else
          this.SetSuccess("Activation.ResendActivationMailSuccess");
      },
      error => {
        SharedHelper.hideLoader();
        this.SetError("Auth.EmailConfirmationError");
      }
    );
  }
}


